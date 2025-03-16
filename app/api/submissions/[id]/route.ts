import { type NextRequest, NextResponse } from "next/server"
import { getServerSession } from "next-auth/next"
import { authOptions } from "@/app/api/auth/[...nextauth]/route"
import { db } from "@/lib/db"
import { z } from "zod"

// Schéma de validation pour la mise à jour d'une soumission
const submissionUpdateSchema = z.object({
  status: z.enum(["pending", "graded", "reviewed"]).optional(),
  score: z.number().min(0).max(20).optional(),
  feedback: z.string().optional(),
  plagiarismScore: z.number().min(0).max(100).optional(),
})

// GET /api/submissions/[id] - Récupérer une soumission spécifique
export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const session = await getServerSession(authOptions)

    if (!session) {
      return NextResponse.json({ error: "Non autorisé" }, { status: 401 })
    }

    const submission = await db.submission.findUnique({
      where: { id: params.id },
      include: {
        exercise: {
          select: {
            id: true,
            title: true,
            description: true,
            dueDate: true,
            authorId: true,
          },
        },
        student: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
        feedback: true,
      },
    })

    if (!submission) {
      return NextResponse.json({ error: "Soumission non trouvée" }, { status: 404 })
    }

    // Vérifier si l'utilisateur est autorisé à voir cette soumission
    if (session.user.role === "student" && submission.studentId !== session.user.id) {
      return NextResponse.json({ error: "Vous n'êtes pas autorisé à voir cette soumission" }, { status: 403 })
    }

    return NextResponse.json(submission)
  } catch (error) {
    console.error("Erreur lors de la récupération de la soumission:", error)
    return NextResponse.json(
      { error: "Une erreur est survenue lors de la récupération de la soumission" },
      { status: 500 },
    )
  }
}

// PUT /api/submissions/[id] - Mettre à jour une soumission
export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const session = await getServerSession(authOptions)

    if (!session) {
      return NextResponse.json({ error: "Non autorisé" }, { status: 401 })
    }

    // Vérifier si la soumission existe
    const submission = await db.submission.findUnique({
      where: { id: params.id },
      include: {
        exercise: {
          select: {
            authorId: true,
          },
        },
      },
    })

    if (!submission) {
      return NextResponse.json({ error: "Soumission non trouvée" }, { status: 404 })
    }

    // Vérifier si l'utilisateur est autorisé à mettre à jour cette soumission
    if (
      session.user.role === "student" ||
      (session.user.role === "teacher" && submission.exercise.authorId !== session.user.id)
    ) {
      return NextResponse.json({ error: "Vous n'êtes pas autorisé à mettre à jour cette soumission" }, { status: 403 })
    }

    const body = await req.json()

    // Valider les données
    const validationResult = submissionUpdateSchema.safeParse(body)

    if (!validationResult.success) {
      return NextResponse.json(
        { error: "Données invalides", details: validationResult.error.format() },
        { status: 400 },
      )
    }

    const { status, score, feedback, plagiarismScore } = validationResult.data

    // Mettre à jour la soumission
    const updatedSubmission = await db.submission.update({
      where: { id: params.id },
      data: {
        status,
        score,
        feedback,
        plagiarismScore,
        updatedAt: new Date(),
      },
    })

    // Si un feedback est fourni, créer une entrée de feedback
    if (feedback) {
      await db.feedback.create({
        data: {
          submissionId: params.id,
          content: feedback,
          score: score || 0,
          teacherId: session.user.id,
          aiGenerated: false,
        },
      })
    }

    return NextResponse.json(updatedSubmission)
  } catch (error) {
    console.error("Erreur lors de la mise à jour de la soumission:", error)
    return NextResponse.json(
      { error: "Une erreur est survenue lors de la mise à jour de la soumission" },
      { status: 500 },
    )
  }
}

