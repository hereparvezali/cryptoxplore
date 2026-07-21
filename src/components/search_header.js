import React from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { COLORS } from "../utils";

export default function SearchHeader({
  query,
  onQueryChange,
  watchOnly,
  onToggleWatchOnly,
}) {
  return (
    <View style={styles.header}>
      <View style={styles.headerTop}>
        <Text style={styles.title}>📈 Markets</Text>
        <View style={styles.toggle}>
          <TouchableOpacity
            onPress={() => onToggleWatchOnly(false)}
            style={[styles.toggleBtn, !watchOnly && styles.toggleBtnOn]}
          >
            <Text
              style={[styles.toggleText, !watchOnly && styles.toggleTextOn]}
            >
              All
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => onToggleWatchOnly(true)}
            style={[styles.toggleBtn, watchOnly && styles.toggleBtnOn]}
          >
            <Text style={[styles.toggleText, watchOnly && styles.toggleTextOn]}>
              ★ Watchlist
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      <TextInput
        style={styles.search}
        placeholder="Search coins…"
        placeholderTextColor={COLORS.muted}
        value={query}
        onChangeText={onQueryChange}
        autoCapitalize="none"
        autoCorrect={false}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    paddingTop: 48,
    paddingBottom: 12,
    paddingHorizontal: 16,
    backgroundColor: COLORS.primary,
  },
  headerTop: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  title: { fontSize: 22, fontWeight: "700", color: "#fff" },
  toggle: {
    flexDirection: "row",
    backgroundColor: "rgba(255,255,255,0.2)",
    borderRadius: 8,
    padding: 2,
  },
  toggleBtn: { paddingHorizontal: 10, paddingVertical: 5, borderRadius: 6 },
  toggleBtnOn: { backgroundColor: "#fff" },
  toggleText: { fontSize: 12, color: "#e0e7ff", fontWeight: "600" },
  toggleTextOn: { color: COLORS.primary },
  search: {
    marginTop: 12,
    height: 42,
    borderRadius: 10,
    paddingHorizontal: 14,
    fontSize: 15,
    color: "#111",
    backgroundColor: "#fff",
  },
});
