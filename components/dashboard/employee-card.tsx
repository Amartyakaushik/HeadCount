"use client"
import Link from "next/link"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Bookmark, Eye, TrendingUp, Star } from "lucide-react"
import { cn, getInitials } from "@/lib/utils"
import { useBookmarkStore } from "@/store/bookmarks"
import { useToast } from "@/components/ui/use-toast"
import type { Employee } from "@/types/employee"

interface EmployeeCardProps {
  employee: Employee
}

export default function EmployeeCard({ employee }: EmployeeCardProps) {
  const { bookmarks, addBookmark, removeBookmark } = useBookmarkStore()
  const { toast } = useToast()
  const isBookmarked = bookmarks.includes(employee.id)

  const handleBookmarkToggle = () => {
    if (isBookmarked) {
      removeBookmark(employee.id)
      toast({
        title: "Bookmark removed",
        description: `${employee.firstName} ${employee.lastName} has been removed from your bookmarks`,
      })
    } else {
      addBookmark(employee.id)
      toast({
        title: "Bookmark added",
        description: `${employee.firstName} ${employee.lastName} has been added to your bookmarks`,
      })
    }
  }

  const handlePromote = () => {
    toast({
      title: "Employee promoted",
      description: `${employee.firstName} ${employee.lastName} has been promoted successfully`,
    })
  }

  return (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow">
      <CardContent className="p-4">
        <div className="flex items-start justify-between mb-4">
          <div className="flex-1">
            <h3 className="font-medium text-lg leading-tight">{`${employee.firstName} ${employee.lastName}`}</h3>
            <p className="text-sm text-muted-foreground mt-1">{employee.email}</p>
            <div className="flex items-center gap-2 mt-2">
              <span className="text-sm">Age: {employee.age}</span>
              <Badge variant="outline" className="text-xs">
                {employee.department}
              </Badge>
            </div>
          </div>
          <Avatar className="ml-3">
            <AvatarImage
              src={employee.image || "/placeholder.svg"}
              alt={`${employee.firstName} ${employee.lastName}`}
            />
            <AvatarFallback>{getInitials(`${employee.firstName} ${employee.lastName}`)}</AvatarFallback>
          </Avatar>
        </div>

        <div className="mb-4">
          <div className="flex items-center gap-1">
            <span className="text-sm font-medium mr-2">Performance:</span>
            <div className="flex">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star
                  key={i}
                  className={cn(
                    "h-4 w-4",
                    i < employee.performanceRating ? "fill-yellow-400 text-yellow-400" : "text-muted",
                  )}
                />
              ))}
            </div>
            <span className="text-sm text-muted-foreground ml-1">({employee.performanceRating}/5)</span>
          </div>
        </div>
      </CardContent>

      <CardFooter className="flex flex-col gap-2 p-4 pt-0">
        <div className="flex w-full gap-2">
          <Button variant="outline" size="sm" className="flex-1" asChild>
            <Link href={`/employee/${employee.id}`}>
              <Eye className="h-4 w-4 mr-1" />
              View
            </Link>
          </Button>
          <Button
            variant={isBookmarked ? "secondary" : "outline"}
            size="sm"
            className="flex-1"
            onClick={handleBookmarkToggle}
          >
            <Bookmark className={cn("h-4 w-4 mr-1", isBookmarked && "fill-current")} />
            {isBookmarked ? "Saved" : "Save"}
          </Button>
        </div>
        <Button variant="default" size="sm" className="w-full" onClick={handlePromote}>
          <TrendingUp className="h-4 w-4 mr-1" />
          Promote
        </Button>
      </CardFooter>
    </Card>
  )
}
