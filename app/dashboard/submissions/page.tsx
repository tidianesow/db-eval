"use client"

import { useState } from "react"
import Link from "next/link"
import { Calendar, Clock, Download, FileText, Search } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

// Données fictives pour les soumissions
const submissions = [
  {
    id: "1",
    exerciseTitle: "Introduction aux requêtes SQL",
    submittedAt: "12 juin 2023, 14:30",
    status: "graded",
    score: 18,
    maxScore: 20,
  },
  {
    id: "2",
    exerciseTitle: "Jointures SQL avancées",
    submittedAt: "5 juin 2023, 10:15",
    status: "graded",
    score: 16,
    maxScore: 20,
  },
  {
    id: "3",
    exerciseTitle: "Sous-requêtes et fonctions d'agrégation",
    submittedAt: "1 juin 2023, 16:45",
    status: "pending",
    score: null,
    maxScore: 20,
  },
  {
    id: "4",
    exerciseTitle: "Modélisation de bases de données",
    submittedAt: "25 mai 2023, 09:30",
    status: "graded",
    score: 15,
    maxScore: 20,
  },
  {
    id: "5",
    exerciseTitle: "Bases de SQL",
    submittedAt: "18 mai 2023, 11:20",
    status: "graded",
    score: 19,
    maxScore: 20,
  },
  {
    id: "6",
    exerciseTitle: "Normalisation",
    submittedAt: "10 mai 2023, 15:10",
    status: "graded",
    score: 14,
    maxScore: 20,
  },
]

export default function SubmissionsPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")

  const filteredSubmissions = submissions.filter((submission) => {
    // Filtre de recherche
    const matchesSearch = submission.exerciseTitle.toLowerCase().includes(searchQuery.toLowerCase())

    // Filtre de statut
    const matchesStatus = statusFilter === "all" || submission.status.toLowerCase() === statusFilter.toLowerCase()

    return matchesSearch && matchesStatus
  })

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Mes soumissions</h2>
          <p className="text-muted-foreground">Consultez l'historique de vos soumissions d'exercices.</p>
        </div>
        <Button variant="outline" className="gap-2">
          <Download className="h-4 w-4" />
          Exporter
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Historique des soumissions</CardTitle>
          <CardDescription>Toutes vos soumissions d'exercices sur la plateforme.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Rechercher par titre d'exercice..."
                  className="pl-8 w-full"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>
            <div className="w-full md:w-40">
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="Statut" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Tous les statuts</SelectItem>
                  <SelectItem value="graded">Corrigé</SelectItem>
                  <SelectItem value="pending">En attente</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Exercice</TableHead>
                  <TableHead>Date de soumission</TableHead>
                  <TableHead>Statut</TableHead>
                  <TableHead>Note</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredSubmissions.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={5} className="text-center py-4">
                      Aucune soumission trouvée
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredSubmissions.map((submission) => (
                    <TableRow key={submission.id}>
                      <TableCell className="font-medium">{submission.exerciseTitle}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Calendar className="h-4 w-4 text-muted-foreground" />
                          <span>{submission.submittedAt}</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        {submission.status === "graded" ? (
                          <Badge>Corrigé</Badge>
                        ) : (
                          <Badge variant="outline" className="flex items-center gap-1">
                            <Clock className="h-3 w-3" />
                            En attente
                          </Badge>
                        )}
                      </TableCell>
                      <TableCell>
                        {submission.status === "graded" ? (
                          <span className="font-medium text-green-600 dark:text-green-500">
                            {submission.score}/{submission.maxScore}
                          </span>
                        ) : (
                          <span className="text-muted-foreground">-</span>
                        )}
                      </TableCell>
                      <TableCell className="text-right">
                        <Button variant="ghost" size="sm" asChild>
                          <Link href={`/dashboard/submissions/${submission.id}`}>
                            <FileText className="h-4 w-4 mr-2" />
                            Voir
                          </Link>
                        </Button>
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

