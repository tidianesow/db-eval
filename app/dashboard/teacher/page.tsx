"use client"

import { useState } from "react"
import Link from "next/link"
import {
  BarChart2,
  BookOpen,
  Clock,
  FileText,
  Plus,
  Search,
  Users,
  Brain,
  Database,
  Shield,
  Download,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { BarChart, Bar, ResponsiveContainer, XAxis, YAxis, CartesianGrid, Legend, PieChart, Pie, Cell } from "recharts"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"

// Données fictives pour les graphiques
const submissionsData = [
  { month: "Jan", count: 25 },
  { month: "Fév", count: 38 },
  { month: "Mar", count: 42 },
  { month: "Avr", count: 30 },
  { month: "Mai", count: 45 },
  { month: "Juin", count: 58 },
  { month: "Juil", count: 34 },
]

const scoreDistributionData = [
  { name: "0-5", value: 5, color: "#FF8042" },
  { name: "6-10", value: 15, color: "#FFBB28" },
  { name: "11-15", value: 40, color: "#00C49F" },
  { name: "16-20", value: 30, color: "#0088FE" },
]

const exercisePerformanceData = [
  { name: "Requêtes de base", averageScore: 16.5 },
  { name: "Jointures", averageScore: 14.2 },
  { name: "Sous-requêtes", averageScore: 12.8 },
  { name: "Fonctions d'agrégation", averageScore: 15.3 },
  { name: "Optimisation", averageScore: 11.7 },
]

const recentSubmissions = [
  {
    id: "1",
    student: "Marie Dupont",
    exercise: "Introduction aux requêtes SQL",
    date: "Aujourd'hui, 14:30",
    status: "graded",
    score: 18,
  },
  {
    id: "2",
    student: "Thomas Martin",
    exercise: "Modélisation de bases de données",
    date: "Hier, 10:15",
    status: "graded",
    score: 16,
  },
  {
    id: "3",
    student: "Sophie Lefebvre",
    exercise: "Optimisation des requêtes",
    date: "Il y a 3 jours",
    status: "pending",
    score: null,
  },
  {
    id: "4",
    student: "Lucas Bernard",
    exercise: "Jointures avancées",
    date: "Il y a 4 jours",
    status: "graded",
    score: 14,
  },
  {
    id: "5",
    student: "Emma Petit",
    exercise: "Transactions et concurrence",
    date: "Il y a 5 jours",
    status: "graded",
    score: 15,
  },
]

export default function TeacherDashboardPage() {
  const [searchQuery, setSearchQuery] = useState("")

  const filteredSubmissions = recentSubmissions.filter(
    (submission) =>
      submission.student.toLowerCase().includes(searchQuery.toLowerCase()) ||
      submission.exercise.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight bg-gradient-to-r from-brand-600 to-blue-600 bg-clip-text text-transparent">
            Tableau de bord Enseignant
          </h2>
          <p className="text-muted-foreground">Gérez vos exercices et suivez les performances de vos étudiants.</p>
        </div>
        <div className="flex items-center gap-2">
          <Button
            asChild
            variant="outline"
            className="border-brand-200 hover:bg-brand-50 hover:text-brand-700 dark:border-brand-800 dark:hover:bg-brand-900/30 dark:hover:text-brand-400"
          >
            <Link href="/dashboard/exercises">
              <FileText className="mr-2 h-4 w-4 text-brand-500" />
              Voir tous les exercices
            </Link>
          </Button>
          <Button asChild className="bg-brand-600 hover:bg-brand-700">
            <Link href="/dashboard/exercises/create">
              <Plus className="mr-2 h-4 w-4" />
              Créer un exercice
            </Link>
          </Button>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card className="border-l-4 border-l-brand-500 dark:border-l-brand-400">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Exercices créés</CardTitle>
            <div className="h-8 w-8 rounded-full bg-brand-100 dark:bg-brand-900/30 flex items-center justify-center">
              <BookOpen className="h-4 w-4 text-brand-600 dark:text-brand-400" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">24</div>
            <p className="text-xs text-muted-foreground">+4 depuis le mois dernier</p>
          </CardContent>
        </Card>
        <Card className="border-l-4 border-l-blue-500 dark:border-l-blue-400">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Soumissions</CardTitle>
            <div className="h-8 w-8 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center">
              <FileText className="h-4 w-4 text-blue-600 dark:text-blue-400" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">342</div>
            <p className="text-xs text-muted-foreground">+28 depuis le mois dernier</p>
          </CardContent>
        </Card>
        <Card className="border-l-4 border-l-green-500 dark:border-l-green-400">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Note moyenne</CardTitle>
            <div className="h-8 w-8 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center">
              <BarChart2 className="h-4 w-4 text-green-600 dark:text-green-400" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">14.8/20</div>
            <p className="text-xs text-muted-foreground">+0.6 depuis le mois dernier</p>
          </CardContent>
        </Card>
        <Card className="border-l-4 border-l-purple-500 dark:border-l-purple-400">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Étudiants actifs</CardTitle>
            <div className="h-8 w-8 rounded-full bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center">
              <Users className="h-4 w-4 text-purple-600 dark:text-purple-400" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">120</div>
            <p className="text-xs text-muted-foreground">+12 depuis le mois dernier</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList className="bg-brand-50 dark:bg-brand-900/20">
          <TabsTrigger value="overview" className="data-[state=active]:bg-white dark:data-[state=active]:bg-slate-800">
            Vue d'ensemble
          </TabsTrigger>
          <TabsTrigger
            value="submissions"
            className="data-[state=active]:bg-white dark:data-[state=active]:bg-slate-800"
          >
            Soumissions
          </TabsTrigger>
          <TabsTrigger value="analytics" className="data-[state=active]:bg-white dark:data-[state=active]:bg-slate-800">
            Analytiques
          </TabsTrigger>
        </TabsList>
        <TabsContent value="overview" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <Card className="border-t-4 border-t-brand-500 dark:border-t-brand-400">
              <CardHeader>
                <CardTitle>Performance par exercice</CardTitle>
                <CardDescription>Note moyenne obtenue pour chaque exercice</CardDescription>
              </CardHeader>
              <CardContent>
                <ChartContainer
                  config={{
                    averageScore: {
                      label: "Note moyenne",
                      color: "hsl(var(--chart-1))",
                    },
                  }}
                  className="aspect-[4/3]"
                >
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={exercisePerformanceData} layout="vertical">
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis type="number" domain={[0, 20]} />
                      <YAxis dataKey="name" type="category" width={150} />
                      <ChartTooltip content={<ChartTooltipContent />} />
                      <Legend />
                      <Bar dataKey="averageScore" fill="#0ea5e9" radius={[0, 4, 4, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </ChartContainer>
              </CardContent>
            </Card>
            <Card className="border-t-4 border-t-blue-500 dark:border-t-blue-400">
              <CardHeader>
                <CardTitle>Soumissions récentes</CardTitle>
                <CardDescription>Les dernières soumissions de vos étudiants</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentSubmissions.slice(0, 4).map((submission) => (
                    <div
                      key={submission.id}
                      className="flex items-center justify-between p-2 rounded-lg hover:bg-gray-50 dark:hover:bg-slate-800/50 transition-colors"
                    >
                      <div className="space-y-1">
                        <p className="text-sm font-medium leading-none">{submission.student}</p>
                        <p className="text-sm text-muted-foreground">{submission.exercise}</p>
                        <p className="text-xs text-muted-foreground">{submission.date}</p>
                      </div>
                      <div>
                        {submission.status === "graded" ? (
                          <div className="text-sm font-medium text-green-600 dark:text-green-500">
                            {submission.score}/20
                          </div>
                        ) : (
                          <div className="flex items-center text-sm text-amber-600 dark:text-amber-500">
                            <Clock className="mr-1 h-4 w-4" />
                            En attente
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                  <Button
                    asChild
                    variant="outline"
                    className="w-full mt-2 border-brand-200 hover:bg-brand-50 hover:text-brand-700 dark:border-brand-800 dark:hover:bg-brand-900/30 dark:hover:text-brand-400"
                  >
                    <Link href="/dashboard/submissions">Voir toutes les soumissions</Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
          <Card className="border-t-4 border-t-purple-500 dark:border-t-purple-400">
            <CardHeader>
              <CardTitle>Exercices récents</CardTitle>
              <CardDescription>Les derniers exercices que vous avez créés</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader className="bg-brand-50 dark:bg-brand-900/20">
                  <TableRow>
                    <TableHead>Titre</TableHead>
                    <TableHead>Date de création</TableHead>
                    <TableHead>Soumissions</TableHead>
                    <TableHead>Note moyenne</TableHead>
                    <TableHead>Statut</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow className="hover:bg-brand-50 dark:hover:bg-brand-900/10">
                    <TableCell className="font-medium">Introduction aux requêtes SQL</TableCell>
                    <TableCell>Il y a 2 jours</TableCell>
                    <TableCell>24</TableCell>
                    <TableCell>16.5/20</TableCell>
                    <TableCell>
                      <Badge className="bg-green-500">Publié</Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <Button
                        variant="ghost"
                        size="sm"
                        className="text-brand-600 hover:text-brand-700 hover:bg-brand-50 dark:text-brand-400 dark:hover:text-brand-300 dark:hover:bg-brand-900/30"
                      >
                        Voir
                      </Button>
                    </TableCell>
                  </TableRow>
                  <TableRow className="hover:bg-brand-50 dark:hover:bg-brand-900/10">
                    <TableCell className="font-medium">Modélisation de bases de données</TableCell>
                    <TableCell>Il y a 5 jours</TableCell>
                    <TableCell>18</TableCell>
                    <TableCell>14.2/20</TableCell>
                    <TableCell>
                      <Badge className="bg-green-500">Publié</Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <Button
                        variant="ghost"
                        size="sm"
                        className="text-brand-600 hover:text-brand-700 hover:bg-brand-50 dark:text-brand-400 dark:hover:text-brand-300 dark:hover:bg-brand-900/30"
                      >
                        Voir
                      </Button>
                    </TableCell>
                  </TableRow>
                  <TableRow className="hover:bg-brand-50 dark:hover:bg-brand-900/10">
                    <TableCell className="font-medium">Optimisation des requêtes</TableCell>
                    <TableCell>Il y a 1 semaine</TableCell>
                    <TableCell>15</TableCell>
                    <TableCell>12.8/20</TableCell>
                    <TableCell>
                      <Badge className="bg-green-500">Publié</Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <Button
                        variant="ghost"
                        size="sm"
                        className="text-brand-600 hover:text-brand-700 hover:bg-brand-50 dark:text-brand-400 dark:hover:text-brand-300 dark:hover:bg-brand-900/30"
                      >
                        Voir
                      </Button>
                    </TableCell>
                  </TableRow>
                  <TableRow className="hover:bg-brand-50 dark:hover:bg-brand-900/10">
                    <TableCell className="font-medium">Transactions et concurrence</TableCell>
                    <TableCell>Il y a 2 semaines</TableCell>
                    <TableCell>0</TableCell>
                    <TableCell>-</TableCell>
                    <TableCell>
                      <Badge variant="outline">Brouillon</Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <Button
                        variant="ghost"
                        size="sm"
                        className="text-brand-600 hover:text-brand-700 hover:bg-brand-50 dark:text-brand-400 dark:hover:text-brand-300 dark:hover:bg-brand-900/30"
                      >
                        Voir
                      </Button>
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="submissions" className="space-y-4">
          <Card className="border-t-4 border-t-blue-500 dark:border-t-blue-400">
            <CardHeader>
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div>
                  <CardTitle>Toutes les soumissions</CardTitle>
                  <CardDescription>Gérez et évaluez les soumissions de vos étudiants</CardDescription>
                </div>
                <div className="flex items-center gap-2">
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
                  <Button
                    variant="outline"
                    size="icon"
                    className="border-brand-200 hover:bg-brand-50 hover:text-brand-700 dark:border-brand-800 dark:hover:bg-brand-900/30 dark:hover:text-brand-400"
                  >
                    <Download className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader className="bg-brand-50 dark:bg-brand-900/20">
                  <TableRow>
                    <TableHead>Étudiant</TableHead>
                    <TableHead>Exercice</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Statut</TableHead>
                    <TableHead>Note</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredSubmissions.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={6} className="text-center py-4">
                        Aucune soumission trouvée
                      </TableCell>
                    </TableRow>
                  ) : (
                    filteredSubmissions.map((submission) => (
                      <TableRow key={submission.id} className="hover:bg-brand-50 dark:hover:bg-brand-900/10">
                        <TableCell className="font-medium">{submission.student}</TableCell>
                        <TableCell>{submission.exercise}</TableCell>
                        <TableCell>{submission.date}</TableCell>
                        <TableCell>
                          <Badge
                            variant={submission.status === "graded" ? "default" : "outline"}
                            className={submission.status === "graded" ? "bg-green-500" : ""}
                          >
                            {submission.status === "graded" ? "Corrigé" : "En attente"}
                          </Badge>
                        </TableCell>
                        <TableCell>{submission.status === "graded" ? `${submission.score}/20` : "-"}</TableCell>
                        <TableCell className="text-right">
                          <Button
                            variant="ghost"
                            size="sm"
                            asChild
                            className="text-brand-600 hover:text-brand-700 hover:bg-brand-50 dark:text-brand-400 dark:hover:text-brand-300 dark:hover:bg-brand-900/30"
                          >
                            <Link href={`/dashboard/submissions/${submission.id}`}>Voir</Link>
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="analytics" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <Card className="border-t-4 border-t-brand-500 dark:border-t-brand-400">
              <CardHeader>
                <CardTitle>Distribution des notes</CardTitle>
                <CardDescription>Répartition des notes obtenues par les étudiants</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={scoreDistributionData}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                        outerRadius={100}
                        fill="#8884d8"
                        dataKey="value"
                      >
                        {scoreDistributionData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Legend />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
            <Card className="border-t-4 border-t-blue-500 dark:border-t-blue-400">
              <CardHeader>
                <CardTitle>Soumissions mensuelles</CardTitle>
                <CardDescription>Nombre de soumissions par mois</CardDescription>
              </CardHeader>
              <CardContent>
                <ChartContainer
                  config={{
                    count: {
                      label: "Soumissions",
                      color: "#0ea5e9",
                    },
                  }}
                  className="aspect-[4/3]"
                >
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={submissionsData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis />
                      <ChartTooltip content={<ChartTooltipContent />} />
                      <Legend />
                      <Bar dataKey="count" fill="#0ea5e9" radius={[4, 4, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </ChartContainer>
              </CardContent>
            </Card>
          </div>
          <Card className="border-t-4 border-t-purple-500 dark:border-t-purple-400">
            <CardHeader>
              <CardTitle>Fonctionnalités d'IA</CardTitle>
              <CardDescription>Outils d'intelligence artificielle pour l'évaluation</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-3">
                <div className="bg-gradient-to-br from-brand-50 to-blue-50 dark:from-brand-900/30 dark:to-blue-900/30 p-6 rounded-xl border border-brand-100 dark:border-brand-800 flex flex-col items-center text-center">
                  <div className="h-12 w-12 bg-brand-100 dark:bg-brand-900/50 rounded-full flex items-center justify-center mb-4">
                    <Brain className="h-6 w-6 text-brand-600 dark:text-brand-400" />
                  </div>
                  <h3 className="font-medium text-lg mb-2">Évaluation automatique</h3>
                  <p className="text-sm text-muted-foreground">
                    Utilisez l'IA pour évaluer automatiquement les soumissions des étudiants.
                  </p>
                  <Button className="mt-4 bg-brand-600 hover:bg-brand-700">Configurer</Button>
                </div>
                <div className="bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-900/30 dark:to-purple-900/30 p-6 rounded-xl border border-blue-100 dark:border-blue-800 flex flex-col items-center text-center">
                  <div className="h-12 w-12 bg-blue-100 dark:bg-blue-900/50 rounded-full flex items-center justify-center mb-4">
                    <Database className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                  </div>
                  <h3 className="font-medium text-lg mb-2">Analyse de données</h3>
                  <p className="text-sm text-muted-foreground">
                    Analysez les performances des étudiants et identifiez les tendances.
                  </p>
                  <Button className="mt-4 bg-blue-600 hover:bg-blue-700">Explorer</Button>
                </div>
                <div className="bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900/30 dark:to-pink-900/30 p-6 rounded-xl border border-purple-100 dark:border-purple-800 flex flex-col items-center text-center">
                  <div className="h-12 w-12 bg-purple-100 dark:bg-purple-900/50 rounded-full flex items-center justify-center mb-4">
                    <Shield className="h-6 w-6 text-purple-600 dark:text-purple-400" />
                  </div>
                  <h3 className="font-medium text-lg mb-2">Détection de plagiat</h3>
                  <p className="text-sm text-muted-foreground">
                    Détectez automatiquement les similitudes entre les soumissions.
                  </p>
                  <Button className="mt-4 bg-purple-600 hover:bg-purple-700">Activer</Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

