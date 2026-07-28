export function statusStyle(status) {
  switch (status) {
    case "Pending":
      return { color: "#FBBF24", bg: "rgba(251,191,36,0.12)", border: "rgba(251,191,36,0.3)" };
    case "Processing":
      return { color: "#38BDF8", bg: "rgba(56,189,248,0.12)", border: "rgba(56,189,248,0.3)" };
    case "Shipped":
      return { color: "#A78BFA", bg: "rgba(167,139,250,0.12)", border: "rgba(167,139,250,0.3)" };
    case "Delivered":
      return { color: "#4ADE80", bg: "rgba(74,222,128,0.12)", border: "rgba(74,222,128,0.3)" };
    case "Cancelled":
      return { color: "#F87171", bg: "rgba(248,113,113,0.12)", border: "rgba(248,113,113,0.3)" };
    default:
      return { color: "#A3A3A3", bg: "rgba(255,255,255,0.05)", border: "rgba(255,255,255,0.1)" };
  }
}

export function stockStyle(stock) {
  if (stock === 0) return { color: "#F3897E", bg: "rgba(243,137,126,0.12)", border: "rgba(243,137,126,0.25)", label: "Out of stock" };
  if (stock <= 10) return { color: "#FBBF6B", bg: "rgba(251,191,107,0.12)", border: "rgba(251,191,107,0.25)", label: "Low stock" };
  return { color: "#7FE0A8", bg: "rgba(15,107,79,0.18)", border: "rgba(127,224,168,0.25)", label: "In stock" };
}

export function paymentStatusStyle(status) {
  switch (status) {
    case "Paid":
      return { color: "#7FE0A8", bg: "rgba(15,107,79,0.18)", border: "rgba(127,224,168,0.25)" };
    case "Pending":
      return { color: "#FBBF6B", bg: "rgba(251,191,107,0.12)", border: "rgba(251,191,107,0.25)" };
    case "Failed":
      return { color: "#F3897E", bg: "rgba(243,137,126,0.12)", border: "rgba(243,137,126,0.25)" };
    default:
      return { color: "#A3A3A3", bg: "rgba(255,255,255,0.06)", border: "rgba(255,255,255,0.1)" };
  }
}