import React from 'react';
import { Text as RNText, TextProps as RNTextProps, StyleSheet } from 'react-native';
import { typography } from '../theme/typography';
import { colors } from '../theme/colors';

export interface TextProps extends RNTextProps {
  weight?: 'regular' | 'medium' | 'semiBold' | 'bold';
}

export const Text: React.FC<TextProps> = ({ style, weight = 'regular', ...props }) => {
  const fontFamily = typography[weight];

  return (
    <RNText
      style={[
        styles.defaultText,
        { fontFamily },
        style,
      ]}
      {...props}
    />
  );
};

const styles = StyleSheet.create({
  defaultText: {
    color: colors.text,
  },
});
