import React, { useState } from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { AuthLayout } from '../layouts/AuthLayout';
import { TextInput } from '../ui/TextInput';
import { Button } from '../ui/Button';
import { Text } from '../ui/Text';
import { useTheme } from '../../theme/useTheme';

export const Login: React.FC<{ navigation: any }> = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { colors } = useTheme();

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
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />
      
      <TouchableOpacity style={styles.forgotPassword}>
        <Text weight="medium" style={{ color: colors.primary }}>Forgot Password?</Text>
      </TouchableOpacity>

      <Button 
        title="Sign In" 
        onPress={() => console.log('Login pressed')} 
        style={styles.submitBtn} 
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
  forgotPassword: {
    alignSelf: 'flex-end',
    marginBottom: 24,
  },
  submitBtn: {
    marginBottom: 24,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
});
