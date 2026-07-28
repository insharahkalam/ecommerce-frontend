import React, { useState, useMemo, useRef, useEffect } from "react";
import { createPortal } from "react-dom";
import { useOutletContext } from "react-router-dom";
import { Filter, MoreHorizontal, Check, Trash2, Eye, X, ImageOff } from "lucide-react";
import GlassCard from "../../components/GlassCard";
import Pill from "../../components/Pill";
import SearchInput from "../../components/SearchInput";
import Modal from "../../components/Modal";
import { statusStyle, paymentStatusStyle } from "../../utils/badgeStyles";
import { ORDER_STATUSES, ORDERS_API_URL } from "../../data/mockData";
import api from "../../config/axios";

const PAYMENT_STATUSES = ["Pending", "Paid", "Failed"];

export default function Order() {
  const { orders, setOrders } = useOutletContext();
  const [query, setQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [openMenuId, setOpenMenuId] = useState(null);
  const [menuPos, setMenuPos] = useState({ top: 0, left: 0 });
  const [viewingOrder, setViewingOrder] = useState(null);
  const [receiptZoom, setReceiptZoom] = useState(false);
  const [toast, setToast] = useState(null);

  const menuRef = useRef(null);
  const btnRefs = useRef({});

  function showToast(message, type = "success") {
    setToast({ message, type });
    setTimeout(() => setToast(null), 2500);
  }

  const filtered = useMemo(() => {
    return orders.filter((o) => {
      const matchesQuery =
        o.id.toLowerCase().includes(query.toLowerCase()) ||
        o.customer.toLowerCase().includes(query.toLowerCase());
      const matchesStatus = statusFilter === "All" || o.status === statusFilter;
      return matchesQuery && matchesStatus;
    });
  }, [orders, query, statusFilter]);

  // Menu button ki actual position nikal kar dropdown ko portal me fixed render karte hain,
  // isse table ke overflow-x-auto wrapper me dropdown clip/overlap nahi hota (wahi wajah thi
  // jis se badges "upar-neeche" ajeeb tarah se dikh rahe thay).
  function toggleMenu(id) {
    if (openMenuId === id) {
      setOpenMenuId(null);
      return;
    }
    const btn = btnRefs.current[id];
    if (btn) {
      const rect = btn.getBoundingClientRect();
      setMenuPos({ top: rect.bottom + 6, left: rect.right - 208 }); // 208 = menu width (w-52)
    }
    setOpenMenuId(id);
  }

  // Bahar click / scroll karne par menu band ho jaye
  useEffect(() => {
    if (!openMenuId) return;
    function handleOutside(e) {
      if (menuRef.current && !menuRef.current.contains(e.target) && !btnRefs.current[openMenuId]?.contains(e.target)) {
        setOpenMenuId(null);
      }
    }
    function handleScroll() {
      setOpenMenuId(null);
    }
    document.addEventListener("mousedown", handleOutside);
    window.addEventListener("scroll", handleScroll, true);
    return () => {
      document.removeEventListener("mousedown", handleOutside);
      window.removeEventListener("scroll", handleScroll, true);
    };
  }, [openMenuId]);

  async function updateStatus(id, status) {
    const prev = orders;
    setOrders((p) => p.map((o) => (o.id === id ? { ...o, status } : o)));
    setOpenMenuId(null);
    try {
      await api.put(`${ORDERS_API_URL}/update-status/${id}`, { status });
      showToast(`Order marked ${status}.`);
    } catch (err) {
      setOrders(prev);
      showToast("Could not update order — server unreachable.", "error");
    }
  }

  async function updatePaymentStatus(id, paymentStatus) {
    const prev = orders;
    setOrders((p) => p.map((o) => (o.id === id ? { ...o, paymentStatus } : o)));
    setOpenMenuId(null);
    try {
      await api.put(`${ORDERS_API_URL}/update-status/${id}`, { paymentStatus });
      showToast(`Payment marked ${paymentStatus}.`);
    } catch (err) {
      setOrders(prev);
      showToast("Could not update payment — server unreachable.", "error");
    }
  }

  async function removeOrder(id) {
    const prev = orders;
    setOrders((p) => p.filter((o) => o.id !== id));
    setOpenMenuId(null);
    try {
      await api.delete(`${ORDERS_API_URL}/delete-order/${id}`);
      showToast("Order deleted.");
    } catch (err) {
      setOrders(prev);
      showToast("Could not delete — server unreachable.", "error");
    }
  }

  return (
    <>
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div>
          <h1 className="font-display italic text-2xl font-semibold tracking-tight text-white">Orders</h1>
          <p className="text-sm mt-1 text-neutral-400 font-serif">{orders.length} total orders</p>
        </div>
      </div>

      <div className="flex items-center gap-3 flex-wrap">
        <SearchInput value={query} onChange={setQuery} placeholder="Search order ID or customer…" />
        <div className="flex items-center gap-2 flex-wrap">
          <Filter size={14} color="#A3A3A3" />
          {["All", ...ORDER_STATUSES].map((s) => (
            <button
              key={s}
              onClick={() => setStatusFilter(s)}
              className="px-3 py-1.5 rounded-lg text-xs font-serif border transition-colors"
              style={{
                background: statusFilter === s ? "rgba(249,115,22,0.14)" : "transparent",
                color: statusFilter === s ? "#FB923C" : "#A3A3A3",
                borderColor: statusFilter === s ? "rgba(249,115,22,0.3)" : "rgba(255,255,255,0.1)",
              }}
            >
              {s}
            </button>
          ))}
        </div>
      </div>

      <GlassCard>
        <div className="p-5">
          <div className="overflow-x-auto scrollbar-thin">
            <table className="w-full text-sm border-separate" style={{ borderSpacing: "0 2px" }}>
              <thead>
                <tr className="text-left text-neutral-500">
                  <th className="py-2 font-serif text-xs uppercase tracking-wide">Order</th>
                  <th className="py-2 font-serif text-xs uppercase tracking-wide">Customer</th>
                  <th className="py-2 font-serif text-xs uppercase tracking-wide">Items</th>
                  <th className="py-2 font-serif text-xs uppercase tracking-wide">Total</th>
                  <th className="py-2 font-serif text-xs uppercase tracking-wide">Payment</th>
                  <th className="py-2 font-serif text-xs uppercase tracking-wide">Status</th>
                  <th className="py-2 font-serif text-xs uppercase tracking-wide">Date</th>
                  <th className="py-2"></th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((o) => {
                  const s = statusStyle(o.status);
                  const ps = paymentStatusStyle(o.paymentStatus);
                  return (
                    <tr key={o.id} className="border-t border-white/10 align-middle">
                      <td className="py-3 align-middle font-mono text-white whitespace-nowrap">
                        <button onClick={() => setViewingOrder(o)} className="flex items-center gap-1.5 hover:text-orange-400 transition-colors">
                          <Eye size={12} /> {o.id.slice(-8)}
                        </button>
                      </td>
                      <td className="py-3 align-middle font-serif text-white whitespace-nowrap">{o.customer}</td>
                      <td className="py-3 align-middle font-mono text-neutral-400">{o.items}</td>
                      <td className="py-3 align-middle font-mono text-white whitespace-nowrap">${o.total.toFixed(2)}</td>
                      <td className="py-3 align-middle">
                        <div className="flex items-center gap-2 whitespace-nowrap">
                          <span className="font-serif text-xs text-neutral-400">{o.paymentMethod}</span>
                          <Pill color={ps.color} bg={ps.bg} border={ps.border}>{o.paymentStatus}</Pill>
                        </div>
                      </td>
                      <td className="py-3 align-middle whitespace-nowrap">
                        <Pill color={s.color} bg={s.bg} border={s.border}>{o.status}</Pill>
                      </td>
                      <td className="py-3 align-middle font-mono text-neutral-500 whitespace-nowrap">{o.date}</td>
                      <td className="py-3 align-middle text-right">
                        <button
                          ref={(el) => (btnRefs.current[o.id] = el)}
                          onClick={() => toggleMenu(o.id)}
                          className="p-1 rounded hover:bg-white/5 transition-colors"
                        >
                          <MoreHorizontal size={16} color="#A3A3A3" />
                        </button>
                      </td>
                    </tr>
                  );
                })}
                {filtered.length === 0 && (
                  <tr><td colSpan={8} className="py-8 text-center text-neutral-500 font-serif text-sm">No orders match your search.</td></tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </GlassCard>

      {/* Dropdown menu — portal se render hota hai isliye table scroll/overflow me clip nahi hota */}
      {openMenuId &&
        createPortal(
          <div
            ref={menuRef}
            className="fixed z-[999] w-52 rounded-lg border border-white/10 bg-neutral-900 shadow-xl overflow-hidden"
            style={{ top: menuPos.top, left: Math.max(menuPos.left, 8) }}
          >
            <p className="px-3 pt-2 pb-1 text-[10px] font-serif uppercase tracking-wide text-neutral-600">Order status</p>
            {ORDER_STATUSES.map((s2) => {
              const o = orders.find((x) => x.id === openMenuId);
              return (
                <button
                  key={s2}
                  onClick={() => updateStatus(openMenuId, s2)}
                  className="w-full text-left px-3 py-2 text-xs font-serif text-neutral-300 hover:bg-white/5 flex items-center justify-between"
                >
                  Mark {s2}
                  {o?.status === s2 && <Check size={12} color="#FB923C" />}
                </button>
              );
            })}
            <p className="px-3 pt-2 pb-1 text-[10px] font-serif uppercase tracking-wide text-neutral-600 border-t border-white/10">Payment status</p>
            {PAYMENT_STATUSES.map((p2) => {
              const o = orders.find((x) => x.id === openMenuId);
              return (
                <button
                  key={p2}
                  onClick={() => updatePaymentStatus(openMenuId, p2)}
                  className="w-full text-left px-3 py-2 text-xs font-serif text-neutral-300 hover:bg-white/5 flex items-center justify-between"
                >
                  Mark {p2}
                  {o?.paymentStatus === p2 && <Check size={12} color="#FB923C" />}
                </button>
              );
            })}
            <button
              onClick={() => removeOrder(openMenuId)}
              className="w-full text-left px-3 py-2 text-xs font-serif text-red-400 hover:bg-white/5 flex items-center gap-1.5 border-t border-white/10"
            >
              <Trash2 size={12} /> Delete order
            </button>
          </div>,
          document.body
        )}

      {viewingOrder && (
        <Modal
          title={`Order #${viewingOrder.id.slice(-8)}`}
          onClose={() => {
            setViewingOrder(null);
            setReceiptZoom(false);
          }}
        >
          <div className="flex flex-col gap-4">
            <div>
              <p className="text-xs font-serif uppercase tracking-wide text-neutral-500 mb-1.5">Items</p>
              <div className="flex flex-col gap-2">
                {viewingOrder.rawItems.map((item, i) => (
                  <div key={i} className="flex items-center justify-between px-3 py-2 rounded-lg border border-white/10 bg-white/[0.03]">
                    <div className="flex items-center gap-2">
                      {item.image && <img src={item.image} alt={item.title} className="w-8 h-8 rounded-md object-cover" />}
                      <div>
                        <p className="text-sm font-serif text-white">{item.title}</p>
                        <p className="text-xs font-mono text-neutral-500">Qty {item.quantity} · ${item.price.toFixed(2)}</p>
                      </div>
                    </div>
                    <span className="font-mono text-sm text-white">${(item.price * item.quantity).toFixed(2)}</span>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <p className="text-xs font-serif uppercase tracking-wide text-neutral-500 mb-1.5">Shipping address</p>
              <div className="px-3 py-2.5 rounded-lg border border-white/10 bg-white/[0.03] text-sm font-serif text-neutral-300">
                <p className="text-white">{viewingOrder.shippingAddress.fullName}</p>
                <p>{viewingOrder.shippingAddress.phone}</p>
                <p>{viewingOrder.shippingAddress.address}, {viewingOrder.shippingAddress.city}</p>
              </div>
            </div>

            <div>
              <p className="text-xs font-serif uppercase tracking-wide text-neutral-500 mb-1.5">Payment</p>
              <div className="px-3 py-2.5 rounded-lg border border-white/10 bg-white/[0.03] text-sm font-serif text-neutral-300 flex flex-col gap-1">
                <div className="flex items-center gap-2">
                  <span>Method:</span> <span className="text-white">{viewingOrder.paymentMethod}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span>Status:</span>
                  {(() => {
                    const ps = paymentStatusStyle(viewingOrder.paymentStatus);
                    return <Pill color={ps.color} bg={ps.bg} border={ps.border}>{viewingOrder.paymentStatus}</Pill>;
                  })()}
                </div>

                {viewingOrder.bankTransferDetails?.transactionId && (
                  <>
                    <p>Transaction ID: <span className="text-white font-mono">{viewingOrder.bankTransferDetails.transactionId}</span></p>
                    {viewingOrder.bankTransferDetails.bankName && (
                      <p>Bank: <span className="text-white">{viewingOrder.bankTransferDetails.bankName}</span></p>
                    )}
                    {viewingOrder.bankTransferDetails.accountTitle && (
                      <p>Account Title: <span className="text-white">{viewingOrder.bankTransferDetails.accountTitle}</span></p>
                    )}
                    {viewingOrder.bankTransferDetails.accountNumber && (
                      <p>Account No: <span className="text-white font-mono">{viewingOrder.bankTransferDetails.accountNumber}</span></p>
                    )}
                  </>
                )}
              </div>
            </div>

            {/* Payment receipt — admin yahan se verify karega */}
            {viewingOrder.paymentMethod === "Bank Transfer" && (
              <div>
                <p className="text-xs font-serif uppercase tracking-wide text-neutral-500 mb-1.5">Payment receipt</p>
                {viewingOrder.bankTransferDetails?.receiptImage ? (
                  <>
                    <button
                      type="button"
                      onClick={() => setReceiptZoom(true)}
                      className="block w-full rounded-lg overflow-hidden border border-white/10 hover:border-orange-500/40 transition-colors"
                    >
                      <img
                        src={viewingOrder.bankTransferDetails.receiptImage}
                        alt="Payment receipt"
                        className="w-full max-h-64 object-contain bg-black/30"
                      />
                    </button>
                    <p className="text-[11px] font-serif text-neutral-600 mt-1">Click the receipt to view full size.</p>

                    {viewingOrder.paymentStatus === "Pending" && (
                      <div className="flex gap-2 mt-3">
                        <button
                          onClick={() => updatePaymentStatus(viewingOrder.id, "Paid")}
                          className="flex-1 px-3 py-2 rounded-lg text-xs font-serif border border-green-500/30 bg-green-500/10 text-green-300 hover:bg-green-500/15 transition-colors flex items-center justify-center gap-1.5"
                        >
                          <Check size={12} /> Verify & mark Paid
                        </button>
                        <button
                          onClick={() => updatePaymentStatus(viewingOrder.id, "Failed")}
                          className="flex-1 px-3 py-2 rounded-lg text-xs font-serif border border-red-500/30 bg-red-500/10 text-red-300 hover:bg-red-500/15 transition-colors flex items-center justify-center gap-1.5"
                        >
                          <X size={12} /> Reject
                        </button>
                      </div>
                    )}
                  </>
                ) : (
                  <div className="flex items-center gap-2 px-3 py-4 rounded-lg border border-dashed border-white/10 text-neutral-500 text-xs font-serif justify-center">
                    <ImageOff size={14} /> No receipt uploaded
                  </div>
                )}
              </div>
            )}

            <div className="flex items-center justify-between px-3 py-2.5 rounded-lg border border-orange-500/25 bg-orange-500/10">
              <span className="text-sm font-serif text-orange-300">Total</span>
              <span className="font-mono text-lg text-white">${viewingOrder.total.toFixed(2)}</span>
            </div>
          </div>
        </Modal>
      )}

      {/* Receipt full-size lightbox */}
      {receiptZoom &&
        viewingOrder?.bankTransferDetails?.receiptImage &&
        createPortal(
          <div
            className="fixed inset-0 z-[9999] bg-black/85 flex items-center justify-center p-6"
            onClick={() => setReceiptZoom(false)}
          >
            <button
              onClick={() => setReceiptZoom(false)}
              className="absolute top-5 right-5 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
            >
              <X size={18} />
            </button>
            <img
              src={viewingOrder.bankTransferDetails.receiptImage}
              alt="Payment receipt full size"
              className="max-w-full max-h-full rounded-lg object-contain"
              onClick={(e) => e.stopPropagation()}
            />
          </div>,
          document.body
        )}

      {toast && (
        <div className="fixed top-5 right-5 z-[999]">
          <div
            className={`flex items-center gap-2 px-4 py-3 rounded-lg border shadow-xl shadow-black/40 text-sm font-serif backdrop-blur-xl ${toast.type === "error"
              ? "border-red-500/25 bg-red-500/10 text-red-300"
              : "border-orange-500/25 bg-orange-500/10 text-orange-300"
              }`}
          >
            {toast.type === "error" ? <X size={16} /> : <Check size={16} />}
            <span>{toast.message}</span>
          </div>
        </div>
      )}
    </>
  );
}