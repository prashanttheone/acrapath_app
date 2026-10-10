import React from 'react';
import { View, StyleSheet, ScrollView, TouchableOpacity, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Text } from '../components/ui/Text';
import { Button } from '../components/ui/Button';
import { Briefcase, MapPin, IndianRupee, ArrowLeft, Clock } from 'lucide-react-native';
import { JobCardProps } from '../components/jobs/JobCard';
import { useJobDetails } from '../hooks/useJobDetails';

export const JobDetailsScreen = ({ route, navigation }: any) => {
  const { job: initialJob } = route.params as { job: JobCardProps | any };
  const jobId = initialJob?._id || initialJob?.id;

  const { data: jobData, isLoading, isError } = useJobDetails(jobId);

  const renderContent = () => {
    if (isLoading) {
      return (
        <View style={styles.centerContainer}>
          <ActivityIndicator size="large" color="#147FF6" />
        </View>
      );
    }

    if (isError || !jobData) {
      return (
        <View style={styles.centerContainer}>
          <Text style={styles.errorText}>Failed to load job details.</Text>
        </View>
      );
    }

    // Map backend response fields
    const title = jobData.jobTitle || jobData.job_role || jobData.title || 'Untitled';
    const company = jobData.companyName || jobData.company_name || 'Company Name';
    const experience = jobData.min_experience ? `${jobData.min_experience}-${jobData.max_experience} Yrs` : (jobData.experience || 'Not specified');
    const salary = jobData.min_salary ? `₹ ${jobData.min_salary}-${jobData.max_salary} LPA` : (jobData.salary || 'Not Disclosed');
    const location = jobData.location ? (Array.isArray(jobData.location) ? jobData.location.join(', ') : jobData.location) : 'Remote';
    const skills = jobData.skills || [];
    const description = jobData.jobDescription || jobData.description || 'No description available for this role.';
    const jobType = jobData.jobType || jobData.job_type || 'Full-time';
    const workMode = jobData.workMode || jobData.work_mode || 'Onsite';
    const perks = jobData.perks || [];

    return (
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.titleSection}>
          <View style={styles.titleRow}>
            <View style={{ flex: 1 }}>
              <Text weight="bold" style={styles.title}>{title}</Text>
              <Text weight="medium" style={styles.company}>{company}</Text>
            </View>
            <View style={styles.logoPlaceholder} />
          </View>

          <View style={styles.detailsRow}>
            <View style={styles.detailItem}>
              <Briefcase size={16} color="#666" style={styles.icon} />
              <Text style={styles.detailText}>{experience}</Text>
            </View>
            <View style={styles.detailItem}>
              <IndianRupee size={16} color="#666" style={styles.icon} />
              <Text style={styles.detailText}>{salary}</Text>
            </View>
            <View style={styles.detailItem}>
              <MapPin size={16} color="#666" style={styles.icon} />
              <Text style={styles.detailText}>{location}</Text>
            </View>
          </View>
          
          <View style={[styles.detailsRow, { marginTop: 12 }]}>
             <View style={styles.detailItem}>
              <Clock size={16} color="#666" style={styles.icon} />
              <Text style={styles.detailText}>{jobType} • {workMode}</Text>
            </View>
          </View>
        </View>

        {skills.length > 0 && (
          <View style={styles.section}>
            <Text weight="semiBold" style={styles.sectionTitle}>Skills Required</Text>
            <View style={styles.skillsWrapper}>
              {skills.map((skill: string, index: number) => (
                <View key={index} style={styles.skillBadge}>
                  <Text style={styles.skillText}>{skill}</Text>
                </View>
              ))}
            </View>
          </View>
        )}

        <View style={styles.section}>
          <Text weight="semiBold" style={styles.sectionTitle}>About the Role</Text>
          <Text style={styles.description}>{description}</Text>
        </View>

        {perks.length > 0 && (
          <View style={styles.section}>
            <Text weight="semiBold" style={styles.sectionTitle}>Perks & Benefits</Text>
            <View style={styles.skillsWrapper}>
              {perks.map((perk: string, index: number) => (
                <View key={index} style={styles.perkBadge}>
                  <Text style={styles.perkText}>{perk}</Text>
                </View>
              ))}
            </View>
          </View>
        )}
        
        <View style={{ height: 40 }} />
      </ScrollView>
    );
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <ArrowLeft size={24} color="#333" />
        </TouchableOpacity>
        <Text weight="bold" style={styles.headerTitle}>Job Details</Text>
        <View style={{ width: 24 }} />
      </View>

      {renderContent()}

      <View style={styles.footer}>
        <Button 
          title="Apply Now" 
          onPress={() => console.log('Applying to', jobId)} 
          disabled={isLoading || isError}
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
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 16,
    backgroundColor: '#FFF',
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  backButton: {
    padding: 4,
  },
  headerTitle: {
    fontSize: 18,
    color: '#333',
  },
  content: {
    padding: 24,
  },
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorText: {
    color: '#FF3B30',
    fontSize: 14,
  },
  titleSection: {
    marginBottom: 24,
    backgroundColor: '#FFF',
    padding: 20,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#F0F0F0',
  },
  titleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 16,
  },
  title: {
    fontSize: 20,
    color: '#111',
    marginBottom: 4,
  },
  company: {
    fontSize: 16,
    color: '#666',
  },
  logoPlaceholder: {
    width: 48,
    height: 48,
    backgroundColor: '#F5F5F5',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#EAEAEA',
  },
  detailsRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 16,
  },
  detailItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    marginRight: 6,
  },
  detailText: {
    fontSize: 14,
    color: '#444',
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    color: '#111',
    marginBottom: 12,
  },
  skillsWrapper: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  skillBadge: {
    backgroundColor: '#F0F7FF',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#D6E8FF',
  },
  skillText: {
    color: '#147FF6',
    fontSize: 13,
    fontWeight: '500',
  },
  perkBadge: {
    backgroundColor: '#F5F5F5',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#EAEAEA',
  },
  perkText: {
    color: '#444',
    fontSize: 13,
    fontWeight: '500',
  },
  description: {
    fontSize: 15,
    color: '#444',
    lineHeight: 24,
  },
  footer: {
    padding: 24,
    backgroundColor: '#FFF',
    borderTopWidth: 1,
    borderTopColor: '#F0F0F0',
  }
});
