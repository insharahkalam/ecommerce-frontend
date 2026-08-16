export function statusStyle(status) {
  switch (status) {
    case "Pending":
      return { color: "var(--status-pending)", bg: "var(--status-pending-bg)", border: "var(--status-pending-border)" };
    case "Processing":
      return { color: "var(--status-processing)", bg: "var(--status-processing-bg)", border: "var(--status-processing-border)" };
    case "Shipped":
      return { color: "var(--status-shipped)", bg: "var(--status-shipped-bg)", border: "var(--status-shipped-border)" };
    case "Delivered":
      return { color: "var(--status-delivered)", bg: "var(--status-delivered-bg)", border: "var(--status-delivered-border)" };
    case "Cancelled":
      return { color: "var(--status-cancelled)", bg: "var(--status-cancelled-bg)", border: "var(--status-cancelled-border)" };
    default:
      return { color: "var(--status-neutral)", bg: "var(--status-neutral-bg)", border: "var(--status-neutral-border)" };
  }
}

export function stockStyle(stock) {
  if (stock === 0) return { color: "var(--status-cancelled)", bg: "var(--status-cancelled-bg)", border: "var(--status-cancelled-border)", label: "Out of stock" };
  if (stock <= 10) return { color: "var(--status-pending)", bg: "var(--status-pending-bg)", border: "var(--status-pending-border)", label: "Low stock" };
  return { color: "var(--status-delivered)", bg: "var(--status-delivered-bg)", border: "var(--status-delivered-border)", label: "In stock" };
}

export function paymentStatusStyle(status) {
  switch (status) {
    case "Paid":
      return { color: "var(--status-delivered)", bg: "var(--status-delivered-bg)", border: "var(--status-delivered-border)" };
    case "Pending":
      return { color: "var(--status-pending)", bg: "var(--status-pending-bg)", border: "var(--status-pending-border)" };
    case "Failed":
      return { color: "var(--status-cancelled)", bg: "var(--status-cancelled-bg)", border: "var(--status-cancelled-border)" };
    default:
      return { color: "var(--status-neutral)", bg: "var(--status-neutral-bg)", border: "var(--status-neutral-border)" };
  }
}