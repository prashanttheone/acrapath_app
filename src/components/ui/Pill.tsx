import React from 'react';
import { TouchableOpacity, StyleSheet, View } from 'react-native';
import { Text } from './Text';
import { useTheme } from '../../theme/useTheme';
import { X, Plus } from 'lucide-react-native';

interface PillProps {
  label: string;
  selected: boolean;
  onPress: () => void;
  style?: any;
  showActionIcon?: boolean;
}

export const Pill: React.FC<PillProps> = ({ label, selected, onPress, style, showActionIcon }) => {
  const { colors } = useTheme();
  
  return (
    <TouchableOpacity
      style={[
        styles.container,
        {
          borderColor: selected ? '#147FF6' : '#D1D5DB',
          backgroundColor: selected ? '#D8EAFD' : 'transparent',
        },
        style,
      ]}
      onPress={onPress}
    >
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <Text style={[styles.label, { color: selected ? '#147FF6' : '#4B5563' }]}>
          {label}
        </Text>
        {showActionIcon && (
          <View style={{ marginLeft: 6 }}>
            {selected ? (
              <X color="#147FF6" size={14} />
            ) : (
              <Plus color="#4B5563" size={14} />
            )}
          </View>
        )}
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 32,
    paddingHorizontal: 12,
    borderRadius: 50,
    borderWidth: 1,
    marginRight: 8,
    marginBottom: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  label: {
    fontSize: 14,
  },
});
