import React from "react";
import { View, StyleSheet } from "react-native";
import { COLORS } from "../utils";

export default function Sparkline({ prices, color }) {
  if (!prices || prices.length < 2) return <View style={styles.spark} />;

  const step = Math.ceil(prices.length / 24);
  const pts = prices.filter((_, i) => i % step === 0);
  const min = Math.min(...pts);
  const max = Math.max(...pts);
  const range = max - min || 1;

  return (
    <View style={styles.spark}>
      {pts.map((p, i) => (
        <View
          key={i}
          style={{
            flex: 1,
            marginHorizontal: 0.5,
            height: 4 + ((p - min) / range) * 24,
            backgroundColor: color,
            opacity: 0.85,
            borderRadius: 1,
          }}
        />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  spark: {
    flex: 1,
    flexDirection: "row",
    alignItems: "flex-end",
    height: 30,
    marginHorizontal: 8,
  },
});
