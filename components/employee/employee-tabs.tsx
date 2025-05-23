"use client"

import { useState, Suspense, lazy } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import type { Employee } from "@/types/employee"

// Lazy load tab contents for better performance
const OverviewTab = lazy(() => import("@/components/employee/tabs/overview-tab"))
const ProjectsTab = lazy(() => import("@/components/employee/tabs/projects-tab"))
const FeedbackTab = lazy(() => import("@/components/employee/tabs/feedback-tab"))

interface EmployeeTabsProps {
  employee: Employee
}

export default function EmployeeTabs({ employee }: EmployeeTabsProps) {
  const [activeTab, setActiveTab] = useState("overview")

  return (
    <Tabs defaultValue="overview" onValueChange={setActiveTab}>
      <TabsList className="grid w-full grid-cols-3">
        <TabsTrigger value="overview">Overview</TabsTrigger>
        <TabsTrigger value="projects">Projects</TabsTrigger>
        <TabsTrigger value="feedback">Feedback</TabsTrigger>
      </TabsList>

      <TabsContent value="overview">
        <Suspense fallback={<TabSkeleton />}>
          {activeTab === "overview" && <OverviewTab employee={employee} />}
        </Suspense>
      </TabsContent>

      <TabsContent value="projects">
        <Suspense fallback={<TabSkeleton />}>
          {activeTab === "projects" && <ProjectsTab employee={employee} />}
        </Suspense>
      </TabsContent>

      <TabsContent value="feedback">
        <Suspense fallback={<TabSkeleton />}>
          {activeTab === "feedback" && <FeedbackTab employee={employee} />}
        </Suspense>
      </TabsContent>
    </Tabs>
  )
}

function TabSkeleton() {
  return (
    <Card>
      <div className="p-6 space-y-4">
        <Skeleton className="h-8 w-1/3" />
        <Skeleton className="h-24 w-full" />
        <div className="grid grid-cols-2 gap-4">
          <Skeleton className="h-32 w-full" />
          <Skeleton className="h-32 w-full" />
        </div>
      </div>
    </Card>
  )
}
