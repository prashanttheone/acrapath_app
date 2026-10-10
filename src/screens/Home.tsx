import React from 'react';
import { View, StyleSheet } from 'react-native';
import { MainLayout } from '../components/layouts/MainLayout';
import { Button } from '../components/ui/Button';
import { Text } from '../components/ui/Text';
import { useAuth } from '../app/provider/AuthProvider';

export const Home: React.FC<{ navigation: any }> = ({ navigation }) => {
  const { user, logout } = useAuth();

  return (
    <MainLayout title="Home" isHome>
      <View style={styles.headerRow}>
        <Text style={styles.welcomeText} numberOfLines={1}>
          Good Morning, {user?.full_name?.split(' ')[0] || 'User'}...
        </Text>
        <Button 
          title="Post Job" 
          onPress={() => navigation.navigate('PostJob')} 
          style={styles.postJobBtn} 
          textStyle={styles.postJobBtnText}
        />
      </View>
      
      <View style={styles.content}>
        <Text style={styles.emailText}>
          {user?.email}
        </Text>
        
        <View style={styles.spacer} />
        
        <Button title="Log Out" onPress={logout} style={styles.logoutBtn} />
      </View>
    </MainLayout>
  );
};

const styles = StyleSheet.create({
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 24,
  },
  welcomeText: {
    fontSize: 18,
    fontWeight: 'bold',
    flex: 1,
    marginRight: 16,
  },
  postJobBtn: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
    minHeight: 0,
  },
  postJobBtnText: {
    fontSize: 14,
  },
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  emailText: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
  },
  spacer: {
    height: 48,
  },
  logoutBtn: {
    backgroundColor: '#EF4444',
  },
});
