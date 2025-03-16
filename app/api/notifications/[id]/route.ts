import { type NextRequest, NextResponse } from "next/server"
import { getServerSession } from "next-auth/next"
import { authOptions } from "@/lib/auth-options"
import { markNotificationAsRead, deleteNotification } from "@/lib/notification-service"
import { db } from "@/lib/db"

export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const session = await getServerSession(authOptions)

    if (!session) {
      return NextResponse.json({ error: "Non autorisé" }, { status: 401 })
    }

    // Vérifier si la notification appartient à l'utilisateur
    const notification = await db.notification.findUnique({
      where: { id: params.id },
    })

    if (!notification || notification.userId !== session.user.id) {
      return NextResponse.json({ error: "Notification non trouvée" }, { status: 404 })
    }

    await markNotificationAsRead(params.id)

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Erreur lors de la mise à jour de la notification:", error)
    return NextResponse.json(
      { error: "Une erreur est survenue lors de la mise à jour de la notification" },
      { status: 500 },
    )
  }
}

export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const session = await getServerSession(authOptions)

    if (!session) {
      return NextResponse.json({ error: "Non autorisé" }, { status: 401 })
    }

    // Vérifier si la notification appartient à l'utilisateur
    const notification = await db.notification.findUnique({
      where: { id: params.id },
    })

    if (!notification || notification.userId !== session.user.id) {
      return NextResponse.json({ error: "Notification non trouvée" }, { status: 404 })
    }

    await deleteNotification(params.id)

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Erreur lors de la suppression de la notification:", error)
    return NextResponse.json(
      { error: "Une erreur est survenue lors de la suppression de la notification" },
      { status: 500 },
    )
  }
}

