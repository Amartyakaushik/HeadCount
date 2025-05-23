import { getEmployees } from "@/lib/api"
import { getTopPerformers } from "@/lib/utils"
import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Star } from "lucide-react"
import { cn, getInitials } from "@/lib/utils"
import Link from "next/link"

export default async function TopPerformers() {
  const employees = await getEmployees()
  const topPerformers = getTopPerformers(employees, 10)

  return (
    <div className="space-y-4">
      {topPerformers.map((employee, index) => (
        <Link href={`/employee/${employee.id}`} key={employee.id}>
          <Card className="hover:bg-accent/50 transition-colors">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="flex items-center justify-center w-8 h-8 rounded-full bg-muted text-muted-foreground font-medium">
                    {index + 1}
                  </div>

                  <Avatar>
                    <AvatarImage
                      src={employee.image || "/placeholder.svg"}
                      alt={`${employee.firstName} ${employee.lastName}`}
                    />
                    <AvatarFallback>{getInitials(`${employee.firstName} ${employee.lastName}`)}</AvatarFallback>
                  </Avatar>

                  <div>
                    <p className="font-medium">
                      {employee.firstName} {employee.lastName}
                    </p>
                    <p className="text-sm text-muted-foreground">{employee.department}</p>
                  </div>
                </div>

                <div className="flex items-center space-x-4">
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

                  <Badge variant="outline">{employee.performanceRating.toFixed(1)}</Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        </Link>
      ))}
    </div>
  )
}
