import { ProtectedRoute } from "@/components/protected-route"
import { ProfileInfo } from "@/components/profile-info"
import { UsageStats } from "@/components/usage-stats"

export default function ProfilePage() {
  return (
    <ProtectedRoute>
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold mb-8">Profile</h1>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <ProfileInfo />
            <UsageStats />
          </div>
        </div>
      </div>
    </ProtectedRoute>
  )
}
