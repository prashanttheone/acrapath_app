import React from 'react';
import { View, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Text } from '../components/ui/Text';
import { ArrowLeft } from 'lucide-react-native';
import { useAuth } from '../app/provider/AuthProvider';
import { JobSearchForm } from '../components/search/JobSearchForm';

export const SearchScreen = ({ navigation }: any) => {
  const { user } = useAuth();
  const firstName = user?.full_name?.split(' ')[0] || 'There';

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <ArrowLeft size={24} color="#333" />
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.content} keyboardShouldPersistTaps="handled">
        <Text weight="bold" style={styles.greeting}>Hey {firstName},</Text>
        <Text weight="medium" style={styles.subtitle}>Find your dream job</Text>

        <JobSearchForm onSearch={() => navigation.goBack()} />

      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#F8F9FA',
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
    paddingBottom: 40,
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
});
