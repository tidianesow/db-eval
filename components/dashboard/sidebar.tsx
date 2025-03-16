"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { BarChart2, BookOpen, FileText, Home, LogOut, Menu, MessageSquare, Settings, Users, X } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import type { UserRole } from "@/types"

interface SidebarProps {
  userRole: UserRole
}

export function Sidebar({ userRole }: SidebarProps) {
  const pathname = usePathname()
  const [open, setOpen] = useState(false)

  const routes = [
    {
      label: "Tableau de bord",
      icon: Home,
      href: "/dashboard",
      active: pathname === "/dashboard",
      roles: ["student", "teacher", "admin"],
    },
    {
      label: "Exercices",
      icon: BookOpen,
      href: "/dashboard/exercises",
      active: pathname === "/dashboard/exercises",
      roles: ["student", "teacher", "admin"],
    },
    {
      label: "Mes soumissions",
      icon: FileText,
      href: "/dashboard/submissions",
      active: pathname === "/dashboard/submissions",
      roles: ["student"],
    },
    {
      label: "Créer un exercice",
      icon: FileText,
      href: "/dashboard/exercises/create",
      active: pathname === "/dashboard/exercises/create",
      roles: ["teacher", "admin"],
    },
    {
      label: "Étudiants",
      icon: Users,
      href: "/dashboard/students",
      active: pathname === "/dashboard/students",
      roles: ["teacher", "admin"],
    },
    {
      label: "Statistiques",
      icon: BarChart2,
      href: "/dashboard/stats",
      active: pathname === "/dashboard/stats",
      roles: ["student", "teacher", "admin"],
    },
    {
      label: "Feedback",
      icon: MessageSquare,
      href: "/dashboard/feedback",
      active: pathname === "/dashboard/feedback",
      roles: ["student", "teacher", "admin"],
    },
    {
      label: "Paramètres",
      icon: Settings,
      href: "/dashboard/settings",
      active: pathname === "/dashboard/settings",
      roles: ["student", "teacher", "admin"],
    },
  ]

  const filteredRoutes = routes.filter((route) => route.roles.includes(userRole))

  return (
    <>
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetTrigger asChild className="lg:hidden">
          <Button variant="outline" size="icon" className="ml-2">
            <Menu className="h-5 w-5" />
            <span className="sr-only">Toggle Menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="p-0">
          <div className="flex flex-col h-full">
            <div className="p-4 border-b">
              <div className="flex items-center justify-between">
                <Link href="/" className="flex items-center space-x-2">
                  <div className="h-8 w-8 bg-brand-600 rounded-lg flex items-center justify-center">
                    <span className="text-white font-bold">AI</span>
                  </div>
                  <span className="text-xl font-bold">EvalAI</span>
                </Link>
                <Button variant="ghost" size="icon" onClick={() => setOpen(false)}>
                  <X className="h-5 w-5" />
                  <span className="sr-only">Close</span>
                </Button>
              </div>
            </div>
            <ScrollArea className="flex-1">
              <div className="p-4">
                <nav className="space-y-1">
                  {filteredRoutes.map((route) => (
                    <Link
                      key={route.href}
                      href={route.href}
                      onClick={() => setOpen(false)}
                      className={cn(
                        "flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-all hover:text-primary",
                        route.active ? "bg-primary/10 text-primary" : "text-muted-foreground hover:bg-primary/5",
                      )}
                    >
                      <route.icon className="h-5 w-5" />
                      {route.label}
                    </Link>
                  ))}
                </nav>
              </div>
            </ScrollArea>
            <div className="p-4 border-t">
              <Button variant="ghost" className="w-full justify-start text-muted-foreground" asChild>
                <Link href="/logout">
                  <LogOut className="mr-2 h-5 w-5" />
                  Déconnexion
                </Link>
              </Button>
            </div>
          </div>
        </SheetContent>
      </Sheet>
      <aside className="fixed inset-y-0 left-0 z-10 hidden w-64 border-r bg-background lg:block">
        <div className="flex flex-col h-full">
          <div className="p-6 border-b">
            <Link href="/" className="flex items-center space-x-2">
              <div className="h-8 w-8 bg-brand-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold">AI</span>
              </div>
              <span className="text-xl font-bold">EvalAI</span>
            </Link>
          </div>
          <ScrollArea className="flex-1 py-4">
            <nav className="grid gap-1 px-4">
              {filteredRoutes.map((route) => (
                <Link
                  key={route.href}
                  href={route.href}
                  className={cn(
                    "flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-all hover:text-primary",
                    route.active ? "bg-primary/10 text-primary" : "text-muted-foreground hover:bg-primary/5",
                  )}
                >
                  <route.icon className="h-5 w-5" />
                  {route.label}
                </Link>
              ))}
            </nav>
          </ScrollArea>
          <div className="p-4 border-t mt-auto">
            <Button variant="ghost" className="w-full justify-start text-muted-foreground" asChild>
              <Link href="/logout">
                <LogOut className="mr-2 h-5 w-5" />
                Déconnexion
              </Link>
            </Button>
          </div>
        </div>
      </aside>
    </>
  )
}

