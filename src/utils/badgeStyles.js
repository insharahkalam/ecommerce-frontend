export function statusStyle(status) {
  switch (status) {
    case "Fulfilled":
      return { color: "#7FE0A8", bg: "rgba(15,107,79,0.18)", border: "rgba(127,224,168,0.25)" };
    case "Pending":
      return { color: "#FBBF6B", bg: "rgba(251,191,107,0.12)", border: "rgba(251,191,107,0.25)" };
    case "Refunded":
      return { color: "#F3897E", bg: "rgba(243,137,126,0.12)", border: "rgba(243,137,126,0.25)" };
    default:
      return { color: "#A3A3A3", bg: "rgba(255,255,255,0.06)", border: "rgba(255,255,255,0.1)" };
  }
}

export function stockStyle(stock) {
  if (stock === 0) return { color: "#F3897E", bg: "rgba(243,137,126,0.12)", border: "rgba(243,137,126,0.25)", label: "Out of stock" };
  if (stock <= 10) return { color: "#FBBF6B", bg: "rgba(251,191,107,0.12)", border: "rgba(251,191,107,0.25)", label: "Low stock" };
  return { color: "#7FE0A8", bg: "rgba(15,107,79,0.18)", border: "rgba(127,224,168,0.25)", label: "In stock" };
}
