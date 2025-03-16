"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { ArrowLeft, Download, FileText, MessageSquare, ThumbsDown, ThumbsUp } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"

export default function SubmissionDetailPage({ params }: { params: { id: string } }) {
  const [feedbackRating, setFeedbackRating] = useState<"helpful" | "unhelpful" | null>(null)
  const [comment, setComment] = useState("")

  // Données fictives pour la soumission
  const submission = {
    id: params.id,
    exerciseTitle: "Introduction aux requêtes SQL avancées",
    submittedAt: "12 mai 2023, 14:30",
    status: "graded",
    score: 16,
    maxScore: 20,
    feedback: [
      {
        id: "1",
        content:
          "Excellente utilisation des jointures dans vos requêtes SQL. Votre solution pour la question 3 est particulièrement efficace.",
        type: "positive",
      },
      {
        id: "2",
        content:
          "Attention à l'optimisation des requêtes. Votre solution pour la question 5 pourrait être améliorée en utilisant des index appropriés.",
        type: "improvement",
      },
      {
        id: "3",
        content:
          "Vous avez oublié de gérer le cas où la table est vide dans la question 7. Cela pourrait causer des erreurs dans certains cas.",
        type: "negative",
      },
    ],
    detailedFeedback: `# Analyse détaillée

## Points forts
- Excellente compréhension des jointures SQL
- Bonne utilisation des fonctions d'agrégation
- Structure claire et lisible des requêtes

## Points à améliorer
- Optimisation des requêtes complexes
- Gestion des cas limites
- Utilisation des index

## Recommandations
Pour améliorer vos compétences en SQL, je vous recommande de:
1. Étudier les plans d'exécution des requêtes
2. Pratiquer l'optimisation avec des jeux de données plus volumineux
3. Approfondir les concepts d'indexation

Votre solution à la question 4 pourrait être simplifiée comme suit:
\`\`\`sql
SELECT u.name, COUNT(o.id) as order_count
FROM users u
LEFT JOIN orders o ON u.id = o.user_id
GROUP BY u.id, u.name
HAVING COUNT(o.id) > 5
ORDER BY order_count DESC;
\`\`\``,
  }

  const handleFeedbackRating = (rating: "helpful" | "unhelpful") => {
    setFeedbackRating(rating)
  }

  const handleSubmitComment = (e: React.FormEvent) => {
    e.preventDefault()
    // Logique pour soumettre le commentaire
    setComment("")
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2">
        <Button variant="outline" size="icon" asChild>
          <Link href="/dashboard/submissions">
            <ArrowLeft className="h-4 w-4" />
          </Link>
        </Button>
        <h2 className="text-2xl font-bold tracking-tight">Détails de la soumission</h2>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <div className="md:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>{submission.exerciseTitle}</CardTitle>
                  <CardDescription>Soumis le {submission.submittedAt}</CardDescription>
                </div>
                <Badge variant={submission.status === "graded" ? "default" : "outline"}>
                  {submission.status === "graded" ? "Corrigé" : "En attente"}
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium">
                      Note: {submission.score}/{submission.maxScore}
                    </span>
                    <span className="text-sm text-muted-foreground">
                      {((submission.score / submission.maxScore) * 100).toFixed(0)}%
                    </span>
                  </div>
                  <Progress value={(submission.score / submission.maxScore) * 100} className="h-2" />
                </div>

                <Tabs defaultValue="feedback">
                  <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="feedback">Feedback</TabsTrigger>
                    <TabsTrigger value="submission">Ma soumission</TabsTrigger>
                  </TabsList>
                  <TabsContent value="feedback" className="space-y-4 pt-4">
                    <div className="space-y-4">
                      {submission.feedback.map((item) => (
                        <div
                          key={item.id}
                          className={`p-4 rounded-lg ${
                            item.type === "positive"
                              ? "bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-900/30"
                              : item.type === "negative"
                                ? "bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-900/30"
                                : "bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-900/30"
                          }`}
                        >
                          <p className="text-sm">{item.content}</p>
                        </div>
                      ))}
                    </div>

                    <Separator />

                    <div className="space-y-4">
                      <h3 className="font-medium">Feedback détaillé</h3>
                      <div className="p-4 rounded-lg bg-gray-50 dark:bg-slate-900/50 border">
                        <div className="prose dark:prose-invert prose-sm max-w-none">
                          <div
                            dangerouslySetInnerHTML={{
                              __html: submission.detailedFeedback
                                .replace(/\n/g, "<br>")
                                .replace(/```sql([\s\S]*?)```/g, "<pre><code>$1</code></pre>"),
                            }}
                          />
                        </div>
                      </div>
                    </div>

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
                          <Button type="submit" size="sm">
                            Envoyer
                          </Button>
                        </form>
                      )}
                    </div>
                  </TabsContent>
                  <TabsContent value="submission" className="pt-4">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="font-medium">Ma soumission</h3>
                      <Button variant="outline" size="sm" className="gap-2">
                        <Download className="h-4 w-4" />
                        Télécharger
                      </Button>
                    </div>
                    <div className="p-4 rounded-lg bg-gray-50 dark:bg-slate-900/50 border flex items-center justify-center h-64">
                      <div className="text-center">
                        <FileText className="h-12 w-12 text-muted-foreground mx-auto mb-2" />
                        <p className="text-muted-foreground">Aperçu du PDF non disponible</p>
                        <Button variant="link" size="sm">
                          Ouvrir le PDF
                        </Button>
                      </div>
                    </div>
                  </TabsContent>
                </Tabs>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MessageSquare className="h-5 w-5" />
                Poser une question
              </CardTitle>
              <CardDescription>
                Des questions sur le feedback? Demandez des précisions à votre professeur.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form className="space-y-4">
                <Textarea placeholder="Votre question..." rows={4} />
                <Button type="submit">Envoyer</Button>
              </form>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Recommandations</CardTitle>
              <CardDescription>Basées sur votre soumission</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="rounded-lg border p-3">
                  <h4 className="font-medium">Optimisation des requêtes</h4>
                  <p className="text-sm text-muted-foreground mt-1">
                    Apprenez à optimiser vos requêtes SQL pour de meilleures performances.
                  </p>
                  <Button variant="link" size="sm" className="px-0 mt-1">
                    Voir le tutoriel
                  </Button>
                </div>
                <div className="rounded-lg border p-3">
                  <h4 className="font-medium">Indexation</h4>
                  <p className="text-sm text-muted-foreground mt-1">
                    Découvrez comment utiliser efficacement les index dans vos bases de données.
                  </p>
                  <Button variant="link" size="sm" className="px-0 mt-1">
                    Voir le tutoriel
                  </Button>
                </div>
                <div className="rounded-lg border p-3">
                  <h4 className="font-medium">Exercices similaires</h4>
                  <p className="text-sm text-muted-foreground mt-1">
                    Pratiquez avec des exercices similaires pour renforcer vos compétences.
                  </p>
                  <Button variant="link" size="sm" className="px-0 mt-1">
                    Voir les exercices
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Statistiques</CardTitle>
              <CardDescription>Comparaison avec la classe</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium">Votre note</span>
                    <span className="text-sm font-medium">
                      {submission.score}/{submission.maxScore}
                    </span>
                  </div>
                  <Progress value={(submission.score / submission.maxScore) * 100} className="h-2" />
                </div>
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium">Moyenne de la classe</span>
                    <span className="text-sm font-medium">14/20</span>
                  </div>
                  <Progress value={(14 / 20) * 100} className="h-2" />
                </div>
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium">Note maximale</span>
                    <span className="text-sm font-medium">19/20</span>
                  </div>
                  <Progress value={(19 / 20) * 100} className="h-2" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

