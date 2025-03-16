"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { ArrowLeft, FileText, Loader2, Upload } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Separator } from "@/components/ui/separator"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

export default function SubmitExercisePage({ params }: { params: { id: string } }) {
  const [file, setFile] = useState<File | null>(null)
  const [notes, setNotes] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const router = useRouter()

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0])
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simuler la soumission
    setTimeout(() => {
      setIsSubmitting(false)
      router.push(`/dashboard/exercises/${params.id}/success`)
    }, 2000)
  }

  // Données fictives pour l'exercice
  const exercise = {
    id: params.id,
    title: "Introduction aux requêtes SQL avancées",
    description:
      "Cet exercice porte sur les requêtes SQL avancées, incluant les jointures, les sous-requêtes et les fonctions d'agrégation.",
    dueDate: "15 juin 2023, 23:59",
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2">
        <Button variant="outline" size="icon" onClick={() => router.back()}>
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <h2 className="text-2xl font-bold tracking-tight">Soumettre un exercice</h2>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Détails de l'exercice</CardTitle>
            <CardDescription>Informations sur l'exercice à soumettre</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h3 className="font-medium">Titre</h3>
              <p>{exercise.title}</p>
            </div>
            <Separator />
            <div>
              <h3 className="font-medium">Description</h3>
              <p className="text-sm text-muted-foreground">{exercise.description}</p>
            </div>
            <Separator />
            <div>
              <h3 className="font-medium">Date limite</h3>
              <p className="text-sm text-muted-foreground">{exercise.dueDate}</p>
            </div>
            <Separator />
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" className="gap-2">
                <FileText className="h-4 w-4" />
                Voir l'énoncé
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Soumettre votre réponse</CardTitle>
            <CardDescription>Téléversez votre fichier PDF contenant votre solution</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid w-full items-center gap-1.5">
                <Label htmlFor="submission-file">Fichier PDF</Label>
                <div className="flex items-center justify-center w-full">
                  <label
                    htmlFor="submission-file"
                    className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-slate-800 dark:bg-slate-900 hover:bg-gray-100"
                  >
                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                      <Upload className="w-8 h-8 mb-3 text-gray-500 dark:text-gray-400" />
                      <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                        <span className="font-semibold">Cliquez pour téléverser</span> ou glissez-déposez
                      </p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">PDF (MAX. 10MB)</p>
                    </div>
                    <Input
                      id="submission-file"
                      type="file"
                      accept=".pdf"
                      className="hidden"
                      onChange={handleFileChange}
                    />
                  </label>
                </div>
                {file && <p className="text-sm text-muted-foreground mt-2">Fichier sélectionné: {file.name}</p>}
              </div>
              <div className="space-y-2">
                <Label htmlFor="notes">Notes (optionnel)</Label>
                <Textarea
                  id="notes"
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="Ajoutez des notes ou commentaires sur votre soumission..."
                  rows={3}
                />
              </div>
              <Alert>
                <AlertTitle>Important</AlertTitle>
                <AlertDescription>
                  Assurez-vous que votre fichier PDF est lisible et contient toutes les informations demandées. Les
                  soumissions sont définitives après envoi.
                </AlertDescription>
              </Alert>
              <CardFooter className="px-0 pt-4">
                <Button type="submit" className="w-full" disabled={!file || isSubmitting}>
                  {isSubmitting ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Soumission en cours...
                    </>
                  ) : (
                    "Soumettre"
                  )}
                </Button>
              </CardFooter>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

