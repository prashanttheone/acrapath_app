import React, { useState } from 'react';
import { View, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { AuthLayout } from '../layouts/AuthLayout';
import { TextInput } from '../ui/TextInput';
import { Button } from '../ui/Button';
import { Text } from '../ui/Text';
import { useTheme } from '../../theme/useTheme';
import { apiClient } from '../../app/lib/apiClient';
import { Endpoints } from '../../app/lib/EndPoint';
import { useAuth } from '../../app/provider/AuthProvider';

export const Signup: React.FC<{ navigation: any }> = ({ navigation }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const { colors } = useTheme();
  const { login } = useAuth();

  const handleRegister = async () => {
    if (!name || !email || !phone || !password) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }
    
    setLoading(true);
    try {
      const response = await apiClient.post(Endpoints.auth.register, {
        full_name: name,
        email,
        phone,
        password,
      });

      if (response.data.token) {
        await login(response.data.token, {
          userId: response.data.userId,
          email: response.data.email,
          full_name: response.data.full_name,
        });
      }
    } catch (error: any) {
      const errorData = error.response?.data;
      let errorMessage = 'An error occurred';
      
      if (errorData?.error && typeof errorData.error === 'string') {
        errorMessage = errorData.error;
      } else if (errorData?.errors && Array.isArray(errorData.errors)) {
        errorMessage = errorData.errors.map((e: any) => e.msg || e.message || JSON.stringify(e)).join('\n');
      } else if (errorData?.message) {
        errorMessage = errorData.message;
      } else if (errorData) {
        errorMessage = JSON.stringify(errorData);
      } else if (error.message) {
        errorMessage = error.message;
      }

      Alert.alert('Registration Failed', errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout 
      title="Create Account" 
      subtitle="Join AcraPath today."
    >
      <TextInput
        label="Full Name"
        placeholder="Enter your name"
        value={name}
        onChangeText={setName}
      />
      <TextInput
        label="Email"
        placeholder="Enter your email"
        keyboardType="email-address"
        autoCapitalize="none"
        value={email}
        onChangeText={setEmail}
      />
      <TextInput
        label="Phone Number"
        placeholder="Enter your phone number"
        keyboardType="phone-pad"
        maxLength={10}
        value={phone}
        onChangeText={(text) => setPhone(text.replace(/[^0-9]/g, ''))}
      />
      <TextInput
        label="Password"
        placeholder="Create a password"
        isPassword
        value={password}
        onChangeText={setPassword}
      />

      <Button 
        title="Sign Up" 
        onPress={handleRegister} 
        loading={loading}
        style={styles.submitBtn} 
      />

      <View style={styles.footer}>
        <Text>Already have an account? </Text>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text weight="bold" style={{ color: colors.primary }}>Sign In</Text>
        </TouchableOpacity>
      </View>
    </AuthLayout>
  );
};

const styles = StyleSheet.create({
  submitBtn: {
    marginTop: 16,
    marginBottom: 24,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
});
