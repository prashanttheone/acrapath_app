import React from 'react';
import { View, StyleSheet } from 'react-native';
import { MainLayout } from '../components/layouts/MainLayout';
import { Button } from '../components/ui/Button';
import { Text } from '../components/ui/Text';
import { useAuth } from '../app/provider/AuthProvider';

export const Home = () => {
  const { user, logout } = useAuth();

  return (
    <MainLayout title="Home">
      <View style={styles.content}>
        <Text style={styles.welcomeText}>
          Welcome back, {user?.full_name || 'User'}!
        </Text>
        <Text style={styles.emailText}>
          {user?.email}
        </Text>
        
        <View style={styles.spacer} />
        
        <Button title="Log Out" onPress={logout} />
      </View>
    </MainLayout>
  );
};

const styles = StyleSheet.create({
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  welcomeText: {
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 8,
  },
  emailText: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
  },
  spacer: {
    height: 48,
  }
});
