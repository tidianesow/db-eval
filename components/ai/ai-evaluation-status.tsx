"use client"

import { useState, useEffect } from "react"
import { Bot, CheckCircle, Clock, RefreshCw } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"

interface AIEvaluationStatusProps {
  submissionId: string
  initialStatus?: "pending" | "processing" | "completed"
  onComplete?: () => void
}

export function AIEvaluationStatus({ submissionId, initialStatus = "pending", onComplete }: AIEvaluationStatusProps) {
  const [status, setStatus] = useState(initialStatus)
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    if (status === "processing") {
      const interval = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 100) {
            clearInterval(interval)
            setStatus("completed")
            if (onComplete) onComplete()
            return 100
          }
          return prev + 10
        })
      }, 500)

      return () => clearInterval(interval)
    }
  }, [status, onComplete])

  const handleStartEvaluation = () => {
    setStatus("processing")
    setProgress(0)
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="font-medium">Évaluation par IA</h3>
        {status === "pending" && (
          <Button size="sm" onClick={handleStartEvaluation} className="gap-2">
            <Bot className="h-4 w-4" />
            Démarrer l'évaluation
          </Button>
        )}
        {status === "processing" && (
          <div className="flex items-center gap-2">
            <RefreshCw className="h-4 w-4 animate-spin" />
            <span className="text-sm">Évaluation en cours...</span>
          </div>
        )}
        {status === "completed" && (
          <div className="flex items-center gap-2 text-green-600 dark:text-green-500">
            <CheckCircle className="h-4 w-4" />
            <span className="text-sm font-medium">Évaluation terminée</span>
          </div>
        )}
      </div>

      {status === "processing" && (
        <div className="space-y-2">
          <div className="flex items-center justify-between text-sm">
            <span>Progression</span>
            <span>{progress}%</span>
          </div>
          <Progress value={progress} className="h-2" />
          <div className="flex flex-col gap-2 mt-4">
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm text-muted-foreground">Analyse du contenu...</span>
            </div>
            {progress > 30 && (
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm text-muted-foreground">Comparaison avec les solutions de référence...</span>
              </div>
            )}
            {progress > 60 && (
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm text-muted-foreground">Génération du feedback...</span>
              </div>
            )}
            {progress > 90 && (
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm text-muted-foreground">Finalisation de l'évaluation...</span>
              </div>
            )}
          </div>
        </div>
      )}

      {status === "completed" && (
        <div className="rounded-lg border p-4 bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-900/30">
          <div className="flex items-center gap-2 mb-2">
            <Bot className="h-5 w-5 text-green-600 dark:text-green-500" />
            <h4 className="font-medium text-green-800 dark:text-green-400">Évaluation terminée avec succès</h4>
          </div>
          <p className="text-sm text-green-700 dark:text-green-300">
            L'IA a terminé l'évaluation de votre soumission. Vous pouvez maintenant consulter les résultats et le
            feedback détaillé.
          </p>
        </div>
      )}
    </div>
  )
}

