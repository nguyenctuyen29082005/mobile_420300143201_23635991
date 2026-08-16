import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import StudentCard from "./StudentCard";

export default function CampusDashboard() {
  return (
    <ScrollView
      style={styles.scrollView}
      contentContainerStyle={styles.container}
    >
      <Text style={styles.header}>CAMPUS DASHBOARD</Text>

      <StudentCard />

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>KHÓA HỌC</Text>
        <Text>Lập trình Mobile</Text>
        <Text>Cơ sở dữ liệu</Text>
        <Text>Phát triển giao diện</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>THÔNG BÁO</Text>
        <Text>Thông báo học phí học kỳ mới</Text>
        <Text>Lịch thi cuối kỳ</Text>
      </View>

      <Pressable style={styles.button}>
        <Text style={styles.buttonText}>Xem tất cả thông báo</Text>
      </Pressable>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollView: {
    flex: 1,
    backgroundColor: "#f2f2f2",
  },

  container: {
    padding: 20,
    gap: 16,
    paddingTop: 50,
    paddingBottom: 32,
    alignItems: "center",
  },

  header: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    width: "100%",
  },

  section: {
    width: "100%",
    borderWidth: 1,
    borderRadius: 12,
    padding: 16,
    gap: 8,
    backgroundColor: "#ffffff",
  },

  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 8,
  },

  button: {
    width: "100%",
    padding: 14,
    borderWidth: 1,
    borderRadius: 8,
    alignItems: "center",
    backgroundColor: "#ffffff",
  },

  buttonText: {
    fontWeight: "bold",
  },
});
