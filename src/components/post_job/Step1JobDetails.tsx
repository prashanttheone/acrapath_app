import React, { useState } from 'react';
import { View, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { TextInput } from '../ui/TextInput';
import { Text } from '../ui/Text';
import { Pill } from '../ui/Pill';

const jobTypesRows = [
  ['Full-time', 'Freelance', 'Part-time'],
  ['Contract', 'Internship']
];
const workModes = ['Onsite', 'Hybrid', 'Remote'];
const perksRows = [
  ['Health Insurance', 'Flexible Working Hours'],
  ['Joining Bonus', 'PF', 'Travel Allowance'],
  ['Joining Bonus', 'PF', 'Travel Allowance'],
];

export const Step1JobDetails = () => {
  const [companyName, setCompanyName] = useState('');
  const [jobTitle, setJobTitle] = useState('');
  const [jobRole, setJobRole] = useState('');
  const [selectedJobType, setSelectedJobType] = useState('Full-time');
  const [selectedWorkMode, setSelectedWorkMode] = useState('Onsite');
  const [minSalary, setMinSalary] = useState('');
  const [maxSalary, setMaxSalary] = useState('');
  const [isNightShift, setIsNightShift] = useState(false);
  const [isNotDisclose, setIsNotDisclose] = useState(false);
  const [selectedPerks, setSelectedPerks] = useState<string[]>(['Health Insurance']);

  const togglePerk = (perk: string) => {
    if (selectedPerks.includes(perk)) {
      setSelectedPerks(selectedPerks.filter(p => p !== perk));
    } else {
      setSelectedPerks([...selectedPerks, perk]);
    }
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Text style={styles.subtitle}>Job details</Text>
      <Text weight="medium" style={styles.description}>We use this information to find the best professionals for the job</Text>

      <TextInput
        label="Company Name *"
        placeholder="All India Institute of Occult Science"
        value={companyName}
        onChangeText={setCompanyName}
      />

      <TextInput
        label="Job Title / Designation *"
        placeholder="Eg. Performance Marketer"
        value={jobTitle}
        onChangeText={setJobTitle}
        showInfoIcon={true}
      />

      <TextInput
        label="Job Role *"
        placeholder="Eg. Performance Marketer"
        value={jobRole}
        onChangeText={setJobRole}
        showInfoIcon={true}
      />

      <Text weight="medium" style={styles.sectionTitle}>Job Type *</Text>
      <TouchableOpacity 
        style={styles.checkboxRow}
        onPress={() => setIsNightShift(!isNightShift)}
      >
        <View style={[styles.radioCircle, isNightShift && styles.radioCircleActive]}>
          {isNightShift && <View style={styles.radioInner} />}
        </View>
        <Text style={styles.checkboxText}>This is a night shift job</Text>
      </TouchableOpacity>
      <View style={styles.pillContainer}>
        {jobTypesRows.map((row, rowIndex) => (
          <View key={rowIndex} style={styles.pillRow}>
            {row.map((type) => (
              <Pill
                key={type}
                label={type}
                selected={selectedJobType === type}
                onPress={() => setSelectedJobType(type)}
              />
            ))}
          </View>
        ))}
      </View>

      <View style={styles.divider} />

      <Text weight="medium" style={styles.sectionTitle}>Location</Text>
      <Text weight="medium" style={styles.description}>Let candidate know they will work</Text>

      <Text weight="medium" style={styles.sectionTitle}>Work Mode *</Text>
      <View style={styles.pillContainer}>
        <View style={styles.pillRow}>
          {workModes.map((mode) => (
            <Pill
              key={mode}
              label={mode}
              selected={selectedWorkMode === mode}
              onPress={() => setSelectedWorkMode(mode)}
            />
          ))}
        </View>
      </View>

      <View style={styles.divider} />

      <Text weight="medium" style={styles.sectionTitle}>Annual Salary</Text>
      <Text weight="medium" style={styles.description}>Job post with clear salary will be shown at top by our algorithm</Text>

      <TouchableOpacity 
        style={styles.checkboxRow}
        onPress={() => setIsNotDisclose(!isNotDisclose)}
      >
        <View style={[styles.radioCircle, isNotDisclose && styles.radioCircleActive]}>
          {isNotDisclose && <View style={styles.radioInner} />}
        </View>
        <Text style={styles.checkboxText}>Not disclose salary to candidates</Text>
      </TouchableOpacity>

      <View style={styles.salaryInputRow}>
        <View style={{ flex: 1 }}>
          <TextInput
            placeholder="Minimum Salary"
            value={minSalary}
            onChangeText={setMinSalary}
            keyboardType="numeric"
            style={{ paddingRight: 90 }}
            rightElement={
              <View style={styles.annuallyContainer}>
                <View style={styles.verticalDivider} />
                <Text style={styles.annuallyText}>Annually</Text>
              </View>
            }
          />
        </View>
        <Text style={styles.toTextRight}>to</Text>
      </View>

      <View style={styles.salaryInputRow}>
        <View style={{ flex: 1 }}>
          <TextInput
            placeholder="Maximum Salary"
            value={maxSalary}
            onChangeText={setMaxSalary}
            keyboardType="numeric"
            style={{ paddingRight: 90 }}
            rightElement={
              <View style={styles.annuallyContainer}>
                <View style={styles.verticalDivider} />
                <Text style={styles.annuallyText}>Annually</Text>
              </View>
            }
          />
        </View>
        <Text style={[styles.toTextRight, { opacity: 0 }]}>to</Text>
      </View>

      <Text weight="medium" style={styles.sectionTitle}>Do you offer any additional perks? *</Text>
      
      <View style={styles.pillContainer}>
        {perksRows.map((row, rowIndex) => (
          <View key={`perkRow-${rowIndex}`} style={styles.pillRow}>
            {row.map((perk, perkIndex) => {
              // using a combination of name and index as key because of duplicate names in the mockup array
              const uniqueKey = `${perk}-${rowIndex}-${perkIndex}`;
              return (
                <Pill
                  key={uniqueKey}
                  label={perk}
                  selected={selectedPerks.includes(perk)}
                  onPress={() => togglePerk(perk)}
                  showActionIcon={true}
                />
              );
            })}
          </View>
        ))}
      </View>

      <Text weight="medium" style={styles.linkText}>+ Add other perks</Text>
      
      {/* Footer space so scroll works well */}
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
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  description: {
    fontSize: 12,
    color: '#666',
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 14,
    color: '#4D4D4D',
    marginTop: 16,
    marginBottom: 8,
  },
  divider: {
    height: 0.5,
    backgroundColor: '#B3B3B3',
    width: '100%',
    marginVertical: 8,
  },
  checkboxRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  radioCircle: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#D1D5DB',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
  },
  radioCircleActive: {
    borderColor: '#147FF6',
  },
  radioInner: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#147FF6',
  },
  checkboxText: {
    fontSize: 14,
    color: '#4B5563',
  },
  pillContainer: {
    marginBottom: 8,
  },
  pillRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  halfWidth: {
    flex: 0.45,
  },
  toText: {
    marginHorizontal: 8,
    color: '#666',
  },
  salaryInputRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  toTextRight: {
    marginHorizontal: 16,
    marginTop: 14,
    color: '#4B5563',
    fontSize: 16,
  },
  annuallyContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    height: '100%',
  },
  verticalDivider: {
    width: 1,
    height: 24,
    backgroundColor: '#D1D5DB',
    marginRight: 12,
  },
  annuallyText: {
    color: '#4B5563',
    fontSize: 14,
    fontWeight: '500',
  },
  linkText: {
    color: '#147FF6',
    fontSize: 14,
  },
});
