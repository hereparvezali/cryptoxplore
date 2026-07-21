const BASE = "https://api.coingecko.com/api/v3";
const PARAMS =
  "?vs_currency=usd&order=market_cap_desc&per_page=50&page=1" +
  "&sparkline=true&price_change_percentage=24h";

export const MARKETS_URL = `${BASE}/coins/markets${PARAMS}`;

export async function getMarkets() {
  const res = await fetch(MARKETS_URL);
  if (!res.ok) throw new Error(`Request failed (${res.status})`);
  const data = await res.json();
  if (!Array.isArray(data)) throw new Error("Unexpected response");
  return data;
}
