import React, { useState } from 'react';
import { View, StyleSheet, ScrollView, TouchableOpacity, TextInput as RNTextInput } from 'react-native';
import { Text } from '../ui/Text';
import { Pill } from '../ui/Pill';
import { ChevronDown, Star, X } from 'lucide-react-native';

const qualificationsRows = [
  ['12th Pass', 'Diploma', 'Graduate'],
  ['Post-Graduate']
];

const suggestionsList = [
  'Google Ads', 'Facebook Ads', 'Instagram Ads',
  'Email Marketing', 'Content Marketing'
];

export const Step2CandidatePreferences = () => {
  const [selectedQualification, setSelectedQualification] = useState('');
  const [selectedSkills, setSelectedSkills] = useState<string[]>(['Performance Marketing', 'SEO', 'Google Analytics', 'Social Media']);
  const [skillInput, setSkillInput] = useState('');

  const toggleSuggestion = (skill: string) => {
    if (!selectedSkills.includes(skill)) {
      setSelectedSkills([...selectedSkills, skill]);
    }
  };

  const removeSkill = (indexToRemove: number) => {
    setSelectedSkills(selectedSkills.filter((_, index) => index !== indexToRemove));
  };

  const handleAddSkill = () => {
    if (skillInput.trim() && !selectedSkills.includes(skillInput.trim())) {
      setSelectedSkills([...selectedSkills, skillInput.trim()]);
      setSkillInput('');
    }
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Text style={styles.subtitle}>Candidate preferences</Text>
      <Text weight="medium" style={styles.description}>We use this information to find the best professionals for the job</Text>

      {/* Qualifications */}
      <Text weight="medium" style={styles.sectionTitle}>Candidate Minimum Qualification *</Text>
      <View style={styles.pillContainer}>
        {qualificationsRows.map((row, rowIndex) => (
          <View key={`qual-${rowIndex}`} style={styles.pillRow}>
            {row.map((qual) => (
              <Pill
                key={qual}
                label={qual}
                selected={selectedQualification === qual}
                onPress={() => setSelectedQualification(qual)}
              />
            ))}
          </View>
        ))}
      </View>

      {/* Work Experience */}
      <Text weight="medium" style={styles.sectionTitle}>Work Experience</Text>
      <View style={styles.row}>
        <TouchableOpacity style={styles.dropdownBox}>
          <Text style={styles.dropdownText}>Minimum Exp</Text>
          <ChevronDown size={16} color="#666" />
        </TouchableOpacity>
        
        <Text style={styles.toText}>to</Text>
        
        <TouchableOpacity style={styles.dropdownBox}>
          <Text style={styles.dropdownText}>Maximum Exp</Text>
          <ChevronDown size={16} color="#666" />
        </TouchableOpacity>
      </View>

      {/* Add Skills */}
      <Text weight="medium" style={styles.sectionTitle}>Add Skills *</Text>
      
      <View style={styles.skillsInputContainer}>
        <View style={styles.selectedSkillsWrapper}>
          {selectedSkills.map((skill, index) => (
            <View key={`skill-${index}`} style={styles.skillTag}>
              <Star size={12} color="#B3B3B3" style={{ marginRight: 4 }} />
              <Text style={styles.skillTagText}>{skill}</Text>
              <TouchableOpacity onPress={() => removeSkill(index)} style={{ marginLeft: 6 }}>
                <X size={14} color="#666" />
              </TouchableOpacity>
            </View>
          ))}
        </View>
        <RNTextInput
          style={styles.skillTextInput}
          placeholder="Type Skill"
          placeholderTextColor="#666"
          value={skillInput}
          onChangeText={setSkillInput}
          onSubmitEditing={handleAddSkill}
          returnKeyType="done"
        />
      </View>

      <Text style={styles.suggestionsLabel}>Suggestions</Text>
      <View style={styles.pillContainer}>
        <View style={styles.pillRow}>
          {suggestionsList.map((sugg, index) => (
            <Pill
              key={`sugg-${index}`}
              label={sugg}
              selected={false}
              onPress={() => toggleSuggestion(sugg)}
              showActionIcon={true}
            />
          ))}
        </View>
      </View>

      {/* Padding at bottom for scroll */}
      <View style={{ height: 100 }} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    padding: 24,
  },
  subtitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  description: {
    fontSize: 12,
    color: '#666',
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 14,
    color: '#4D4D4D',
    marginBottom: 12,
  },
  pillContainer: {
    marginBottom: 24,
  },
  pillRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 24,
  },
  dropdownBox: {
    flex: 0.45,
    height: 48,
    borderWidth: 1,
    borderColor: '#D1D5DB',
    borderRadius: 8,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    backgroundColor: '#FFF',
  },
  dropdownText: {
    fontSize: 14,
    color: '#B3B3B3', // standard placeholder grey from figma
  },
  toText: {
    marginHorizontal: 8,
    color: '#666',
    fontSize: 14,
  },
  skillsInputContainer: {
    borderWidth: 1,
    borderColor: '#F3F4F6',
    borderRadius: 12,
    padding: 12,
    backgroundColor: '#FFFFFF', // Pure White
    minHeight: 120,
    marginBottom: 16,
  },
  selectedSkillsWrapper: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  skillTag: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#EBF5FF',
    borderWidth: 1,
    borderColor: '#147FF6',
    borderRadius: 50,
    paddingVertical: 6,
    paddingHorizontal: 10,
    marginRight: 8,
    marginBottom: 8,
  },
  skillTagText: {
    fontSize: 12.5,
    color: '#147FF6',
    fontWeight: '500',
  },
  skillTextInput: {
    fontSize: 14,
    color: '#000',
    marginTop: 8,
    paddingVertical: 4,
  },
  suggestionsLabel: {
    fontSize: 12.5,
    color: '#666',
    marginBottom: 12,
  },
});
