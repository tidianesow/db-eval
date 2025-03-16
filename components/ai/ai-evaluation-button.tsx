"use client"

import { useState } from "react"
import { Bot, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { toast } from "@/components/ui/use-toast"

interface AIEvaluationButtonProps {
  submissionId: string
  onEvaluationComplete?: (grade: number, feedback: string) => void
}

export function AIEvaluationButton({ submissionId, onEvaluationComplete }: AIEvaluationButtonProps) {
  const [isEvaluating, setIsEvaluating] = useState(false)

  const handleEvaluation = async () => {
    setIsEvaluating(true)

    try {
      const response = await fetch(`/api/submissions/${submissionId}/evaluate`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || "Erreur lors de l'évaluation")
      }

      const data = await response.json()

      toast({
        title: "Évaluation terminée",
        description: `Note attribuée: ${data.grade}/20`,
      })

      if (onEvaluationComplete) {
        onEvaluationComplete(data.grade, data.feedback)
      }
    } catch (error) {
      console.error("Erreur:", error)
      toast({
        title: "Erreur d'évaluation",
        description: error instanceof Error ? error.message : "Une erreur est survenue",
        variant: "destructive",
      })
    } finally {
      setIsEvaluating(false)
    }
  }

  return (
    <Button onClick={handleEvaluation} disabled={isEvaluating} className="bg-brand-600 hover:bg-brand-700">
      {isEvaluating ? (
        <>
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          Évaluation en cours...
        </>
      ) : (
        <>
          <Bot className="mr-2 h-4 w-4" />
          Évaluer avec l'IA
        </>
      )}
    </Button>
  )
}

