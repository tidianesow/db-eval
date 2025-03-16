import { type NextRequest, NextResponse } from "next/server"
import { getServerSession } from "next-auth/next"
import { authOptions } from "@/app/api/auth/[...nextauth]/route"
import { db } from "@/lib/db"
import { z } from "zod"

// Schéma de validation pour la création d'une soumission
const submissionSchema = z.object({
  exerciseId: z.string().uuid(),
  pdfUrl: z.string().url("L'URL du PDF est invalide"),
  notes: z.string().optional(),
})

// GET /api/submissions - Récupérer toutes les soumissions
export async function GET(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions)

    if (!session) {
      return NextResponse.json({ error: "Non autorisé" }, { status: 401 })
    }

    const { searchParams } = new URL(req.url)
    const exerciseId = searchParams.get("exerciseId")
    const studentId = searchParams.get("studentId")

    let where = {}

    // Si l'utilisateur est un étudiant, ne montrer que ses propres soumissions
    if (session.user.role === "student") {
      where = { studentId: session.user.id }

      // Filtrer par exercice si spécifié
      if (exerciseId) {
        where = { ...where, exerciseId }
      }
    }
    // Si l'utilisateur est un enseignant
    else if (session.user.role === "teacher" || session.user.role === "admin") {
      // Filtrer par exercice si spécifié
      if (exerciseId) {
        where = { ...where, exerciseId }
      }

      // Filtrer par étudiant si spécifié
      if (studentId) {
        where = { ...where, studentId }
      }
    }

    const submissions = await db.submission.findMany({
      where,
      orderBy: { createdAt: "desc" },
      include: {
        exercise: {
          select: {
            id: true,
            title: true,
          },
        },
        student: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
      },
    })

    return NextResponse.json(submissions)
  } catch (error) {
    console.error("Erreur lors de la récupération des soumissions:", error)
    return NextResponse.json(
      { error: "Une erreur est survenue lors de la récupération des soumissions" },
      { status: 500 },
    )
  }
}

// POST /api/submissions - Créer une nouvelle soumission
export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions)

    if (!session) {
      return NextResponse.json({ error: "Non autorisé" }, { status: 401 })
    }

    // Vérifier si l'utilisateur est un étudiant
    if (session.user.role !== "student") {
      return NextResponse.json({ error: "Seuls les étudiants peuvent soumettre des exercices" }, { status: 403 })
    }

    const body = await req.json()

    // Valider les données
    const validationResult = submissionSchema.safeParse(body)

    if (!validationResult.success) {
      return NextResponse.json(
        { error: "Données invalides", details: validationResult.error.format() },
        { status: 400 },
      )
    }

    const { exerciseId, pdfUrl, notes } = validationResult.data

    // Vérifier si l'exercice existe et est publié
    const exercise = await db.exercise.findUnique({
      where: { id: exerciseId },
    })

    if (!exercise) {
      return NextResponse.json({ error: "Exercice non trouvé" }, { status: 404 })
    }

    if (!exercise.published) {
      return NextResponse.json({ error: "Cet exercice n'est pas disponible pour soumission" }, { status: 403 })
    }

    // Vérifier si l'étudiant a déjà soumis cet exercice
    const existingSubmission = await db.submission.findFirst({
      where: {
        exerciseId,
        studentId: session.user.id,
      },
    })

    if (existingSubmission) {
      return NextResponse.json({ error: "Vous avez déjà soumis cet exercice" }, { status: 400 })
    }

    // Créer la soumission
    const submission = await db.submission.create({
      data: {
        exerciseId,
        studentId: session.user.id,
        pdfUrl,
        notes,
        status: "pending",
      },
    })

    return NextResponse.json(submission, { status: 201 })
  } catch (error) {
    console.error("Erreur lors de la création de la soumission:", error)
    return NextResponse.json({ error: "Une erreur est survenue lors de la création de la soumission" }, { status: 500 })
  }
}

