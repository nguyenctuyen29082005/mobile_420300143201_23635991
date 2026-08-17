import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { CourseCardGallery } from "./course-image-demos";
import StudentCard from "./StudentCard";

export default function CampusDashboard() {
  return (
    <ScrollView
      style={styles.scrollView}
      contentContainerStyle={styles.container}
    >
      <Text style={styles.header}>
        BẢNG ĐIỀU KHIỂN THÔNG MINH CỦA KHUÔN VIÊN ĐẠI HỌC
      </Text>

      <StudentCard />

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>
          DANH SÁCH CÁC MÔN HỌC ĐANG THEO HỌC TRONG HỌC KỲ HIỆN TẠI
        </Text>
        <View style={styles.courseList}>
          <CourseCardGallery />
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>
          CÁC THÔNG BÁO VÀ CẬP NHẬT MỚI NHẤT TỪ PHÒNG ĐÀO TẠO
        </Text>
        <Text style={styles.bodyText}>
          Thông báo về học phí, lệ phí và thời hạn nộp học kỳ mới sắp tới
        </Text>
        <Text style={styles.bodyText}>
          Lịch thi cuối kỳ chính thức đã được công bố trên cổng sinh viên
        </Text>
      </View>

      <Pressable style={styles.button}>
        <Text style={styles.buttonText}>
          Nhấn vào đây để xem toàn bộ danh sách thông báo của nhà trường
        </Text>
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
    fontSize: 28,
    fontWeight: "bold",
    textAlign: "center",
    width: "100%",
    lineHeight: 36,
  },

  section: {
    width: "100%",
    borderWidth: 1,
    borderRadius: 12,
    padding: 16,
    gap: 10,
    backgroundColor: "#ffffff",
  },

  sectionTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 4,
    lineHeight: 28,
  },

  bodyText: {
    fontSize: 18,
    lineHeight: 26,
  },

  courseList: {
    width: "100%",
    gap: 16,
  },

  button: {
    width: "100%",
    padding: 16,
    borderWidth: 1,
    borderRadius: 8,
    alignItems: "center",
    backgroundColor: "#ffffff",
  },

  buttonText: {
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
    lineHeight: 26,
  },
});
