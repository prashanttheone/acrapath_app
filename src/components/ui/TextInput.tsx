import React from 'react';
import { TextInput as RNTextInput, TextInputProps as RNTextInputProps, StyleSheet, View } from 'react-native';
import { Text } from './Text';
import { useTheme } from '../../theme/useTheme';
import { typography } from '../../theme/typography';

interface TextInputProps extends RNTextInputProps {
  label?: string;
  error?: string;
}

export const TextInput: React.FC<TextInputProps> = ({ label, error, style, ...props }) => {
  const { colors } = useTheme();

  return (
    <View style={styles.container}>
      {label && (
        <Text weight="medium" style={[styles.label, { color: colors.textSecondary }]}>
          {label}
        </Text>
      )}
      <RNTextInput
        style={[
          styles.input,
          { 
            backgroundColor: colors.inputBackground,
            color: colors.text,
            borderColor: error ? '#FF3B30' : colors.border,
            fontFamily: typography.regular,
          },
          style,
        ]}
        placeholderTextColor={colors.textSecondary}
        {...props}
      />
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
  input: {
    borderWidth: 1,
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 14,
    fontSize: 16,
  },
  error: {
    marginTop: 4,
    fontSize: 12,
  },
});
