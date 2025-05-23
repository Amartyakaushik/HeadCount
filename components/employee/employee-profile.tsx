"use client"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Bookmark, Mail, Phone, MapPin, Calendar, Star, Pencil } from "lucide-react"
import { cn, getInitials } from "@/lib/utils"
import { useBookmarkStore } from "@/store/bookmarks"
import { useToast } from "@/components/ui/use-toast"
import type { Employee } from "@/types/employee"

interface EmployeeProfileProps {
  employee: Employee
}

export default function EmployeeProfile({ employee }: EmployeeProfileProps) {
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

  return (
    <Card>
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <CardTitle>Profile</CardTitle>
          <Button variant={isBookmarked ? "secondary" : "outline"} size="sm" onClick={handleBookmarkToggle}>
            <Bookmark className={cn("h-4 w-4 mr-1", isBookmarked && "fill-current")} />
            {isBookmarked ? "Saved" : "Save"}
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col items-center text-center mb-6">
          <Avatar className="h-24 w-24 mb-4">
            <AvatarImage
              src={employee.image || "/placeholder.svg"}
              alt={`${employee.firstName} ${employee.lastName}`}
            />
            <AvatarFallback className="text-xl">
              {getInitials(`${employee.firstName} ${employee.lastName}`)}
            </AvatarFallback>
          </Avatar>
          <h2 className="text-xl font-bold">
            {employee.firstName} {employee.lastName}
          </h2>
          <p className="text-muted-foreground">{employee.department}</p>

          <div className="flex mt-2">
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

          <Badge
            className="mt-3"
            variant={
              employee.performanceRating >= 4 ? "success" : employee.performanceRating >= 3 ? "default" : "destructive"
            }
          >
            {employee.performanceRating}/5 Performance
          </Badge>
        </div>

        <div className="space-y-4">
          <div className="flex items-center">
            <Mail className="h-4 w-4 mr-2 text-muted-foreground" />
            <span className="text-sm">{employee.email}</span>
          </div>

          <div className="flex items-center">
            <Phone className="h-4 w-4 mr-2 text-muted-foreground" />
            <span className="text-sm">{employee.phone || "+1 (555) 123-4567"}</span>
          </div>

          <div className="flex items-center">
            <MapPin className="h-4 w-4 mr-2 text-muted-foreground" />
            <span className="text-sm">
              {employee.address?.city || "New York"}, {employee.address?.state || "NY"}
            </span>
          </div>

          <div className="flex items-center">
            <Calendar className="h-4 w-4 mr-2 text-muted-foreground" />
            <span className="text-sm">Age: {employee.age}</span>
          </div>
        </div>

        <div className="mt-6">
          <Button variant="outline" className="w-full">
            <Pencil className="h-4 w-4 mr-2" />
            Edit Profile
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
