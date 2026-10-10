import React from 'react';
import { Text as RNText, TextProps as RNTextProps } from 'react-native';
import { typography } from '../../theme/typography';
import { useTheme } from '../../theme/useTheme';

export interface TextProps extends RNTextProps {
  weight?: 'regular' | 'medium' | 'semiBold' | 'bold';
}

export const Text: React.FC<TextProps> = ({ style, weight = 'regular', ...props }) => {
  const { colors } = useTheme();
  const fontFamily = typography[weight];

  return (
    <RNText
      style={[
        { color: colors.text, fontFamily },
        style,
      ]}
      {...props}
    />
  );
};
