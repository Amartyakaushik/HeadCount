import { Suspense } from "react"
import { notFound } from "next/navigation"
import { Skeleton } from "@/components/ui/skeleton"
import EmployeeProfile from "@/components/employee/employee-profile"
import EmployeeTabs from "@/components/employee/employee-tabs"
import { getEmployee } from "@/lib/api"

export async function generateMetadata({ params }: { params: { id: string } }) {
  try {
    const employee = await getEmployee(params.id)
    return {
      title: `${employee.firstName} ${employee.lastName} | HR Dashboard`,
      description: `Profile page for ${employee.firstName} ${employee.lastName}`,
    }
  } catch (error) {
    return {
      title: "Employee Not Found | HR Dashboard",
      description: "The requested employee profile could not be found",
    }
  }
}

export default async function EmployeePage({ params }: { params: { id: string } }) {
  let employee

  try {
    employee = await getEmployee(params.id)
  } catch (error) {
    notFound()
  }

  return (
    <div className="container mx-auto px-4 py-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight">Employee Profile</h1>
        <p className="text-muted-foreground mt-1">View and manage employee details</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1">
          <Suspense fallback={<Skeleton className="h-[400px] w-full" />}>
            <EmployeeProfile employee={employee} />
          </Suspense>
        </div>

        <div className="lg:col-span-2">
          <Suspense fallback={<Skeleton className="h-[600px] w-full" />}>
            <EmployeeTabs employee={employee} />
          </Suspense>
        </div>
      </div>
    </div>
  )
}
