import { StyleSheet, Text, View } from "react-native";

interface InfoRowProps {
  label: string;
  value: string;
  emphasized?: boolean;
}

/**
 * Label/value row built for long translated strings (Exercise 2).
 * See LAYOUT-DECISIONS.md for rationale.
 */
export default function InfoRow({
  label,
  value,
  emphasized = false,
}: InfoRowProps) {
  return (
    <View style={styles.row}>
      <Text style={styles.label}>{label}</Text>
      <Text style={[styles.value, emphasized && styles.emphasized]}>
        {value}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    alignItems: "flex-start",
    gap: 12,
    marginBottom: 16,
  },

  label: {
    flex: 0.42,
    minWidth: 0,
    fontSize: 18,
    fontWeight: "600",
    lineHeight: 26,
  },

  value: {
    flex: 1,
    minWidth: 0,
    flexShrink: 1,
    fontSize: 18,
    lineHeight: 26,
  },

  emphasized: {
    fontWeight: "bold",
  },
});
