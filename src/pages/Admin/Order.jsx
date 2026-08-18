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
const MENU_WIDTH = 224; // w-56

const formatPKR = (amount) =>
  `Rs. ${Number(amount).toLocaleString("en-PK", {
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  })}`;

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
    const q = query.trim().toLowerCase();
    return orders.filter((o) => {
      const matchesQuery =
        !q || o.id.toLowerCase().includes(q) || o.customer.toLowerCase().includes(q);
      const matchesStatus = statusFilter === "All" || o.status === statusFilter;
      return matchesQuery && matchesStatus;
    });
  }, [orders, query, statusFilter]);

  function toggleMenu(id) {
    if (openMenuId === id) return setOpenMenuId(null);
    const btn = btnRefs.current[id];
    if (btn) {
      const rect = btn.getBoundingClientRect();
      const left = Math.min(
        Math.max(rect.right - MENU_WIDTH, 8),
        window.innerWidth - MENU_WIDTH - 8
      );
      const top =
        rect.bottom + 340 > window.innerHeight ? Math.max(rect.top - 340, 8) : rect.bottom + 6;
      setMenuPos({ top, left });
    }
    setOpenMenuId(id);
  }

  useEffect(() => {
    if (!openMenuId) return;
    function handleOutside(e) {
      if (
        menuRef.current &&
        !menuRef.current.contains(e.target) &&
        !btnRefs.current[openMenuId]?.contains(e.target)
      ) {
        setOpenMenuId(null);
      }
    }
    const close = () => setOpenMenuId(null);
    document.addEventListener("mousedown", handleOutside);
    window.addEventListener("scroll", close, true);
    window.addEventListener("resize", close);
    return () => {
      document.removeEventListener("mousedown", handleOutside);
      window.removeEventListener("scroll", close, true);
      window.removeEventListener("resize", close);
    };
  }, [openMenuId]);

  useEffect(() => {
    if (viewingOrder) {
      const updated = orders.find((o) => o.id === viewingOrder.id);
      if (updated) setViewingOrder(updated);
    }
  }, [orders]);

  async function updateStatus(id, status) {
    if (status === "Cancelled") {
      const confirmed = window.confirm(
        "Cancelling this order will automatically restore the stock for its items. Continue?"
      );
      if (!confirmed) {
        setOpenMenuId(null);
        return;
      }
    }

    const prev = orders;
    setOrders((p) => p.map((o) => (o.id === id ? { ...o, status } : o)));
    setOpenMenuId(null);
    try {
      await api.put(`${ORDERS_API_URL}/update-status/${id}`, { status });
      showToast(
        status === "Cancelled" ? "Order cancelled — stock restored." : `Order marked ${status}.`
      );
    } catch {
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
    } catch {
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
    } catch {
      setOrders(prev);
      showToast("Could not delete — server unreachable.", "error");
    }
  }

  const th = "py-3 px-4 text-[11px] font-medium uppercase tracking-wider text-[var(--color-text-muted)]";
  const td = "py-3.5 px-4 align-middle";

  return (
    <div className="flex flex-col gap-5">
      {/* Header */}
      <header className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-4 sm:flex sm:justify-between">
        <div className="min-w-0">
          <h1 className="truncate text-xl font-semibold tracking-tight text-[var(--color-text)] sm:text-2xl">
            Orders
          </h1>
          <p className="mt-1 text-sm text-[var(--color-text-muted)]">
            {orders.length} total · {filtered.length} shown
          </p>
        </div>
      </header>

      {/* Toolbar */}
      <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
        <div className="w-full lg:max-w-sm">
          <SearchInput value={query} onChange={setQuery} placeholder="Search order ID or customer…" />
        </div>
        <div className="-mx-1 flex items-center gap-2 overflow-x-auto px-1 pb-1 lg:overflow-visible lg:pb-0">
          <Filter size={14} className="shrink-0 text-[var(--color-text-muted)]" />
          {["All", ...ORDER_STATUSES].map((s) => {
            const active = statusFilter === s;
            return (
              <button
                key={s}
                onClick={() => setStatusFilter(s)}
                className={`shrink-0 rounded-full border px-3 py-1.5 text-xs font-medium transition-colors ${active
                  ? "border-orange-500/30 bg-orange-500/15 text-orange-500 dark:text-orange-300"
                  : "border-[var(--color-border)] text-[var(--color-text-muted)] hover:border-orange-500/20 hover:text-[var(--color-text)]"
                  }`}
              >
                {s}
              </button>
            );
          })}
        </div>
      </div>

      {/* Mobile cards */}
      <div className="flex flex-col gap-3 lg:hidden">
        {filtered.map((o) => {
          const s = statusStyle(o.status);
          const ps = paymentStatusStyle(o.paymentStatus);
          return (
            <GlassCard key={o.id}>
              <div className="flex flex-col gap-3 p-4">
                <div className="grid grid-cols-[minmax(0,1fr)_auto] items-start gap-3">
                  <div className="min-w-0">
                    <button
                      onClick={() => setViewingOrder(o)}
                      className="flex items-center gap-1.5 font-mono text-sm text-[var(--color-text)] transition-colors hover:text-orange-500 dark:hover:text-orange-400"
                    >
                      <Eye size={13} className="shrink-0" /> #{o.id.slice(-8)}
                    </button>
                    <p className="mt-1 truncate text-sm text-[var(--color-text)]/80">{o.customer}</p>
                    <p className="mt-0.5 font-mono text-xs text-[var(--color-text-muted)]">{o.date}</p>
                  </div>
                  <button
                    ref={(el) => (btnRefs.current[o.id] = el)}
                    onClick={() => toggleMenu(o.id)}
                    className="shrink-0 rounded-md p-1.5 text-[var(--color-text-muted)] transition-colors hover:bg-[var(--color-hover)] hover:text-[var(--color-text)]"
                    aria-label="Order actions"
                  >
                    <MoreHorizontal size={16} />
                  </button>
                </div>
                <div className="flex flex-wrap items-center gap-2">
                  <Pill color={s.color} bg={s.bg} border={s.border}>{o.status}</Pill>
                  <Pill color={ps.color} bg={ps.bg} border={ps.border}>{o.paymentStatus}</Pill>
                  <span className="text-xs text-[var(--color-text-muted)]">{o.paymentMethod}</span>
                </div>
                <div className="flex items-center justify-between border-t border-[var(--color-border)] pt-3">
                  <span className="font-mono text-xs text-[var(--color-text-muted)]">{o.items} items</span>
                  <span className="font-mono text-base text-[var(--color-text)]">{formatPKR(o.total)}</span>
                </div>
              </div>
            </GlassCard>
          );
        })}
        {filtered.length === 0 && (
          <GlassCard>
            <p className="py-10 text-center text-sm text-[var(--color-text-muted)]">No orders match your search.</p>
          </GlassCard>
        )}
      </div>

      {/* Desktop table */}
      <div className="hidden lg:block">
        <GlassCard>
          <div className="overflow-x-auto">
            <table className="w-full min-w-[900px] text-sm">
              <thead>
                <tr className="border-b border-[var(--color-border)] text-left">
                  <th className={th}>Order</th>
                  <th className={th}>Customer</th>
                  <th className={th}>Items</th>
                  <th className={th}>Total</th>
                  <th className={th}>Payment</th>
                  <th className={th}>Status</th>
                  <th className={th}>Date</th>
                  <th className={`${th} text-right`}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((o) => {
                  const s = statusStyle(o.status);
                  const ps = paymentStatusStyle(o.paymentStatus);
                  return (
                    <tr
                      key={o.id}
                      className="border-b border-[var(--color-border)] transition-colors last:border-0 hover:bg-[var(--color-hover)]"
                    >
                      <td className={`${td} whitespace-nowrap font-mono text-[var(--color-text)]`}>
                        <button
                          onClick={() => setViewingOrder(o)}
                          className="flex items-center gap-1.5 transition-colors hover:text-orange-500 dark:hover:text-orange-400"
                        >
                          <Eye size={12} /> {o.id.slice(-8)}
                        </button>
                      </td>
                      <td className={`${td} max-w-[200px] truncate text-[var(--color-text)]/85`}>{o.customer}</td>
                      <td className={`${td} font-mono text-[var(--color-text-muted)]`}>{o.items}</td>
                      <td className={`${td} whitespace-nowrap font-mono text-[var(--color-text)]`}>
                        {formatPKR(o.total)}
                      </td>
                      <td className={td}>
                        <div className="flex items-center gap-2 whitespace-nowrap">
                          <span className="text-xs text-[var(--color-text-muted)]">{o.paymentMethod}</span>
                          <Pill color={ps.color} bg={ps.bg} border={ps.border}>{o.paymentStatus}</Pill>
                        </div>
                      </td>
                      <td className={`${td} whitespace-nowrap`}>
                        <Pill color={s.color} bg={s.bg} border={s.border}>{o.status}</Pill>
                      </td>
                      <td className={`${td} whitespace-nowrap font-mono text-xs text-[var(--color-text-muted)]`}>
                        {o.date}
                      </td>
                      <td className={`${td} text-right`}>
                        <button
                          ref={(el) => (btnRefs.current[o.id] = el)}
                          onClick={() => toggleMenu(o.id)}
                          className="rounded-md p-1.5 text-[var(--color-text-muted)] transition-colors hover:bg-[var(--color-hover)] hover:text-[var(--color-text)]"
                          aria-label="Order actions"
                        >
                          <MoreHorizontal size={16} />
                        </button>
                      </td>
                    </tr>
                  );
                })}
                {filtered.length === 0 && (
                  <tr>
                    <td colSpan={8} className="py-12 text-center text-sm text-[var(--color-text-muted)]">
                      No orders match your search.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </GlassCard>
      </div>

      {/* Action menu (portal so it never clips inside the scroll container) */}
      {openMenuId &&
        createPortal(
          <div
            ref={menuRef}
            className="fixed z-[999] w-56 overflow-hidden rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)]/95 shadow-2xl shadow-black/20 dark:shadow-black/50 backdrop-blur-xl"
            style={{ top: menuPos.top, left: menuPos.left }}
          >
            <p className="px-3 pt-2.5 pb-1 text-[10px] uppercase tracking-wider text-[var(--color-text-muted)]">
              Order status
            </p>
            {ORDER_STATUSES.map((s2) => {
              const o = orders.find((x) => x.id === openMenuId);
              return (
                <button
                  key={s2}
                  onClick={() => updateStatus(openMenuId, s2)}
                  className="flex w-full items-center justify-between px-3 py-2 text-left text-xs text-[var(--color-text)]/80 transition-colors hover:bg-[var(--color-hover)] hover:text-[var(--color-text)]"
                >
                  Mark {s2}
                  {o?.status === s2 && <Check size={12} className="text-orange-500 dark:text-orange-400" />}
                </button>
              );
            })}
            <p className="border-t border-[var(--color-border)] px-3 pt-2.5 pb-1 text-[10px] uppercase tracking-wider text-[var(--color-text-muted)]">
              Payment status
            </p>
            {PAYMENT_STATUSES.map((p2) => {
              const o = orders.find((x) => x.id === openMenuId);
              return (
                <button
                  key={p2}
                  onClick={() => updatePaymentStatus(openMenuId, p2)}
                  className="flex w-full items-center justify-between px-3 py-2 text-left text-xs text-[var(--color-text)]/80 transition-colors hover:bg-[var(--color-hover)] hover:text-[var(--color-text)]"
                >
                  Mark {p2}
                  {o?.paymentStatus === p2 && <Check size={12} className="text-orange-500 dark:text-orange-400" />}
                </button>
              );
            })}
            <button
              onClick={() => removeOrder(openMenuId)}
              className="flex w-full items-center gap-1.5 border-t border-[var(--color-border)] px-3 py-2.5 text-left text-xs text-[var(--color-danger)] transition-colors hover:bg-red-500/10"
            >
              <Trash2 size={12} /> Delete order
            </button>
          </div>,
          document.body
        )}

      {/* Detail modal */}
      {viewingOrder && (
        <Modal
          title={`Order #${viewingOrder.id.slice(-8)}`}
          onClose={() => {
            setViewingOrder(null);
            setReceiptZoom(false);
          }}
        >
          <div className="flex max-h-[75vh] flex-col gap-4">
            <section>
              <p className="mb-2 text-[11px] uppercase tracking-wider text-[var(--color-text-muted)]">Items</p>
              <div className="flex flex-col gap-2">
                {viewingOrder.rawItems.map((item, i) => (
                  <div
                    key={i}
                    className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-3 rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] px-3 py-2.5"
                  >
                    <div className="flex min-w-0 items-center gap-2.5">
                      {item.image && (
                        <img
                          src={item.image}
                          alt={item.title}
                          className="h-9 w-9 shrink-0 rounded-lg object-cover"
                        />
                      )}
                      <div className="min-w-0">
                        <p className="truncate text-sm text-[var(--color-text)]">{item.title}</p>
                        <p className="font-mono text-xs text-[var(--color-text-muted)]">
                          Qty {item.quantity} · {formatPKR(item.price)}
                        </p>
                      </div>
                    </div>
                    <span className="shrink-0 font-mono text-sm text-[var(--color-text)]">
                      {formatPKR(item.price * item.quantity)}
                    </span>
                  </div>
                ))}
              </div>
            </section>

            <section className="grid gap-4">
              <div>
                <p className="mb-2 text-[11px] font-serif uppercase tracking-wider text-[var(--color-text-muted)]">
                  Shipping address
                </p>
                <div className="rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] px-3 py-2.5 flex flex-col gap-1.5">
                  <p className="font-mono text-xs text-[var(--color-text-muted)]">
                    Name: <span className="text-[var(--color-text)]/85">{viewingOrder.shippingAddress.fullName}</span>
                  </p>
                  <p className="font-mono text-xs text-[var(--color-text-muted)]">
                    Contact: <span className="text-[var(--color-text)]/85">{viewingOrder.shippingAddress.phone}</span>
                  </p>
                  <p className="font-mono text-xs text-[var(--color-text-muted)] leading-relaxed">
                    Address: <span className="text-[var(--color-text)]/80 font-serif">{viewingOrder.shippingAddress.address}, {viewingOrder.shippingAddress.city}, {viewingOrder.shippingAddress.country}</span>
                  </p>
                </div>
              </div>

              <div>
                <p className="mb-2 text-[11px] uppercase tracking-wider text-[var(--color-text-muted)]">Payment</p>
                <div className="flex flex-col gap-1.5 rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] px-3 py-2.5 text-sm text-[var(--color-text)]/85">
                  <div className="flex flex-wrap items-center gap-2">
                    <span>Method:</span>
                    <span className="text-[var(--color-text)]">{viewingOrder.paymentMethod}</span>
                  </div>
                  <div className="flex flex-wrap items-center gap-2">
                    <span>Status:</span>
                    {(() => {
                      const ps = paymentStatusStyle(viewingOrder.paymentStatus);
                      return (
                        <Pill color={ps.color} bg={ps.bg} border={ps.border}>
                          {viewingOrder.paymentStatus}
                        </Pill>
                      );
                    })()}
                  </div>
                  {viewingOrder.transferDetails?.transactionId && (
                    <>
                      <p className="break-all">
                        Transaction ID:{" "}
                        <span className="font-mono text-[var(--color-text)]">
                          {viewingOrder.transferDetails.transactionId}
                        </span>
                      </p>
                      {viewingOrder.transferDetails.bankName && (
                        <p>Bank: <span className="text-[var(--color-text)]">{viewingOrder.transferDetails.bankName}</span></p>
                      )}
                      {viewingOrder.transferDetails.accountTitle && (
                        <p>Account Title: <span className="text-[var(--color-text)]">{viewingOrder.transferDetails.accountTitle}</span></p>
                      )}
                      {viewingOrder.transferDetails.accountNumber && (
                        <p className="break-all">
                          Account No:{" "}
                          <span className="font-mono text-[var(--color-text)]">
                            {viewingOrder.transferDetails.accountNumber}
                          </span>
                        </p>
                      )}
                    </>
                  )}
                </div>
              </div>
            </section>

            {(viewingOrder.paymentMethod === "Bank Transfer" ||
              viewingOrder.paymentMethod === "Easypaisa") && (
                <section>
                  <p className="mb-2 text-[11px] uppercase tracking-wider text-[var(--color-text-muted)]">
                    Payment receipt
                  </p>
                  {viewingOrder.transferDetails?.receiptImage ? (
                    <>
                      <button
                        type="button"
                        onClick={() => setReceiptZoom(true)}
                        className="block w-full overflow-hidden rounded-xl border border-[var(--color-border)] transition-colors hover:border-orange-500/40"
                      >
                        <img
                          src={viewingOrder.transferDetails.receiptImage}
                          alt="Payment receipt"
                          className="max-h-56 w-full bg-black/5 dark:bg-black/30 object-contain sm:max-h-72"
                        />
                      </button>
                      <p className="mt-1.5 text-[11px] text-[var(--color-text-muted)]">
                        Tap the receipt to view full size.
                      </p>
                      {viewingOrder.paymentStatus === "Pending" && (
                        <div className="mt-3 flex flex-col gap-2 sm:flex-row">
                          <button
                            onClick={() => updatePaymentStatus(viewingOrder.id, "Paid")}
                            className="flex flex-1 items-center justify-center gap-1.5 rounded-xl border border-green-500/30 bg-green-500/10 px-3 py-2.5 text-xs font-medium text-green-600 dark:text-green-300 transition-colors hover:bg-green-500/20"
                          >
                            <Check size={12} /> Verify & mark Paid
                          </button>
                          <button
                            onClick={() => updatePaymentStatus(viewingOrder.id, "Failed")}
                            className="flex flex-1 items-center justify-center gap-1.5 rounded-xl border border-red-500/30 bg-red-500/10 px-3 py-2.5 text-xs font-medium text-red-600 dark:text-red-300 transition-colors hover:bg-red-500/20"
                          >
                            <X size={12} /> Reject
                          </button>
                        </div>
                      )}
                    </>
                  ) : (
                    <div className="flex items-center justify-center gap-2 rounded-xl border border-dashed border-[var(--color-border)] px-3 py-6 text-xs text-[var(--color-text-muted)]">
                      <ImageOff size={14} /> No receipt uploaded
                    </div>
                  )}
                </section>
              )}

            <div className="flex items-center justify-between rounded-xl border border-orange-500/25 bg-orange-500/10 px-4 py-3">
              <span className="text-sm font-serif tracking-wide text-orange-600 dark:text-orange-300">Total Amount</span>
              <span className="font-serif text-xl font-semibold text-[var(--color-text)]">
                {formatPKR(viewingOrder.total)}
              </span>
            </div>
          </div>
        </Modal>
      )}

      {/* Receipt lightbox */}
      {receiptZoom &&
        viewingOrder?.transferDetails?.receiptImage &&
        createPortal(
          <div
            className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/90 p-4 sm:p-8"
            onClick={() => setReceiptZoom(false)}
          >
            <button
              onClick={() => setReceiptZoom(false)}
              className="absolute right-4 top-4 rounded-full bg-white/10 p-2 text-white transition-colors hover:bg-white/20"
              aria-label="Close"
            >
              <X size={18} />
            </button>
            <img
              src={viewingOrder.transferDetails.receiptImage}
              alt="Payment receipt full size"
              className="max-h-full max-w-full rounded-xl object-contain"
              onClick={(e) => e.stopPropagation()}
            />
          </div>,
          document.body
        )}

      {/* Toast */}
      {toast && (
        <div className="fixed inset-x-4 top-4 z-[999] sm:inset-x-auto sm:right-5 sm:top-5">
          <div
            className={`flex items-center gap-2 rounded-xl border px-4 py-3 text-sm shadow-xl shadow-black/20 dark:shadow-black/40 backdrop-blur-xl ${toast.type === "error"
              ? "border-red-500/25 bg-red-500/15 text-red-600 dark:text-red-300"
              : "border-green-500/25 bg-green-500/15 text-green-600 dark:text-green-300"
              }`}
          >
            {toast.type === "error" ? <X size={16} className="shrink-0" /> : <Check size={16} className="shrink-0" />}
            <span>{toast.message}</span>
          </div>
        </div>
      )}
    </div>
  );
}