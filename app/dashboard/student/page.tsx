"use client"

import { cn } from "@/lib/utils"

import { useState } from "react"
import Link from "next/link"
import { BookOpen, CheckCircle, Clock, FileText, Search, Award, Zap, BookMarked, Lightbulb } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { StatsOverview } from "@/components/dashboard/stats-overview"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"

// Données fictives pour les exercices
const availableExercises = [
  {
    id: "1",
    title: "Introduction aux requêtes SQL",
    description: "Apprenez les bases des requêtes SQL avec des exemples simples.",
    dueDate: "15 juin 2023",
    difficulty: "Facile",
  },
  {
    id: "2",
    title: "Jointures SQL avancées",
    description: "Maîtrisez les différents types de jointures en SQL.",
    dueDate: "22 juin 2023",
    difficulty: "Intermédiaire",
  },
  {
    id: "3",
    title: "Sous-requêtes et fonctions d'agrégation",
    description: "Utilisez des sous-requêtes et des fonctions d'agrégation pour des analyses complexes.",
    dueDate: "29 juin 2023",
    difficulty: "Difficile",
  },
  {
    id: "4",
    title: "Optimisation des requêtes",
    description: "Apprenez à optimiser vos requêtes SQL pour de meilleures performances.",
    dueDate: "6 juillet 2023",
    difficulty: "Avancé",
  },
]

const completedExercises = [
  {
    id: "5",
    title: "Bases de SQL",
    submittedAt: "5 mai 2023",
    score: 18,
    maxScore: 20,
  },
  {
    id: "6",
    title: "Modélisation de bases de données",
    submittedAt: "12 mai 2023",
    score: 16,
    maxScore: 20,
  },
  {
    id: "7",
    title: "Normalisation",
    submittedAt: "19 mai 2023",
    score: 15,
    maxScore: 20,
  },
]

// Données pour les statistiques
const progressData = [
  { subject: "SQL de base", score: 85 },
  { subject: "Jointures", score: 70 },
  { subject: "Sous-requêtes", score: 65 },
  { subject: "Optimisation", score: 55 },
  { subject: "Normalisation", score: 75 },
]

export default function StudentDashboardPage() {
  const [searchQuery, setSearchQuery] = useState("")

  const filteredExercises = availableExercises.filter(
    (exercise) =>
      exercise.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      exercise.description.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight bg-gradient-to-r from-brand-600 to-purple-600 bg-clip-text text-transparent">
            Tableau de bord Étudiant
          </h2>
          <p className="text-muted-foreground">Bienvenue sur votre espace d'apprentissage EvalAI.</p>
        </div>
        <div className="flex items-center gap-2">
          <Button
            asChild
            variant="outline"
            className="border-brand-200 hover:bg-brand-50 hover:text-brand-700 dark:border-brand-800 dark:hover:bg-brand-900/30 dark:hover:text-brand-400"
          >
            <Link href="/dashboard/submissions">
              <FileText className="mr-2 h-4 w-4 text-brand-500" />
              Mes soumissions
            </Link>
          </Button>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card className="border-l-4 border-l-brand-500 dark:border-l-brand-400 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-brand-50 to-transparent dark:from-brand-900/20 dark:to-transparent opacity-50"></div>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 relative">
            <CardTitle className="text-sm font-medium">Exercices complétés</CardTitle>
            <div className="h-8 w-8 rounded-full bg-brand-100 dark:bg-brand-900/30 flex items-center justify-center">
              <CheckCircle className="h-4 w-4 text-brand-600 dark:text-brand-400" />
            </div>
          </CardHeader>
          <CardContent className="relative">
            <div className="text-2xl font-bold">12</div>
            <p className="text-xs text-muted-foreground">+2 depuis le mois dernier</p>
          </CardContent>
        </Card>
        <Card className="border-l-4 border-l-purple-500 dark:border-l-purple-400 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-purple-50 to-transparent dark:from-purple-900/20 dark:to-transparent opacity-50"></div>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 relative">
            <CardTitle className="text-sm font-medium">Note moyenne</CardTitle>
            <div className="h-8 w-8 rounded-full bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center">
              <Award className="h-4 w-4 text-purple-600 dark:text-purple-400" />
            </div>
          </CardHeader>
          <CardContent className="relative">
            <div className="text-2xl font-bold">16.5/20</div>
            <p className="text-xs text-muted-foreground">+1.2 depuis le mois dernier</p>
          </CardContent>
        </Card>
        <Card className="border-l-4 border-l-blue-500 dark:border-l-blue-400 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-transparent dark:from-blue-900/20 dark:to-transparent opacity-50"></div>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 relative">
            <CardTitle className="text-sm font-medium">Exercices disponibles</CardTitle>
            <div className="h-8 w-8 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center">
              <BookOpen className="h-4 w-4 text-blue-600 dark:text-blue-400" />
            </div>
          </CardHeader>
          <CardContent className="relative">
            <div className="text-2xl font-bold">24</div>
            <p className="text-xs text-muted-foreground">+4 depuis le mois dernier</p>
          </CardContent>
        </Card>
        <Card className="border-l-4 border-l-amber-500 dark:border-l-amber-400 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-amber-50 to-transparent dark:from-amber-900/20 dark:to-transparent opacity-50"></div>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 relative">
            <CardTitle className="text-sm font-medium">Exercices en attente</CardTitle>
            <div className="h-8 w-8 rounded-full bg-amber-100 dark:bg-amber-900/30 flex items-center justify-center">
              <Clock className="h-4 w-4 text-amber-600 dark:text-amber-400" />
            </div>
          </CardHeader>
          <CardContent className="relative">
            <div className="text-2xl font-bold">4</div>
            <p className="text-xs text-muted-foreground">+1 depuis la semaine dernière</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="available" className="space-y-4">
        <TabsList className="bg-brand-50 dark:bg-brand-900/20">
          <TabsTrigger value="available" className="data-[state=active]:bg-white dark:data-[state=active]:bg-slate-800">
            Exercices disponibles
          </TabsTrigger>
          <TabsTrigger value="completed" className="data-[state=active]:bg-white dark:data-[state=active]:bg-slate-800">
            Exercices complétés
          </TabsTrigger>
          <TabsTrigger value="stats" className="data-[state=active]:bg-white dark:data-[state=active]:bg-slate-800">
            Statistiques
          </TabsTrigger>
          <TabsTrigger value="progress" className="data-[state=active]:bg-white dark:data-[state=active]:bg-slate-800">
            Progression
          </TabsTrigger>
        </TabsList>
        <TabsContent value="available" className="space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-medium text-brand-700 dark:text-brand-300">Exercices à réaliser</h3>
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Rechercher..."
                className="pl-8 w-full md:w-64 border-brand-200 focus-visible:ring-brand-500 dark:border-brand-800 dark:focus-visible:ring-brand-400"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            {filteredExercises.length === 0 ? (
              <p className="col-span-2 text-center py-4 text-muted-foreground">Aucun exercice trouvé</p>
            ) : (
              filteredExercises.map((exercise) => (
                <Card
                  key={exercise.id}
                  className="overflow-hidden transition-all duration-200 hover:shadow-md hover:border-brand-300 dark:hover:border-brand-700"
                >
                  <div
                    className={cn(
                      "h-2 w-full",
                      exercise.difficulty === "Facile"
                        ? "bg-green-500"
                        : exercise.difficulty === "Intermédiaire"
                          ? "bg-blue-500"
                          : exercise.difficulty === "Difficile"
                            ? "bg-amber-500"
                            : "bg-red-500",
                    )}
                  />
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <CardTitle>{exercise.title}</CardTitle>
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
                        className={cn(
                          exercise.difficulty === "Facile"
                            ? "bg-green-500"
                            : exercise.difficulty === "Intermédiaire"
                              ? "bg-blue-500"
                              : exercise.difficulty === "Difficile"
                                ? "bg-amber-500"
                                : "bg-red-500",
                        )}
                      >
                        {exercise.difficulty}
                      </Badge>
                    </div>
                    <CardDescription>Date limite: {exercise.dueDate}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground mb-4">{exercise.description}</p>
                  </CardContent>
                  <CardFooter className="bg-gray-50 dark:bg-slate-800/50">
                    <Button asChild className="w-full bg-brand-600 hover:bg-brand-700">
                      <Link href={`/dashboard/exercises/${exercise.id}`}>Voir l'exercice</Link>
                    </Button>
                  </CardFooter>
                </Card>
              ))
            )}
          </div>
        </TabsContent>
        <TabsContent value="completed" className="space-y-4">
          <h3 className="text-lg font-medium text-purple-700 dark:text-purple-300">Exercices complétés</h3>
          <div className="grid gap-4 md:grid-cols-2">
            {completedExercises.map((exercise) => (
              <Card
                key={exercise.id}
                className="overflow-hidden transition-all duration-200 hover:shadow-md hover:border-purple-300 dark:hover:border-purple-700"
              >
                <div className="h-2 w-full bg-gradient-to-r from-purple-500 to-brand-500" />
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <CardTitle>{exercise.title}</CardTitle>
                    <div className="text-lg font-medium text-green-600 dark:text-green-500 bg-green-50 dark:bg-green-900/20 px-2 py-1 rounded">
                      {exercise.score}/{exercise.maxScore}
                    </div>
                  </div>
                  <CardDescription>Soumis le: {exercise.submittedAt}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Performance</span>
                      <span className="font-medium">{Math.round((exercise.score / exercise.maxScore) * 100)}%</span>
                    </div>
                    <Progress
                      value={(exercise.score / exercise.maxScore) * 100}
                      className="h-2"
                      indicatorClassName="bg-gradient-to-r from-purple-500 to-brand-500"
                    />
                  </div>
                </CardContent>
                <CardFooter className="bg-gray-50 dark:bg-slate-800/50">
                  <Button
                    asChild
                    variant="outline"
                    className="w-full border-purple-200 hover:bg-purple-50 hover:text-purple-700 dark:border-purple-800 dark:hover:bg-purple-900/30 dark:hover:text-purple-400"
                  >
                    <Link href={`/dashboard/submissions/${exercise.id}`}>Voir les détails</Link>
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </TabsContent>
        <TabsContent value="stats">
          <Card className="border-t-4 border-t-brand-500 dark:border-t-brand-400">
            <CardHeader>
              <CardTitle>Statistiques de performance</CardTitle>
              <CardDescription>Visualisez vos performances et votre progression</CardDescription>
            </CardHeader>
            <CardContent>
              <StatsOverview />
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="progress" className="space-y-4">
          <Card className="border-t-4 border-t-purple-500 dark:border-t-purple-400">
            <CardHeader>
              <CardTitle>Progression par sujet</CardTitle>
              <CardDescription>Votre niveau de maîtrise dans chaque domaine</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {progressData.map((item) => (
                <div key={item.subject} className="space-y-2">
                  <div className="flex justify-between">
                    <span className="font-medium">{item.subject}</span>
                    <span className="text-sm text-muted-foreground">{item.score}%</span>
                  </div>
                  <Progress
                    value={item.score}
                    className="h-2"
                    indicatorClassName={cn(
                      item.score >= 80
                        ? "bg-green-500"
                        : item.score >= 60
                          ? "bg-blue-500"
                          : item.score >= 40
                            ? "bg-amber-500"
                            : "bg-red-500",
                    )}
                  />
                </div>
              ))}
            </CardContent>
          </Card>
          <div className="grid gap-4 md:grid-cols-3">
            <Card className="bg-gradient-to-br from-brand-50 to-blue-50 dark:from-brand-900/30 dark:to-blue-900/30 border-brand-100 dark:border-brand-800">
              <CardHeader>
                <div className="flex items-center justify-center mb-2">
                  <div className="h-12 w-12 bg-brand-100 dark:bg-brand-900/50 rounded-full flex items-center justify-center">
                    <Zap className="h-6 w-6 text-brand-600 dark:text-brand-400" />
                  </div>
                </div>
                <CardTitle className="text-center">Exercices recommandés</CardTitle>
                <CardDescription className="text-center">Basés sur vos performances</CardDescription>
              </CardHeader>
              <CardContent className="text-center">
                <p className="text-sm text-muted-foreground mb-4">
                  Nous vous recommandons de vous concentrer sur les exercices d'optimisation de requêtes pour améliorer
                  vos compétences.
                </p>
                <Button className="bg-brand-600 hover:bg-brand-700">Voir les recommandations</Button>
              </CardContent>
            </Card>
            <Card className="bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900/30 dark:to-pink-900/30 border-purple-100 dark:border-purple-800">
              <CardHeader>
                <div className="flex items-center justify-center mb-2">
                  <div className="h-12 w-12 bg-purple-100 dark:bg-purple-900/50 rounded-full flex items-center justify-center">
                    <BookMarked className="h-6 w-6 text-purple-600 dark:text-purple-400" />
                  </div>
                </div>
                <CardTitle className="text-center">Ressources d'apprentissage</CardTitle>
                <CardDescription className="text-center">Matériel supplémentaire</CardDescription>
              </CardHeader>
              <CardContent className="text-center">
                <p className="text-sm text-muted-foreground mb-4">
                  Accédez à des tutoriels, articles et vidéos pour approfondir vos connaissances en bases de données.
                </p>
                <Button className="bg-purple-600 hover:bg-purple-700">Explorer les ressources</Button>
              </CardContent>
            </Card>
            <Card className="bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-blue-900/30 dark:to-cyan-900/30 border-blue-100 dark:border-blue-800">
              <CardHeader>
                <div className="flex items-center justify-center mb-2">
                  <div className="h-12 w-12 bg-blue-100 dark:bg-blue-900/50 rounded-full flex items-center justify-center">
                    <Lightbulb className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                  </div>
                </div>
                <CardTitle className="text-center">Conseils personnalisés</CardTitle>
                <CardDescription className="text-center">Améliorez vos compétences</CardDescription>
              </CardHeader>
              <CardContent className="text-center">
                <p className="text-sm text-muted-foreground mb-4">
                  Recevez des conseils personnalisés basés sur vos performances pour progresser plus rapidement.
                </p>
                <Button className="bg-blue-600 hover:bg-blue-700">Voir les conseils</Button>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}

