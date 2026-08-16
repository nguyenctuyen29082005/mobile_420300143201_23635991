import { StyleSheet, Text, View } from "react-native";
import InfoRow from "./InfoRow";

export default function StudentCard() {
  return (
    <View style={styles.card}>
      <Text style={styles.title}>
        THÔNG TIN HỒ SƠ VÀ DỮ LIỆU CÁ NHÂN CỦA SINH VIÊN
      </Text>

      <InfoRow
        label="Họ và tên đầy đủ của sinh viên theo giấy tờ tùy thân"
        value="Nguyễn Công Tuyến — sinh viên chính quy, đang theo học tại trường"
      />
      <InfoRow
        label="Mã số sinh viên do nhà trường cấp và sử dụng xuyên suốt khóa học"
        value="23633961 (mã định danh duy nhất trên hệ thống quản lý đào tạo)"
      />
      <InfoRow
        label="Chuyên ngành đào tạo chính thức và hướng chuyên sâu"
        value="Kỹ thuật phần mềm chuyên sâu về phát triển ứng dụng di động, ứng dụng web và hệ thống phần mềm phân tán hiện đại trên nền tảng đám mây"
        emphasized
      />
      <InfoRow
        label="Niên khóa và thời gian dự kiến hoàn thành chương trình"
        value="Từ năm học 2023 đến năm 2027 theo khung chương trình đào tạo chính quy bậc đại học"
      />
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
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
    lineHeight: 30,
  },
});
