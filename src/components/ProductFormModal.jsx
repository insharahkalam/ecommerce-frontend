import React, { useState } from "react";
import { Upload, Star, Tag, Plus, Trash2, Loader2, AlertCircle } from "lucide-react";
import Modal from "./Modal";
import { FieldLabel, TextField, TextArea } from "./FormFields";
import PrimaryButton from "./PrimaryButton";
import SecondaryButton from "./SecondaryButton";
import { API_BASE_URL } from "../data/mockData";

/* ---------------------------------------------------------
   ADD / EDIT PRODUCT MODAL — wired to the createProduct API
   Sends multipart/form-data: title, description, price,
   category, brand, stock, discount, featured, specifications
   (as a JSON string), and image (file).
   --------------------------------------------------------- */
export default function ProductFormModal({ editing, initial, onClose, onSaved }) {
  const [title, setTitle] = useState(initial?.name || "");
  const [description, setDescription] = useState(initial?.description || "");
  const [price, setPrice] = useState(initial ? String(initial.price) : "");
  const [category, setCategory] = useState(initial?.category || "");
  const [brand, setBrand] = useState(initial?.brand || "");
  const [stock, setStock] = useState(initial ? String(initial.stock) : "");
  const [discount, setDiscount] = useState(initial?.discount ? String(initial.discount) : "");
  const [featured, setFeatured] = useState(initial?.featured || false);
  const [specs, setSpecs] = useState(
    initial?.specifications && Object.keys(initial.specifications).length
      ? Object.entries(initial.specifications).map(([key, value]) => ({ key, value }))
      : [{ key: "", value: "" }]
  );
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(initial?.image || null);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  function handleImageChange(e) {
    const file = e.target.files?.[0];
    if (!file) return;
    setImageFile(file);
    setImagePreview(URL.createObjectURL(file));
  }

  function updateSpec(index, field, value) {
    setSpecs((prev) => prev.map((s, i) => (i === index ? { ...s, [field]: value } : s)));
  }

  function addSpecRow() {
    setSpecs((prev) => [...prev, { key: "", value: "" }]);
  }

  function removeSpecRow(index) {
    setSpecs((prev) => prev.filter((_, i) => i !== index));
  }

  function validate() {
    if (!title.trim()) return "Title is required.";
    if (!description.trim()) return "Description is required.";
    if (price === "" || Number(price) < 0) return "A valid price is required.";
    if (!category.trim()) return "Category is required.";
    if (!editing && !imageFile) return "Product image is required.";
    return "";
  }

  async function handleSubmit(e) {
    e.preventDefault();
    const validationError = validate();
    if (validationError) {
      setError(validationError);
      return;
    }
    setError("");
    setSubmitting(true);

    try {
      const specifications = {};
      specs.forEach(({ key, value }) => {
        if (key.trim()) specifications[key.trim()] = value;
      });

      const formData = new FormData();
      formData.append("title", title.trim());
      formData.append("description", description.trim());
      formData.append("price", price);
      formData.append("category", category.trim());
      formData.append("brand", brand.trim());
      formData.append("stock", stock || "0");
      formData.append("discount", discount || "0");
      formData.append("featured", featured);
      formData.append("specifications", JSON.stringify(specifications));
      if (imageFile) formData.append("image", imageFile);

      const url = editing ? `${API_BASE_URL}/${editing}` : API_BASE_URL;
      const res = await fetch(url, {
        method: editing ? "PUT" : "POST",
        body: formData,
      });

      const data = await res.json().catch(() => ({}));

      if (!res.ok) {
        throw new Error(data.message || "Something went wrong while saving the product.");
      }

      const saved = data.products || data.product || {};

      onSaved({
        id: saved._id || saved.id || editing || `SKU-${Math.floor(1000 + Math.random() * 9000)}`,
        name: title.trim(),
        description: description.trim(),
        category: category.trim(),
        brand: brand.trim(),
        price: Number(price) || 0,
        stock: Number(stock) || 0,
        discount: Number(discount) || 0,
        featured,
        specifications,
        image: saved.image || imagePreview,
        sold: initial?.sold || 0,
      });
    } catch (err) {
      // Backend not reachable in this environment — fall back to saving locally
      // so the UI still reflects the attempted change, but surface the error.
      setError(err.message || "Could not reach the server. Saved locally instead.");
      onSaved({
        id: editing || `SKU-${Math.floor(1000 + Math.random() * 9000)}`,
        name: title.trim(),
        description: description.trim(),
        category: category.trim(),
        brand: brand.trim(),
        price: Number(price) || 0,
        stock: Number(stock) || 0,
        discount: Number(discount) || 0,
        featured,
        specifications: (() => {
          const s = {};
          specs.forEach(({ key, value }) => { if (key.trim()) s[key.trim()] = value; });
          return s;
        })(),
        image: imagePreview,
        sold: initial?.sold || 0,
      }, { offline: true });
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <Modal title={editing ? "Edit product" : "Add product"} onClose={onClose} wide>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        {error && (
          <div className="flex items-start gap-2 px-3 py-2.5 rounded-lg border border-red-500/25 bg-red-500/10 text-red-300 text-xs font-serif">
            <AlertCircle size={14} className="mt-0.5 flex-shrink-0" />
            <span>{error}</span>
          </div>
        )}

        {/* Image upload */}
        <div>
          <FieldLabel required={!editing}>Product image</FieldLabel>
          <label className="flex items-center gap-4 cursor-pointer">
            <div className="w-20 h-20 rounded-xl flex-shrink-0 border border-white/10 bg-white/[0.04] overflow-hidden flex items-center justify-center">
              {imagePreview ? (
                <img src={imagePreview} alt="Preview" className="w-full h-full object-cover" />
              ) : (
                <Upload size={20} color="#737373" />
              )}
            </div>
            <div className="flex flex-col gap-1">
              <span className="font-serif text-sm text-orange-400">Choose file…</span>
              <span className="font-serif text-xs text-neutral-500">PNG or JPG, up to 5MB.</span>
            </div>
            <input type="file" accept="image/*" onChange={handleImageChange} className="hidden" />
          </label>
        </div>

        <div>
          <FieldLabel required>Title</FieldLabel>
          <TextField value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Canvas Tote — Olive" />
        </div>

        <div>
          <FieldLabel required>Description</FieldLabel>
          <TextArea rows={3} value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Short description of the product…" />
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div>
            <FieldLabel required>Category</FieldLabel>
            <TextField value={category} onChange={(e) => setCategory(e.target.value)} placeholder="Bags" />
          </div>
          <div>
            <FieldLabel>Brand</FieldLabel>
            <TextField value={brand} onChange={(e) => setBrand(e.target.value)} placeholder="Ledger Goods" />
          </div>
        </div>

        <div className="grid grid-cols-3 gap-3">
          <div>
            <FieldLabel required>Price ($)</FieldLabel>
            <TextField type="number" min="0" step="0.01" value={price} onChange={(e) => setPrice(e.target.value)} placeholder="30" />
          </div>
          <div>
            <FieldLabel>Stock</FieldLabel>
            <TextField type="number" min="0" value={stock} onChange={(e) => setStock(e.target.value)} placeholder="86" />
          </div>
          <div>
            <FieldLabel>Discount (%)</FieldLabel>
            <TextField type="number" min="0" max="100" value={discount} onChange={(e) => setDiscount(e.target.value)} placeholder="0" />
          </div>
        </div>

        {/* Featured toggle */}
        <div className="flex items-center justify-between gap-4 px-3 py-2.5 rounded-lg border border-white/10 bg-white/[0.03]">
          <div className="flex items-center gap-2">
            <Star size={14} color="#FBBF6B" />
            <div>
              <p className="text-sm font-serif text-white">Featured product</p>
              <p className="text-xs font-serif text-neutral-500">Show this product in featured collections.</p>
            </div>
          </div>
          <button
            type="button"
            onClick={() => setFeatured(!featured)}
            className="relative w-11 h-6 rounded-full transition-colors flex-shrink-0"
            style={{ background: featured ? "#F97316" : "rgba(255,255,255,0.12)" }}
          >
            <span
              className="absolute top-0.5 w-5 h-5 rounded-full bg-white transition-all"
              style={{ left: featured ? "22px" : "2px" }}
            />
          </button>
        </div>

        {/* Specifications */}
        <div>
          <div className="flex items-center justify-between mb-1.5">
            <FieldLabel>Specifications</FieldLabel>
            <button type="button" onClick={addSpecRow} className="text-xs font-serif text-orange-400 hover:text-orange-300 flex items-center gap-1">
              <Plus size={12} /> Add spec
            </button>
          </div>
          <div className="flex flex-col gap-2">
            {specs.map((s, i) => (
              <div key={i} className="flex items-center gap-2">
                <div className="flex items-center gap-1.5 flex-1 px-2.5 py-2 rounded-lg border border-white/10 bg-white/[0.04]">
                  <Tag size={12} color="#737373" />
                  <input
                    value={s.key}
                    onChange={(e) => updateSpec(i, "key", e.target.value)}
                    placeholder="Material"
                    className="bg-transparent outline-none text-xs font-serif text-white placeholder:text-neutral-600 w-full"
                  />
                </div>
                <input
                  value={s.value}
                  onChange={(e) => updateSpec(i, "value", e.target.value)}
                  placeholder="100% cotton canvas"
                  className="flex-1 px-2.5 py-2 rounded-lg border border-white/10 bg-white/[0.04] outline-none text-xs font-serif text-white placeholder:text-neutral-600"
                />
                {specs.length > 1 && (
                  <button type="button" onClick={() => removeSpecRow(i)} className="p-1.5 text-neutral-500 hover:text-red-400 transition-colors">
                    <Trash2 size={14} />
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="flex items-center gap-3 mt-2">
          <PrimaryButton type="submit" disabled={submitting} className="justify-center flex-1">
            {submitting ? (
              <>
                <Loader2 size={16} className="animate-spin" /> Saving…
              </>
            ) : editing ? (
              "Save changes"
            ) : (
              "Add product"
            )}
          </PrimaryButton>
          <SecondaryButton onClick={onClose}>Cancel</SecondaryButton>
        </div>
      </form>
    </Modal>
  );
}
