import { Image, ImageSource } from "expo-image";
import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";

export type CourseImageRole = "informative" | "decorative";

export type CourseImageStatus = "idle" | "loading" | "loaded" | "failed";

export interface CourseCardProps {
  courseCode: string;
  title: string;
  description: string;
  instructor: string;
  imageSource: ImageSource | null;
  imageRole: CourseImageRole;
  /** Required when imageRole is "informative". */
  imageLabel?: string;
  /** Optional demo label shown in Exercise 3 gallery. */
  demoTag?: string;
  /** Delays attaching the source so the loading state is observable. */
  deferSourceMs?: number;
}

const PLACEHOLDER_BLURHASH =
  "L6PZfSi_.AyE_3t7t7R**0o#DgR4";

function getAccessibilityProps(
  role: CourseImageRole,
  label: string | undefined,
  status: CourseImageStatus,
) {
  if (role === "decorative" || status === "failed") {
    return {
      accessible: false as const,
      accessibilityElementsHidden: true,
      importantForAccessibility: "no-hide-descendants" as const,
    };
  }

  return {
    accessible: true as const,
    accessibilityLabel: label ?? "Ảnh minh họa khóa học",
    accessibilityRole: "image" as const,
  };
}

export default function CourseCard({
  courseCode,
  title,
  description,
  instructor,
  imageSource,
  imageRole,
  imageLabel,
  demoTag,
  deferSourceMs = 0,
}: CourseCardProps) {
  const [resolvedSource, setResolvedSource] = useState<ImageSource | null>(
    deferSourceMs > 0 ? null : imageSource,
  );
  const [status, setStatus] = useState<CourseImageStatus>(
    imageSource ? "loading" : "idle",
  );

  useEffect(() => {
    if (deferSourceMs <= 0) {
      setResolvedSource(imageSource);
      setStatus(imageSource ? "loading" : "idle");
      return;
    }

    setResolvedSource(null);
    setStatus("loading");

    const timer = setTimeout(() => {
      setResolvedSource(imageSource);
    }, deferSourceMs);

    return () => clearTimeout(timer);
  }, [deferSourceMs, imageSource]);

  const showLoading = status === "loading" || status === "idle";
  const showFailure = status === "failed";
  const a11yProps = getAccessibilityProps(imageRole, imageLabel, status);

  return (
    <View style={styles.card}>
      {demoTag ? <Text style={styles.demoTag}>{demoTag}</Text> : null}

      <View style={styles.imageFrame}>
        {showLoading ? (
          <View style={styles.imageOverlay} accessibilityLiveRegion="polite">
            <ActivityIndicator size="small" color="#333333" />
            <Text style={styles.overlayText}>Đang tải ảnh khóa học…</Text>
          </View>
        ) : null}

        {showFailure ? (
          <View style={styles.imageOverlay} accessibilityLiveRegion="polite">
            <Text style={styles.overlayIcon} accessibilityElementsHidden>
              🖼️
            </Text>
            <Text style={styles.overlayText}>
              Không tải được ảnh. Nội dung khóa học vẫn sử dụng bình thường.
            </Text>
          </View>
        ) : null}

        {resolvedSource && !showFailure ? (
          <Image
            source={resolvedSource}
            style={styles.image}
            contentFit="cover"
            placeholder={{ blurhash: PLACEHOLDER_BLURHASH }}
            placeholderContentFit="cover"
            transition={300}
            onLoadStart={() => setStatus("loading")}
            onLoad={() => setStatus("loaded")}
            onError={() => setStatus("failed")}
            {...a11yProps}
          />
        ) : null}
      </View>

      <View style={styles.content}>
        <Text style={styles.code}>{courseCode}</Text>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.description}>{description}</Text>
        <Text style={styles.instructor}>Giảng viên: {instructor}</Text>

        <Pressable
          style={styles.actionButton}
          accessibilityRole="button"
          accessibilityLabel={`Xem chi tiết khóa học ${courseCode}`}
        >
          <Text style={styles.actionText}>Xem chi tiết khóa học</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    width: "100%",
    borderWidth: 1,
    borderRadius: 12,
    backgroundColor: "#ffffff",
    overflow: "hidden",
  },

  demoTag: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    fontSize: 12,
    fontWeight: "700",
    letterSpacing: 0.4,
    textTransform: "uppercase",
    backgroundColor: "#eef2ff",
    color: "#3730a3",
  },

  imageFrame: {
    width: "100%",
    aspectRatio: 16 / 9,
    backgroundColor: "#e5e7eb",
    alignItems: "center",
    justifyContent: "center",
  },

  image: {
    ...StyleSheet.absoluteFillObject,
  },

  imageOverlay: {
    ...StyleSheet.absoluteFillObject,
    alignItems: "center",
    justifyContent: "center",
    padding: 16,
    gap: 8,
    backgroundColor: "#f3f4f6",
  },

  overlayIcon: {
    fontSize: 28,
  },

  overlayText: {
    fontSize: 14,
    lineHeight: 20,
    textAlign: "center",
    color: "#4b5563",
  },

  content: {
    padding: 16,
    gap: 8,
  },

  code: {
    fontSize: 14,
    fontWeight: "700",
    color: "#6b7280",
    letterSpacing: 0.5,
  },

  title: {
    fontSize: 18,
    fontWeight: "bold",
    lineHeight: 26,
  },

  description: {
    fontSize: 16,
    lineHeight: 24,
    color: "#374151",
  },

  instructor: {
    fontSize: 15,
    lineHeight: 22,
    color: "#4b5563",
  },

  actionButton: {
    marginTop: 4,
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    borderWidth: 1,
    alignItems: "center",
    backgroundColor: "#ffffff",
  },

  actionText: {
    fontSize: 16,
    fontWeight: "bold",
  },
});
