import { type NextRequest, NextResponse } from "next/server"
import { getServerSession } from "next-auth/next"
import { authOptions } from "@/app/api/auth/[...nextauth]/route"
import { db } from "@/lib/db"
import { z } from "zod"

// Schéma de validation pour la création d'une solution
const solutionSchema = z.object({
  content: z.string().min(1, "Le contenu ne peut pas être vide"),
})

// GET /api/exercises/[id]/solutions - Récupérer les solutions d'un exercice
export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const session = await getServerSession(authOptions)

    if (!session) {
      return NextResponse.json({ error: "Non autorisé" }, { status: 401 })
    }

    // Vérifier si l'utilisateur est un enseignant ou un admin
    if (session.user.role !== "teacher" && session.user.role !== "admin") {
      return NextResponse.json({ error: "Seuls les enseignants peuvent voir les solutions" }, { status: 403 })
    }

    const solutions = await db.solution.findMany({
      where: { exerciseId: params.id },
      orderBy: { createdAt: "desc" },
    })

    return NextResponse.json(solutions)
  } catch (error) {
    console.error("Erreur lors de la récupération des solutions:", error)
    return NextResponse.json(
      { error: "Une erreur est survenue lors de la récupération des solutions" },
      { status: 500 },
    )
  }
}

// POST /api/exercises/[id]/solutions - Ajouter une solution à un exercice
export async function POST(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const session = await getServerSession(authOptions)

    if (!session) {
      return NextResponse.json({ error: "Non autorisé" }, { status: 401 })
    }

    // Vérifier si l'utilisateur est un enseignant ou un admin
    if (session.user.role !== "teacher" && session.user.role !== "admin") {
      return NextResponse.json({ error: "Seuls les enseignants peuvent ajouter des solutions" }, { status: 403 })
    }

    // Vérifier si l'exercice existe
    const exercise = await db.exercise.findUnique({
      where: { id: params.id },
    })

    if (!exercise) {
      return NextResponse.json({ error: "Exercice non trouvé" }, { status: 404 })
    }

    const body = await req.json()

    // Valider les données
    const validationResult = solutionSchema.safeParse(body)

    if (!validationResult.success) {
      return NextResponse.json(
        { error: "Données invalides", details: validationResult.error.format() },
        { status: 400 },
      )
    }

    const { content } = validationResult.data

    // Créer la solution
    const solution = await db.solution.create({
      data: {
        content,
        exerciseId: params.id,
      },
    })

    return NextResponse.json(solution, { status: 201 })
  } catch (error) {
    console.error("Erreur lors de la création de la solution:", error)
    return NextResponse.json({ error: "Une erreur est survenue lors de la création de la solution" }, { status: 500 })
  }
}

