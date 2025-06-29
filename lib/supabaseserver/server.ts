import { createClient } from "@supabase/supabase-js"
import type { Database } from "./types"

const supabaseUrl = process.env.SUPABASE_URL!
const supabaseAnonKey = process.env.SUPABASE_ANON_KEY!
const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY!

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

export const supabaseAdminClient = () => {
  return createClient<Database>(supabaseUrl, supabaseServiceRoleKey)
}
