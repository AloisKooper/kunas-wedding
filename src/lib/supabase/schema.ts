import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

const supabase = createClient(supabaseUrl, supabaseKey)

export async function createTables() {
  const guestsError = await supabase.rpc('create_guests_table').single()
  const eventsError = await supabase.rpc('create_events_table').single()
  
  return { guestsError, eventsError }
}
