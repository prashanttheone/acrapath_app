import React, { useState } from 'react';
import { View, StyleSheet, TouchableOpacity, Modal } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Button } from '../components/ui/Button';
import { Text } from '../components/ui/Text';
import { useAuth } from '../app/provider/AuthProvider';
import { Menu, User, ChevronDown } from 'lucide-react-native';

export const Home: React.FC<{ navigation: any }> = ({ navigation }) => {
  const { user, logout, switchRole } = useAuth();
  const [profileModalVisible, setProfileModalVisible] = useState(false);

  const firstName = user?.full_name?.split(' ')[0] || 'Employer';

  const handlePostJob = () => {
    navigation.navigate('PostJob');
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <TouchableOpacity style={styles.iconButton}>
            <Menu size={24} color="#333" />
          </TouchableOpacity>
          <View style={styles.logoPlaceholder}>
            <Text weight="bold" style={styles.logoText}>A</Text>
          </View>
          <Text weight="semiBold" style={styles.brandText}>Acrapath</Text>
        </View>

        <TouchableOpacity 
          style={styles.profileSection} 
          onPress={() => setProfileModalVisible(true)}
        >
          <User size={24} color="#666" />
          <ChevronDown size={16} color="#666" style={{ marginLeft: 4 }} />
        </TouchableOpacity>
      </View>

      <View style={styles.content}>
        <View style={styles.welcomeRow}>
          <Text weight="semiBold" style={styles.greeting}>Good Morning, {firstName}...</Text>
          <Button 
            title="Post Job" 
            onPress={handlePostJob} 
            style={styles.postJobBtn}
            textStyle={styles.postJobBtnText}
          />
        </View>
      </View>

      {/* Profile Modal */}
      <Modal
        visible={profileModalVisible}
        transparent={true}
        animationType="fade"
        onRequestClose={() => setProfileModalVisible(false)}
      >
        <TouchableOpacity 
          style={styles.modalOverlay} 
          activeOpacity={1} 
          onPress={() => setProfileModalVisible(false)}
        >
          <View style={styles.dropdownMenu}>
            <TouchableOpacity 
              style={styles.menuItem}
              onPress={() => {
                setProfileModalVisible(false);
                switchRole('candidate');
              }}
            >
              <Text style={styles.menuItemText}>Switch to Candidate Mode</Text>
            </TouchableOpacity>
            
            <View style={styles.divider} />

            <TouchableOpacity 
              style={styles.menuItem}
              onPress={() => {
                setProfileModalVisible(false);
                logout();
              }}
            >
              <Text style={[styles.menuItemText, { color: '#EF4444' }]}>Log Out</Text>
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
      </Modal>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#FAFAFA',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#FFF',
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconButton: {
    marginRight: 16,
  },
  logoPlaceholder: {
    width: 24,
    height: 24,
    backgroundColor: '#147FF6',
    borderRadius: 6,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 8,
  },
  logoText: {
    color: '#FFF',
    fontSize: 14,
  },
  brandText: {
    fontSize: 18,
    color: '#147FF6',
  },
  profileSection: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 4,
  },
  content: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 32,
  },
  welcomeRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  greeting: {
    fontSize: 18,
    color: '#000',
    flex: 1,
  },
  postJobBtn: {
    height: 36,
    paddingHorizontal: 20,
    borderRadius: 20,
    minWidth: 100,
  },
  postJobBtnText: {
    fontSize: 14,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.1)',
  },
  dropdownMenu: {
    position: 'absolute',
    top: 60,
    right: 16,
    backgroundColor: '#FFF',
    borderRadius: 12,
    padding: 8,
    minWidth: 200,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 5,
  },
  menuItem: {
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
  menuItemText: {
    fontSize: 15,
    color: '#333',
  },
  divider: {
    height: 1,
    backgroundColor: '#F0F0F0',
    marginVertical: 4,
  },
});
