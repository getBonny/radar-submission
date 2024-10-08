import { AppState } from 'react-native'
//import 'react-native-url-polyfill/auto'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = "https://fdnjydbuqcmnrvcnquha.supabase.co"
const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZkbmp5ZGJ1cWNtbnJ2Y25xdWhhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjUzODYxNTcsImV4cCI6MjA0MDk2MjE1N30.IOlk9YBbK_iyalM3P7cY9IYNT54gkr5zl2H3ByBx7JY"

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    storage: AsyncStorage,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
})

// Tells Supabase Auth to continuously refresh the session automatically
// if the app is in the foreground. When this is added, you will continue
// to receive `onAuthStateChange` events with the `TOKEN_REFRESHED` or
// `SIGNED_OUT` event if the user's session is terminated. This should
// only be registered once.
AppState.addEventListener('change', (state) => {
  if (state === 'active') {
    supabase.auth.startAutoRefresh()
  } else {
    supabase.auth.stopAutoRefresh()
  }
})