import { ImageSource } from "expo-image";

import CourseCard from "./CourseCard";

/** Exercise 3 gallery — one card per image-resilience case. */
export const COURSE_IMAGE_DEMOS: {
  demoTag: string;
  courseCode: string;
  title: string;
  description: string;
  instructor: string;
  imageSource: ImageSource | null;
  imageRole: "informative" | "decorative";
  imageLabel?: string;
  deferSourceMs?: number;
}[] = [
  {
    demoTag: "Local image",
    courseCode: "MOB101",
    title: "Lập trình ứng dụng di động nâng cao",
    description:
      "Thực hành React Native và Expo trên thiết bị thật và trình giả lập.",
    instructor: "TS. Nguyễn Văn An",
    imageSource: require("@/assets/images/react-logo.png"),
    imageRole: "informative",
    imageLabel:
      "Logo React — biểu tượng công nghệ của môn lập trình ứng dụng di động",
  },
  {
    demoTag: "Remote image",
    courseCode: "DB201",
    title: "Cơ sở dữ liệu quan hệ và thiết kế lưu trữ",
    description:
      "Mô hình hóa dữ liệu, truy vấn SQL và tối ưu hiệu năng cơ sở dữ liệu.",
    instructor: "ThS. Trần Thị Bình",
    imageSource: {
      uri: "https://picsum.photos/seed/smart-campus-db/800/450",
    },
    imageRole: "informative",
    imageLabel: "Ảnh bìa minh họa hệ thống cơ sở dữ liệu của khóa học",
  },
  {
    demoTag: "Loading state",
    courseCode: "UI301",
    title: "Phát triển giao diện đa nền tảng",
    description:
      "Thiết kế layout responsive, component tái sử dụng và trải nghiệm người dùng.",
    instructor: "TS. Lê Minh Cường",
    imageSource: {
      uri: "https://picsum.photos/seed/smart-campus-ui/800/450",
    },
    imageRole: "informative",
    imageLabel: "Ảnh bìa khóa học phát triển giao diện",
    deferSourceMs: 2500,
  },
  {
    demoTag: "Failed image",
    courseCode: "NET401",
    title: "Mạng máy tính và bảo mật",
    description:
      "Giao thức truyền thông, mô hình OSI và các biện pháp bảo vệ hệ thống.",
    instructor: "PGS.TS. Phạm Hoàng Dũng",
    imageSource: {
      uri: "https://invalid.smart-campus.local/course-covers/network-security.png",
    },
    imageRole: "informative",
    imageLabel: "Ảnh bìa khóa học mạng máy tính",
  },
  {
    demoTag: "Informative image",
    courseCode: "ACC501",
    title: "Kế toán doanh nghiệp",
    description:
      "Bút toán, báo cáo tài chính và phân tích chỉ số kinh doanh cơ bản.",
    instructor: "ThS. Võ Thị Em",
    imageSource: require("@/assets/images/tutorial-web.png"),
    imageRole: "informative",
    imageLabel:
      "Ảnh chụp giao diện web minh họa bài giảng kế toán doanh nghiệp",
  },
  {
    demoTag: "Decorative image",
    courseCode: "ART102",
    title: "Thiết kế đồ họa cơ bản",
    description:
      "Bố cục, màu sắc và typography cho sản phẩm truyền thông số.",
    instructor: "CN. Đặng Minh Phúc",
    imageSource: require("@/assets/images/expo-logo.png"),
    imageRole: "decorative",
  },
];

export function CourseCardGallery() {
  return (
    <>
      {COURSE_IMAGE_DEMOS.map((course) => (
        <CourseCard key={course.courseCode} {...course} />
      ))}
    </>
  );
}
