"use client"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { ArrowLeft, Clock, Download, FileText } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"

export default function ExerciseDetailPage({ params }: { params: { id: string } }) {
  const router = useRouter()

  // Données fictives pour l'exercice
  const exercise = {
    id: params.id,
    title: "Introduction aux requêtes SQL avancées",
    description:
      "Cet exercice porte sur les requêtes SQL avancées, incluant les jointures, les sous-requêtes et les fonctions d'agrégation.",
    dueDate: "15 juin 2023, 23:59",
    difficulty: "Intermédiaire",
    author: "Prof. Martin Dupont",
    createdAt: "1 juin 2023",
    instructions: `
# Introduction aux requêtes SQL avancées

## Objectifs
- Maîtriser les jointures SQL (INNER, LEFT, RIGHT, FULL)
- Comprendre et utiliser les sous-requêtes
- Utiliser les fonctions d'agrégation pour l'analyse de données

## Contexte
Vous travaillez avec une base de données d'une boutique en ligne qui contient les tables suivantes:
- **users**: Informations sur les utilisateurs
- **products**: Catalogue de produits
- **orders**: Commandes passées par les utilisateurs
- **order_items**: Produits inclus dans chaque commande

## Exercices

### Partie 1: Jointures
1. Écrivez une requête qui affiche le nom de l'utilisateur et le total de ses commandes.
2. Écrivez une requête qui affiche tous les produits, même ceux qui n'ont jamais été commandés.
3. Écrivez une requête qui affiche toutes les commandes avec les détails des produits.

### Partie 2: Sous-requêtes
1. Trouvez les utilisateurs qui ont dépensé plus que la moyenne.
2. Trouvez les produits qui n'ont pas été commandés au cours du dernier mois.
3. Trouvez les catégories de produits qui ont généré le plus de revenus.

### Partie 3: Fonctions d'agrégation
1. Calculez le revenu total par mois pour l'année en cours.
2. Trouvez le nombre moyen de produits par commande.
3. Identifiez le produit le plus vendu dans chaque catégorie.

## Consignes de soumission
- Soumettez vos réponses dans un fichier PDF.
- Pour chaque requête, incluez:
  - La requête SQL
  - Une brève explication de votre approche
  - Le résultat attendu (si possible)
- Vous pouvez inclure des captures d'écran des résultats si vous avez testé vos requêtes.
    `,
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2">
        <Button variant="outline" size="icon" onClick={() => router.back()}>
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <h2 className="text-2xl font-bold tracking-tight">{exercise.title}</h2>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <div className="md:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div>
                  <CardTitle>Instructions</CardTitle>
                  <CardDescription>Lisez attentivement les instructions ci-dessous</CardDescription>
                </div>
                <Button variant="outline" className="md:self-start gap-2">
                  <Download className="h-4 w-4" />
                  Télécharger le PDF
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="prose dark:prose-invert max-w-none">
                <div
                  dangerouslySetInnerHTML={{
                    __html: exercise.instructions
                      .replace(/\n/g, "<br>")
                      .replace(/^# (.*$)/gm, "<h1>$1</h1>")
                      .replace(/^## (.*$)/gm, "<h2>$1</h2>")
                      .replace(/^### (.*$)/gm, "<h3>$1</h3>"),
                  }}
                />
              </div>
            </CardContent>
          </Card>

          <div className="flex justify-end">
            <Button asChild size="lg">
              <Link href={`/dashboard/exercises/${exercise.id}/submit`}>Soumettre ma réponse</Link>
            </Button>
          </div>
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Détails de l'exercice</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h4 className="text-sm font-medium mb-1">Difficulté</h4>
                <Badge
                  variant={
                    exercise.difficulty === "Facile"
                      ? "default"
                      : exercise.difficulty === "Intermédiaire"
                        ? "secondary"
                        : exercise.difficulty === "Difficile"
                          ? "destructive"
                          : "outline"
                  }
                >
                  {exercise.difficulty}
                </Badge>
              </div>
              <Separator />
              <div>
                <h4 className="text-sm font-medium mb-1">Date limite</h4>
                <p className="text-sm flex items-center gap-2">
                  <Clock className="h-4 w-4 text-muted-foreground" />
                  {exercise.dueDate}
                </p>
              </div>
              <Separator />
              <div>
                <h4 className="text-sm font-medium mb-1">Auteur</h4>
                <p className="text-sm">{exercise.author}</p>
              </div>
              <Separator />
              <div>
                <h4 className="text-sm font-medium mb-1">Date de création</h4>
                <p className="text-sm">{exercise.createdAt}</p>
              </div>
              <Separator />
              <div>
                <h4 className="text-sm font-medium mb-1">Ressources</h4>
                <div className="flex items-center gap-2 mt-2">
                  <Button variant="outline" size="sm" className="gap-2">
                    <FileText className="h-4 w-4" />
                    Schéma de la base de données
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Conseils</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="rounded-lg border p-3">
                <h4 className="font-medium">Jointures</h4>
                <p className="text-sm text-muted-foreground mt-1">
                  Assurez-vous de bien comprendre les différents types de jointures avant de commencer.
                </p>
                <Button variant="link" size="sm" className="px-0 mt-1">
                  Voir le tutoriel
                </Button>
              </div>
              <div className="rounded-lg border p-3">
                <h4 className="font-medium">Sous-requêtes</h4>
                <p className="text-sm text-muted-foreground mt-1">
                  Les sous-requêtes peuvent être utilisées dans différentes parties d'une requête SQL.
                </p>
                <Button variant="link" size="sm" className="px-0 mt-1">
                  Voir le tutoriel
                </Button>
              </div>
              <div className="rounded-lg border p-3">
                <h4 className="font-medium">Fonctions d'agrégation</h4>
                <p className="text-sm text-muted-foreground mt-1">
                  N'oubliez pas d'utiliser GROUP BY avec les fonctions d'agrégation.
                </p>
                <Button variant="link" size="sm" className="px-0 mt-1">
                  Voir le tutoriel
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

