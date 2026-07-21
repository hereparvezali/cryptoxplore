import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { COLORS } from "../utils";

export default function ErrorState({ message, onRetry }) {
  return (
    <View style={styles.center}>
      <Text style={styles.errIcon}>⚠️</Text>
      <Text style={styles.errText}>{message}</Text>
      <TouchableOpacity style={styles.retry} onPress={onRetry}>
        <Text style={styles.retryText}>Retry</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  center: {
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 24,
  },
  errIcon: { fontSize: 40 },
  errText: {
    color: COLORS.textSecondary,
    fontSize: 16,
    marginTop: 8,
    textAlign: "center",
  },
  retry: {
    marginTop: 16,
    backgroundColor: COLORS.primary,
    paddingHorizontal: 24,
    paddingVertical: 10,
    borderRadius: 10,
  },
  retryText: { color: "#fff", fontSize: 15, fontWeight: "600" },
});
