import React, { useEffect, useRef } from 'react';
import { View, StyleSheet, Animated } from 'react-native';

export const JobCardSkeleton = () => {
  const animValue = useRef(new Animated.Value(0.3)).current;

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(animValue, {
          toValue: 0.7,
          duration: 800,
          useNativeDriver: true,
        }),
        Animated.timing(animValue, {
          toValue: 0.3,
          duration: 800,
          useNativeDriver: true,
        }),
      ])
    ).start();
  }, [animValue]);

  return (
    <View style={styles.card}>
      <View style={styles.headerRow}>
        <View style={styles.titleContainer}>
          <Animated.View style={[styles.skeletonBlock, { width: '80%', height: 20, opacity: animValue, marginBottom: 8 }]} />
          <Animated.View style={[styles.skeletonBlock, { width: '50%', height: 16, opacity: animValue }]} />
        </View>
        <Animated.View style={[styles.skeletonBlock, { width: 40, height: 40, borderRadius: 8, opacity: animValue }]} />
      </View>

      <View style={styles.detailsRow}>
        <Animated.View style={[styles.skeletonBlock, { width: 60, height: 16, opacity: animValue }]} />
        <Animated.View style={[styles.skeletonBlock, { width: 80, height: 16, opacity: animValue }]} />
        <Animated.View style={[styles.skeletonBlock, { width: 70, height: 16, opacity: animValue }]} />
      </View>

      <View style={styles.skillsContainer}>
        <Animated.View style={[styles.skeletonBlock, { width: 100, height: 14, opacity: animValue, marginBottom: 8 }]} />
        <Animated.View style={[styles.skeletonBlock, { width: '90%', height: 14, opacity: animValue }]} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#F0F0F0',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 16,
  },
  titleContainer: {
    flex: 1,
    paddingRight: 12,
  },
  detailsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
    paddingRight: 16,
  },
  skillsContainer: {
    marginTop: 8,
  },
  skeletonBlock: {
    backgroundColor: '#E1E9EE',
    borderRadius: 4,
  }
});
