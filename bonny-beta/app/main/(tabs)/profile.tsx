import { Image, StyleSheet, Platform, SafeAreaView } from 'react-native';
import { useRouter } from 'expo-router';
import { supabase } from '@/lib/supabase';
import { Button, ScrollView, Spinner, YStack } from 'tamagui';
import { useEffect, useState } from 'react';
import { UserType } from '@/src/types';
import { getUser } from '@/services/api/user';
import ProfileOrganism from '@/components/organisms/user/ProfileOrganism';
import { useAuth } from '@/context/authContext';
import { useUser } from '@/context/userContext';

const dummyUser: UserType = {
  id: '1',
  userName: 'John Doe',
  email: 'john.doe@example.com',
  createdOn: new Date(),
  updatedOn: new Date(),
  tokens: 1500,
  supporterStatus: 'none',
  profileUrl: '',
  createdBy: '',
  updatedBy: '',
  // Add other fields as necessary based on the UserType definition
};


export default function ProfileScreen() {
  const { user } = useUser();

  if (!user) {
    return <Spinner />;
  }

  return (
    <SafeAreaView>
         {dummyUser && <ProfileOrganism user={user} />}
    </SafeAreaView>
  );
}
