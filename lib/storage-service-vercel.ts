import { put, del, list, get } from "@vercel/blob"
import crypto from "crypto"

// Fonction pour générer un nom de fichier unique
function generateUniqueFileName(originalName: string): string {
  const timestamp = Date.now()
  const randomString = crypto.randomBytes(16).toString("hex")
  const extension = originalName.split(".").pop()
  return `${timestamp}-${randomString}.${extension}`
}

// Fonction pour téléverser un fichier
export async function uploadFile(file: Buffer, originalName: string): Promise<string> {
  const fileName = generateUniqueFileName(originalName)

  const blob = await put(fileName, file, {
    access: "private",
    contentType: "application/pdf",
  })

  return blob.url
}

// Fonction pour récupérer un fichier
export async function getFile(url: string): Promise<{ buffer: Buffer; contentType: string }> {
  const blob = await get(url)

  if (!blob) {
    throw new Error("Fichier non trouvé")
  }

  const response = await fetch(blob.url)
  const buffer = Buffer.from(await response.arrayBuffer())

  return {
    buffer,
    contentType: blob.contentType || "application/pdf",
  }
}

// Fonction pour supprimer un fichier
export async function deleteFile(url: string): Promise<void> {
  await del(url)
}

// Fonction pour lister tous les fichiers
export async function listFiles(): Promise<string[]> {
  const { blobs } = await list()
  return blobs.map((blob) => blob.url)
}

