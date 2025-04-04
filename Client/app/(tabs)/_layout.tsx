import { Tabs } from 'expo-router';
import React from 'react';

// Your tab configuration
export default function TabLayout() {
  return (
    <Tabs>
      {/* Define your tabs here */}
      <Tabs.Screen name="home" options={{ title: 'Home' }} />
      <Tabs.Screen name="explore" options={{ title: 'Explore' }} />
      {/* Add other tabs as needed */}
    </Tabs>
  );
}