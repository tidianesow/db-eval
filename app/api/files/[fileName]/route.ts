import { type NextRequest, NextResponse } from "next/server"
import { getServerSession } from "next-auth/next"
import { authOptions } from "@/lib/auth-options"
import { getFile, deleteFile } from "@/lib/storage-service"

export async function GET(req: NextRequest, { params }: { params: { fileName: string } }) {
  try {
    const session = await getServerSession(authOptions)

    if (!session) {
      return NextResponse.json({ error: "Non autorisé" }, { status: 401 })
    }

    const { buffer, contentType } = await getFile(params.fileName)

    return new NextResponse(buffer, {
      headers: {
        "Content-Type": contentType,
        "Content-Disposition": `inline; filename="${params.fileName}"`,
      },
    })
  } catch (error) {
    console.error("Erreur lors de la récupération du fichier:", error)
    return NextResponse.json({ error: "Une erreur est survenue lors de la récupération du fichier" }, { status: 500 })
  }
}

export async function DELETE(req: NextRequest, { params }: { params: { fileName: string } }) {
  try {
    const session = await getServerSession(authOptions)

    if (!session) {
      return NextResponse.json({ error: "Non autorisé" }, { status: 401 })
    }

    // Vérifier si l'utilisateur est autorisé à supprimer ce fichier
    // Dans une application réelle, il faudrait vérifier si le fichier appartient à l'utilisateur

    await deleteFile(params.fileName)

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Erreur lors de la suppression du fichier:", error)
    return NextResponse.json({ error: "Une erreur est survenue lors de la suppression du fichier" }, { status: 500 })
  }
}

