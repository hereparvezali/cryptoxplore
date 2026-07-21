import React, { useState, useMemo } from "react";
import {
  SafeAreaView,
  FlatList,
  View,
  Text,
  RefreshControl,
  StyleSheet,
} from "react-native";
import { StatusBar } from "expo-status-bar";
import { COLORS } from "./utils";
import { useMarkets, useWatchlist } from "./hooks";
import SearchHeader from "./components/search_header";
import CoinRow from "./components/coin_row";
import LoadingState from "./components/loading_state";
import ErrorState from "./components/error_state";

export default function App() {
  const [query, setQuery] = useState("");
  const [watchOnly, setWatchOnly] = useState(false);
  const { watchSet, toggle, ready } = useWatchlist();
  const { coins, loading, refreshing, error, fetch, refresh } =
    useMarkets(ready);

  const visible = useMemo(() => {
    const q = query.trim().toLowerCase();
    return coins.filter((c) => {
      if (watchOnly && !watchSet.has(c.id)) return false;
      if (!q) return true;
      return (
        c.name.toLowerCase().includes(q) ||
        (c.symbol || "").toLowerCase().includes(q)
      );
    });
  }, [coins, query, watchOnly, watchSet]);

  const emptyText = watchOnly
    ? "☆ Star coins to build your watchlist"
    : query
      ? "No coins match your search"
      : "No data";

  return (
    <SafeAreaView style={styles.root}>
      <StatusBar style="light" />

      <SearchHeader
        query={query}
        onQueryChange={setQuery}
        watchOnly={watchOnly}
        onToggleWatchOnly={setWatchOnly}
      />

      {loading ? (
        <LoadingState />
      ) : error ? (
        <ErrorState
          message={error}
          onRetry={() => {
            setLoading(true);
            fetch();
          }}
        />
      ) : (
        <FlatList
          data={visible}
          keyExtractor={(c) => c.id}
          renderItem={({ item }) => (
            <CoinRow
              coin={item}
              starred={watchSet.has(item.id)}
              onToggleStar={toggle}
            />
          )}
          ItemSeparatorComponent={() => <View style={styles.sep} />}
          contentContainerStyle={visible.length === 0 && styles.center}
          ListEmptyComponent={<Text style={styles.dim}>{emptyText}</Text>}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={refresh}
              colors={[COLORS.primary]}
            />
          }
        />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: COLORS.background },
  sep: { height: 1, backgroundColor: COLORS.border, marginLeft: 62 },
  center: {
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 24,
  },
  dim: {
    color: COLORS.muted,
    fontSize: 15,
    marginTop: 12,
    textAlign: "center",
  },
});
