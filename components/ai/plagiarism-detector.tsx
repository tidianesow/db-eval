"use client"

import { useState } from "react"
import { AlertTriangle, Info } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

interface PlagiarismDetectorProps {
  submissionId: string
  initialScore?: number
}

export function PlagiarismDetector({ submissionId, initialScore }: PlagiarismDetectorProps) {
  const [score, setScore] = useState(initialScore || 0)
  const [isChecking, setIsChecking] = useState(false)
  const [showDetails, setShowDetails] = useState(false)

  const handleCheckPlagiarism = async () => {
    setIsChecking(true)

    // Simuler la détection de plagiat
    await new Promise((resolve) => setTimeout(resolve, 2000))

    // Générer un score aléatoire entre 0 et 40
    const newScore = Math.floor(Math.random() * 40)
    setScore(newScore)
    setIsChecking(false)
    setShowDetails(true)
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
          <h3 className="font-medium">Détection de plagiat</h3>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Info className="h-4 w-4 text-muted-foreground cursor-help" />
              </TooltipTrigger>
              <TooltipContent>
                <p className="max-w-xs">
                  Notre système détecte les similitudes entre votre soumission et d'autres travaux. Un score élevé
                  indique un risque de plagiat.
                </p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
        {!isChecking && score === 0 && (
          <Button size="sm" onClick={handleCheckPlagiarism}>
            Vérifier
          </Button>
        )}
        {isChecking && (
          <div className="flex items-center gap-2">
            <span className="text-sm text-muted-foreground">Analyse en cours...</span>
            <Progress value={50} className="w-24 h-2" />
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
                Votre soumission présente des similitudes importantes avec d'autres travaux. Veuillez revoir votre
                travail pour éviter des sanctions académiques.
              </AlertDescription>
            </Alert>
          )}

          {score >= 15 && score < 30 && (
            <Alert>
              <AlertTriangle className="h-4 w-4" />
              <AlertTitle>Similitudes modérées détectées</AlertTitle>
              <AlertDescription>
                Votre soumission présente quelques similitudes avec d'autres travaux. Assurez-vous de citer correctement
                vos sources.
              </AlertDescription>
            </Alert>
          )}

          {showDetails && (
            <Button variant="outline" size="sm" onClick={() => setShowDetails(!showDetails)}>
              {showDetails ? "Masquer les détails" : "Afficher les détails"}
            </Button>
          )}

          {showDetails && (
            <div className="rounded-lg border p-4 space-y-2">
              <h4 className="font-medium">Détails de l'analyse</h4>
              <p className="text-sm text-muted-foreground">Similitudes trouvées avec les soumissions suivantes:</p>
              <ul className="text-sm space-y-2">
                <li className="flex justify-between">
                  <span>Soumission #12345</span>
                  <span className="font-medium">{Math.floor(score * 0.8)}% de similarité</span>
                </li>
                <li className="flex justify-between">
                  <span>Soumission #67890</span>
                  <span className="font-medium">{Math.floor(score * 0.5)}% de similarité</span>
                </li>
              </ul>
            </div>
          )}
        </div>
      )}
    </div>
  )
}

