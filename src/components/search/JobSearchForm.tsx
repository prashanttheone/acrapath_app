import React, { useState, useEffect } from 'react';
import { View, StyleSheet, TextInput as RNTextInput, TouchableOpacity, ActivityIndicator } from 'react-native';
import { Text } from '../ui/Text';
import { Button } from '../ui/Button';
import { Briefcase, MapPin } from 'lucide-react-native';
import { useKeywordSuggestions, useLocationSuggestions } from '../../hooks/useSearchSuggestions';
import { useAppDispatch } from '../../stores/hooks';
import { setFilter } from '../../stores/slices/jobFilterSlice';

interface JobSearchFormProps {
  onSearch?: () => void;
  buttonTitle?: string;
}

export const JobSearchForm: React.FC<JobSearchFormProps> = ({ 
  onSearch, 
  buttonTitle = "Search jobs" 
}) => {
  const dispatch = useAppDispatch();

  const [skills, setSkills] = useState('');
  const [locations, setLocations] = useState('');
  const [debouncedSkills, setDebouncedSkills] = useState('');
  const [debouncedLocations, setDebouncedLocations] = useState('');
  const [showSkillSuggestions, setShowSkillSuggestions] = useState(false);
  const [showLocationSuggestions, setShowLocationSuggestions] = useState(false);

  useEffect(() => {
    const handler = setTimeout(() => setDebouncedSkills(skills), 1000);
    return () => clearTimeout(handler);
  }, [skills]);

  useEffect(() => {
    const handler = setTimeout(() => setDebouncedLocations(locations), 1000);
    return () => clearTimeout(handler);
  }, [locations]);

  const { data: skillSuggestions, isFetching: skillsLoading } = useKeywordSuggestions(debouncedSkills);
  const { data: locationSuggestions, isFetching: locationsLoading } = useLocationSuggestions(debouncedLocations);

  const handleSearch = () => {
    dispatch(setFilter({
      skills: skills ? [skills] : [],
      location: locations || '',
    }));
    if (onSearch) {
      onSearch();
    }
  };

  const selectSkill = (val: string) => {
    setSkills(val);
    setShowSkillSuggestions(false);
  };

  const selectLocation = (val: string) => {
    setLocations(val);
    setShowLocationSuggestions(false);
  };

  return (
    <View style={styles.container}>
      <View style={styles.inputsContainer}>
        {/* Skills Input */}
        <View style={{ zIndex: 2 }}>
          <View style={styles.inputWrapper}>
            <RNTextInput
              placeholder="Enter skills, designation"
              placeholderTextColor="#999"
              style={styles.input}
              value={skills}
              onChangeText={(val) => {
                setSkills(val);
                setShowSkillSuggestions(true);
              }}
              onFocus={() => setShowSkillSuggestions(true)}
            />
            {skillsLoading && <ActivityIndicator size="small" color="#147FF6" />}
          </View>
          
          {showSkillSuggestions && skillSuggestions && skillSuggestions.length > 0 && (
            <View style={styles.dropdown}>
              {skillSuggestions.map((item: any, idx: number) => (
                <TouchableOpacity 
                  key={idx} 
                  style={styles.dropdownItem}
                  onPress={() => selectSkill(item.name)}
                >
                  <Briefcase size={16} color="#666" style={{ marginRight: 8 }} />
                  <Text style={styles.dropdownText}>{item.name}</Text>
                </TouchableOpacity>
              ))}
            </View>
          )}
        </View>

        {/* Locations Input */}
        <View style={{ zIndex: 1 }}>
          <View style={styles.inputWrapper}>
            <RNTextInput
              placeholder="Enter locations"
              placeholderTextColor="#999"
              style={styles.input}
              value={locations}
              onChangeText={(val) => {
                setLocations(val);
                setShowLocationSuggestions(true);
              }}
              onFocus={() => setShowLocationSuggestions(true)}
            />
            {locationsLoading && <ActivityIndicator size="small" color="#147FF6" />}
          </View>

          {showLocationSuggestions && locationSuggestions && locationSuggestions.length > 0 && (
            <View style={styles.dropdown}>
              {locationSuggestions.map((item: any, idx: number) => (
                <TouchableOpacity 
                  key={idx} 
                  style={styles.dropdownItem}
                  onPress={() => selectLocation(item.name)}
                >
                  <MapPin size={16} color="#666" style={{ marginRight: 8 }} />
                  <Text style={styles.dropdownText}>{item.name}</Text>
                </TouchableOpacity>
              ))}
            </View>
          )}
        </View>
      </View>

      <Button 
        title={buttonTitle} 
        onPress={handleSearch}
        style={styles.searchBtn}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
  inputsContainer: {
    gap: 16,
    marginBottom: 16,
  },
  inputWrapper: {
    backgroundColor: '#FFF',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E6E6E6',
    height: 56,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: '#333',
    height: '100%',
  },
  dropdown: {
    marginTop: 4,
    backgroundColor: '#FFF',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E6E6E6',
    paddingVertical: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 3,
    maxHeight: 150,
  },
  dropdownItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
  dropdownText: {
    fontSize: 15,
    color: '#333',
  },
  searchBtn: {
    height: 56,
    borderRadius: 12,
    marginBottom: 20,
  }
});
