"use client"

import Link from "next/link"
import { CheckCircle, Clock, Home } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"

export default function SubmissionSuccessPage({ params }: { params: { id: string } }) {
  return (
    <div className="container max-w-md mx-auto py-12">
      <Card className="border-green-200 dark:border-green-900">
        <CardHeader className="pb-2">
          <div className="flex justify-center mb-4">
            <div className="w-16 h-16 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center">
              <CheckCircle className="h-8 w-8 text-green-600 dark:text-green-500" />
            </div>
          </div>
          <CardTitle className="text-center text-2xl">Soumission réussie!</CardTitle>
          <CardDescription className="text-center">Votre réponse a été soumise avec succès</CardDescription>
        </CardHeader>
        <CardContent className="text-center space-y-4">
          <p className="text-muted-foreground">
            Votre soumission pour l'exercice <span className="font-medium">Introduction aux requêtes SQL avancées</span>{" "}
            a été reçue.
          </p>
          <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
            <Clock className="h-4 w-4" />
            <span>Soumis le 12 juin 2023 à 14:30</span>
          </div>
          <div className="rounded-lg border p-4 mt-4 bg-muted/50">
            <h3 className="font-medium mb-2">Que se passe-t-il maintenant?</h3>
            <p className="text-sm text-muted-foreground">
              Votre soumission sera évaluée automatiquement par notre IA. Vous recevrez une notification dès que les
              résultats seront disponibles.
            </p>
          </div>
        </CardContent>
        <CardFooter className="flex flex-col space-y-2">
          <Button asChild className="w-full">
            <Link href="/dashboard/submissions">Voir mes soumissions</Link>
          </Button>
          <Button asChild variant="outline" className="w-full">
            <Link href="/dashboard">
              <Home className="mr-2 h-4 w-4" />
              Retour au tableau de bord
            </Link>
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}

