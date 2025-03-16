"use client"

import { useState } from "react"
import Link from "next/link"
import { Calendar, FileText, Plus, Search, Tag } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

// Données fictives pour les exercices
const exercises = [
  {
    id: "1",
    title: "Introduction aux requêtes SQL",
    description: "Apprenez les bases des requêtes SQL avec des exemples simples.",
    dueDate: "15 juin 2023",
    difficulty: "Facile",
    category: "SQL",
    status: "published",
  },
  {
    id: "2",
    title: "Jointures SQL avancées",
    description: "Maîtrisez les différents types de jointures en SQL.",
    dueDate: "22 juin 2023",
    difficulty: "Intermédiaire",
    category: "SQL",
    status: "published",
  },
  {
    id: "3",
    title: "Sous-requêtes et fonctions d'agrégation",
    description: "Utilisez des sous-requêtes et des fonctions d'agrégation pour des analyses complexes.",
    dueDate: "29 juin 2023",
    difficulty: "Difficile",
    category: "SQL",
    status: "published",
  },
  {
    id: "4",
    title: "Optimisation des requêtes",
    description: "Apprenez à optimiser vos requêtes SQL pour de meilleures performances.",
    dueDate: "6 juillet 2023",
    difficulty: "Avancé",
    category: "Optimisation",
    status: "draft",
  },
  {
    id: "5",
    title: "Modélisation de bases de données",
    description: "Apprenez à concevoir des schémas de bases de données efficaces.",
    dueDate: "13 juillet 2023",
    difficulty: "Intermédiaire",
    category: "Conception",
    status: "published",
  },
  {
    id: "6",
    title: "Transactions et concurrence",
    description: "Gérez les transactions et la concurrence dans les bases de données.",
    dueDate: "20 juillet 2023",
    difficulty: "Difficile",
    category: "Avancé",
    status: "draft",
  },
]

export default function ExercisesPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [difficultyFilter, setDifficultyFilter] = useState("all")
  const [categoryFilter, setCategoryFilter] = useState("all")
  const [statusFilter, setStatusFilter] = useState("all")

  const filteredExercises = exercises.filter((exercise) => {
    // Filtre de recherche
    const matchesSearch =
      exercise.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      exercise.description.toLowerCase().includes(searchQuery.toLowerCase())

    // Filtre de difficulté
    const matchesDifficulty =
      difficultyFilter === "all" || exercise.difficulty.toLowerCase() === difficultyFilter.toLowerCase()

    // Filtre de catégorie
    const matchesCategory = categoryFilter === "all" || exercise.category.toLowerCase() === categoryFilter.toLowerCase()

    // Filtre de statut
    const matchesStatus = statusFilter === "all" || exercise.status.toLowerCase() === statusFilter.toLowerCase()

    return matchesSearch && matchesDifficulty && matchesCategory && matchesStatus
  })

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Exercices</h2>
          <p className="text-muted-foreground">Gérez et parcourez tous les exercices disponibles.</p>
        </div>
        <Button asChild>
          <Link href="/dashboard/exercises/create">
            <Plus className="mr-2 h-4 w-4" />
            Créer un exercice
          </Link>
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Tous les exercices</CardTitle>
          <CardDescription>Liste complète des exercices disponibles sur la plateforme.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Rechercher..."
                  className="pl-8 w-full"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="w-full sm:w-40">
                <Select value={difficultyFilter} onValueChange={setDifficultyFilter}>
                  <SelectTrigger>
                    <SelectValue placeholder="Difficulté" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Toutes les difficultés</SelectItem>
                    <SelectItem value="facile">Facile</SelectItem>
                    <SelectItem value="intermédiaire">Intermédiaire</SelectItem>
                    <SelectItem value="difficile">Difficile</SelectItem>
                    <SelectItem value="avancé">Avancé</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="w-full sm:w-40">
                <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                  <SelectTrigger>
                    <SelectValue placeholder="Catégorie" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Toutes les catégories</SelectItem>
                    <SelectItem value="sql">SQL</SelectItem>
                    <SelectItem value="optimisation">Optimisation</SelectItem>
                    <SelectItem value="conception">Conception</SelectItem>
                    <SelectItem value="avancé">Avancé</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="w-full sm:w-40">
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger>
                    <SelectValue placeholder="Statut" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Tous les statuts</SelectItem>
                    <SelectItem value="published">Publié</SelectItem>
                    <SelectItem value="draft">Brouillon</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>

          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Titre</TableHead>
                  <TableHead>Difficulté</TableHead>
                  <TableHead>Catégorie</TableHead>
                  <TableHead>Date limite</TableHead>
                  <TableHead>Statut</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredExercises.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={6} className="text-center py-4">
                      Aucun exercice trouvé
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredExercises.map((exercise) => (
                    <TableRow key={exercise.id}>
                      <TableCell className="font-medium">
                        <div className="flex flex-col">
                          <span>{exercise.title}</span>
                          <span className="text-xs text-muted-foreground truncate max-w-md">
                            {exercise.description}
                          </span>
                        </div>
                      </TableCell>
                      <TableCell>
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
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Tag className="h-4 w-4 text-muted-foreground" />
                          <span>{exercise.category}</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Calendar className="h-4 w-4 text-muted-foreground" />
                          <span>{exercise.dueDate}</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant={exercise.status === "published" ? "default" : "outline"}>
                          {exercise.status === "published" ? "Publié" : "Brouillon"}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          <Button variant="ghost" size="sm" asChild>
                            <Link href={`/dashboard/exercises/${exercise.id}`}>
                              <FileText className="h-4 w-4 mr-2" />
                              Voir
                            </Link>
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

