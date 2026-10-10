import React from 'react';
import { View, StyleSheet, FlatList } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Text } from '../components/ui/Text';
import { JobCard } from '../components/jobs/JobCard';

const DUMMY_JOBS = [
  {
    id: '1',
    title: 'Full-stack Development',
    company: 'Oracle',
    experience: '2 Years Exp',
    salary: '₹ 16-20 Lacs PA',
    location: 'Gurgaon',
    skills: ['LinkedIn Ads', 'Meta Ads', 'Google Ads', 'Performance Marketing', 'Landing Page Optimisation'],
    isExclusive: false,
  },
  {
    id: '2',
    title: 'Frontend Developer',
    company: 'Acme Corp',
    experience: '3+ Yrs Exp',
    salary: '₹ 12-18 Lacs PA',
    location: 'Remote',
    skills: ['React', 'React Native', 'TypeScript', 'Redux'],
    isExclusive: true,
  },
  {
    id: '3',
    title: 'Backend Engineer',
    company: 'TechFlow',
    experience: '1-3 Yrs Exp',
    salary: '₹ 10-15 Lacs PA',
    location: 'Bangalore',
    skills: ['Node.js', 'Express', 'MongoDB', 'AWS'],
    isExclusive: false,
  },
];

export const JobsListScreen = ({ navigation }: any) => {
  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.header}>
        <Text weight="bold" style={styles.headerTitle}>Recommended Jobs</Text>
      </View>
      <FlatList
        data={DUMMY_JOBS}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContainer}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => (
          <JobCard
            {...item}
            onPress={() => navigation.navigate('JobDetails', { job: item })}
          />
        )}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#FAFAFA',
  },
  header: {
    paddingHorizontal: 24,
    paddingVertical: 16,
    backgroundColor: '#FFF',
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  headerTitle: {
    fontSize: 20,
    color: '#333',
  },
  listContainer: {
    padding: 24,
  }
});
