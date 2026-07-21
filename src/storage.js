import * as FileSystem from "expo-file-system";

const WATCHLIST_FILE = FileSystem.documentDirectory + "watchlist.json";

export async function loadWatchlist() {
  try {
    const info = await FileSystem.getInfoAsync(WATCHLIST_FILE);
    if (!info.exists) return [];
    const raw = await FileSystem.readAsStringAsync(WATCHLIST_FILE);
    const ids = JSON.parse(raw);
    return Array.isArray(ids) ? ids : [];
  } catch {
    return [];
  }
}

export function saveWatchlist(ids) {
  FileSystem.writeAsStringAsync(WATCHLIST_FILE, JSON.stringify(ids)).catch(
    () => {},
  );
}
