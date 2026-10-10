import React from 'react';
import { View, StyleSheet, TouchableOpacity, TextInput } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Text } from '../components/ui/Text';
import { Button } from '../components/ui/Button';
import { useTheme } from '../theme/useTheme';
import { useAuth } from '../app/provider/AuthProvider';
import { Search, ChevronDown, ArrowLeft } from 'lucide-react-native';

export const CandidateDashboard = () => {
  const { colors } = useTheme();
  const { user, logout } = useAuth();

  return (
    <SafeAreaView style={styles.safeArea}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.logoPlaceholder}>
          <View style={styles.logoIcon}>
            <Text weight="bold" style={styles.logoText}>A</Text>
          </View>
        </View>

        <View style={styles.searchBar}>
          <Search size={16} color="#666" style={styles.searchIcon} />
          <TextInput 
            placeholder="Search jobs here" 
            style={styles.searchInput}
            placeholderTextColor="#666"
          />
        </View>

        <TouchableOpacity style={styles.profileSection} onPress={logout}>
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>{(user?.full_name || 'U').charAt(0)}</Text>
          </View>
          <ChevronDown size={16} color="#333" />
        </TouchableOpacity>
      </View>

      <View style={styles.content}>
        <TouchableOpacity style={styles.backButton}>
          <ArrowLeft size={24} color="#333" />
        </TouchableOpacity>

        <Text weight="semiBold" style={styles.greeting}>Hey {user?.full_name?.split(' ')[0] || 'Candidate'},</Text>
        <Text weight="bold" style={styles.title}>Find your dream job</Text>

        <View style={styles.inputContainer}>
          <TextInput 
            placeholder="Enter skills, designation" 
            style={styles.input}
            placeholderTextColor="#666"
          />
        </View>

        <View style={styles.inputContainer}>
          <TextInput 
            placeholder="Enter locations" 
            style={styles.input}
            placeholderTextColor="#666"
          />
        </View>

        <Button 
          title="Search jobs" 
          onPress={() => console.log('Searching jobs')} 
          style={styles.searchBtn} 
        />
      </View>
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
});
