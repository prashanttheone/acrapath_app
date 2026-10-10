import React from 'react';
import { View, Text } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { CandidateDashboard } from '../screens/CandidateDashboard';
import { JobsListScreen } from '../screens/JobsListScreen';
import { Home, User, BriefcaseBusiness, UsersRound, Book } from 'lucide-react-native';

const Tab = createBottomTabNavigator();

const ProfileScreen = () => <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}><Text>Profile</Text></View>;
const CommunityScreen = () => <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}><Text>Community</Text></View>;
const ServiceScreen = () => <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}><Text>Service</Text></View>;

export const CandidateTabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarIcon: ({ focused, color, size }) => {
          let iconSize = 24;
          let iconColor = focused ? '#147FF6' : '#666';

          if (route.name === 'Home') return <Home size={iconSize} color={iconColor} />;
          if (route.name === 'Profile') return <User size={iconSize} color={iconColor} />;
          if (route.name === 'Jobs') return <BriefcaseBusiness size={iconSize} color={iconColor} />;
          if (route.name === 'Community') return <UsersRound size={iconSize} color={iconColor} />;
          if (route.name === 'Service') return <Book size={iconSize} color={iconColor} />;
        },
        tabBarActiveTintColor: '#147FF6',
        tabBarInactiveTintColor: '#666',
        tabBarStyle: {
          paddingBottom: 8,
          paddingTop: 8,
          height: 60,
          backgroundColor: '#FFFFFF',
          borderTopWidth: 1,
          borderTopColor: '#F0F0F0',
        },
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: '600',
        }
      })}
    >
      <Tab.Screen name="Home" component={CandidateDashboard} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
      <Tab.Screen name="Jobs" component={JobsListScreen} />
      <Tab.Screen name="Community" component={CommunityScreen} />
      <Tab.Screen name="Service" component={ServiceScreen} />
    </Tab.Navigator>
  );
};
