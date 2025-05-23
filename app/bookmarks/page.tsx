"use client"

import { useEffect, useState } from "react"
import { useBookmarkStore } from "@/store/bookmarks"
import { useEmployeeStore } from "@/store/employees"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Bookmark, Trash2, TrendingUp, FolderPlus } from "lucide-react"
import Link from "next/link"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { useToast } from "@/components/ui/use-toast"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { getInitials } from "@/lib/utils"
import { Skeleton } from "@/components/ui/skeleton"
import EmptyState from "@/components/ui/empty-state"

export default function BookmarksPage() {
  const { bookmarks, removeBookmark } = useBookmarkStore()
  const { employees, fetchEmployees } = useEmployeeStore()
  const [isLoading, setIsLoading] = useState(true)
  const { toast } = useToast()

  useEffect(() => {
    const loadData = async () => {
      if (employees.length === 0) {
        await fetchEmployees()
      }
      setIsLoading(false)
    }

    loadData()
  }, [employees, fetchEmployees])

  const bookmarkedEmployees = employees.filter((emp) => bookmarks.includes(emp.id))

  const handleRemoveBookmark = (id: number) => {
    removeBookmark(id)
    toast({
      title: "Bookmark removed",
      description: "Employee has been removed from your bookmarks",
    })
  }

  const handlePromote = (name: string) => {
    toast({
      title: "Employee promoted",
      description: `${name} has been promoted successfully`,
    })
  }

  const handleAssignProject = (name: string) => {
    toast({
      title: "Project assigned",
      description: `${name} has been assigned to a new project`,
    })
  }

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-6">
        <div className="mb-8">
          <Skeleton className="h-10 w-64 mb-2" />
          <Skeleton className="h-5 w-96" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <Skeleton key={i} className="h-48 w-full" />
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight flex items-center">
          <Bookmark className="mr-2 h-8 w-8" /> Bookmarked Employees
        </h1>
        <p className="text-muted-foreground mt-1">Manage your bookmarked employees and take quick actions</p>
      </div>

      <Tabs defaultValue="grid" className="mb-8">
        <TabsList>
          <TabsTrigger value="grid">Grid View</TabsTrigger>
          <TabsTrigger value="list">List View</TabsTrigger>
        </TabsList>

        <TabsContent value="grid">
          {bookmarkedEmployees.length === 0 ? (
            <EmptyState
              icon={<Bookmark className="h-12 w-12" />}
              title="No bookmarked employees"
              description="You haven't bookmarked any employees yet. Bookmark employees from the dashboard to see them here."
              action={
                <Button asChild>
                  <Link href="/">Go to Dashboard</Link>
                </Button>
              }
            />
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {bookmarkedEmployees.map((employee) => (
                <Card key={employee.id} className="overflow-hidden">
                  <CardHeader className="pb-2">
                    <div className="flex justify-between items-start">
                      <div className="flex items-center space-x-4">
                        <Avatar>
                          <AvatarImage
                            src={employee.image || "/placeholder.svg"}
                            alt={`${employee.firstName} ${employee.lastName}`}
                          />
                          <AvatarFallback>{getInitials(`${employee.firstName} ${employee.lastName}`)}</AvatarFallback>
                        </Avatar>
                        <div>
                          <CardTitle className="text-lg">
                            {employee.firstName} {employee.lastName}
                          </CardTitle>
                          <CardDescription>{employee.email}</CardDescription>
                        </div>
                      </div>
                      <Button variant="ghost" size="icon" onClick={() => handleRemoveBookmark(employee.id)}>
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center justify-between mb-4">
                      <Badge variant="outline">{employee.department}</Badge>
                      <Badge
                        variant={
                          employee.performanceRating >= 4
                            ? "success"
                            : employee.performanceRating >= 3
                              ? "default"
                              : "destructive"
                        }
                      >
                        {employee.performanceRating}/5 Rating
                      </Badge>
                    </div>
                    <div className="flex flex-col space-y-2">
                      <Button
                        variant="default"
                        size="sm"
                        className="w-full"
                        onClick={() => handlePromote(`${employee.firstName} ${employee.lastName}`)}
                      >
                        <TrendingUp className="mr-2 h-4 w-4" /> Promote
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        className="w-full"
                        onClick={() => handleAssignProject(`${employee.firstName} ${employee.lastName}`)}
                      >
                        <FolderPlus className="mr-2 h-4 w-4" /> Assign to Project
                      </Button>
                      <Button asChild variant="secondary" size="sm" className="w-full">
                        <Link href={`/employee/${employee.id}`}>View Profile</Link>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </TabsContent>

        <TabsContent value="list">
          {bookmarkedEmployees.length === 0 ? (
            <EmptyState
              icon={<Bookmark className="h-12 w-12" />}
              title="No bookmarked employees"
              description="You haven't bookmarked any employees yet. Bookmark employees from the dashboard to see them here."
              action={
                <Button asChild>
                  <Link href="/">Go to Dashboard</Link>
                </Button>
              }
            />
          ) : (
            <div className="space-y-4">
              {bookmarkedEmployees.map((employee) => (
                <Card key={employee.id}>
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <Avatar>
                          <AvatarImage
                            src={employee.image || "/placeholder.svg"}
                            alt={`${employee.firstName} ${employee.lastName}`}
                          />
                          <AvatarFallback>{getInitials(`${employee.firstName} ${employee.lastName}`)}</AvatarFallback>
                        </Avatar>
                        <div>
                          <h3 className="font-medium">
                            {employee.firstName} {employee.lastName}
                          </h3>
                          <p className="text-sm text-muted-foreground">{employee.email}</p>
                        </div>
                      </div>

                      <div className="flex items-center space-x-2">
                        <Badge variant="outline">{employee.department}</Badge>
                        <Badge
                          variant={
                            employee.performanceRating >= 4
                              ? "success"
                              : employee.performanceRating >= 3
                                ? "default"
                                : "destructive"
                          }
                        >
                          {employee.performanceRating}/5
                        </Badge>

                        <div className="flex space-x-1">
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => handlePromote(`${employee.firstName} ${employee.lastName}`)}
                          >
                            <TrendingUp className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => handleAssignProject(`${employee.firstName} ${employee.lastName}`)}
                          >
                            <FolderPlus className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="icon" onClick={() => handleRemoveBookmark(employee.id)}>
                            <Trash2 className="h-4 w-4" />
                          </Button>
                          <Button asChild variant="ghost" size="icon">
                            <Link href={`/employee/${employee.id}`}>
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="16"
                                height="16"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                className="lucide lucide-external-link"
                              >
                                <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                                <polyline points="15 3 21 3 21 9" />
                                <line x1="10" x2="21" y1="14" y2="3" />
                              </svg>
                            </Link>
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  )
}
