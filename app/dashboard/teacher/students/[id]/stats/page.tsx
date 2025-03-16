"use client"

import { useState } from "react"
import Link from "next/link"
import { ArrowLeft, Award, BookOpen, Calendar, FileText, User } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Progress } from "@/components/ui/progress"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { BarChart, Bar, LineChart, Line, ResponsiveContainer, XAxis, YAxis, CartesianGrid, Legend } from "recharts"
import { cn } from "@/lib/utils"

// Données fictives pour les statistiques de l'étudiant
const studentData = {
  id: "1",
  name: "Marie Dupont",
  email: "marie.dupont@example.com",
  avatar: "/placeholder.svg?height=64&width=64",
  group: "Groupe A",
  submissions: 12,
  averageScore: 16.5,
  lastActive: "Aujourd'hui, 10:30",
}

const performanceData = [
  { date: "Jan", score: 14 },
  { date: "Fév", score: 15 },
  { date: "Mar", score: 16 },
  { date: "Avr", score: 15 },
  { date: "Mai", score: 17 },
  { date: "Juin", score: 18 },
  { date: "Juil", score: 17 },
]

const categoryPerformanceData = [
  { name: "SQL de base", score: 17 },
  { name: "Jointures", score: 16 },
  { name: "Sous-requêtes", score: 15 },
  { name: "Fonctions d'agrégation", score: 18 },
  { name: "Optimisation", score: 14 },
  { name: "Normalisation", score: 19 },
]

const recentSubmissions = [
  {
    id: "1",
    exercise: "Introduction aux requêtes SQL",
    date: "12 juin 2023",
    score: 18,
    maxScore: 20,
  },
  {
    id: "2",
    exercise: "Jointures SQL avancées",
    date: "5 juin 2023",
    score: 16,
    maxScore: 20,
  },
  {
    id: "3",
    exercise: "Sous-requêtes et fonctions d'agrégation",
    date: "1 juin 2023",
    score: 15,
    maxScore: 20,
  },
  {
    id: "4",
    exercise: "Modélisation de bases de données",
    date: "25 mai 2023",
    score: 17,
    maxScore: 20,
  },
]

export default function StudentStatsPage({ params }: { params: { id: string } }) {
  const [timeRange, setTimeRange] = useState("all")

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2">
        <Button
          variant="outline"
          size="icon"
          asChild
          className="border-brand-200 hover:bg-brand-50 hover:text-brand-700 dark:border-brand-800 dark:hover:bg-brand-900/30 dark:hover:text-brand-400"
        >
          <Link href="/dashboard/teacher/students">
            <ArrowLeft className="h-4 w-4" />
          </Link>
        </Button>
        <h2 className="text-2xl font-bold tracking-tight bg-gradient-to-r from-brand-600 to-purple-600 bg-clip-text text-transparent">
          Statistiques de l'étudiant
        </h2>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <Card className="md:col-span-3 border-t-4 border-t-brand-500 dark:border-t-brand-400">
          <CardHeader className="pb-2">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div className="flex items-center gap-4">
                <Avatar className="h-16 w-16 border-2 border-brand-200 dark:border-brand-800">
                  <AvatarImage src={studentData.avatar} alt={studentData.name} />
                  <AvatarFallback className="text-lg">{studentData.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <div>
                  <CardTitle className="text-2xl">{studentData.name}</CardTitle>
                  <CardDescription className="text-base">{studentData.email}</CardDescription>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-sm text-muted-foreground">{studentData.group}</span>
                    <span className="text-sm text-muted-foreground">•</span>
                    <span className="text-sm text-muted-foreground">Dernière activité: {studentData.lastActive}</span>
                  </div>
                </div>
              </div>
              <div className="flex gap-2">
                <Button
                  asChild
                  variant="outline"
                  className="border-brand-200 hover:bg-brand-50 hover:text-brand-700 dark:border-brand-800 dark:hover:bg-brand-900/30 dark:hover:text-brand-400"
                >
                  <Link href={`/dashboard/teacher/students/${params.id}`}>
                    <User className="mr-2 h-4 w-4 text-brand-500" />
                    Profil
                  </Link>
                </Button>
                <Button
                  asChild
                  variant="outline"
                  className="border-brand-200 hover:bg-brand-50 hover:text-brand-700 dark:border-brand-800 dark:hover:bg-brand-900/30 dark:hover:text-brand-400"
                >
                  <Link href={`/dashboard/teacher/students/${params.id}/submissions`}>
                    <FileText className="mr-2 h-4 w-4 text-brand-500" />
                    Soumissions
                  </Link>
                </Button>
                <Button asChild className="bg-brand-600 hover:bg-brand-700">
                  <Link href={`/dashboard/teacher/students/${params.id}/message`}>Contacter</Link>
                </Button>
              </div>
            </div>
          </CardHeader>
        </Card>

        <div className="grid gap-4 md:col-span-2">
          <Card className="border-t-4 border-t-purple-500 dark:border-t-purple-400">
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <CardTitle>Évolution des performances</CardTitle>
                <Select value={timeRange} onValueChange={setTimeRange}>
                  <SelectTrigger className="w-40 border-brand-200 focus-visible:ring-brand-500 dark:border-brand-800 dark:focus-visible:ring-brand-400">
                    <SelectValue placeholder="Période" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="month">Dernier mois</SelectItem>
                    <SelectItem value="semester">Dernier semestre</SelectItem>
                    <SelectItem value="all">Tout</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <CardDescription>Évolution des notes au fil du temps</CardDescription>
            </CardHeader>
            <CardContent>
              <ChartContainer
                config={{
                  score: {
                    label: "Note",
                    color: "#a855f7",
                  },
                }}
                className="aspect-[4/3]"
              >
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={performanceData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" />
                    <YAxis domain={[0, 20]} />
                    <ChartTooltip content={<ChartTooltipContent />} />
                    <Legend />
                    <Line type="monotone" dataKey="score" stroke="#a855f7" strokeWidth={2} activeDot={{ r: 8 }} />
                  </LineChart>
                </ResponsiveContainer>
              </ChartContainer>
            </CardContent>
          </Card>

          <Card className="border-t-4 border-t-blue-500 dark:border-t-blue-400">
            <CardHeader>
              <CardTitle>Performance par catégorie</CardTitle>
              <CardDescription>Notes moyennes par type d'exercice</CardDescription>
            </CardHeader>
            <CardContent>
              <ChartContainer
                config={{
                  score: {
                    label: "Note",
                    color: "#0ea5e9",
                  },
                }}
                className="aspect-[4/3]"
              >
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={categoryPerformanceData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis domain={[0, 20]} />
                    <ChartTooltip content={<ChartTooltipContent />} />
                    <Legend />
                    <Bar dataKey="score" fill="#0ea5e9" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </ChartContainer>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-4">
          <Card className="border-t-4 border-t-green-500 dark:border-t-green-400">
            <CardHeader>
              <CardTitle>Résumé des performances</CardTitle>
              <CardDescription>Statistiques globales de l'étudiant</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-sm font-medium">Note moyenne</span>
                  <span className="text-sm font-medium text-green-600 dark:text-green-500">
                    {studentData.averageScore}/20
                  </span>
                </div>
                <Progress
                  value={(studentData.averageScore / 20) * 100}
                  className="h-2"
                  indicatorClassName="bg-green-500"
                />
              </div>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-sm font-medium">Exercices complétés</span>
                  <span className="text-sm font-medium">{studentData.submissions}/15</span>
                </div>
                <Progress
                  value={(studentData.submissions / 15) * 100}
                  className="h-2"
                  indicatorClassName="bg-brand-500"
                />
              </div>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-sm font-medium">Classement</span>
                  <span className="text-sm font-medium text-amber-600 dark:text-amber-500">3ème / 25</span>
                </div>
                <Progress value={(3 / 25) * 100} className="h-2" indicatorClassName="bg-amber-500" />
              </div>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-sm font-medium">Taux de réussite</span>
                  <span className="text-sm font-medium text-blue-600 dark:text-blue-500">92%</span>
                </div>
                <Progress value={92} className="h-2" indicatorClassName="bg-blue-500" />
              </div>
            </CardContent>
          </Card>

          <Card className="border-t-4 border-t-amber-500 dark:border-t-amber-400">
            <CardHeader>
              <CardTitle>Badges et récompenses</CardTitle>
              <CardDescription>Accomplissements de l'étudiant</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-3 gap-4">
                <div className="flex flex-col items-center">
                  <div className="h-12 w-12 bg-amber-100 dark:bg-amber-900/30 rounded-full flex items-center justify-center mb-2">
                    <Award className="h-6 w-6 text-amber-600 dark:text-amber-400" />
                  </div>
                  <span className="text-xs text-center">Excellence</span>
                </div>
                <div className="flex flex-col items-center">
                  <div className="h-12 w-12 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center mb-2">
                    <BookOpen className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                  </div>
                  <span className="text-xs text-center">Assidu</span>
                </div>
                <div className="flex flex-col items-center">
                  <div className="h-12 w-12 bg-purple-100 dark:bg-purple-900/30 rounded-full flex items-center justify-center mb-2">
                    <Calendar className="h-6 w-6 text-purple-600 dark:text-purple-400" />
                  </div>
                  <span className="text-xs text-center">Ponctuel</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <Card className="md:col-span-3 border-t-4 border-t-brand-500 dark:border-t-brand-400">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Soumissions récentes</CardTitle>
              <Button
                asChild
                variant="outline"
                size="sm"
                className="border-brand-200 hover:bg-brand-50 hover:text-brand-700 dark:border-brand-800 dark:hover:bg-brand-900/30 dark:hover:text-brand-400"
              >
                <Link href={`/dashboard/teacher/students/${params.id}/submissions`}>Voir toutes les soumissions</Link>
              </Button>
            </div>
            <CardDescription>Derniers exercices soumis par l'étudiant</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              {recentSubmissions.map((submission) => (
                <Card
                  key={submission.id}
                  className="overflow-hidden transition-all duration-200 hover:shadow-md hover:border-brand-300 dark:hover:border-brand-700"
                >
                  <div className="h-2 w-full bg-gradient-to-r from-brand-500 to-purple-500" />
                  <CardHeader className="pb-2">
                    <CardTitle className="text-base">{submission.exercise}</CardTitle>
                    <CardDescription>{submission.date}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium">Note</span>
                      <span
                        className={cn(
                          "text-sm font-medium",
                          submission.score >= 16
                            ? "text-green-600 dark:text-green-500"
                            : submission.score >= 14
                              ? "text-blue-600 dark:text-blue-500"
                              : submission.score >= 12
                                ? "text-amber-600 dark:text-amber-500"
                                : "text-red-600 dark:text-red-500",
                        )}
                      >
                        {submission.score}/{submission.maxScore}
                      </span>
                    </div>
                    <Progress
                      value={(submission.score / submission.maxScore) * 100}
                      className="h-2"
                      indicatorClassName={cn(
                        submission.score >= 16
                          ? "bg-green-500"
                          : submission.score >= 14
                            ? "bg-blue-500"
                            : submission.score >= 12
                              ? "bg-amber-500"
                              : "bg-red-500",
                      )}
                    />
                  </CardContent>
                </Card>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

