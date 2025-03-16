import { db } from "./db"

export type NotificationType =
  | "submission_received"
  | "submission_graded"
  | "exercise_published"
  | "feedback_received"
  | "plagiarism_detected"

interface CreateNotificationParams {
  userId: string
  type: NotificationType
  title: string
  message: string
  link?: string
  metadata?: Record<string, any>
}

/**
 * Crée une nouvelle notification pour un utilisateur
 */
export async function createNotification({ userId, type, title, message, link, metadata }: CreateNotificationParams) {
  return await db.notification.create({
    data: {
      userId,
      type,
      title,
      message,
      link,
      metadata,
    },
  })
}

/**
 * Récupère les notifications d'un utilisateur
 */
export async function getUserNotifications(userId: string, limit = 20, includeRead = false) {
  return await db.notification.findMany({
    where: {
      userId,
      ...(includeRead ? {} : { read: false }),
    },
    orderBy: {
      createdAt: "desc",
    },
    take: limit,
  })
}

/**
 * Marque une notification comme lue
 */
export async function markNotificationAsRead(notificationId: string) {
  return await db.notification.update({
    where: {
      id: notificationId,
    },
    data: {
      read: true,
      readAt: new Date(),
    },
  })
}

/**
 * Marque toutes les notifications d'un utilisateur comme lues
 */
export async function markAllNotificationsAsRead(userId: string) {
  return await db.notification.updateMany({
    where: {
      userId,
      read: false,
    },
    data: {
      read: true,
      readAt: new Date(),
    },
  })
}

/**
 * Supprime une notification
 */
export async function deleteNotification(notificationId: string) {
  return await db.notification.delete({
    where: {
      id: notificationId,
    },
  })
}

/**
 * Crée une notification pour une nouvelle soumission
 */
export async function notifyNewSubmission(
  teacherId: string,
  studentName: string,
  exerciseTitle: string,
  submissionId: string,
) {
  return await createNotification({
    userId: teacherId,
    type: "submission_received",
    title: "Nouvelle soumission",
    message: `${studentName} a soumis une réponse pour l'exercice "${exerciseTitle}"`,
    link: `/dashboard/submissions/${submissionId}`,
    metadata: {
      submissionId,
      studentName,
      exerciseTitle,
    },
  })
}

/**
 * Crée une notification pour une soumission notée
 */
export async function notifyGradedSubmission(
  studentId: string,
  exerciseTitle: string,
  score: number,
  submissionId: string,
) {
  return await createNotification({
    userId: studentId,
    type: "submission_graded",
    title: "Soumission évaluée",
    message: `Votre soumission pour "${exerciseTitle}" a été évaluée avec une note de ${score}/20`,
    link: `/dashboard/submissions/${submissionId}`,
    metadata: {
      submissionId,
      exerciseTitle,
      score,
    },
  })
}

/**
 * Crée une notification pour un nouvel exercice publié
 */
export async function notifyExercisePublished(studentIds: string[], exerciseTitle: string, exerciseId: string) {
  const notifications = []

  for (const studentId of studentIds) {
    notifications.push(
      createNotification({
        userId: studentId,
        type: "exercise_published",
        title: "Nouvel exercice disponible",
        message: `Un nouvel exercice "${exerciseTitle}" est disponible`,
        link: `/dashboard/exercises/${exerciseId}`,
        metadata: {
          exerciseId,
          exerciseTitle,
        },
      }),
    )
  }

  return await Promise.all(notifications)
}

/**
 * Crée une notification pour un plagiat détecté
 */
export async function notifyPlagiarismDetected(
  teacherId: string,
  studentName: string,
  exerciseTitle: string,
  submissionId: string,
  score: number,
) {
  return await createNotification({
    userId: teacherId,
    type: "plagiarism_detected",
    title: "Plagiat potentiel détecté",
    message: `Un score de similarité élevé (${score}%) a été détecté dans la soumission de ${studentName} pour l'exercice "${exerciseTitle}"`,
    link: `/dashboard/submissions/${submissionId}/plagiarism`,
    metadata: {
      submissionId,
      studentName,
      exerciseTitle,
      score,
    },
  })
}

