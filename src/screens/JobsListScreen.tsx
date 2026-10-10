import React, { useState } from 'react';
import { View, StyleSheet, FlatList, ScrollView, TouchableOpacity, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Text } from '../components/ui/Text';
import { JobCard } from '../components/jobs/JobCard';
import { useAppDispatch, useAppSelector } from '../stores/hooks';
import { setFilter, resetFilters } from '../stores/slices/jobFilterSlice';
import { useJobs } from '../hooks/useJobs';

const FILTER_CHIPS = [
  { label: 'All', key: 'all' },
  { label: 'Remote', key: 'location', value: 'Remote' },
  { label: 'Full-time', key: 'job_type', value: 'Full-time' },
  { label: '1-3 Yrs', key: 'experience', value: '1-3 Yrs' },
  { label: 'Gurgaon', key: 'location', value: 'Gurgaon' },
];

export const JobsListScreen = ({ navigation }: any) => {
  const dispatch = useAppDispatch();
  const filters = useAppSelector((state) => state.jobFilter);
  const [activeChip, setActiveChip] = useState('all');

  const { data, isLoading, isError, refetch } = useJobs(filters);

  const handleFilterPress = (chip: any) => {
    setActiveChip(chip.label);
    if (chip.key === 'all') {
      dispatch(resetFilters());
    } else {
      dispatch(resetFilters());
      dispatch(setFilter({ [chip.key]: chip.value }));
    }
  };

  const renderFilterChips = () => (
    <View style={styles.filtersWrapper}>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.filtersScroll}>
        {FILTER_CHIPS.map((chip, index) => {
          const isActive = activeChip === chip.label;
          return (
            <TouchableOpacity 
              key={index} 
              style={[styles.chip, isActive && styles.chipActive]}
              onPress={() => handleFilterPress(chip)}
            >
              <Text style={[styles.chipText, isActive && styles.chipTextActive]}>
                {chip.label}
              </Text>
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    </View>
  );

  const renderContent = () => {
    if (isLoading) {
      return (
        <View style={styles.centerContainer}>
          <ActivityIndicator size="large" color="#147FF6" />
        </View>
      );
    }
    
    if (isError) {
      return (
        <View style={styles.centerContainer}>
          <Text style={styles.errorText}>Error fetching jobs. Pull to refresh.</Text>
        </View>
      );
    }

    const jobs = data?.jobs || [];

    if (jobs.length === 0) {
      return (
        <View style={styles.centerContainer}>
          <Text style={styles.emptyText}>No jobs found for the selected filters.</Text>
        </View>
      );
    }

    return (
      <FlatList
        data={jobs}
        keyExtractor={(item) => item._id}
        contentContainerStyle={styles.listContainer}
        showsVerticalScrollIndicator={false}
        refreshing={isLoading}
        onRefresh={refetch}
        renderItem={({ item }) => (
          <JobCard
            id={item._id}
            title={item.jobTitle || item.job_role || item.title || 'Untitled'}
            company={item.companyName || item.company_name || 'Company Name'}
            experience={item.min_experience ? `${item.min_experience}-${item.max_experience} Yrs` : (item.experience || 'Experience not specified')}
            salary={item.min_salary ? `₹ ${item.min_salary}-${item.max_salary} LPA` : (item.salary || 'Not Disclosed')}
            location={item.location ? (Array.isArray(item.location) ? item.location.join(', ') : item.location) : 'Remote'}
            skills={item.skills || []}
            isExclusive={false}
            onPress={() => navigation.navigate('JobDetails', { job: item })}
          />
        )}
      />
    );
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.header}>
        <Text weight="bold" style={styles.headerTitle}>Recommended Jobs</Text>
      </View>
      
      {renderFilterChips()}
      
      {renderContent()}
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
  },
  headerTitle: {
    fontSize: 20,
    color: '#333',
  },
  filtersWrapper: {
    backgroundColor: '#FFF',
    paddingBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  filtersScroll: {
    paddingHorizontal: 20,
    gap: 8,
  },
  chip: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: '#F5F5F5',
    borderWidth: 1,
    borderColor: '#EAEAEA',
  },
  chipActive: {
    backgroundColor: '#147FF6',
    borderColor: '#147FF6',
  },
  chipText: {
    fontSize: 14,
    color: '#666',
  },
  chipTextActive: {
    color: '#FFF',
    fontWeight: '500',
  },
  listContainer: {
    padding: 24,
  },
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
  errorText: {
    color: '#EF4444',
    fontSize: 14,
  },
  emptyText: {
    color: '#666',
    fontSize: 15,
  }
});
