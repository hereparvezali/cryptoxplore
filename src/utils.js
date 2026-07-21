export const COLORS = {
  up: "#16a34a",
  down: "#dc2626",
  primary: "#2563eb",
  background: "#ffffff",
  muted: "#9ca3af",
  border: "#f1f1f1",
  pillUp: "#dcfce7",
  pillDown: "#fee2e2",
  starOff: "#d1d5db",
  starOn: "#f59e0b",
  textMain: "#111111",
  textSecondary: "#374151",
};

export const SIZES = {
  icon: 34,
  star: 20,
  rowPadX: 12,
  rowPadY: 12,
};

export function formatPrice(n) {
  if (n == null || Number.isNaN(n)) return "—";
  if (n >= 1000)
    return "$" + n.toLocaleString("en-US", { maximumFractionDigits: 0 });
  if (n >= 1)
    return "$" + n.toLocaleString("en-US", { maximumFractionDigits: 2 });
  if (n >= 0.01) return "$" + n.toFixed(4);
  return "$" + n.toPrecision(2);
}

export function formatChange(pct) {
  if (pct == null || Number.isNaN(pct)) return "—";
  const sign = pct >= 0 ? "+" : "";
  return `${sign}${pct.toFixed(2)}%`;
}
