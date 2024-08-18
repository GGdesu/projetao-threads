import 'react-native-url-polyfill/auto'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = "https://wxbglbgihyyqkajouedq.supabase.co"
const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Ind4YmdsYmdpaHl5cWtham91ZWRxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjMyNDM4OTIsImV4cCI6MjAzODgxOTg5Mn0.FBBzQvuuzJwL9wKq5TA3z9IFBW3CnQH4UNCXDB1lEGU"

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    storage: AsyncStorage,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
})

