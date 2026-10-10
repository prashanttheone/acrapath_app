import React, { useState } from 'react';
import { View, StyleSheet, TouchableOpacity, TextInput as RNTextInput } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Text } from '../components/ui/Text';
import { Button } from '../components/ui/Button';
import { ArrowLeft } from 'lucide-react-native';
import { useAuth } from '../app/provider/AuthProvider';

export const SearchScreen = ({ navigation }: any) => {
  const { user } = useAuth();
  const firstName = user?.full_name?.split(' ')[0] || 'There';
  
  const [skills, setSkills] = useState('');
  const [locations, setLocations] = useState('');

  const handleSearch = () => {
    // Navigate back to the list and pass params, or dispatch to redux
    // For now we just go back
    navigation.goBack();
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <ArrowLeft size={24} color="#333" />
        </TouchableOpacity>
      </View>

      <View style={styles.content}>
        <Text weight="bold" style={styles.greeting}>Hey {firstName},</Text>
        <Text weight="medium" style={styles.subtitle}>Find your dream job</Text>

        <View style={styles.inputsContainer}>
          <View style={styles.inputWrapper}>
            <RNTextInput
              placeholder="Enter skills, designation"
              placeholderTextColor="#999"
              style={styles.input}
              value={skills}
              onChangeText={setSkills}
            />
          </View>
          <View style={styles.inputWrapper}>
            <RNTextInput
              placeholder="Enter locations"
              placeholderTextColor="#999"
              style={styles.input}
              value={locations}
              onChangeText={setLocations}
            />
          </View>
        </View>

        <Button 
          title="Search jobs" 
          onPress={handleSearch}
          style={styles.searchBtn}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#F8F9FA', // Slight off-white background matching Figma
  },
  header: {
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 24,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#FFF',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  content: {
    paddingHorizontal: 24,
  },
  greeting: {
    fontSize: 16,
    color: '#000',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 22,
    color: '#666',
    marginBottom: 32,
  },
  inputsContainer: {
    gap: 16,
    marginBottom: 24,
  },
  inputWrapper: {
    backgroundColor: '#FFF',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E6E6E6',
    height: 56,
    justifyContent: 'center',
    paddingHorizontal: 16,
  },
  input: {
    fontSize: 16,
    color: '#333',
    height: '100%',
  },
  searchBtn: {
    height: 56,
    borderRadius: 12,
  }
});
