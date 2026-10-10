import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { Text } from '../ui/Text';
import { Briefcase, MapPin, IndianRupee, Star } from 'lucide-react-native';

export interface JobCardProps {
  id: string;
  title: string;
  company: string;
  experience: string;
  salary: string;
  location: string;
  skills: string[];
  isExclusive?: boolean;
  onPress?: () => void;
}

export const JobCard: React.FC<JobCardProps> = ({
  title,
  company,
  experience,
  salary,
  location,
  skills,
  isExclusive,
  onPress,
}) => {
  return (
    <TouchableOpacity style={styles.card} onPress={onPress} activeOpacity={0.7}>
      <View style={styles.headerRow}>
        <View style={styles.titleContainer}>
          <Text weight="semiBold" style={styles.title}>{title}</Text>
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

      <View style={styles.skillsContainer}>
        <Text style={styles.skillsLabel}>Skills required:</Text>
        <Text style={styles.skillsList} numberOfLines={2}>
          {skills.join(' , ')}
        </Text>
      </View>

      {isExclusive && (
        <View style={styles.exclusiveBadge}>
          <Star size={14} color="#147FF6" fill="#147FF6" style={styles.starIcon} />
          <Text weight="semiBold" style={styles.exclusiveText}>Exclusive post for members only</Text>
        </View>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#F0F0F0',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 16,
  },
  titleContainer: {
    flex: 1,
    paddingRight: 12,
  },
  title: {
    fontSize: 16,
    color: '#147FF6',
    marginBottom: 4,
  },
  company: {
    fontSize: 14,
    color: '#666',
  },
  logoPlaceholder: {
    width: 48,
    height: 48,
    backgroundColor: '#E5E5E5',
    borderRadius: 8,
  },
  detailsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
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
    fontSize: 13,
    color: '#444',
  },
  skillsContainer: {
    marginBottom: 8,
  },
  skillsLabel: {
    fontSize: 13,
    color: '#888',
    marginBottom: 4,
  },
  skillsList: {
    fontSize: 13,
    color: '#444',
    lineHeight: 20,
  },
  exclusiveBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#E6F0FD',
    borderRadius: 8,
    paddingVertical: 8,
    marginTop: 12,
  },
  starIcon: {
    marginRight: 6,
  },
  exclusiveText: {
    color: '#147FF6',
    fontSize: 12,
  }
});
