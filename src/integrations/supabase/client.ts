import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://uuvaefwnolpdwtwpuzrn.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InV1dmFlZndub2xwZHd0d3B1enJuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTAxODAyNDMsImV4cCI6MjA2NTc1NjI0M30.c7oK7R9DQr_fVfZHHd8NII4_3mLTD1HC-fpsmt4Ucd4';

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: true
  }
});