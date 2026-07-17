import React, { useState } from "react";
import { useOutletContext } from "react-router-dom";
import { Mail, Phone, Trash2, Plus } from "lucide-react";
import GlassCard from "../../components/GlassCard";
import SearchInput from "../../components/SearchInput";
import PrimaryButton from "../../components/PrimaryButton";
import Modal from "../../components/Modal";
import { FieldLabel, TextField } from "../../components/FormFields";

export default function Customers() {
  const { customers, setCustomers } = useOutletContext();
  const [query, setQuery] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", phone: "" });

  const filtered = customers.filter(
    (c) => c.name.toLowerCase().includes(query.toLowerCase()) || c.email.toLowerCase().includes(query.toLowerCase())
  );

  function addCustomer() {
    if (!form.name.trim() || !form.email.trim()) return;
    const id = `CUS-${String(customers.length + 1).padStart(3, "0")}`;
    setCustomers((prev) => [
      { id, name: form.name, email: form.email, phone: form.phone, orders: 0, spent: 0, joined: "Jul 2026" },
      ...prev,
    ]);
    setForm({ name: "", email: "", phone: "" });
    setShowModal(false);
  }

  function removeCustomer(id) {
    setCustomers((prev) => prev.filter((c) => c.id !== id));
  }

  return (
    <>
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div>
          <h1 className="font-display italic text-2xl font-semibold tracking-tight text-white">Customers</h1>
          <p className="text-sm mt-1 text-neutral-400 font-serif">{customers.length} customers</p>
        </div>
        <PrimaryButton onClick={() => setShowModal(true)}><Plus size={16} /> Add customer</PrimaryButton>
      </div>

      <SearchInput value={query} onChange={setQuery} placeholder="Search name or email…" />

      <GlassCard>
        <div className="p-5">
          <div className="overflow-x-auto scrollbar-thin">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-left text-neutral-500">
                  <th className="py-2 font-serif text-xs uppercase tracking-wide">Customer</th>
                  <th className="py-2 font-serif text-xs uppercase tracking-wide">Contact</th>
                  <th className="py-2 font-serif text-xs uppercase tracking-wide">Orders</th>
                  <th className="py-2 font-serif text-xs uppercase tracking-wide">Spent</th>
                  <th className="py-2 font-serif text-xs uppercase tracking-wide">Joined</th>
                  <th className="py-2"></th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((c) => (
                  <tr key={c.id} className="border-t border-white/10">
                    <td className="py-3">
                      <div className="flex items-center gap-2.5">
                        <div className="w-8 h-8 rounded-full flex items-center justify-center font-display text-xs font-semibold bg-gradient-to-br from-orange-500 to-orange-600 text-white flex-shrink-0">
                          {c.name.split(" ").map((n) => n[0]).join("").slice(0, 2)}
                        </div>
                        <div>
                          <p className="font-serif text-white">{c.name}</p>
                          <p className="font-mono text-xs text-neutral-500">{c.id}</p>
                        </div>
                      </div>
                    </td>
                    <td className="py-3">
                      <div className="flex items-center gap-1.5 text-neutral-400 font-serif text-xs">
                        <Mail size={12} /> {c.email}
                      </div>
                      {c.phone && (
                        <div className="flex items-center gap-1.5 text-neutral-500 font-mono text-xs mt-0.5">
                          <Phone size={12} /> {c.phone}
                        </div>
                      )}
                    </td>
                    <td className="py-3 font-mono text-neutral-300">{c.orders}</td>
                    <td className="py-3 font-mono text-white">${c.spent.toFixed(2)}</td>
                    <td className="py-3 font-mono text-neutral-500">{c.joined}</td>
                    <td className="py-3 text-right">
                      <button onClick={() => removeCustomer(c.id)} className="p-1.5 rounded-md hover:bg-white/5 text-neutral-400 hover:text-red-400 transition-colors">
                        <Trash2 size={14} />
                      </button>
                    </td>
                  </tr>
                ))}
                {filtered.length === 0 && (
                  <tr><td colSpan={6} className="py-8 text-center text-neutral-500 font-serif text-sm">No customers match your search.</td></tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </GlassCard>

      {showModal && (
        <Modal title="Add customer" onClose={() => setShowModal(false)}>
          <div className="flex flex-col gap-4">
            <div>
              <FieldLabel>Name</FieldLabel>
              <TextField value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="Ayesha Khan" />
            </div>
            <div>
              <FieldLabel>Email</FieldLabel>
              <TextField type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} placeholder="ayesha.khan@mail.com" />
            </div>
            <div>
              <FieldLabel>Phone</FieldLabel>
              <TextField value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} placeholder="+92 300 1234567" />
            </div>
            <PrimaryButton onClick={addCustomer} className="justify-center mt-2">Add customer</PrimaryButton>
          </div>
        </Modal>
      )}
    </>
  );
}
