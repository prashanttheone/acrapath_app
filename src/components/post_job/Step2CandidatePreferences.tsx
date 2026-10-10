import React, { useState } from 'react';
import { View, StyleSheet, ScrollView, TouchableOpacity, TextInput as RNTextInput } from 'react-native';
import { Text } from '../ui/Text';
import { Pill } from '../ui/Pill';
import { ChevronDown, Star, X } from 'lucide-react-native';
import { useAppDispatch, useAppSelector } from '../../stores/hooks';
import { updateJobPostData } from '../../stores/slices/jobPostSlice';
import { Dropdown } from 'react-native-element-dropdown';

const EXP_OPTIONS = Array.from({ length: 11 }, (_, i) => ({ label: `${i} Years`, value: String(i) }));

const qualificationsRows = [
  ['12th Pass', 'Diploma', 'Graduate'],
  ['Post-Graduate']
];

const suggestionsList = [
  'Google Ads', 'Facebook Ads', 'Instagram Ads',
  'Email Marketing', 'Content Marketing'
];

export const Step2CandidatePreferences = () => {
  const dispatch = useAppDispatch();
  const { qualification, minExperience, maxExperience, skills } = useAppSelector((state) => state.jobPost);

  const [skillInput, setSkillInput] = useState('');

  const toggleSuggestion = (skill: string) => {
    if (!skills.includes(skill)) {
      dispatch(updateJobPostData({ skills: [...skills, skill] }));
    }
  };

  const removeSkill = (indexToRemove: number) => {
    dispatch(updateJobPostData({ skills: skills.filter((_, index) => index !== indexToRemove) }));
  };

  const handleAddSkill = () => {
    if (skillInput.trim() && !skills.includes(skillInput.trim())) {
      dispatch(updateJobPostData({ skills: [...skills, skillInput.trim()] }));
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
                selected={qualification === qual}
                onPress={() => dispatch(updateJobPostData({ qualification: qual }))}
              />
            ))}
          </View>
        ))}
      </View>

      {/* Work Experience */}
      <Text weight="medium" style={styles.sectionTitle}>Work Experience</Text>
      <View style={styles.row}>
        <Dropdown
          style={styles.dropdownBox}
          placeholderStyle={styles.dropdownText}
          selectedTextStyle={styles.dropdownSelectedText}
          containerStyle={styles.dropdownContainer}
          itemTextStyle={styles.dropdownItemText}
          data={EXP_OPTIONS}
          maxHeight={200}
          labelField="label"
          valueField="value"
          placeholder="Minimum Exp"
          value={minExperience}
          onChange={item => {
            dispatch(updateJobPostData({ minExperience: item.value }));
          }}
          renderRightIcon={() => <ChevronDown size={16} color="#666" />}
        />

        <Text style={styles.toText}>to</Text>

        <Dropdown
          style={styles.dropdownBox}
          placeholderStyle={styles.dropdownText}
          selectedTextStyle={styles.dropdownSelectedText}
          containerStyle={styles.dropdownContainer}
          itemTextStyle={styles.dropdownItemText}
          data={EXP_OPTIONS}
          maxHeight={200}
          labelField="label"
          valueField="value"
          placeholder="Max Exp.."
          value={maxExperience}
          onChange={item => {
            dispatch(updateJobPostData({ maxExperience: item.value }));
          }}
          renderRightIcon={() => <ChevronDown size={16} color="#666" />}
        />
      </View>

      {/* Add Skills */}
      <Text weight="medium" style={styles.sectionTitle}>Add Skills *</Text>

      <View style={styles.skillsInputContainer}>
        <View style={styles.selectedSkillsWrapper}>
          {skills.map((skill, index) => (
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
    height: 40,
    borderWidth: 1,
    borderColor: '#D1D5DB',
    borderRadius: 8,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 5,
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
  dropdownSelectedText: {
    fontSize: 14,
    color: '#000',
  },
  dropdownSearchInput: {
    height: 50,
    fontSize: 14,
  },
  dropdownContainer: {
    backgroundColor: '#FFF',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    marginTop: -30,
    paddingTop: 0,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  dropdownItemText: {
    fontSize: 14,
    color: '#000',
  },
});
