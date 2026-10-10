import React from 'react';
import { View, StyleSheet, ScrollView, TextInput as RNTextInput } from 'react-native';
import { Text } from '../ui/Text';
import { useAppDispatch, useAppSelector } from '../../stores/hooks';
import { updateJobPostData } from '../../stores/slices/jobPostSlice';

export const Step3JobDescription = () => {
  const dispatch = useAppDispatch();
  const description = useAppSelector((state) => state.jobPost.jobDescription);
  const maxLength = 500;

  const handleDescriptionChange = (text: string) => {
    dispatch(updateJobPostData({ jobDescription: text }));
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Text weight="bold" style={styles.subtitle}>Job Description & About Company</Text>
      <Text weight="medium" style={styles.descriptionText}>We use this information to find the best professionals for the job</Text>

      <Text weight="medium" style={styles.sectionTitle}>Job Description</Text>
      
      <View style={styles.textAreaContainer}>
        <RNTextInput
          style={styles.textArea}
          multiline={true}
          textAlignVertical="top"
          value={description}
          onChangeText={handleDescriptionChange}
          maxLength={maxLength}
          placeholder=""
        />
        <Text style={styles.charCount}>{description.length}/{maxLength}</Text>
      </View>

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
    marginBottom: 4,
    color: '#000000',
  },
  descriptionText: {
    fontSize: 12,
    color: '#666',
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 14,
    color: '#4D4D4D',
    marginBottom: 12,
  },
  textAreaContainer: {
    borderWidth: 1,
    borderColor: '#F3F4F6',
    borderRadius: 12,
    backgroundColor: '#FFFFFF',
    height: 280,
    padding: 16,
    paddingBottom: 36, // make room for absolute counter
  },
  textArea: {
    flex: 1,
    fontSize: 14,
    color: '#000',
  },
  charCount: {
    position: 'absolute',
    bottom: 12,
    right: 16,
    fontSize: 12,
    color: '#9CA3AF',
  }
});
