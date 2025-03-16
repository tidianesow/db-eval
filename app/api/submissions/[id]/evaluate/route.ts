import { type NextRequest, NextResponse } from "next/server"
import { getServerSession } from "next-auth/next"
import { authOptions } from "@/app/api/auth/[...nextauth]/route"
import { evaluateSubmission } from "@/lib/ollama-service"
import path from "path"
import { db } from "@/lib/db"

export async function POST(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const session = await getServerSession(authOptions)

    if (!session) {
      return NextResponse.json({ error: "Non autorisé" }, { status: 401 })
    }

    // Vérifier si l'utilisateur est autorisé à évaluer cette soumission
    if (session.user.role !== "teacher" && session.user.role !== "admin") {
      return NextResponse.json({ error: "Vous n'êtes pas autorisé à évaluer cette soumission" }, { status: 403 })
    }

    // Récupérer la soumission depuis la base de données
    const submission = await db.submission.findUnique({
      where: { id: params.id },
      include: {
        exercise: true,
      },
    })

    if (!submission) {
      return NextResponse.json({ error: "Soumission non trouvée" }, { status: 404 })
    }

    // Chemins des fichiers (à adapter selon votre structure de stockage)
    const answerFilePath = path.join(process.env.UPLOAD_DIR || "uploads", submission.pdfUrl)
    const correctionFilePath = path.join(process.env.UPLOAD_DIR || "uploads", submission.exercise.pdfUrl)

    // Évaluer la soumission
    const { grade, feedback } = await evaluateSubmission(params.id, answerFilePath, correctionFilePath)

    // Mettre à jour la soumission dans la base de données
    await db.submission.update({
      where: { id: params.id },
      data: {
        score: grade,
        feedback: feedback,
        status: "graded",
      },
    })

    // Créer une entrée de feedback
    await db.feedback.create({
      data: {
        submissionId: params.id,
        content: feedback,
        score: grade,
        aiGenerated: true,
      },
    })

    return NextResponse.json({ grade, feedback })
  } catch (error) {
    console.error(`Erreur lors de l'évaluation:`, error)
    return NextResponse.json({ error: "Une erreur est survenue lors de l'évaluation" }, { status: 500 })
  }
}

