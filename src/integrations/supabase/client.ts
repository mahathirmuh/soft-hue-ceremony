// This file is automatically generated. Do not edit it directly.
import { createClient } from '@supabase/supabase-js';
import type { Database } from './types';

const SUPABASE_URL = "https://haghzlimhvyxnqmskygn.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhhZ2h6bGltaHZ5eG5xbXNreWduIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTIyNzc2MTIsImV4cCI6MjA2Nzg1MzYxMn0.lnAFcwR3h-rGgJeLY0PqmzunFcEYJl0fAPOnCvSwegc";

// Import the supabase client like this:
// import { supabase } from "@/integrations/supabase/client";

export const supabase = createClient<Database>(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY, {
  auth: {
    storage: localStorage,
    persistSession: true,
    autoRefreshToken: true,
  }
});