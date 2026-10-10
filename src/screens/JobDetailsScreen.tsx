import React from 'react';
import { View, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Text } from '../components/ui/Text';
import { Button } from '../components/ui/Button';
import { Briefcase, MapPin, IndianRupee, ArrowLeft } from 'lucide-react-native';
import { JobCardProps } from '../components/jobs/JobCard';

export const JobDetailsScreen = ({ route, navigation }: any) => {
  const { job } = route.params as { job: JobCardProps };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <ArrowLeft size={24} color="#333" />
        </TouchableOpacity>
        <Text weight="bold" style={styles.headerTitle}>Job Details</Text>
        <View style={{ width: 24 }} />
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.titleSection}>
          <View style={styles.titleRow}>
            <View style={{ flex: 1 }}>
              <Text weight="bold" style={styles.title}>{job.title}</Text>
              <Text weight="medium" style={styles.company}>{job.company}</Text>
            </View>
            <View style={styles.logoPlaceholder} />
          </View>

          <View style={styles.detailsRow}>
            <View style={styles.detailItem}>
              <Briefcase size={16} color="#666" style={styles.icon} />
              <Text style={styles.detailText}>{job.experience}</Text>
            </View>
            <View style={styles.detailItem}>
              <IndianRupee size={16} color="#666" style={styles.icon} />
              <Text style={styles.detailText}>{job.salary}</Text>
            </View>
            <View style={styles.detailItem}>
              <MapPin size={16} color="#666" style={styles.icon} />
              <Text style={styles.detailText}>{job.location}</Text>
            </View>
          </View>
        </View>

        <View style={styles.section}>
          <Text weight="semiBold" style={styles.sectionTitle}>Skills Required</Text>
          <View style={styles.skillsWrapper}>
            {job.skills.map((skill, index) => (
              <View key={index} style={styles.skillBadge}>
                <Text style={styles.skillText}>{skill}</Text>
              </View>
            ))}
          </View>
        </View>

        <View style={styles.section}>
          <Text weight="semiBold" style={styles.sectionTitle}>About the Role</Text>
          <Text style={styles.description}>
            This is a placeholder description for the {job.title} role at {job.company}. 
            You will be responsible for building and maintaining robust software applications.
            More dynamic data can be passed here from the API in the future!
          </Text>
        </View>
      </ScrollView>

      <View style={styles.footer}>
        <Button title="Apply Now" onPress={() => console.log('Applying to', job.id)} />
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
  titleSection: {
    backgroundColor: '#FFF',
    borderRadius: 12,
    padding: 20,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#E6E6E6',
  },
  titleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 16,
  },
  title: {
    fontSize: 22,
    color: '#333',
    marginBottom: 4,
  },
  company: {
    fontSize: 16,
    color: '#666',
  },
  logoPlaceholder: {
    width: 60,
    height: 60,
    backgroundColor: '#E5E5E5',
    borderRadius: 8,
  },
  detailsRow: {
    flexDirection: 'row',
    alignItems: 'center',
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
    color: '#333',
    marginBottom: 12,
  },
  skillsWrapper: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  skillBadge: {
    backgroundColor: '#F2F2F7',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
  },
  skillText: {
    fontSize: 13,
    color: '#4D4D4D',
  },
  description: {
    fontSize: 15,
    color: '#666',
    lineHeight: 24,
  },
  footer: {
    padding: 20,
    backgroundColor: '#FFF',
    borderTopWidth: 1,
    borderTopColor: '#F0F0F0',
  }
});
