import { Suspense } from "react"
import { Skeleton } from "@/components/ui/skeleton"
import PerformanceByDepartment from "@/components/analytics/performance-by-department"
import BookmarkTrends from "@/components/analytics/bookmark-trends"
import PerformanceDistribution from "@/components/analytics/performance-distribution"
import TopPerformers from "@/components/analytics/top-performers"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export const metadata = {
  title: "Analytics | HR Dashboard",
  description: "HR Performance Analytics Dashboard",
}

export default function AnalyticsPage() {
  return (
    <div className="container mx-auto px-4 py-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight">Analytics Dashboard</h1>
        <p className="text-muted-foreground mt-1">Visualize employee performance metrics and trends</p>
      </div>

      <Tabs defaultValue="performance" className="space-y-4">
        <TabsList>
          <TabsTrigger value="performance">Performance</TabsTrigger>
          <TabsTrigger value="trends">Trends</TabsTrigger>
          <TabsTrigger value="employees">Employees</TabsTrigger>
        </TabsList>

        <TabsContent value="performance" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card className="col-span-1">
              <CardHeader>
                <CardTitle>Performance by Department</CardTitle>
                <CardDescription>Average performance rating across departments</CardDescription>
              </CardHeader>
              <CardContent className="h-80">
                <Suspense fallback={<Skeleton className="h-full w-full" />}>
                  <PerformanceByDepartment />
                </Suspense>
              </CardContent>
            </Card>

            <Card className="col-span-1">
              <CardHeader>
                <CardTitle>Performance Distribution</CardTitle>
                <CardDescription>Distribution of performance ratings across the organization</CardDescription>
              </CardHeader>
              <CardContent className="h-80">
                <Suspense fallback={<Skeleton className="h-full w-full" />}>
                  <PerformanceDistribution />
                </Suspense>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="trends" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Bookmark Trends</CardTitle>
              <CardDescription>Tracking of employee bookmarks over time</CardDescription>
            </CardHeader>
            <CardContent className="h-96">
              <Suspense fallback={<Skeleton className="h-full w-full" />}>
                <BookmarkTrends />
              </Suspense>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="employees" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Top Performers</CardTitle>
              <CardDescription>Employees with the highest performance ratings</CardDescription>
            </CardHeader>
            <CardContent>
              <Suspense fallback={<Skeleton className="h-80 w-full" />}>
                <TopPerformers />
              </Suspense>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
