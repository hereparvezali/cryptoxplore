import React from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";
import Sparkline from "./sparkline";
import { formatPrice, formatChange } from "../utils";
import { COLORS, SIZES } from "../utils";

export default function CoinRow({ coin, starred, onToggleStar }) {
  const pct = coin.price_change_percentage_24h;
  const up = (pct ?? 0) >= 0;
  const color = up ? COLORS.up : COLORS.down;

  return (
    <View style={styles.row}>
      <TouchableOpacity
        onPress={() => onToggleStar(coin.id)}
        hitSlop={8}
        style={styles.star}
      >
        <Text style={[styles.starText, starred && styles.starOn]}>
          {starred ? "★" : "☆"}
        </Text>
      </TouchableOpacity>

      <Image source={{ uri: coin.image }} style={styles.icon} />

      <View style={styles.nameCol}>
        <Text style={styles.name} numberOfLines={1}>
          {coin.name}
        </Text>
        <Text style={styles.symbol}>{(coin.symbol || "").toUpperCase()}</Text>
      </View>

      <Sparkline prices={coin.sparkline_in_7d?.price} color={color} />

      <View style={styles.priceCol}>
        <Text style={styles.price}>{formatPrice(coin.current_price)}</Text>
        <View
          style={[
            styles.pill,
            { backgroundColor: up ? COLORS.pillUp : COLORS.pillDown },
          ]}
        >
          <Text style={[styles.pillText, { color }]}>{formatChange(pct)}</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: SIZES.rowPadX,
    paddingVertical: SIZES.rowPadY,
  },
  star: { paddingRight: 6 },
  starText: { fontSize: SIZES.star, color: COLORS.starOff },
  starOn: { color: COLORS.starOn },
  icon: {
    width: SIZES.icon,
    height: SIZES.icon,
    borderRadius: SIZES.icon / 2,
    backgroundColor: "#f3f4f6",
  },
  nameCol: { width: 92, marginLeft: 10 },
  name: { fontSize: 15, fontWeight: "600", color: COLORS.textMain },
  symbol: { fontSize: 12, color: COLORS.muted, marginTop: 1 },
  priceCol: { alignItems: "flex-end", minWidth: 88 },
  price: { fontSize: 15, fontWeight: "600", color: COLORS.textMain },
  pill: {
    marginTop: 3,
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 6,
  },
  pillText: { fontSize: 12, fontWeight: "700" },
});
