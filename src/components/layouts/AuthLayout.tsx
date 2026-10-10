import React from 'react';
import { KeyboardAvoidingView, Platform, StyleSheet, View, ScrollView, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTheme } from '../../theme/useTheme';
import { Text } from '../ui/Text';

interface AuthLayoutProps {
  children: React.ReactNode;
  title: string;
  subtitle?: string;
}

export const AuthLayout: React.FC<AuthLayoutProps> = ({ children, title, subtitle }) => {
  const { colors } = useTheme();

  return (
    <SafeAreaView style={[styles.safeArea, { backgroundColor: colors.background }]}>
      <KeyboardAvoidingView 
        style={styles.container}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <ScrollView contentContainerStyle={styles.scrollContent} bounces={false}>
          <View style={styles.topBar}>
            <Image 
              source={require('../../../assets/acrapathlogo.png')} 
              style={styles.logo}
              resizeMode="contain"
            />
          </View>
          <View style={styles.header}>
            <Text weight="bold" style={styles.title}>{title}</Text>
            {subtitle && (
              <Text style={[styles.subtitle, { color: colors.textSecondary }]}>
                {subtitle}
              </Text>
            )}
          </View>
          <View style={styles.body}>
            {children}
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  container: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    padding: 24,
    justifyContent: 'center',
  },
  topBar: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 32,
  },
  header: {
    marginBottom: 32,
  },
  logo: {
    width: 160,
    height: 44,
  },
  title: {
    fontSize: 32,
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
  },
  body: {
    // flex: 1 removed to allow vertical centering
  },
});
