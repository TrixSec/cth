"use client"

import type { User, Session } from "@supabase/supabase-js"
import { createContext, useContext, useEffect, useState } from "react"
import { supabase, isSupabaseEnabled } from "@/lib/supabase"

interface AuthContextType {
  user: User | null
  session: Session | null
  loading: boolean
  signIn: (email: string, password: string) => Promise<{ error: any }>
  signUp: (
    email: string,
    password: string,
    metadata?: Record<string, any>
  ) => Promise<{ error: any }>
  signOut: () => Promise<void>
  signInWithGoogle: () => Promise<{ error: any }>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [session, setSession] = useState<Session | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!isSupabaseEnabled) {
      setLoading(false)
      return
    }

    // Get initial session
    const getInitialSession = async () => {
      const { data, error } = await supabase.auth.getSession()
      if (error) {
        console.error("Error fetching session:", error)
        setLoading(false)
        return
      }
      const currentSession = data.session
      setSession(currentSession)
      setUser(currentSession?.user ?? null)
      setLoading(false)
    }

    getInitialSession()

    // Listen for auth changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event: string, newSession: Session | null) => {
      if (event === "SIGNED_IN") {
        setSession(newSession)
        setUser(newSession?.user ?? null)
      } else if (event === "SIGNED_OUT") {
        setSession(null)
        setUser(null)
      }
    })

    return () => {
      subscription.unsubscribe()
    }
  }, [])

  const signIn = async (email: string, password: string) => {
    if (!isSupabaseEnabled) {
      return { error: { message: "Authentication not configured" } }
    }
    return await supabase.auth.signInWithPassword({ email, password })
  }

  const signUp = async (email: string, password: string, metadata?: Record<string, any>) => {
    if (!isSupabaseEnabled) {
      return { error: { message: "Authentication not configured" } }
    }
    return await supabase.auth.signUp({
      email,
      password,
      options: {
        data: metadata,
      },
    })
  }

  const signOut = async () => {
    if (!isSupabaseEnabled) return
    const { error } = await supabase.auth.signOut()
    if (error) {
      console.error("Sign out error:", error)
    }
  }

  const signInWithGoogle = async () => {
    if (!isSupabaseEnabled) {
      return { error: { message: "Authentication not configured" } }
    }
    return await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `${window.location.origin}/auth/callback`,
      },
    })
  }

  const value = {
    user,
    session,
    loading,
    signIn,
    signUp,
    signOut,
    signInWithGoogle,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}