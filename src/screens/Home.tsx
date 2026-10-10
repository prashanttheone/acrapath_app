import React from 'react';
import { View, StyleSheet } from 'react-native';
import { MainLayout } from '../components/layouts/MainLayout';
import { Button } from '../components/ui/Button';
import { Text } from '../components/ui/Text';
import { useAuth } from '../app/provider/AuthProvider';
import { JobSearchForm } from '../components/search/JobSearchForm';

export const Home: React.FC<{ navigation: any }> = ({ navigation }) => {
  const { user, logout } = useAuth();

  return (
    <MainLayout title="Home" isHome>
      <View style={styles.header}>
        <Text weight="bold" style={styles.welcomeText}>
          Welcome, {user?.full_name || 'User'}!
        </Text>
        <Text style={styles.roleText}>
          Role: {user?.is_recruiter ? 'Recruiter' : 'Candidate'}
        </Text>
      </View>
      
      <View style={styles.content}>
        <Text weight="bold" style={styles.subtitle}>Find your dream job</Text>

        <JobSearchForm onSearch={() => navigation.navigate('Jobs')} />

        <View style={styles.spacer} />
        <Button title="Log Out" onPress={logout} style={styles.logoutBtn} />
      </View>
    </MainLayout>
  );
};

const styles = StyleSheet.create({
  header: {
    padding: 24,
    backgroundColor: '#FFF',
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  welcomeText: {
    fontSize: 24,
    color: '#333',
    marginBottom: 8,
  },
  roleText: {
    fontSize: 16,
    color: '#666',
    textTransform: 'capitalize',
  },
  content: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 24,
  },
  subtitle: {
    fontSize: 22,
    color: '#333',
    marginBottom: 20,
  },
  spacer: {
    height: 32,
  },
  logoutBtn: {
    backgroundColor: '#EF4444',
    marginTop: 'auto',
    marginBottom: 24,
  },
});
