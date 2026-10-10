import React, { useState } from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { AuthLayout } from '../layouts/AuthLayout';
import { TextInput } from '../ui/TextInput';
import { Button } from '../ui/Button';
import { Text } from '../ui/Text';
import { useTheme } from '../../theme/useTheme';

export const Signup: React.FC<{ navigation: any }> = ({ navigation }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { colors } = useTheme();

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
        label="Password"
        placeholder="Create a password"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />

      <Button 
        title="Sign Up" 
        onPress={() => console.log('Signup pressed')} 
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
