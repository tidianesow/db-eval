"use client"

import type React from "react"

import { useState, useCallback } from "react"
import { FileText, Upload, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { useToast } from "@/components/ui/use-toast"

interface FileUploadSecureProps {
  accept?: string
  maxSize?: number // en Mo
  onFileChange: (fileName: string | null) => void
  label?: string
}

export function FileUploadSecure({
  accept = ".pdf",
  maxSize = 10,
  onFileChange,
  label = "Téléverser un fichier",
}: FileUploadSecureProps) {
  const [file, setFile] = useState<File | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [uploading, setUploading] = useState(false)
  const [progress, setProgress] = useState(0)
  const { toast } = useToast()

  const handleFileChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setError(null)

      if (e.target.files && e.target.files[0]) {
        const selectedFile = e.target.files[0]

        // Vérifier la taille du fichier
        if (selectedFile.size > maxSize * 1024 * 1024) {
          setError(`Le fichier est trop volumineux. Taille maximale: ${maxSize}MB`)
          return
        }

        // Vérifier le type de fichier
        if (!selectedFile.type.includes("pdf")) {
          setError("Seuls les fichiers PDF sont acceptés")
          return
        }

        setFile(selectedFile)
        uploadFile(selectedFile)
      }
    },
    [maxSize, onFileChange],
  )

  const uploadFile = async (selectedFile: File) => {
    setUploading(true)
    setProgress(0)

    try {
      // Simuler la progression du téléversement
      const interval = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 90) {
            clearInterval(interval)
            return 90
          }
          return prev + 10
        })
      }, 300)

      const formData = new FormData()
      formData.append("file", selectedFile)

      const response = await fetch("/api/files/upload", {
        method: "POST",
        body: formData,
      })

      clearInterval(interval)

      if (!response.ok) {
        const data = await response.json()
        throw new Error(data.error || "Erreur lors du téléversement")
      }

      const data = await response.json()
      setProgress(100)

      toast({
        title: "Fichier téléversé avec succès",
        description: "Votre fichier a été chiffré et stocké en toute sécurité.",
      })

      onFileChange(data.fileName)
    } catch (error) {
      setError(error instanceof Error ? error.message : "Erreur lors du téléversement")
      toast({
        title: "Erreur de téléversement",
        description: error instanceof Error ? error.message : "Une erreur est survenue",
        variant: "destructive",
      })
      onFileChange(null)
    } finally {
      setUploading(false)
    }
  }

  const removeFile = () => {
    setFile(null)
    setError(null)
    setProgress(0)
    setUploading(false)
    onFileChange(null)
  }

  return (
    <div className="space-y-4">
      {!file ? (
        <div className="flex items-center justify-center w-full">
          <label
            htmlFor="file-upload-secure"
            className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-slate-800 dark:bg-slate-900 hover:bg-gray-100"
          >
            <div className="flex flex-col items-center justify-center pt-5 pb-6">
              <Upload className="w-8 h-8 mb-3 text-gray-500 dark:text-gray-400" />
              <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                <span className="font-semibold">{label}</span> ou glissez-déposez
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400">PDF (MAX. {maxSize}MB)</p>
            </div>
            <input id="file-upload-secure" type="file" accept={accept} className="hidden" onChange={handleFileChange} />
          </label>
        </div>
      ) : (
        <div className="rounded-lg border p-4 bg-gray-50 dark:bg-slate-900/50">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-3">
              <FileText className="h-8 w-8 text-blue-500" />
              <div>
                <p className="font-medium truncate max-w-[200px]">{file.name}</p>
                <p className="text-xs text-muted-foreground">{(file.size / 1024 / 1024).toFixed(2)} MB</p>
              </div>
            </div>
            <Button variant="ghost" size="icon" onClick={removeFile} disabled={uploading}>
              <X className="h-4 w-4" />
            </Button>
          </div>
          {uploading && (
            <div className="space-y-2">
              <Progress value={progress} className="h-2" />
              <div className="flex justify-between items-center">
                <p className="text-xs text-muted-foreground">
                  {progress < 100 ? "Téléversement en cours..." : "Téléversement terminé"}
                </p>
                <p className="text-xs text-right text-muted-foreground">{progress}%</p>
              </div>
            </div>
          )}
        </div>
      )}
      {error && <p className="text-sm text-red-500">{error}</p>}
    </div>
  )
}

