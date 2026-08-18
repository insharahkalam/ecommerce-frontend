import React, { useState, useMemo } from "react";
import { useOutletContext } from "react-router-dom";
import { Mail, Phone, Trash2, Plus } from "lucide-react";
import GlassCard from "../../components/GlassCard";
import SearchInput from "../../components/SearchInput";
import PrimaryButton from "../../components/PrimaryButton";
import Modal from "../../components/Modal";
import { FieldLabel, TextField } from "../../components/FormFields";

export default function Customers() {
  const { customers, setCustomers, orders } = useOutletContext();
  const [query, setQuery] = useState("");
  const [form, setForm] = useState({ name: "", email: "", phone: "" });

  const mergedCustomers = useMemo(() => {
    return customers.map((c) => {
      const customerOrders = orders.filter(
        (o) => o.email?.toLowerCase() === c.email?.toLowerCase()
      );

      const spent = customerOrders.reduce((sum, o) => sum + (o.total || 0), 0);

      const phone = customerOrders[0]?.shippingAddress?.phone || "—";

      return {
        ...c,
        orders: customerOrders.length,
        spent,
        phone,
      };
    });
  }, [customers, orders]);

  const filtered = mergedCustomers.filter(
    (c) =>
      c.name.toLowerCase().includes(query.toLowerCase()) ||
      c.email.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <>
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div>
          <h1 className="font-display italic text-2xl font-semibold tracking-tight text-text">Customers</h1>
          <p className="text-sm mt-1 text-text-muted font-serif">{customers.length} customers</p>
        </div>
      </div>

      <SearchInput value={query} onChange={setQuery} placeholder="Search name or email…" />

      <GlassCard>
        <div className="p-5">
          <div className="overflow-x-auto scrollbar-thin">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-left text-text-muted">
                  <th className="py-2 font-serif text-xs uppercase tracking-wide">Customers</th>
                  <th className="py-2 font-serif text-xs uppercase tracking-wide">Contact</th>
                  <th className="py-2 font-serif text-xs uppercase tracking-wide">Orders</th>
                  <th className="py-2 font-serif text-xs uppercase tracking-wide">Spent</th>
                  <th className="py-2 font-serif text-xs uppercase tracking-wide">Joined</th>
                  <th className="py-2"></th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((c) => (
                  <tr key={c.id} className="border-t border-border">
                    <td className="py-3">
                      <div className="flex items-center gap-2.5">
                        <div className="w-8 h-8 rounded-full flex items-center justify-center font-display text-xs font-semibold bg-gradient-to-br from-orange-500 to-orange-600 text-white flex-shrink-0">
                          {c.name.split(" ").map((n) => n[0]).join("").slice(0, 2)}
                        </div>
                        <div>
                          <p className="font-serif text-text">{c.name}</p>
                          <p className="font-mono text-xs text-text-muted">{c.id}</p>
                        </div>
                      </div>
                    </td>
                    <td className="py-3">
                      <div className="flex flex-col gap-1 text-text-muted font-serif text-xs">
                        <div className="flex items-center gap-1.5">
                          <Mail size={12} /> {c.email}
                        </div>
                        <div className="flex items-center gap-1.5">
                          <Phone size={12} /> {c.phone}
                        </div>
                      </div>
                    </td>
                    <td className="py-3 font-mono text-text-muted">{c.orders}</td>
                    <td className="py-3 font-mono text-text">Rs {c.spent.toFixed(0)}</td>
                    <td className="py-3 font-mono text-text-muted">{c.joined}</td>
                  </tr>
                ))}
                {filtered.length === 0 && (
                  <tr><td colSpan={6} className="py-8 text-center text-text-muted font-serif text-sm">No customers match your search.</td></tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </GlassCard>


    </>
  );
}