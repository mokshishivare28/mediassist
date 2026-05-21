import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.REACT_APP_SUPABASE_URL?.trim();
const supabaseKey = process.env.REACT_APP_SUPABASE_ANON_KEY?.trim();

const isSupabaseUrlValid = Boolean(supabaseUrl && /^https?:\/\/.+/.test(supabaseUrl) && !supabaseUrl.includes('your_supabase_url_here'));
const isSupabaseKeyValid = Boolean(supabaseKey && supabaseKey.length > 30 && !supabaseKey.includes('your_supabase_anon_key_here'));
const isSupabaseConfigValid = isSupabaseUrlValid && isSupabaseKeyValid;

let supabase = null;

if (isSupabaseConfigValid) {
  supabase = createClient(supabaseUrl, supabaseKey);
} else {
  console.warn(
    'Supabase configuration is invalid or missing. Create a .env file with REACT_APP_SUPABASE_URL and REACT_APP_SUPABASE_ANON_KEY from your Supabase project settings.'
  );
}

export { supabase, isSupabaseConfigValid };
