import { StyleSheet, Text, View } from "react-native";
import InfoRow from "./InfoRow";

export default function StudentCard() {
  return (
    <View style={styles.card}>
      <Text style={styles.title}>THÔNG TIN SINH VIÊN</Text>

      <InfoRow label="Tên" value="Nguyễn Công Tuyến" />
      <InfoRow label="MSSV" value="23633961" />
      <InfoRow
        label="Ngành"
        value="Kỹ thuật phần mềm chuyên sâu về phát triển ứng dụng di động, ứng dụng web và hệ thống phần mềm phân tán hiện đại"
        emphasized
      />
      <InfoRow label="Niên khóa" value="2023 - 2027" />
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    width: "100%",
    maxWidth: 400,
    padding: 20,
    borderRadius: 12,
    backgroundColor: "#ffffff",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 4,
  },

  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
});
