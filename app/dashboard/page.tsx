"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { Loader2 } from "lucide-react"

// Cette page sert de redirection vers le dashboard approprié selon le rôle de l'utilisateur
export default function DashboardPage() {
  const router = useRouter()

  // Utilisateur fictif pour la démo - dans une application réelle, cela viendrait de l'authentification
  const userRole = "teacher" // Peut être "student", "teacher" ou "admin"

  useEffect(() => {
    // Rediriger vers le dashboard approprié selon le rôle
    if (userRole === "student") {
      router.push("/dashboard/student")
    } else if (userRole === "teacher" || userRole === "admin") {
      router.push("/dashboard/teacher")
    }
  }, [router, userRole])

  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh]">
      <Loader2 className="h-12 w-12 text-brand-600 animate-spin mb-4" />
      <h2 className="text-xl font-medium text-gray-700 dark:text-gray-300">Chargement de votre tableau de bord...</h2>
    </div>
  )
}

