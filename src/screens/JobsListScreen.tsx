import React, { useState } from 'react';
import { View, StyleSheet, FlatList, TouchableOpacity, ActivityIndicator, Modal } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Text } from '../components/ui/Text';
import { JobCard } from '../components/jobs/JobCard';
import { JobCardSkeleton } from '../components/jobs/JobCardSkeleton';
import { useAppDispatch, useAppSelector } from '../stores/hooks';
import { setFilter } from '../stores/slices/jobFilterSlice';
import { useJobs } from '../hooks/useJobs';
import { Search, Filter as FilterIcon, ArrowLeft, X } from 'lucide-react-native';

export const JobsListScreen = ({ navigation }: any) => {
  const dispatch = useAppDispatch();
  const filters = useAppSelector((state) => state.jobFilter);
  const [filterModalVisible, setFilterModalVisible] = useState(false);

  const displaySearchText = [...(filters.skills || []), filters.location]
    .filter(Boolean)
    .join(' • ') || 'Search jobs here';

  const { data, isLoading, isError, refetch, fetchNextPage, hasNextPage, isFetchingNextPage } = useJobs(filters);
  const jobs = data?.pages?.flatMap(page => page.jobs) || [];
  const jobCount = data?.pages?.[0]?.totalJobs || 0;

  const renderContent = () => {
    if (isLoading && jobs.length === 0) {
      return (
        <FlatList
          data={[1, 2, 3, 4, 5]}
          keyExtractor={(item) => item.toString()}
          contentContainerStyle={styles.listContainer}
          showsVerticalScrollIndicator={false}
          renderItem={() => <JobCardSkeleton />}
        />
      );
    }
    
    if (isError) {
      return (
        <View style={styles.centerContainer}>
          <Text style={styles.errorText}>Error fetching jobs. Pull to refresh.</Text>
        </View>
      );
    }

    // jobs array is already extracted above

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
        onEndReached={() => {
          if (hasNextPage && !isFetchingNextPage) {
            fetchNextPage();
          }
        }}
        onEndReachedThreshold={0.5}
        ListFooterComponent={
          isFetchingNextPage ? (
            <View style={{ padding: 16 }}>
              <ActivityIndicator size="small" color="#147FF6" />
            </View>
          ) : undefined
        }
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
        <View style={styles.headerTop}>
          <TouchableOpacity onPress={() => navigation.canGoBack() && navigation.goBack()} style={styles.backButton}>
            <ArrowLeft size={24} color="#333" />
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={styles.searchBar}
            activeOpacity={0.8}
            onPress={() => navigation.navigate('SearchScreen')}
          >
            <Search size={18} color="#111" style={styles.searchIcon} />
            <Text style={styles.searchText} numberOfLines={1}>
              {displaySearchText}
            </Text>
          </TouchableOpacity>
        </View>
        
        <View style={styles.headerBottom}>
          <Text weight="semiBold" style={styles.jobsCountText}>{jobCount} jobs</Text>
          <TouchableOpacity style={styles.filterBtn} onPress={() => setFilterModalVisible(true)}>
            <Text weight="semiBold" style={styles.filterText}>Filter</Text>
            <FilterIcon size={16} color="#147FF6" />
          </TouchableOpacity>
        </View>
      </View>
      
      {renderContent()}

      <Modal
        visible={filterModalVisible}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setFilterModalVisible(false)}
      >
        <TouchableOpacity style={styles.modalOverlay} activeOpacity={1} onPress={() => setFilterModalVisible(false)}>
          <View style={styles.bottomSheet} onStartShouldSetResponder={() => true}>
            <View style={styles.sheetHeader}>
              <Text weight="bold" style={styles.sheetTitle}>Filters</Text>
              <TouchableOpacity onPress={() => setFilterModalVisible(false)}>
                <X size={24} color="#333" />
              </TouchableOpacity>
            </View>

            <View style={styles.sheetContent}>
              <Text style={{ color: '#666', marginBottom: 20 }}>More filter options coming soon!</Text>
              
              <TouchableOpacity 
                style={styles.clearFilterBtn}
                onPress={() => {
                  dispatch(setFilter({ skills: [], location: '' }));
                  setFilterModalVisible(false);
                }}
              >
                <Text weight="semiBold" style={styles.clearFilterText}>Clear All Filters</Text>
              </TouchableOpacity>
            </View>
          </View>
        </TouchableOpacity>
      </Modal>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#F8F9FA',
  },
  header: {
    backgroundColor: '#FFF',
    paddingHorizontal: 20,
    paddingTop: 12,
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  headerTop: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  backButton: {
    marginRight: 16,
  },
  searchBar: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    height: 48,
    backgroundColor: '#FFF',
    borderWidth: 1,
    borderColor: '#E6E6E6',
    borderRadius: 24,
    paddingHorizontal: 16,
  },
  searchIcon: {
    marginRight: 8,
  },
  searchText: {
    flex: 1,
    color: '#111',
    fontSize: 14,
  },
  headerBottom: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  jobsCountText: {
    fontSize: 16,
    color: '#444',
  },
  filterBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  filterText: {
    color: '#147FF6',
    fontSize: 15,
  },
  listContainer: {
    padding: 20,
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
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.4)',
    justifyContent: 'flex-end',
  },
  bottomSheet: {
    backgroundColor: '#FFF',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
    minHeight: 250,
  },
  sheetHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  sheetTitle: {
    fontSize: 18,
    color: '#000',
  },
  sheetContent: {
    flex: 1,
  },
  clearFilterBtn: {
    backgroundColor: '#FEE2E2',
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 'auto',
    marginBottom: 20,
  },
  clearFilterText: {
    color: '#EF4444',
    fontSize: 16,
  },
});
