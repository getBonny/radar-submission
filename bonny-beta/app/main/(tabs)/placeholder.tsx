import React from 'react';
import { Redirect } from 'expo-router';

export default function PlaceholderScreen() {
  // This screen should never be displayed directly
  return <Redirect href="/main/(tabs)/" />;
}