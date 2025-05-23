import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { generatePerformanceHistory } from "@/lib/mock-data"
import type { Employee } from "@/types/employee"

interface OverviewTabProps {
  employee: Employee
}

export default function OverviewTab({ employee }: OverviewTabProps) {
  const performanceHistory = generatePerformanceHistory(employee.id)

  // Calculate performance metrics
  const averageRating = performanceHistory.reduce((sum, item) => sum + item.rating, 0) / performanceHistory.length
  const highestRating = Math.max(...performanceHistory.map((item) => item.rating))
  const lowestRating = Math.min(...performanceHistory.map((item) => item.rating))

  // Generate strengths and areas for improvement
  const strengths = ["Communication", "Problem Solving", "Team Collaboration", "Technical Skills", "Leadership"]
    .sort(() => 0.5 - Math.random())
    .slice(0, 3)

  const improvements = ["Time Management", "Documentation", "Public Speaking", "Delegation", "Strategic Planning"]
    .sort(() => 0.5 - Math.random())
    .slice(0, 2)

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Employee Bio</CardTitle>
          <CardDescription>Professional summary and background</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-sm">
            {employee.firstName} {employee.lastName} is a dedicated professional with{" "}
            {Math.floor(Math.random() * 10) + 1} years of experience in the {employee.department} department.
            {employee.gender === "male" ? "He" : "She"} has consistently demonstrated strong skills in{" "}
            {strengths.join(", ")}.{employee.firstName} is known for{" "}
            {employee.performanceRating >= 4
              ? "exceptional performance and attention to detail"
              : employee.performanceRating >= 3
                ? "solid work ethic and reliability"
                : "showing potential and eagerness to learn"}
            .
          </p>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Performance History</CardTitle>
            <CardDescription>Rating history over time</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {performanceHistory.map((item, index) => (
                <div key={index} className="space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">{item.period}</span>
                    <span className="text-sm text-muted-foreground">{item.rating}/5</span>
                  </div>
                  <Progress value={item.rating * 20} className="h-2" />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Performance Summary</CardTitle>
            <CardDescription>Key metrics and insights</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm font-medium">Average Rating</span>
                  <span className="text-sm">{averageRating.toFixed(1)}/5</span>
                </div>
                <Progress value={averageRating * 20} className="h-2" />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm font-medium mb-2">Strengths</p>
                  <div className="flex flex-wrap gap-2">
                    {strengths.map((strength, i) => (
                      <Badge key={i} variant="outline">
                        {strength}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div>
                  <p className="text-sm font-medium mb-2">Areas for Improvement</p>
                  <div className="flex flex-wrap gap-2">
                    {improvements.map((improvement, i) => (
                      <Badge key={i} variant="outline" className="border-yellow-500">
                        {improvement}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>

              <div className="pt-2">
                <p className="text-sm font-medium mb-2">Performance Trend</p>
                <Badge
                  variant={
                    performanceHistory[0].rating > performanceHistory[performanceHistory.length - 1].rating
                      ? "success"
                      : performanceHistory[0].rating < performanceHistory[performanceHistory.length - 1].rating
                        ? "destructive"
                        : "default"
                  }
                >
                  {performanceHistory[0].rating > performanceHistory[performanceHistory.length - 1].rating
                    ? "Improving"
                    : performanceHistory[0].rating < performanceHistory[performanceHistory.length - 1].rating
                      ? "Declining"
                      : "Stable"}
                </Badge>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
