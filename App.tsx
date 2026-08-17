import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import {
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';


function Header() {
  return (
    <View style={styles.header}>
      <View style={styles.headerTextContainer}>
        <Text style={styles.headerTitle}>My Profile</Text>
        <Text style={styles.headerSubtitle}>
          Thông tin cá nhân
        </Text>
      </View>

      <Text style={styles.headerIcon}>⋮</Text>
    </View>
  );
}


function Avatar() {
  return (
    <View style={styles.avatarContainer}>
      <Image
        source={{
          uri: 'https://images.unsplash.com/photo-1500534623283-312aade485b7',
        }}
        style={styles.avatar}
        resizeMode="cover"
        accessibilityRole="image"
        accessibilityLabel="Ảnh đại diện"
      />
    </View>
  );
}

type InfoRowProps = {
  label: string;
  value: string;
};

function InfoRow({ label, value }: InfoRowProps) {
  return (
    <View style={styles.infoRow}>
      <Text style={styles.infoLabel}>{label}</Text>

      <Text style={styles.infoValue}>
        {value}
      </Text>
    </View>
  );
}

// =========================
// Component: SearchField
// =========================
type SearchFieldProps = {
  value: string;
  onChangeText: (text: string) => void;
};

function SearchField({
  value,
  onChangeText,
}: SearchFieldProps) {
  return (
    <View style={styles.searchContainer}>
      <Text style={styles.searchIcon}>⌕</Text>

      <TextInput
        style={styles.searchInput}
        value={value}
        onChangeText={onChangeText}
        placeholder="Tìm kiếm thông tin..."
        placeholderTextColor="#999"
        accessibilityLabel="Ô tìm kiếm thông tin"
      />
    </View>
  );
}

// =========================
// Component: FollowButton
// =========================
type FollowButtonProps = {
  following: boolean;
  onPress: () => void;
};

function FollowButton({
  following,
  onPress,
}: FollowButtonProps) {
  return (
    <Pressable
      onPress={onPress}
      accessibilityRole="button"
      accessibilityLabel={
        following
          ? 'Bỏ theo dõi Nguyen Cong Tuyen'
          : 'Theo dõi Nguyen Cong Tuyen'
      }
      accessibilityState={{
        selected: following,
      }}
      hitSlop={8}
      style={({ pressed }) => [
        styles.followButton,
        following && styles.followingButton,
        pressed && styles.buttonPressed,
      ]}
    >
      {({ pressed }) => (
        <Text
          style={[
            styles.followButtonText,
            following && styles.followingButtonText,
          ]}
        >
          {pressed
            ? 'Đang xử lý...'
            : following
            ? 'Đang theo dõi'
            : 'Theo dõi'}
        </Text>
      )}
    </Pressable>
  );
}

// =========================
// Component: EmailButton
// =========================
type EmailButtonProps = {
  disabled: boolean;
  onPress: () => void;
};

function EmailButton({
  disabled,
  onPress,
}: EmailButtonProps) {
  return (
    <Pressable
      onPress={onPress}
      disabled={disabled}
      accessibilityRole="button"
      accessibilityLabel="Gửi email cho Nguyen Cong Tuyen"
      accessibilityState={{
        disabled,
      }}
      hitSlop={8}
      style={({ pressed }) => [
        styles.emailButton,

        // Trạng thái disabled
        disabled && styles.emailButtonDisabled,

        // Trạng thái đang nhấn
        pressed && !disabled && styles.buttonPressed,
      ]}
    >
      {({ pressed }) => (
        <Text
          style={[
            styles.emailButtonText,
            disabled && styles.emailButtonDisabledText,
          ]}
        >
          {disabled
            ? 'Đang gửi...'
            : pressed
            ? 'Đang nhấn...'
            : 'Gửi email'}
        </Text>
      )}
    </Pressable>
  );
}

// =========================
// App
// =========================
export default function App() {
  const [searchText, setSearchText] = useState('');

  // State của nút Theo dõi
  const [following, setFollowing] = useState(false);

  // State của nút Gửi email
  const [sendingEmail, setSendingEmail] = useState(false);

  const handleFollow = () => {
    setFollowing((current) => !current);
  };

  const handleSendEmail = () => {
    setSendingEmail(true);

    // Giả lập quá trình gửi email
    setTimeout(() => {
      setSendingEmail(false);
    }, 2000);
  };

  return (
    <View style={styles.container}>
      <StatusBar style="dark" />

      <Header />

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        {/* Profile */}
        <View style={styles.profileSection}>
          <Avatar />

          <Text style={styles.name}>
            Nguyen Cong Tuyen
          </Text>

          <Text style={styles.role}>
            Mobile Developer
          </Text>
        </View>

        {/* Search */}
        <SearchField
          value={searchText}
          onChangeText={setSearchText}
        />

        {/* Interaction buttons */}
        <View style={styles.actionContainer}>
          <FollowButton
            following={following}
            onPress={handleFollow}
          />

          <EmailButton
            disabled={sendingEmail}
            onPress={handleSendEmail}
          />
        </View>

        {/* Thông tin cá nhân */}
        <View style={styles.card}>
          <Text style={styles.sectionTitle}>
            Thông tin cá nhân
          </Text>

          <InfoRow
            label="Họ và tên"
            value="Nguyen Cong Tuyen"
          />

          <InfoRow
            label="Email"
            value="nguyenctuyen@example.com"
          />

          <InfoRow
            label="Số điện thoại"
            value="0123 456 789"
          />

          <InfoRow
            label="Ngày sinh"
            value="15/08/2005"
          />

          <InfoRow
            label="Địa chỉ"
            value="Thành phố Hồ Chí Minh, Việt Nam"
          />
        </View>

        {/* Giới thiệu */}
        <View style={styles.card}>
          <Text style={styles.sectionTitle}>
            Giới thiệu
          </Text>

          <Text style={styles.description}>
            Tôi là sinh viên ngành Công nghệ thông tin,
            đang học lập trình ứng dụng di động với
            React Native và Expo.
          </Text>
        </View>

        {/* Kỹ năng */}
        <View style={styles.card}>
          <Text style={styles.sectionTitle}>
            Kỹ năng
          </Text>

          <View style={styles.skillContainer}>
            <View style={styles.skill}>
              <Text style={styles.skillText}>
                React Native
              </Text>
            </View>

            <View style={styles.skill}>
              <Text style={styles.skillText}>
                TypeScript
              </Text>
            </View>

            <View style={styles.skill}>
              <Text style={styles.skillText}>
                JavaScript
              </Text>
            </View>

            <View style={styles.skill}>
              <Text style={styles.skillText}>
                Expo
              </Text>
            </View>
          </View>
        </View>

        {/* Mục tiêu */}
        <View style={styles.card}>
          <Text style={styles.sectionTitle}>
            Mục tiêu
          </Text>

          <Text style={styles.description}>
            Hoàn thành môn Lập trình cho thiết bị di động
            và xây dựng được các ứng dụng có giao diện
            đẹp, dễ sử dụng và hoạt động tốt trên nhiều
            kích thước màn hình.
          </Text>
        </View>
      </ScrollView>
    </View>
  );
}

// =========================
// Styles
// =========================
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F7FB',
  },

  // Header
  header: {
    width: '100%',
    paddingHorizontal: 20,
    paddingTop: 50,
    paddingBottom: 16,
    backgroundColor: '#FFFFFF',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  headerTextContainer: {
    flex: 1,
    minWidth: 0,
  },

  headerTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: '#1E293B',
  },

  headerSubtitle: {
    marginTop: 3,
    fontSize: 13,
    color: '#64748B',
  },

  headerIcon: {
    fontSize: 28,
    color: '#334155',
    padding: 8,
  },

  // ScrollView
  scrollView: {
    flex: 1,
    width: '100%',
  },

  scrollContent: {
    padding: 20,
    paddingBottom: 40,
  },

  // Profile
  profileSection: {
    alignItems: 'center',
    marginBottom: 24,
  },

  avatarContainer: {
    width: 110,
    height: 110,
    borderRadius: 55,
    overflow: 'hidden',
    marginBottom: 12,
    borderWidth: 4,
    borderColor: '#FFFFFF',
  },

  avatar: {
    width: 110,
    height: 110,
  },

  name: {
    fontSize: 22,
    fontWeight: '700',
    color: '#1E293B',
    textAlign: 'center',
  },

  role: {
    marginTop: 4,
    fontSize: 14,
    color: '#64748B',
    textAlign: 'center',
  },

  // Search
  searchContainer: {
    width: '100%',
    minHeight: 48,
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    paddingHorizontal: 14,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },

  searchIcon: {
    fontSize: 24,
    color: '#64748B',
    marginRight: 8,
  },

  searchInput: {
    flex: 1,
    minWidth: 0,
    fontSize: 15,
    color: '#1E293B',
    paddingVertical: 10,
  },

  // =========================
  // Interaction
  // =========================

  actionContainer: {
    width: '100%',
    flexDirection: 'row',
    gap: 12,
    marginBottom: 16,
  },

  // Nút Theo dõi
  followButton: {
    flex: 1,
    minHeight: 48,
    borderRadius: 12,
    backgroundColor: '#2563EB',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 16,
    borderWidth: 2,
    borderColor: '#2563EB',
  },

  followButtonText: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: '700',
  },

  // Trạng thái đã theo dõi
  followingButton: {
    backgroundColor: '#FFFFFF',
    borderColor: '#2563EB',
  },

  followingButtonText: {
    color: '#2563EB',
  },

  // Nút Gửi email
  emailButton: {
    flex: 1,
    minHeight: 48,
    borderRadius: 12,
    backgroundColor: '#0F172A',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 16,
  },

  emailButtonText: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: '700',
  },

  // Disabled
  emailButtonDisabled: {
    backgroundColor: '#CBD5E1',
  },

  emailButtonDisabledText: {
    color: '#64748B',
  },

  // Đang nhấn
  buttonPressed: {
    opacity: 0.7,
    transform: [{ scale: 0.97 }],
  },

  // Card
  card: {
    width: '100%',
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 18,
    marginBottom: 16,

    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.05,
    shadowRadius: 5,

    elevation: 2,
  },

  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1E293B',
    marginBottom: 14,
  },

  // InfoRow
  infoRow: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'flex-start',
    paddingVertical: 11,
    borderBottomWidth: 1,
    borderBottomColor: '#F1F5F9',
  },

  infoLabel: {
    width: '32%',
    fontSize: 14,
    color: '#64748B',
    fontWeight: '500',
  },

  infoValue: {
    flex: 1,
    minWidth: 0,
    fontSize: 14,
    color: '#1E293B',
    fontWeight: '600',
    lineHeight: 20,
  },

  // Description
  description: {
    fontSize: 15,
    color: '#475569',
    lineHeight: 23,
  },

  // Skills
  skillContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },

  skill: {
    backgroundColor: '#E8F0FE',
    borderRadius: 20,
    paddingHorizontal: 14,
    paddingVertical: 8,
  },

  skillText: {
    color: '#2563EB',
    fontSize: 13,
    fontWeight: '600',
  },
});
