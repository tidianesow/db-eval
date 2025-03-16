import { type NextRequest, NextResponse } from "next/server"
import { getServerSession } from "next-auth/next"
import { authOptions } from "@/lib/auth-options"
import { getUserNotifications, markAllNotificationsAsRead } from "@/lib/notification-service"

export async function GET(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions)

    if (!session) {
      return NextResponse.json({ error: "Non autorisé" }, { status: 401 })
    }

    const { searchParams } = new URL(req.url)
    const limit = Number.parseInt(searchParams.get("limit") || "20", 10)
    const includeRead = searchParams.get("includeRead") === "true"

    const notifications = await getUserNotifications(session.user.id, limit, includeRead)

    return NextResponse.json(notifications)
  } catch (error) {
    console.error("Erreur lors de la récupération des notifications:", error)
    return NextResponse.json(
      { error: "Une erreur est survenue lors de la récupération des notifications" },
      { status: 500 },
    )
  }
}

export async function PUT(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions)

    if (!session) {
      return NextResponse.json({ error: "Non autorisé" }, { status: 401 })
    }

    await markAllNotificationsAsRead(session.user.id)

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Erreur lors de la mise à jour des notifications:", error)
    return NextResponse.json(
      { error: "Une erreur est survenue lors de la mise à jour des notifications" },
      { status: 500 },
    )
  }
}

