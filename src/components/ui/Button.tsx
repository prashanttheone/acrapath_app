import React from 'react';
import { TouchableOpacity, StyleSheet, TouchableOpacityProps, ActivityIndicator, StyleProp, TextStyle } from 'react-native';
import { Text } from './Text';
import { useTheme } from '../../theme/useTheme';

interface ButtonProps extends TouchableOpacityProps {
  title: string;
  loading?: boolean;
  textStyle?: StyleProp<TextStyle>;
  variant?: 'solid' | 'outline';
}

export const Button: React.FC<ButtonProps> = ({ title, loading, style, textStyle, disabled, variant = 'solid', ...props }) => {
  const { colors } = useTheme();

  const isOutline = variant === 'outline';
  const backgroundColor = isOutline ? 'transparent' : colors.primary;
  const textColor = isOutline ? colors.primary : colors.buttonText;
  const borderColor = isOutline ? colors.primary : 'transparent';
  const borderWidth = isOutline ? 1 : 0;

  return (
    <TouchableOpacity
      style={[
        styles.button,
        { backgroundColor, borderColor, borderWidth },
        disabled && styles.disabled,
        style,
      ]}
      disabled={disabled || loading}
      {...props}
    >
      {loading ? (
        <ActivityIndicator color={textColor} />
      ) : (
        <Text weight="semiBold" style={[styles.text, { color: textColor }, textStyle]}>
          {title}
        </Text>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    height: 48,
    paddingHorizontal: 24,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  disabled: {
    opacity: 0.6,
  },
  text: {
    fontSize: 16,
  },
});
