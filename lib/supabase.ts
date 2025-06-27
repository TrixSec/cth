import { createClient } from "@supabase/supabase-js"

// Use placeholder values if environment variables are not set
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

// Only create a real client if both environment variables are properly set
export const isSupabaseEnabled = !!(supabaseUrl && supabaseAnonKey)

export const supabase = isSupabaseEnabled ? createClient(supabaseUrl!, supabaseAnonKey!) : (null as any)

// Server-side client for API routes
export const createServerClient = () => {
  if (!isSupabaseEnabled) return null

  return createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!)
}

// Export a flag to check if Supabase is properly configured

export type Database = {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string
          email: string
          full_name: string | null
          plan: "free" | "monthly" | "yearly" | "addon"
          credits: number
          max_credits: number
          created_at: string
          updated_at: string
        }
        Insert: {
          id: string
          email: string
          full_name?: string | null
          plan?: "free" | "monthly" | "yearly" | "addon"
          credits?: number
          max_credits?: number
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          email?: string
          full_name?: string | null
          plan?: "free" | "monthly" | "yearly" | "addon"
          credits?: number
          max_credits?: number
          created_at?: string
          updated_at?: string
        }
      }
      usage_logs: {
        Row: {
          id: string
          user_id: string | null
          session_id: string | null
          tool_name: string
          credits_used: number
          created_at: string
        }
        Insert: {
          id?: string
          user_id?: string | null
          session_id?: string | null
          tool_name: string
          credits_used: number
          created_at?: string
        }
        Update: {
          id?: string
          user_id?: string | null
          session_id?: string | null
          tool_name?: string
          credits_used?: number
          created_at?: string
        }
      }
    }
  }
}
