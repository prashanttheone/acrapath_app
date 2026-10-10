import React, { useState } from 'react';
import { TextInput as RNTextInput, TextInputProps as RNTextInputProps, StyleSheet, View, TouchableOpacity } from 'react-native';
import { Text } from './Text';
import { useTheme } from '../../theme/useTheme';
import { typography } from '../../theme/typography';

interface TextInputProps extends RNTextInputProps {
  label?: string;
  error?: string;
  isPassword?: boolean;
}

export const TextInput: React.FC<TextInputProps> = ({ label, error, isPassword, secureTextEntry, style, ...props }) => {
  const { colors } = useTheme();
  const [isSecure, setIsSecure] = useState(isPassword || secureTextEntry);

  return (
    <View style={styles.container}>
      {label && (
        <Text weight="medium" style={[styles.label, { color: colors.textSecondary }]}>
          {label}
        </Text>
      )}
      <View style={styles.inputContainer}>
        <RNTextInput
          style={[
            styles.input,
            { 
              backgroundColor: colors.inputBackground,
              color: colors.text,
              borderColor: error ? '#FF3B30' : colors.border,
              fontFamily: typography.regular,
              paddingRight: (isPassword || secureTextEntry) ? 48 : 16,
            },
            style,
          ]}
          placeholderTextColor={colors.textSecondary}
          secureTextEntry={isSecure}
          {...props}
        />
        {(isPassword || secureTextEntry) && (
          <TouchableOpacity 
            style={styles.eyeIcon} 
            onPress={() => setIsSecure(!isSecure)}
          >
            <Text style={{ fontSize: 18, color: colors.textSecondary }}>
              {isSecure ? '👁️' : '🙈'}
            </Text>
          </TouchableOpacity>
        )}
      </View>
      {error && (
        <Text style={[styles.error, { color: '#FF3B30' }]}>{error}</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
  },
  label: {
    marginBottom: 8,
    fontSize: 14,
  },
  inputContainer: {
    position: 'relative',
    justifyContent: 'center',
  },
  input: {
    height: 48,
    borderWidth: 1,
    borderRadius: 12,
    paddingHorizontal: 16,
    fontSize: 16,
  },
  eyeIcon: {
    position: 'absolute',
    right: 16,
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  error: {
    marginTop: 4,
    fontSize: 12,
  },
});
