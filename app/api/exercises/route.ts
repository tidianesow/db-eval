import { type NextRequest, NextResponse } from "next/server"
import { getServerSession } from "next-auth/next"
import { authOptions } from "@/app/api/auth/[...nextauth]/route"
import { db } from "@/lib/db"
import { z } from "zod"

// Schéma de validation pour la création d'un exercice
const exerciseSchema = z.object({
  title: z.string().min(3, "Le titre doit contenir au moins 3 caractères"),
  description: z.string().min(10, "La description doit contenir au moins 10 caractères"),
  dueDate: z.string().optional(),
  published: z.boolean().default(false),
  pdfUrl: z.string().optional(),
})

// GET /api/exercises - Récupérer tous les exercices
export async function GET(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions)

    if (!session) {
      return NextResponse.json({ error: "Non autorisé" }, { status: 401 })
    }

    const { searchParams } = new URL(req.url)
    const published = searchParams.get("published")

    let where = {}

    // Si l'utilisateur est un étudiant, ne montrer que les exercices publiés
    if (session.user.role === "student") {
      where = { published: true }
    }
    // Si l'utilisateur est un enseignant et qu'il demande les exercices publiés
    else if (published) {
      where = { published: published === "true" }
    }

    const exercises = await db.exercise.findMany({
      where,
      orderBy: { createdAt: "desc" },
      include: {
        author: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
      },
    })

    return NextResponse.json(exercises)
  } catch (error) {
    console.error("Erreur lors de la récupération des exercices:", error)
    return NextResponse.json(
      { error: "Une erreur est survenue lors de la récupération des exercices" },
      { status: 500 },
    )
  }
}

// POST /api/exercises - Créer un nouvel exercice
export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions)

    if (!session) {
      return NextResponse.json({ error: "Non autorisé" }, { status: 401 })
    }

    // Vérifier si l'utilisateur est un enseignant
    if (session.user.role !== "teacher" && session.user.role !== "admin") {
      return NextResponse.json({ error: "Seuls les enseignants peuvent créer des exercices" }, { status: 403 })
    }

    const body = await req.json()

    // Valider les données
    const validationResult = exerciseSchema.safeParse(body)

    if (!validationResult.success) {
      return NextResponse.json(
        { error: "Données invalides", details: validationResult.error.format() },
        { status: 400 },
      )
    }

    const { title, description, dueDate, published, pdfUrl } = validationResult.data

    // Créer l'exercice
    const exercise = await db.exercise.create({
      data: {
        title,
        description,
        dueDate: dueDate ? new Date(dueDate) : undefined,
        published,
        pdfUrl,
        authorId: session.user.id,
      },
    })

    return NextResponse.json(exercise, { status: 201 })
  } catch (error) {
    console.error("Erreur lors de la création de l'exercice:", error)
    return NextResponse.json({ error: "Une erreur est survenue lors de la création de l'exercice" }, { status: 500 })
  }
}

