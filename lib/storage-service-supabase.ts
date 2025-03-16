import { createClient } from "@supabase/supabase-js"
import crypto from "crypto"

// Initialiser le client Supabase
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || ""
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || ""
const supabase = createClient(supabaseUrl, supabaseKey)

const BUCKET_NAME = "evalai-files"

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

  // S'assurer que le bucket existe
  const { data: buckets } = await supabase.storage.listBuckets()
  if (!buckets?.find((b) => b.name === BUCKET_NAME)) {
    await supabase.storage.createBucket(BUCKET_NAME, {
      public: false,
    })
  }

  // Téléverser le fichier
  const { error } = await supabase.storage.from(BUCKET_NAME).upload(fileName, file, {
    contentType: "application/pdf",
    cacheControl: "3600",
  })

  if (error) {
    throw error
  }

  return fileName
}

// Fonction pour récupérer un fichier
export async function getFile(fileName: string): Promise<{ buffer: Buffer; contentType: string }> {
  const { data, error } = await supabase.storage.from(BUCKET_NAME).download(fileName)

  if (error || !data) {
    throw error || new Error("Fichier non trouvé")
  }

  const buffer = Buffer.from(await data.arrayBuffer())

  return {
    buffer,
    contentType: "application/pdf",
  }
}

// Fonction pour générer une URL signée pour accéder à un fichier
export async function getSignedFileUrl(fileName: string, expiresIn = 3600): Promise<string> {
  const { data, error } = await supabase.storage.from(BUCKET_NAME).createSignedUrl(fileName, expiresIn)

  if (error || !data?.signedUrl) {
    throw error || new Error("Impossible de générer l'URL signée")
  }

  return data.signedUrl
}

// Fonction pour supprimer un fichier
export async function deleteFile(fileName: string): Promise<void> {
  const { error } = await supabase.storage.from(BUCKET_NAME).remove([fileName])

  if (error) {
    throw error
  }
}

