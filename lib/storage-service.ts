import fs from "fs"
import path from "path"
import crypto from "crypto"
import { mkdir } from "fs/promises"

// Répertoire de stockage des fichiers
const UPLOAD_DIR = process.env.UPLOAD_DIR || path.join(process.cwd(), "uploads")

// Fonction pour générer un nom de fichier unique
function generateUniqueFileName(originalName: string): string {
  const timestamp = Date.now()
  const randomString = crypto.randomBytes(16).toString("hex")
  const extension = originalName.split(".").pop()
  return `${timestamp}-${randomString}.${extension}`
}

// Fonction pour chiffrer un fichier
async function encryptFile(buffer: Buffer, key: string): Promise<Buffer> {
  const algorithm = "aes-256-cbc"
  const iv = crypto.randomBytes(16)
  const cipher = crypto.createCipheriv(algorithm, Buffer.from(key, "hex"), iv)

  const encrypted = Buffer.concat([iv, cipher.update(buffer), cipher.final()])
  return encrypted
}

// Fonction pour déchiffrer un fichier
async function decryptFile(encryptedBuffer: Buffer, key: string): Promise<Buffer> {
  const algorithm = "aes-256-cbc"
  const iv = encryptedBuffer.slice(0, 16)
  const encryptedData = encryptedBuffer.slice(16)
  const decipher = crypto.createDecipheriv(algorithm, Buffer.from(key, "hex"), iv)

  const decrypted = Buffer.concat([decipher.update(encryptedData), decipher.final()])
  return decrypted
}

// Fonction pour s'assurer que le répertoire de téléversement existe
async function ensureUploadDirExists() {
  try {
    await mkdir(UPLOAD_DIR, { recursive: true })
  } catch (error) {
    console.error("Erreur lors de la création du répertoire de téléversement:", error)
  }
}

// Fonction pour téléverser un fichier
export async function uploadFile(file: Buffer, originalName: string, encrypt = true): Promise<string> {
  await ensureUploadDirExists()

  const fileName = generateUniqueFileName(originalName)
  const filePath = path.join(UPLOAD_DIR, fileName)

  let fileBuffer = file
  if (encrypt) {
    const encryptionKey = process.env.FILE_ENCRYPTION_KEY || crypto.randomBytes(32).toString("hex")
    fileBuffer = await encryptFile(file, encryptionKey)
  }

  fs.writeFileSync(filePath, fileBuffer)
  return fileName
}

// Fonction pour récupérer un fichier
export async function getFile(fileName: string): Promise<{ buffer: Buffer; contentType: string }> {
  const filePath = path.join(UPLOAD_DIR, fileName)

  if (!fs.existsSync(filePath)) {
    throw new Error("Fichier non trouvé")
  }

  let buffer = fs.readFileSync(filePath)
  const encryptionKey = process.env.FILE_ENCRYPTION_KEY || ""

  // Déterminer si le fichier est chiffré (dans une implémentation réelle,
  // cette information serait stockée en base de données)
  const isEncrypted = true // Par défaut, on suppose que tous les fichiers sont chiffrés

  if (isEncrypted && encryptionKey) {
    buffer = await decryptFile(buffer, encryptionKey)
  }

  return {
    buffer,
    contentType: "application/pdf",
  }
}

// Fonction pour générer une URL pour accéder à un fichier
export async function getFileUrl(fileName: string): Promise<string> {
  // Dans une implémentation locale, on retourne simplement le chemin de l'API
  return `/api/files/${fileName}`
}

// Fonction pour supprimer un fichier
export async function deleteFile(fileName: string): Promise<void> {
  const filePath = path.join(UPLOAD_DIR, fileName)

  if (fs.existsSync(filePath)) {
    fs.unlinkSync(filePath)
  }
}

