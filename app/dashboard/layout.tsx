import type React from "react"
import { Sidebar } from "@/components/dashboard/sidebar"
import { Header } from "@/components/dashboard/header"
import type { User } from "@/types"

// Utilisateur fictif pour la démo
const mockUser: User = {
  id: "1",
  name: "Jean Dupont",
  email: "jean.dupont@example.com",
  image: "/placeholder.svg?height=32&width=32",
  role: "teacher",
  createdAt: new Date(),
}

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <div className="flex min-h-screen">
      <Sidebar userRole={mockUser.role} />
      <div className="flex flex-col flex-1 lg:pl-64">
        <Header user={mockUser} />
        <main className="flex-1 p-6">{children}</main>
      </div>
    </div>
  )
}

