export type ProfileRow = {
  id: string
  email: string
  full_name: string | null
  avatar_url: string | null
  created_at: string
  updated_at: string
  subscription_starts: string | null
  subscription_ends: string | null
  trial_starts: string | null
  trial_ends: string | null
  user_type: "free" | "free_trial" | "premium"
  plan: "free" | "monthly" | "yearly" | "addon"
  max_credits: number
  credits_used: number
  last_reset_date: string
  shortener_qrs_generated: number
  shortener_urls_generated: number
  shortener_aliases_used: number
  md5_hash_decrypted: number
  times_multiple_hashes_decrypted: number
}

export type UsageLogRow = {
  id: string
  user_id: string | null
  session_id: string | null
  tool_name: string
  credits_used: number
  created_at: string
}

export type UsageLogInsert = Partial<Omit<UsageLogRow, 'id' | 'created_at'>> & {
  tool_name: string
  credits_used: number
  id?: string
  created_at?: string
}

export type UsageLogUpdate = Partial<UsageLogRow>

export type Database = {
  public: {
    Tables: {
      profiles: {
        Row: ProfileRow
        Insert: Partial<ProfileRow> & {
          id: string
          email: string
          created_at?: string
        }
        Update: Partial<ProfileRow> & {
          updated_at?: string
        }
      }
      usage_logs: {
        Row: UsageLogRow
        Insert: UsageLogInsert
        Update: UsageLogUpdate
      }
    }
  }
}
