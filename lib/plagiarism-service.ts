import { jaccardSimilarity } from "./plagiarism-utils"
import { db } from "./db"

interface PlagiarismResult {
  score: number
  similarSubmissions: {
    id: string
    similarity: number
    studentName: string
    exerciseTitle: string
  }[]
}

/**
 * Détecte le plagiat entre une soumission et d'autres soumissions existantes
 */
export async function detectPlagiarism(submissionId: string): Promise<PlagiarismResult> {
  // Récupérer la soumission actuelle
  const submission = await db.submission.findUnique({
    where: { id: submissionId },
    include: {
      exercise: true,
    },
  })

  if (!submission) {
    throw new Error("Soumission non trouvée")
  }

  // Récupérer les autres soumissions pour le même exercice
  const otherSubmissions = await db.submission.findMany({
    where: {
      exerciseId: submission.exerciseId,
      id: { not: submissionId },
    },
    include: {
      student: {
        select: {
          id: true,
          name: true,
        },
      },
      exercise: {
        select: {
          id: true,
          title: true,
        },
      },
    },
  })

  // Extraire le contenu de la soumission actuelle (dans une application réelle, ce serait le texte extrait du PDF)
  const submissionContent = submission.feedback || ""

  // Calculer la similarité avec chaque soumission
  const similarities = await Promise.all(
    otherSubmissions.map(async (other) => {
      const otherContent = other.feedback || ""
      const similarity = jaccardSimilarity(submissionContent, otherContent)

      return {
        id: other.id,
        similarity,
        studentName: other.student.name,
        exerciseTitle: other.exercise.title,
      }
    }),
  )

  // Trier par similarité décroissante
  similarities.sort((a, b) => b.similarity - a.similarity)

  // Prendre les soumissions les plus similaires (score > 0.3)
  const similarSubmissions = similarities.filter((s) => s.similarity > 0.3)

  // Calculer un score global de plagiat (0-100)
  const score = similarSubmissions.length > 0 ? Math.min(100, Math.round(similarSubmissions[0].similarity * 100)) : 0

  return { score, similarSubmissions }
}

/**
 * Analyse une soumission pour détecter le plagiat et met à jour la base de données
 */
export async function analyzePlagiarism(submissionId: string): Promise<PlagiarismResult> {
  const result = await detectPlagiarism(submissionId)

  // Mettre à jour la soumission avec le score de plagiat
  await db.submission.update({
    where: { id: submissionId },
    data: {
      plagiarismScore: result.score,
    },
  })

  return result
}

