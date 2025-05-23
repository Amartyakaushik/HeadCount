"use client"

import { useState } from "react"
import type { User } from "@/types/user"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Bookmark, Eye, TrendingUp, Star } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"

// Department options
const departments = ["Engineering", "Marketing", "Sales", "Finance", "HR", "Product", "Design", "Customer Support"]

export default function UserCard({ user }: { user: User }) {
  const [isBookmarked, setIsBookmarked] = useState(false)

  // Generate random department and rating once per component instance
  const department = departments[Math.floor(Math.random() * departments.length)]
  const rating = Math.floor(Math.random() * 5) + 1

  return (
    <Card className="overflow-hidden">
      <CardContent className="p-4">
        <div className="flex items-start justify-between">
          <div>
            <h3 className="font-medium text-lg">{`${user.firstName} ${user.lastName}`}</h3>
            <p className="text-sm text-muted-foreground">{user.email}</p>
            <div className="flex items-center gap-2 mt-2">
              <span className="text-sm">Age: {user.age}</span>
              <Badge variant="outline">{department}</Badge>
            </div>
          </div>
          <div className="h-10 w-10 rounded-full overflow-hidden bg-muted">
            <img
              src={user.image || "/placeholder.svg"}
              alt={`${user.firstName} ${user.lastName}`}
              className="h-full w-full object-cover"
            />
          </div>
        </div>

        <div className="mt-4">
          <div className="flex items-center gap-1">
            <span className="text-sm font-medium mr-2">Performance:</span>
            <div className="flex">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star
                  key={i}
                  className={cn("h-4 w-4", i < rating ? "fill-yellow-400 text-yellow-400" : "text-muted")}
                />
              ))}
            </div>
          </div>
        </div>
      </CardContent>

      <CardFooter className="flex justify-between p-4 pt-0 gap-2">
        <Button variant="outline" size="sm">
          <Eye className="h-4 w-4 mr-1" />
          View
        </Button>
        <Button
          variant={isBookmarked ? "secondary" : "outline"}
          size="sm"
          onClick={() => setIsBookmarked(!isBookmarked)}
        >
          <Bookmark className={cn("h-4 w-4 mr-1", isBookmarked && "fill-current")} />
          {isBookmarked ? "Saved" : "Save"}
        </Button>
        <Button variant="default" size="sm">
          <TrendingUp className="h-4 w-4 mr-1" />
          Promote
        </Button>
      </CardFooter>
    </Card>
  )
}
