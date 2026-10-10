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

export const Login: React.FC<{ navigation: any }> = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const { colors } = useTheme();
  const { login } = useAuth();

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert('Error', 'Please enter email and password');
      return;
    }
    
    setLoading(true);
    try {
      const response = await apiClient.post(Endpoints.auth.login, {
        email,
        password,
      });

      if (response.data.token) {
        await login(response.data.token, {
          userId: response.data.userId,
          email: response.data.email,
          full_name: response.data.full_name,
          is_recruiter: response.data.is_recruiter,
        });
      }
    } catch (error: any) {
      const errorData = error.response?.data;
      let errorMessage = 'An error occurred';
      if (errorData?.error && typeof errorData.error === 'string') {
        errorMessage = errorData.error;
      } else if (errorData?.message) {
        errorMessage = errorData.message;
      } else if (error.message) {
        errorMessage = error.message;
      }
      Alert.alert('Login Failed', errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout 
      title="Welcome Back" 
      subtitle="Sign in to continue to AcraPath."
    >
      <TextInput
        label="Email"
        placeholder="Enter your email"
        keyboardType="email-address"
        autoCapitalize="none"
        value={email}
        onChangeText={setEmail}
      />
      <TextInput
        label="Password"
        placeholder="Enter your password"
        isPassword
        value={password}
        onChangeText={setPassword}
      />
      
      <Button 
        title="Sign In" 
        onPress={handleLogin} 
        loading={loading}
        style={[styles.submitBtn, { marginTop: 16 }]} 
      />

      <View style={styles.footer}>
        <Text>Don't have an account? </Text>
        <TouchableOpacity onPress={() => navigation.navigate('Signup')}>
          <Text weight="bold" style={{ color: colors.primary }}>Sign Up</Text>
        </TouchableOpacity>
      </View>
    </AuthLayout>
  );
};

const styles = StyleSheet.create({
  submitBtn: {
    marginBottom: 24,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
});
