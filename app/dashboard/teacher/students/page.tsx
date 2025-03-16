"use client"

import { useState } from "react"
import Link from "next/link"
import { Download, Filter, MoreHorizontal, Search, SortAsc, UserPlus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

// Données fictives pour les étudiants
const students = [
  {
    id: "1",
    name: "Marie Dupont",
    email: "marie.dupont@example.com",
    avatar: "/placeholder.svg?height=32&width=32",
    group: "Groupe A",
    submissions: 12,
    averageScore: 16.5,
    lastActive: "Aujourd'hui, 10:30",
  },
  {
    id: "2",
    name: "Thomas Martin",
    email: "thomas.martin@example.com",
    avatar: "/placeholder.svg?height=32&width=32",
    group: "Groupe B",
    submissions: 10,
    averageScore: 14.8,
    lastActive: "Hier, 15:45",
  },
  {
    id: "3",
    name: "Sophie Lefebvre",
    email: "sophie.lefebvre@example.com",
    avatar: "/placeholder.svg?height=32&width=32",
    group: "Groupe A",
    submissions: 8,
    averageScore: 17.2,
    lastActive: "Il y a 2 jours",
  },
  {
    id: "4",
    name: "Lucas Bernard",
    email: "lucas.bernard@example.com",
    avatar: "/placeholder.svg?height=32&width=32",
    group: "Groupe C",
    submissions: 11,
    averageScore: 13.5,
    lastActive: "Aujourd'hui, 09:15",
  },
  {
    id: "5",
    name: "Emma Petit",
    email: "emma.petit@example.com",
    avatar: "/placeholder.svg?height=32&width=32",
    group: "Groupe B",
    submissions: 9,
    averageScore: 15.7,
    lastActive: "Il y a 3 jours",
  },
  {
    id: "6",
    name: "Hugo Moreau",
    email: "hugo.moreau@example.com",
    avatar: "/placeholder.svg?height=32&width=32",
    group: "Groupe C",
    submissions: 7,
    averageScore: 12.8,
    lastActive: "Il y a 1 semaine",
  },
  {
    id: "7",
    name: "Léa Dubois",
    email: "lea.dubois@example.com",
    avatar: "/placeholder.svg?height=32&width=32",
    group: "Groupe A",
    submissions: 14,
    averageScore: 18.2,
    lastActive: "Hier, 11:20",
  },
  {
    id: "8",
    name: "Nathan Rousseau",
    email: "nathan.rousseau@example.com",
    avatar: "/placeholder.svg?height=32&width=32",
    group: "Groupe B",
    submissions: 6,
    averageScore: 11.5,
    lastActive: "Il y a 5 jours",
  },
]

export default function StudentsPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [groupFilter, setGroupFilter] = useState("all")

  const filteredStudents = students.filter((student) => {
    // Filtre de recherche
    const matchesSearch =
      student.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      student.email.toLowerCase().includes(searchQuery.toLowerCase())

    // Filtre de groupe
    const matchesGroup = groupFilter === "all" || student.group === groupFilter

    return matchesSearch && matchesGroup
  })

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight bg-gradient-to-r from-brand-600 to-blue-600 bg-clip-text text-transparent">
            Gestion des étudiants
          </h2>
          <p className="text-muted-foreground">Gérez les étudiants et suivez leurs performances.</p>
        </div>
        <div className="flex items-center gap-2">
          <Button
            asChild
            variant="outline"
            className="border-brand-200 hover:bg-brand-50 hover:text-brand-700 dark:border-brand-800 dark:hover:bg-brand-900/30 dark:hover:text-brand-400"
          >
            <Link href="/dashboard/teacher/groups">
              <Filter className="mr-2 h-4 w-4 text-brand-500" />
              Gérer les groupes
            </Link>
          </Button>
          <Button asChild className="bg-brand-600 hover:bg-brand-700">
            <Link href="/dashboard/teacher/students/invite">
              <UserPlus className="mr-2 h-4 w-4" />
              Inviter des étudiants
            </Link>
          </Button>
        </div>
      </div>

      <Card className="border-t-4 border-t-brand-500 dark:border-t-brand-400">
        <CardHeader>
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <CardTitle>Liste des étudiants</CardTitle>
              <CardDescription>Gérez et suivez les étudiants inscrits à vos cours.</CardDescription>
            </div>
            <div className="flex flex-col sm:flex-row gap-2">
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
              <Select value={groupFilter} onValueChange={setGroupFilter}>
                <SelectTrigger className="w-full sm:w-40 border-brand-200 focus-visible:ring-brand-500 dark:border-brand-800 dark:focus-visible:ring-brand-400">
                  <SelectValue placeholder="Groupe" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Tous les groupes</SelectItem>
                  <SelectItem value="Groupe A">Groupe A</SelectItem>
                  <SelectItem value="Groupe B">Groupe B</SelectItem>
                  <SelectItem value="Groupe C">Groupe C</SelectItem>
                </SelectContent>
              </Select>
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
                <TableHead>Groupe</TableHead>
                <TableHead>
                  <div className="flex items-center gap-1">
                    Soumissions
                    <SortAsc className="h-3 w-3" />
                  </div>
                </TableHead>
                <TableHead>
                  <div className="flex items-center gap-1">
                    Note moyenne
                    <SortAsc className="h-3 w-3" />
                  </div>
                </TableHead>
                <TableHead>Dernière activité</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredStudents.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={6} className="text-center py-4">
                    Aucun étudiant trouvé
                  </TableCell>
                </TableRow>
              ) : (
                filteredStudents.map((student) => (
                  <TableRow key={student.id} className="hover:bg-brand-50 dark:hover:bg-brand-900/10">
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <Avatar>
                          <AvatarImage src={student.avatar} alt={student.name} />
                          <AvatarFallback>{student.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-medium">{student.name}</p>
                          <p className="text-xs text-muted-foreground">{student.email}</p>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge
                        variant="outline"
                        className="bg-brand-50 text-brand-700 border-brand-200 dark:bg-brand-900/20 dark:text-brand-300 dark:border-brand-800"
                      >
                        {student.group}
                      </Badge>
                    </TableCell>
                    <TableCell>{student.submissions}</TableCell>
                    <TableCell>
                      <span
                        className={
                          student.averageScore >= 16
                            ? "text-green-600 dark:text-green-500 font-medium"
                            : student.averageScore >= 14
                              ? "text-blue-600 dark:text-blue-500 font-medium"
                              : student.averageScore >= 12
                                ? "text-amber-600 dark:text-amber-500 font-medium"
                                : "text-red-600 dark:text-red-500 font-medium"
                        }
                      >
                        {student.averageScore}/20
                      </span>
                    </TableCell>
                    <TableCell>{student.lastActive}</TableCell>
                    <TableCell className="text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon" className="text-muted-foreground">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem>
                            <Link href={`/dashboard/teacher/students/${student.id}`} className="flex w-full">
                              Voir le profil
                            </Link>
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Link
                              href={`/dashboard/teacher/students/${student.id}/submissions`}
                              className="flex w-full"
                            >
                              Voir les soumissions
                            </Link>
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Link href={`/dashboard/teacher/students/${student.id}/stats`} className="flex w-full">
                              Voir les statistiques
                            </Link>
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <div className="grid gap-4 md:grid-cols-2">
        <Card className="border-t-4 border-t-blue-500 dark:border-t-blue-400">
          <CardHeader>
            <CardTitle>Performances par groupe</CardTitle>
            <CardDescription>Note moyenne par groupe d'étudiants</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="font-medium">Groupe A</span>
                  <span className="text-green-600 dark:text-green-500 font-medium">17.3/20</span>
                </div>
                <div className="h-2 w-full bg-gray-100 dark:bg-gray-800 rounded-full overflow-hidden">
                  <div className="h-full bg-green-500 rounded-full" style={{ width: "86.5%" }}></div>
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="font-medium">Groupe B</span>
                  <span className="text-blue-600 dark:text-blue-500 font-medium">14.0/20</span>
                </div>
                <div className="h-2 w-full bg-gray-100 dark:bg-gray-800 rounded-full overflow-hidden">
                  <div className="h-full bg-blue-500 rounded-full" style={{ width: "70%" }}></div>
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="font-medium">Groupe C</span>
                  <span className="text-amber-600 dark:text-amber-500 font-medium">13.2/20</span>
                </div>
                <div className="h-2 w-full bg-gray-100 dark:bg-gray-800 rounded-full overflow-hidden">
                  <div className="h-full bg-amber-500 rounded-full" style={{ width: "66%" }}></div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="border-t-4 border-t-purple-500 dark:border-t-purple-400">
          <CardHeader>
            <CardTitle>Activité récente</CardTitle>
            <CardDescription>Dernières actions des étudiants</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-start gap-3 p-2 rounded-lg hover:bg-gray-50 dark:hover:bg-slate-800/50 transition-colors">
                <Avatar className="h-8 w-8">
                  <AvatarImage src="/placeholder.svg?height=32&width=32" alt="Marie Dupont" />
                  <AvatarFallback>MD</AvatarFallback>
                </Avatar>
                <div>
                  <p className="text-sm">
                    <span className="font-medium">Marie Dupont</span> a soumis l'exercice{" "}
                    <span className="font-medium">Introduction aux requêtes SQL</span>
                  </p>
                  <p className="text-xs text-muted-foreground">Aujourd'hui, 10:30</p>
                </div>
              </div>
              <div className="flex items-start gap-3 p-2 rounded-lg hover:bg-gray-50 dark:hover:bg-slate-800/50 transition-colors">
                <Avatar className="h-8 w-8">
                  <AvatarImage src="/placeholder.svg?height=32&width=32" alt="Lucas Bernard" />
                  <AvatarFallback>LB</AvatarFallback>
                </Avatar>
                <div>
                  <p className="text-sm">
                    <span className="font-medium">Lucas Bernard</span> a soumis l'exercice{" "}
                    <span className="font-medium">Jointures SQL avancées</span>
                  </p>
                  <p className="text-xs text-muted-foreground">Aujourd'hui, 09:15</p>
                </div>
              </div>
              <div className="flex items-start gap-3 p-2 rounded-lg hover:bg-gray-50 dark:hover:bg-slate-800/50 transition-colors">
                <Avatar className="h-8 w-8">
                  <AvatarImage src="/placeholder.svg?height=32&width=32" alt="Léa Dubois" />
                  <AvatarFallback>LD</AvatarFallback>
                </Avatar>
                <div>
                  <p className="text-sm">
                    <span className="font-medium">Léa Dubois</span> a consulté son feedback pour{" "}
                    <span className="font-medium">Modélisation de bases de données</span>
                  </p>
                  <p className="text-xs text-muted-foreground">Hier, 11:20</p>
                </div>
              </div>
              <div className="flex items-start gap-3 p-2 rounded-lg hover:bg-gray-50 dark:hover:bg-slate-800/50 transition-colors">
                <Avatar className="h-8 w-8">
                  <AvatarImage src="/placeholder.svg?height=32&width=32" alt="Thomas Martin" />
                  <AvatarFallback>TM</AvatarFallback>
                </Avatar>
                <div>
                  <p className="text-sm">
                    <span className="font-medium">Thomas Martin</span> a soumis l'exercice{" "}
                    <span className="font-medium">Sous-requêtes et fonctions d'agrégation</span>
                  </p>
                  <p className="text-xs text-muted-foreground">Hier, 15:45</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

