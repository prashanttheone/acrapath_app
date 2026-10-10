import React, { useState } from 'react';
import { View, StyleSheet, TouchableOpacity, KeyboardAvoidingView, Platform, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Text } from '../components/ui/Text';
import { Button } from '../components/ui/Button';
import { useTheme } from '../theme/useTheme';
import { Step1JobDetails } from '../components/post_job/Step1JobDetails';
import { Step2CandidatePreferences } from '../components/post_job/Step2CandidatePreferences';
import { Check } from 'lucide-react-native';

export const PostJob: React.FC<{ navigation: any }> = ({ navigation }) => {
  const [currentStep, setCurrentStep] = useState(1);
  const { colors } = useTheme();

  const handleNext = () => {
    if (currentStep < 3) {
      setCurrentStep(currentStep + 1);
    } else {
      // Post Job API call here
      navigation.goBack();
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    } else {
      navigation.goBack();
    }
  };

  return (
    <SafeAreaView style={[styles.safeArea, { backgroundColor: colors.background }]}>
      <KeyboardAvoidingView 
        style={styles.container} 
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        {/* Header */}
        <View style={styles.header}>
          <Image 
            source={require('../../assets/acrapathlogo.png')} 
            style={styles.logo} 
            resizeMode="contain" 
          />
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Text style={styles.closeBtn}>✕</Text>
          </TouchableOpacity>
        </View>

        {/* Title & Progress */}
        <View style={styles.progressSection}>
          <Text weight="semiBold" style={styles.title}>Post a Job</Text>
          <View style={styles.progressBar}>
            <View style={styles.stepWrapper}>
              <View style={[styles.stepDot, currentStep >= 1 && styles.stepDotActive, currentStep > 1 && styles.stepDotCompleted]}>
                {currentStep > 1 ? <Check size={14} color="#FFF" /> : <Text style={styles.stepText}>1</Text>}
              </View>
              {currentStep === 1 && (
                <Text weight="medium" style={[styles.stepLabelAbsolute, styles.stepLabel1]}>Job Details</Text>
              )}
            </View>
            
            <View style={[styles.line, currentStep >= 2 && styles.lineActive]} />
            
            <View style={styles.stepWrapper}>
              <View style={[styles.stepDot, currentStep >= 2 && styles.stepDotActive, currentStep > 2 && styles.stepDotCompleted]}>
                {currentStep > 2 ? <Check size={14} color="#FFF" /> : <Text style={styles.stepText}>2</Text>}
              </View>
              {currentStep === 2 && (
                <Text weight="medium" style={[styles.stepLabelAbsolute, styles.stepLabel2]}>Candidate Preferences</Text>
              )}
            </View>
            
            <View style={[styles.line, currentStep >= 3 && styles.lineActive]} />
            
            <View style={styles.stepWrapper}>
              <View style={[styles.stepDot, currentStep >= 3 && styles.stepDotActive]}>
                <Text style={styles.stepText}>3</Text>
              </View>
              {currentStep === 3 && (
                <Text weight="medium" style={[styles.stepLabelAbsolute, styles.stepLabel3]}>Job Description</Text>
              )}
            </View>
          </View>
          <View style={styles.divider} />
        </View>

        {/* Step Content */}
        <View style={styles.content}>
          {currentStep === 1 && <Step1JobDetails />}
          {currentStep === 2 && <Step2CandidatePreferences />}
          {currentStep === 3 && (
            <View style={styles.placeholder}>
              <Text>Step 3: Job Description (Coming Soon)</Text>
            </View>
          )}
        </View>

        {/* Bottom Actions */}
        <View style={styles.footer}>
          <Button 
            title="Back" 
            onPress={handleBack} 
            style={[styles.btn, styles.backBtn]} 
            textStyle={{ color: colors.primary }} 
          />
          <Button 
            title={currentStep === 3 ? "Post Job" : "Next"} 
            onPress={handleNext} 
            style={[styles.btn]} 
          />
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingTop: 16,
    paddingBottom: 16,
  },
  logo: {
    width: 110,
    height: 30,
  },
  closeBtn: {
    fontSize: 20,
    color: '#666',
  },
  progressSection: {
    paddingHorizontal: 24,
    paddingBottom: 16,
  },
  divider: {
    height: 0.5,
    backgroundColor: '#B3B3B3',
    width: '100%',
    marginTop: 16, // adds spacing below the Job Details text
  },
  title: {
    fontSize: 16,
    marginBottom: 16,
    color: '#000000', // Assuming black or default color for the title, explicit is safe
  },
  progressBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 24, // increased margin to make room for absolute text
  },
  stepWrapper: {
    alignItems: 'center',
    width: 24, // matches stepDot width so text centers perfectly relative to the dot
  },
  stepLabelAbsolute: {
    position: 'absolute',
    top: 30, // pushed just below the 24px dot
    width: 150, // wide enough to not wrap awkwardly
    fontSize: 10,
    color: '#4D4D4D',
  },
  stepLabel1: {
    left: -4, // visually align left edge of text with left edge of dot
    textAlign: 'left',
  },
  stepLabel2: {
    left: -63, // center the 150px wide text under the 24px dot: (24 - 150) / 2
    textAlign: 'center',
  },
  stepLabel3: {
    right: -4, // visually align right edge of text with right edge of dot
    textAlign: 'right',
  },
  stepDot: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#E5E7EB',
    alignItems: 'center',
    justifyContent: 'center',
  },
  stepDotActive: {
    backgroundColor: '#2563EB', // blue for current step
  },
  stepDotCompleted: {
    backgroundColor: '#10B981', // green for completed step
  },
  stepText: {
    color: '#FFF',
    fontSize: 12,
    fontWeight: 'bold',
  },
  line: {
    flex: 1,
    height: 2,
    backgroundColor: '#E5E7EB',
    marginHorizontal: 8,
  },
  lineActive: {
    backgroundColor: '#2563EB',
  },
  content: {
    flex: 1,
  },
  placeholder: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  footer: {
    flexDirection: 'row',
    padding: 24,
    borderTopWidth: 1,
    borderTopColor: '#F3F4F6',
    backgroundColor: '#FFF',
    justifyContent: 'space-between',
  },
  btn: {
    flex: 0.48,
  },
  backBtn: {
    backgroundColor: '#FFF',
    borderWidth: 1,
    borderColor: '#2563EB',
  },
});
