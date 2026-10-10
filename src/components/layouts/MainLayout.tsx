import React from 'react';
import { StyleSheet, View, Image, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTheme } from '../../theme/useTheme';
import { Text } from '../ui/Text';
import { Menu } from 'lucide-react-native';

export const MainLayout = ({ children, title, isHome }: { children: React.ReactNode, title: string, isHome?: boolean }) => {
  const { colors, isDark } = useTheme();

  return (
    <SafeAreaView style={[styles.safeArea, { backgroundColor: isHome ? (isDark ? '#000000' : '#F9FCFF') : colors.background }]}>
      {isHome ? (
        <View style={[styles.homeHeader, { backgroundColor: isDark ? '#000000' : '#F9FCFF' }]}>
          <View style={styles.headerLeft}>
            {/* Hamburger Menu Icon */}
            <TouchableOpacity style={styles.hamburgerBtn}>
              <Menu color={colors.text} size={24} />
            </TouchableOpacity>

            {/* Logo */}
            <Image
              source={require('../../../assets/acrapathlogo.png')}
              style={styles.logo}
              resizeMode="contain"
            />
          </View>

          {/* User Avatar */}
          <TouchableOpacity style={styles.avatarContainer}>
            <Image
              source={require('../../../assets/profile.png')}
              style={styles.profileImage}
              resizeMode="contain"
            />
            <View style={[styles.downArrow, { borderTopColor: colors.text }]} />
          </TouchableOpacity>
        </View>
      ) : (
        <View style={styles.header}>
          <Text weight="bold" style={styles.title}>{title}</Text>
        </View>
      )}
      <View style={styles.container}>
        {children}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  homeHeader: {
    height: 60,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 24,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E5EA',
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  hamburgerBtn: {
    justifyContent: 'space-between',
    height: 32,
    width: 32,
    padding: 2, // to give a slight tap target bump
    marginRight: 16, // spacing between menu and logo
  },
  hamburgerLine: {
    height: 2.5,
    borderRadius: 2,
    width: '100%',
  },
  logo: {
    width: 110,
    height: 30,
  },
  avatarContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  profileImage: {
    width: 28,
    height: 28,
    tintColor: '#4D4D4D', // Applying the Black Shade 700 color if it's a transparent PNG
  },
  downArrow: {
    width: 0,
    height: 0,
    backgroundColor: 'transparent',
    borderStyle: 'solid',
    borderLeftWidth: 5,
    borderRightWidth: 5,
    borderBottomWidth: 0,
    borderTopWidth: 5,
    borderLeftColor: 'transparent',
    borderRightColor: 'transparent',
    marginLeft: 8,
  },
  header: {
    paddingHorizontal: 24,
    paddingTop: 24,
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E5EA',
  },
  title: {
    fontSize: 24,
  },
  container: {
    flex: 1,
    padding: 24,
  },
});
