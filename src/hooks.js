import { useState, useEffect, useCallback, useMemo } from "react";
import { loadWatchlist, saveWatchlist } from "./storage";
import { getMarkets } from "./api";

export function useWatchlist() {
  const [watchlist, setWatchlist] = useState([]);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    let mounted = true;

    (async () => {
      const ids = await loadWatchlist();
      if (mounted) {
        setWatchlist(ids);
        setReady(true);
      }
    })();

    return () => {
      mounted = false;
    }; // cleanup on unmount
  }, []);

  const toggle = useCallback((id) => {
    setWatchlist((prev) => {
      const next = prev.includes(id)
        ? prev.filter((x) => x !== id)
        : [...prev, id];
      saveWatchlist(next);
      return next;
    });
  }, []);

  const watchSet = useMemo(() => new Set(watchlist), [watchlist]);

  return { watchlist, watchSet, toggle, ready };
}

export function useMarkets(enabled) {
  const [coins, setCoins] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState(null);

  const fetch = useCallback(async () => {
    setError(null);
    try {
      setCoins(await getMarkets());
    } catch (e) {
      setError(e.message || "Something went wrong");
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, []);

  useEffect(() => {
    if (enabled) fetch();
  }, [enabled, fetch]);

  const refresh = useCallback(() => {
    setRefreshing(true);
    fetch();
  }, [fetch]);

  return { coins, loading, refreshing, error, fetch, refresh };
}
