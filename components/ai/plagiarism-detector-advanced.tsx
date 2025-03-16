"use client"

import { useState } from "react"
import { AlertTriangle, Info, Loader2, Search, Users } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { useToast } from "@/components/ui/use-toast"

interface PlagiarismDetectorAdvancedProps {
  submissionId: string
  initialScore?: number
}

export function PlagiarismDetectorAdvanced({ submissionId, initialScore }: PlagiarismDetectorAdvancedProps) {
  const [score, setScore] = useState(initialScore || 0)
  const [isChecking, setIsChecking] = useState(false)
  const [showDetails, setShowDetails] = useState(false)
  const [similarSubmissions, setSimilarSubmissions] = useState<any[]>([])
  const { toast } = useToast()

  const handleCheckPlagiarism = async () => {
    setIsChecking(true)

    try {
      const response = await fetch(`/api/submissions/${submissionId}/plagiarism`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || "Erreur lors de l'analyse de plagiat")
      }

      const data = await response.json()
      setScore(data.score)
      setSimilarSubmissions(data.similarSubmissions)
      setShowDetails(true)

      toast({
        title: "Analyse de plagiat terminée",
        description: `Score de similarité: ${data.score}%`,
      })
    } catch (error) {
      console.error("Erreur:", error)
      toast({
        title: "Erreur d'analyse",
        description: error instanceof Error ? error.message : "Une erreur est survenue",
        variant: "destructive",
      })
    } finally {
      setIsChecking(false)
    }
  }

  const getSeverityColor = (score: number) => {
    if (score < 15) return "text-green-600 dark:text-green-500"
    if (score < 30) return "text-amber-600 dark:text-amber-500"
    return "text-red-600 dark:text-red-500"
  }

  const getSeverityText = (score: number) => {
    if (score < 15) return "Faible"
    if (score < 30) return "Modéré"
    return "Élevé"
  }

  const getSeverityBg = (score: number) => {
    if (score < 15) return "bg-green-600"
    if (score < 30) return "bg-amber-600"
    return "bg-red-600"
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <h3 className="font-medium">Détection de plagiat avancée</h3>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Info className="h-4 w-4 text-muted-foreground cursor-help" />
              </TooltipTrigger>
              <TooltipContent>
                <p className="max-w-xs">
                  Notre système utilise plusieurs algorithmes (Jaccard, Cosinus, Levenshtein) pour détecter les
                  similitudes entre les soumissions.
                </p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
        {!isChecking && score === 0 && (
          <Button size="sm" onClick={handleCheckPlagiarism} className="gap-2">
            <Search className="h-4 w-4" />
            Analyser
          </Button>
        )}
        {isChecking && (
          <div className="flex items-center gap-2">
            <Loader2 className="h-4 w-4 animate-spin" />
            <span className="text-sm text-muted-foreground">Analyse en cours...</span>
          </div>
        )}
      </div>

      {score > 0 && !isChecking && (
        <div className="space-y-4">
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium">
                Score de similarité: <span className={getSeverityColor(score)}>{score}%</span>
              </span>
              <span className={`text-sm font-medium ${getSeverityColor(score)}`}>{getSeverityText(score)}</span>
            </div>
            <Progress value={score} className="h-2" indicatorClassName={getSeverityBg(score)} />
          </div>

          {score >= 30 && (
            <Alert variant="destructive">
              <AlertTriangle className="h-4 w-4" />
              <AlertTitle>Risque élevé de plagiat détecté</AlertTitle>
              <AlertDescription>
                Cette soumission présente des similitudes importantes avec d'autres travaux. Une vérification manuelle
                est fortement recommandée.
              </AlertDescription>
            </Alert>
          )}

          {score >= 15 && score < 30 && (
            <Alert>
              <AlertTriangle className="h-4 w-4" />
              <AlertTitle>Similitudes modérées détectées</AlertTitle>
              <AlertDescription>
                Cette soumission présente quelques similitudes avec d'autres travaux. Une vérification peut être
                nécessaire.
              </AlertDescription>
            </Alert>
          )}

          {showDetails && similarSubmissions.length > 0 && (
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="flex items-center gap-2">
                      <Users className="h-5 w-5 text-brand-600" />
                      Soumissions similaires
                    </CardTitle>
                    <CardDescription>
                      {similarSubmissions.length} soumission(s) avec des similitudes significatives
                    </CardDescription>
                  </div>
                  <Button variant="outline" size="sm" onClick={() => setShowDetails(!showDetails)}>
                    {showDetails ? "Masquer les détails" : "Afficher les détails"}
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {similarSubmissions.map((submission, index) => (
                    <div key={index} className="flex items-center justify-between p-3 rounded-lg border bg-muted/20">
                      <div className="flex items-center gap-3">
                        <Avatar className="h-8 w-8">
                          <AvatarImage src="/placeholder.svg?height=32&width=32" alt={submission.studentName} />
                          <AvatarFallback>{submission.studentName.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="text-sm font-medium">{submission.studentName}</p>
                          <p className="text-xs text-muted-foreground">{submission.exerciseTitle}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className={`text-sm font-medium ${getSeverityColor(submission.similarity * 100)}`}>
                          {Math.round(submission.similarity * 100)}% de similarité
                        </span>
                        <Button variant="ghost" size="sm" asChild>
                          <a href={`/dashboard/submissions/${submission.id}`}>Voir</a>
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      )}
    </div>
  )
}

