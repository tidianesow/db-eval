"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { ArrowLeft, Bot, FileText } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { AIEvaluationButton } from "@/components/ai/ai-evaluation-button"
import { AIEvaluationStatus } from "@/components/ai/ai-evaluation-status"
import { AIFeedbackDisplay } from "@/components/ai/ai-feedback-display"

export default function EvaluateSubmissionPage({ params }: { params: { id: string } }) {
  const router = useRouter()
  const [evaluationStatus, setEvaluationStatus] = useState<"pending" | "processing" | "completed">("pending")
  const [feedback, setFeedback] = useState("")
  const [grade, setGrade] = useState<number | null>(null)

  const handleEvaluationComplete = (newGrade: number, newFeedback: string) => {
    setGrade(newGrade)
    setFeedback(newFeedback)
    setEvaluationStatus("completed")
  }

  // Données fictives pour la soumission
  const submission = {
    id: params.id,
    exerciseTitle: "Introduction aux requêtes SQL avancées",
    studentName: "Marie Dupont",
    submittedAt: "12 juin 2023, 14:30",
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2">
        <Button variant="outline" size="icon" onClick={() => router.back()}>
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <h2 className="text-2xl font-bold tracking-tight">Évaluation de la soumission</h2>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <div className="md:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div>
                  <CardTitle>{submission.exerciseTitle}</CardTitle>
                  <CardDescription>
                    Soumis par {submission.studentName} le {submission.submittedAt}
                  </CardDescription>
                </div>
                <AIEvaluationButton submissionId={params.id} onEvaluationComplete={handleEvaluationComplete} />
              </div>
            </CardHeader>
            <CardContent>
              <div className="p-4 rounded-lg bg-gray-50 dark:bg-slate-900/50 border flex items-center justify-center h-64">
                <div className="text-center">
                  <FileText className="h-12 w-12 text-muted-foreground mx-auto mb-2" />
                  <p className="text-muted-foreground">Aperçu du PDF non disponible</p>
                  <Button variant="link" size="sm">
                    Ouvrir le PDF
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {evaluationStatus === "completed" && feedback && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Bot className="h-5 w-5 text-brand-600" />
                  Feedback de l'IA
                </CardTitle>
                <CardDescription>
                  Note attribuée: <span className="font-medium">{grade}/20</span>
                </CardDescription>
              </CardHeader>
              <CardContent>
                <AIFeedbackDisplay feedback={feedback} submissionId={params.id} />
              </CardContent>
            </Card>
          )}
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Statut de l'évaluation</CardTitle>
              <CardDescription>Suivez le processus d'évaluation automatique</CardDescription>
            </CardHeader>
            <CardContent>
              <AIEvaluationStatus
                submissionId={params.id}
                initialStatus={evaluationStatus}
                onComplete={() => setEvaluationStatus("completed")}
              />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Paramètres d'évaluation</CardTitle>
              <CardDescription>Configuration de l'évaluation par IA</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h3 className="text-sm font-medium mb-2">Modèle d'IA</h3>
                <p className="text-sm text-muted-foreground">DeepSeek Coder (via Ollama)</p>
              </div>
              <Separator />
              <div>
                <h3 className="text-sm font-medium mb-2">Critères d'évaluation</h3>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• Exactitude des requêtes SQL</li>
                  <li>• Optimisation des requêtes</li>
                  <li>• Structure et lisibilité</li>
                  <li>• Gestion des cas limites</li>
                </ul>
              </div>
              <Separator />
              <div>
                <h3 className="text-sm font-medium mb-2">Température</h3>
                <p className="text-sm text-muted-foreground">0.2 (Résultats plus déterministes)</p>
              </div>
            </CardContent>
            <CardFooter>
              <Button variant="outline" size="sm" className="w-full" asChild>
                <Link href="/dashboard/settings/ai">Modifier les paramètres</Link>
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  )
}

