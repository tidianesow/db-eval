"use client"

import type React from "react"

import { useState } from "react"
import { ThumbsDown, ThumbsUp } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Separator } from "@/components/ui/separator"

interface AIFeedbackDisplayProps {
  feedback: string
  submissionId: string
}

export function AIFeedbackDisplay({ feedback, submissionId }: AIFeedbackDisplayProps) {
  const [feedbackRating, setFeedbackRating] = useState<"helpful" | "unhelpful" | null>(null)
  const [comment, setComment] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleFeedbackRating = (rating: "helpful" | "unhelpful") => {
    setFeedbackRating(rating)
  }

  const handleSubmitComment = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simuler l'envoi du commentaire
    await new Promise((resolve) => setTimeout(resolve, 1000))

    setIsSubmitting(false)
    setComment("")
    // Afficher un message de confirmation
  }

  return (
    <div className="space-y-4">
      <div className="p-4 rounded-lg bg-gray-50 dark:bg-slate-900/50 border">
        <div className="prose dark:prose-invert prose-sm max-w-none">
          <div
            dangerouslySetInnerHTML={{
              __html: feedback
                .replace(/\n/g, "<br>")
                .replace(/^# (.*$)/gm, "<h1>$1</h1>")
                .replace(/^## (.*$)/gm, "<h2>$1</h2>")
                .replace(/^### (.*$)/gm, "<h3>$1</h3>")
                .replace(/```sql([\s\S]*?)```/g, "<pre><code>$1</code></pre>"),
            }}
          />
        </div>
      </div>

      <Separator />

      <div className="space-y-4">
        <h3 className="font-medium">Ce feedback vous a-t-il été utile?</h3>
        <div className="flex items-center gap-4">
          <Button
            variant={feedbackRating === "helpful" ? "default" : "outline"}
            size="sm"
            onClick={() => handleFeedbackRating("helpful")}
            className="gap-2"
          >
            <ThumbsUp className="h-4 w-4" />
            Utile
          </Button>
          <Button
            variant={feedbackRating === "unhelpful" ? "default" : "outline"}
            size="sm"
            onClick={() => handleFeedbackRating("unhelpful")}
            className="gap-2"
          >
            <ThumbsDown className="h-4 w-4" />
            Pas utile
          </Button>
        </div>

        {feedbackRating && (
          <form onSubmit={handleSubmitComment} className="space-y-2">
            <Textarea
              placeholder="Commentaires supplémentaires (optionnel)..."
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              rows={3}
            />
            <Button type="submit" size="sm" disabled={isSubmitting}>
              {isSubmitting ? "Envoi en cours..." : "Envoyer"}
            </Button>
          </form>
        )}
      </div>
    </div>
  )
}

