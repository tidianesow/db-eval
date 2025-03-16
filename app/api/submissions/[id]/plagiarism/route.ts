import { type NextRequest, NextResponse } from "next/server"
import { getServerSession } from "next-auth/next"
import { authOptions } from "@/lib/auth-options"
import { analyzePlagiarism } from "@/lib/plagiarism-service"

export async function POST(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const session = await getServerSession(authOptions)

    if (!session) {
      return NextResponse.json({ error: "Non autorisé" }, { status: 401 })
    }

    // Vérifier si l'utilisateur est autorisé à analyser cette soumission
    if (session.user.role !== "teacher" && session.user.role !== "admin") {
      return NextResponse.json({ error: "Vous n'êtes pas autorisé à analyser cette soumission" }, { status: 403 })
    }

    const result = await analyzePlagiarism(params.id)

    return NextResponse.json(result)
  } catch (error) {
    console.error("Erreur lors de l'analyse de plagiat:", error)
    return NextResponse.json({ error: "Une erreur est survenue lors de l'analyse de plagiat" }, { status: 500 })
  }
}

