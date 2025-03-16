import { type NextRequest, NextResponse } from "next/server"
import { getServerSession } from "next-auth/next"
import { authOptions } from "@/app/api/auth/[...nextauth]/route"
import { db } from "@/lib/db"
import { z } from "zod"

// Schéma de validation pour la mise à jour d'un exercice
const exerciseUpdateSchema = z.object({
  title: z.string().min(3, "Le titre doit contenir au moins 3 caractères").optional(),
  description: z.string().min(10, "La description doit contenir au moins 10 caractères").optional(),
  dueDate: z.string().optional(),
  published: z.boolean().optional(),
  pdfUrl: z.string().optional(),
})

// GET /api/exercises/[id] - Récupérer un exercice spécifique
export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const session = await getServerSession(authOptions)

    if (!session) {
      return NextResponse.json({ error: "Non autorisé" }, { status: 401 })
    }

    const exercise = await db.exercise.findUnique({
      where: { id: params.id },
      include: {
        author: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
        solutions: session.user.role === "student" ? false : true,
      },
    })

    if (!exercise) {
      return NextResponse.json({ error: "Exercice non trouvé" }, { status: 404 })
    }

    // Si l'utilisateur est un étudiant et que l'exercice n'est pas publié
    if (session.user.role === "student" && !exercise.published) {
      return NextResponse.json({ error: "Exercice non disponible" }, { status: 403 })
    }

    return NextResponse.json(exercise)
  } catch (error) {
    console.error("Erreur lors de la récupération de l'exercice:", error)
    return NextResponse.json(
      { error: "Une erreur est survenue lors de la récupération de l'exercice" },
      { status: 500 },
    )
  }
}

// PUT /api/exercises/[id] - Mettre à jour un exercice
export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const session = await getServerSession(authOptions)

    if (!session) {
      return NextResponse.json({ error: "Non autorisé" }, { status: 401 })
    }

    // Vérifier si l'exercice existe
    const exercise = await db.exercise.findUnique({
      where: { id: params.id },
    })

    if (!exercise) {
      return NextResponse.json({ error: "Exercice non trouvé" }, { status: 404 })
    }

    // Vérifier si l'utilisateur est l'auteur de l'exercice ou un admin
    if (exercise.authorId !== session.user.id && session.user.role !== "admin") {
      return NextResponse.json({ error: "Vous n'êtes pas autorisé à modifier cet exercice" }, { status: 403 })
    }

    const body = await req.json()

    // Valider les données
    const validationResult = exerciseUpdateSchema.safeParse(body)

    if (!validationResult.success) {
      return NextResponse.json(
        { error: "Données invalides", details: validationResult.error.format() },
        { status: 400 },
      )
    }

    const { title, description, dueDate, published, pdfUrl } = validationResult.data

    // Mettre à jour l'exercice
    const updatedExercise = await db.exercise.update({
      where: { id: params.id },
      data: {
        title,
        description,
        dueDate: dueDate ? new Date(dueDate) : undefined,
        published,
        pdfUrl,
        updatedAt: new Date(),
      },
    })

    return NextResponse.json(updatedExercise)
  } catch (error) {
    console.error("Erreur lors de la mise à jour de l'exercice:", error)
    return NextResponse.json({ error: "Une erreur est survenue lors de la mise à jour de l'exercice" }, { status: 500 })
  }
}

// DELETE /api/exercises/[id] - Supprimer un exercice
export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const session = await getServerSession(authOptions)

    if (!session) {
      return NextResponse.json({ error: "Non autorisé" }, { status: 401 })
    }

    // Vérifier si l'exercice existe
    const exercise = await db.exercise.findUnique({
      where: { id: params.id },
    })

    if (!exercise) {
      return NextResponse.json({ error: "Exercice non trouvé" }, { status: 404 })
    }

    // Vérifier si l'utilisateur est l'auteur de l'exercice ou un admin
    if (exercise.authorId !== session.user.id && session.user.role !== "admin") {
      return NextResponse.json({ error: "Vous n'êtes pas autorisé à supprimer cet exercice" }, { status: 403 })
    }

    // Supprimer l'exercice
    await db.exercise.delete({
      where: { id: params.id },
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Erreur lors de la suppression de l'exercice:", error)
    return NextResponse.json({ error: "Une erreur est survenue lors de la suppression de l'exercice" }, { status: 500 })
  }
}

