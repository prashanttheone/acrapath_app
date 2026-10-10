import React from 'react';
import { View, StyleSheet, TouchableOpacity, TextInput, Modal } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Text } from '../components/ui/Text';
import { JobSearchForm } from '../components/search/JobSearchForm';
import { useTheme } from '../theme/useTheme';
import { useAuth } from '../app/provider/AuthProvider';
import { Search, ChevronDown, ArrowLeft } from 'lucide-react-native';
import { useAppSelector } from '../stores/hooks';

export const CandidateDashboard = ({ navigation }: any) => {
  const { colors } = useTheme();
  const { user, logout, switchRole } = useAuth();
  const [profileModalVisible, setProfileModalVisible] = React.useState(false);
  const filters = useAppSelector((state) => state.jobFilter);

  const displaySearchText = [...(filters.skills || []), filters.location]
    .filter(Boolean)
    .join(' • ');

  return (
    <SafeAreaView style={styles.safeArea}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.logoPlaceholder}>
          <View style={styles.logoIcon}>
            <Text weight="bold" style={styles.logoText}>A</Text>
          </View>
        </View>

        <TouchableOpacity 
          style={styles.searchBar}
          activeOpacity={0.8}
          onPress={() => navigation.navigate('SearchScreen')}
        >
          <Search size={16} color="#666" style={styles.searchIcon} />
          <TextInput
            placeholder="Search jobs here"
            value={displaySearchText}
            style={styles.searchInput}
            placeholderTextColor="#666"
            editable={false}
            pointerEvents="none"
          />
        </TouchableOpacity>

        <TouchableOpacity style={styles.profileSection} onPress={() => setProfileModalVisible(true)}>
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>{(user?.full_name || 'U').charAt(0)}</Text>
          </View>
          <ChevronDown size={16} color="#333" />
        </TouchableOpacity>
      </View>

      <View style={styles.content}>


        <Text weight="semiBold" style={styles.greeting}>Hey {user?.full_name?.split(' ')[0] || 'Candidate'},</Text>
        <Text weight="bold" style={styles.title}>Find your dream job</Text>

        <JobSearchForm onSearch={() => navigation.navigate('CandidateTabs', { screen: 'Jobs' })} />
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
            {user?.is_recruiter && (
              <>
                <TouchableOpacity 
                  style={styles.menuItem}
                  onPress={() => {
                    setProfileModalVisible(false);
                    switchRole('recruiter');
                  }}
                >
                  <Text style={styles.menuItemText}>Switch to Employer Mode</Text>
                </TouchableOpacity>
                <View style={styles.divider} />
              </>
            )}

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
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#FFF',
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  logoPlaceholder: {
    marginRight: 16,
  },
  logoIcon: {
    width: 32,
    height: 32,
    backgroundColor: '#0052FF',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoText: {
    color: '#FFF',
    fontSize: 20,
  },
  searchBar: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFF',
    borderWidth: 1,
    borderColor: '#E6E6E6',
    borderRadius: 24,
    paddingHorizontal: 12,
    height: 40,
    marginRight: 16,
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    fontSize: 14,
    color: '#333',
    padding: 0,
  },
  profileSection: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatar: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#666',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 4,
  },
  avatarText: {
    color: '#FFF',
    fontSize: 14,
    fontWeight: 'bold',
  },
  content: {
    flex: 1,
    padding: 24,
  },
  backButton: {
    marginBottom: 24,
  },
  greeting: {
    fontSize: 16,
    color: '#000',
    marginBottom: 4,
  },
  title: {
    fontSize: 28,
    color: '#808080',
    marginBottom: 32,
  },
  inputContainer: {
    marginBottom: 16,
  },
  input: {
    height: 56,
    borderWidth: 1,
    borderColor: '#E6E6E6',
    borderRadius: 12,
    paddingHorizontal: 16,
    fontSize: 16,
    backgroundColor: '#FFF',
    color: '#333',
  },
  searchBtn: {
    marginTop: 8,
    height: 56,
    borderRadius: 12,
    backgroundColor: '#007AFF',
  },
  divider: {
    height: 1,
    backgroundColor: '#F0F0F0',
    marginVertical: 4,
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
});
