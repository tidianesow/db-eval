"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Bell, Check, Trash2, ExternalLink, Search } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useRouter } from "next/navigation"
import { useToast } from "@/components/ui/use-toast"

interface Notification {
  id: string
  type: string
  title: string
  message: string
  read: boolean
  createdAt: string
  link?: string
}

export default function NotificationsPage() {
  const [notifications, setNotifications] = useState<Notification[]>([])
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState("")
  const [activeTab, setActiveTab] = useState("all")
  const router = useRouter()
  const { toast } = useToast()

  const fetchNotifications = async (includeRead = true) => {
    setLoading(true)
    try {
      const response = await fetch(`/api/notifications?includeRead=${includeRead}`)
      if (!response.ok) throw new Error("Erreur lors de la récupération des notifications")
      const data = await response.json()
      setNotifications(data)
    } catch (error) {
      console.error("Erreur:", error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchNotifications()
  }, [])

  const handleMarkAsRead = async (id: string) => {
    try {
      const response = await fetch(`/api/notifications/${id}`, {
        method: "PUT",
      })
      if (!response.ok) throw new Error("Erreur lors de la mise à jour de la notification")

      setNotifications(notifications.map((notif) => (notif.id === id ? { ...notif, read: true } : notif)))
    } catch (error) {
      console.error("Erreur:", error)
    }
  }

  const handleDelete = async (id: string, e: React.MouseEvent) => {
    e.stopPropagation()
    try {
      const response = await fetch(`/api/notifications/${id}`, {
        method: "DELETE",
      })
      if (!response.ok) throw new Error("Erreur lors de la suppression de la notification")

      setNotifications(notifications.filter((notif) => notif.id !== id))
      toast({
        description: "Notification supprimée",
      })
    } catch (error) {
      console.error("Erreur:", error)
    }
  }

  const handleMarkAllAsRead = async () => {
    try {
      const response = await fetch("/api/notifications", {
        method: "PUT",
      })
      if (!response.ok) throw new Error("Erreur lors de la mise à jour des notifications")

      setNotifications(notifications.map((notif) => ({ ...notif, read: true })))
      toast({
        description: "Toutes les notifications ont été marquées comme lues",
      })
    } catch (error) {
      console.error("Erreur:", error)
    }
  }

  const handleNotificationClick = async (notification: Notification) => {
    if (!notification.read) {
      await handleMarkAsRead(notification.id)
    }

    if (notification.link) {
      router.push(notification.link)
    }
  }

  const filteredNotifications = notifications.filter((notification) => {
    // Filtre de recherche
    const matchesSearch =
      notification.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      notification.message.toLowerCase().includes(searchQuery.toLowerCase())

    // Filtre par onglet
    const matchesTab =
      activeTab === "all" ||
      (activeTab === "unread" && !notification.read) ||
      (activeTab === "read" && notification.read)

    return matchesSearch && matchesTab
  })

  const getNotificationTypeIcon = (type: string) => {
    switch (type) {
      case "submission_received":
        return <Bell className="h-5 w-5 text-blue-500" />
      case "submission_graded":
        return <Check className="h-5 w-5 text-green-500" />
      case "exercise_published":
        return <Bell className="h-5 w-5 text-purple-500" />
      case "plagiarism_detected":
        return <Bell className="h-5 w-5 text-red-500" />
      default:
        return <Bell className="h-5 w-5 text-gray-500" />
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold tracking-tight">Notifications</h2>
        <p className="text-muted-foreground">Gérez vos notifications et restez informé des dernières activités.</p>
      </div>

      <Card>
        <CardHeader>
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <CardTitle>Centre de notifications</CardTitle>
              <CardDescription>Toutes vos notifications en un seul endroit</CardDescription>
            </div>
            <div className="flex flex-col sm:flex-row gap-2">
              <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Rechercher..."
                  className="pl-8 w-full md:w-64"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              {notifications.some((n) => !n.read) && (
                <Button onClick={handleMarkAllAsRead} className="gap-2">
                  <Check className="h-4 w-4" />
                  Tout marquer comme lu
                </Button>
              )}
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab} className="space-y-4">
            <TabsList>
              <TabsTrigger value="all">Toutes</TabsTrigger>
              <TabsTrigger value="unread">Non lues</TabsTrigger>
              <TabsTrigger value="read">Lues</TabsTrigger>
            </TabsList>
            <TabsContent value="all" className="space-y-4">
              {loading ? (
                <div className="flex justify-center py-8">
                  <span className="text-muted-foreground">Chargement...</span>
                </div>
              ) : filteredNotifications.length === 0 ? (
                <div className="flex justify-center py-8">
                  <span className="text-muted-foreground">Aucune notification trouvée</span>
                </div>
              ) : (
                filteredNotifications.map((notification) => (
                  <div
                    key={notification.id}
                    className={`flex items-start p-4 rounded-lg border cursor-pointer transition-colors ${
                      !notification.read ? "bg-muted/50" : ""
                    }`}
                    onClick={() => handleNotificationClick(notification)}
                  >
                    <div className="mr-4 mt-1">{getNotificationTypeIcon(notification.type)}</div>
                    <div className="flex-1">
                      <div className="flex justify-between">
                        <h4 className="font-medium">{notification.title}</h4>
                        <span className="text-xs text-muted-foreground">
                          {new Date(notification.createdAt).toLocaleString()}
                        </span>
                      </div>
                      <p className="text-sm text-muted-foreground mt-1">{notification.message}</p>
                    </div>
                    <div className="flex items-center gap-2 ml-4">
                      {notification.link && (
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <ExternalLink className="h-4 w-4" />
                        </Button>
                      )}
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8"
                        onClick={(e) => handleDelete(notification.id, e)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))
              )}
            </TabsContent>
            <TabsContent value="unread" className="space-y-4">
              {loading ? (
                <div className="flex justify-center py-8">
                  <span className="text-muted-foreground">Chargement...</span>
                </div>
              ) : filteredNotifications.length === 0 ? (
                <div className="flex justify-center py-8">
                  <span className="text-muted-foreground">Aucune notification non lue</span>
                </div>
              ) : (
                filteredNotifications.map((notification) => (
                  <div
                    key={notification.id}
                    className="flex items-start p-4 rounded-lg border cursor-pointer transition-colors bg-muted/50"
                    onClick={() => handleNotificationClick(notification)}
                  >
                    <div className="mr-4 mt-1">{getNotificationTypeIcon(notification.type)}</div>
                    <div className="flex-1">
                      <div className="flex justify-between">
                        <h4 className="font-medium">{notification.title}</h4>
                        <span className="text-xs text-muted-foreground">
                          {new Date(notification.createdAt).toLocaleString()}
                        </span>
                      </div>
                      <p className="text-sm text-muted-foreground mt-1">{notification.message}</p>
                    </div>
                    <div className="flex items-center gap-2 ml-4">
                      {notification.link && (
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <ExternalLink className="h-4 w-4" />
                        </Button>
                      )}
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8"
                        onClick={(e) => handleDelete(notification.id, e)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))
              )}
            </TabsContent>
            <TabsContent value="read" className="space-y-4">
              {loading ? (
                <div className="flex justify-center py-8">
                  <span className="text-muted-foreground">Chargement...</span>
                </div>
              ) : filteredNotifications.length === 0 ? (
                <div className="flex justify-center py-8">
                  <span className="text-muted-foreground">Aucune notification lue</span>
                </div>
              ) : (
                filteredNotifications.map((notification) => (
                  <div
                    key={notification.id}
                    className="flex items-start p-4 rounded-lg border cursor-pointer transition-colors"
                    onClick={() => handleNotificationClick(notification)}
                  >
                    <div className="mr-4 mt-1">{getNotificationTypeIcon(notification.type)}</div>
                    <div className="flex-1">
                      <div className="flex justify-between">
                        <h4 className="font-medium">{notification.title}</h4>
                        <span className="text-xs text-muted-foreground">
                          {new Date(notification.createdAt).toLocaleString()}
                        </span>
                      </div>
                      <p className="text-sm text-muted-foreground mt-1">{notification.message}</p>
                    </div>
                    <div className="flex items-center gap-2 ml-4">
                      {notification.link && (
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <ExternalLink className="h-4 w-4" />
                        </Button>
                      )}
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8"
                        onClick={(e) => handleDelete(notification.id, e)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))
              )}
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  )
}

