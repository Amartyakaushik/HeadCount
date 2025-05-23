"use client"

import { useEffect, useState } from "react"
import { Bar } from "react-chartjs-2"
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from "chart.js"
import { getEmployees } from "@/lib/api"
import { Skeleton } from "@/components/ui/skeleton"

// Register ChartJS components
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend)

export default function PerformanceByDepartment() {
  const [chartData, setChartData] = useState<any>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const employees = await getEmployees()

        // Group by department and calculate average performance
        const departmentPerformance = employees.reduce(
          (acc, employee) => {
            if (!acc[employee.department]) {
              acc[employee.department] = {
                total: 0,
                count: 0,
              }
            }

            acc[employee.department].total += employee.performanceRating
            acc[employee.department].count += 1

            return acc
          },
          {} as Record<string, { total: number; count: number }>,
        )

        // Calculate averages
        const departments = Object.keys(departmentPerformance)
        const averages = departments.map(
          (dept) => departmentPerformance[dept].total / departmentPerformance[dept].count,
        )

        setChartData({
          labels: departments,
          datasets: [
            {
              label: "Average Performance Rating",
              data: averages,
              backgroundColor: "rgba(37, 99, 235, 0.7)",
              borderColor: "rgba(37, 99, 235, 1)",
              borderWidth: 1,
            },
          ],
        })
      } catch (error) {
        console.error("Error fetching data:", error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchData()
  }, [])

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "top" as const,
      },
      tooltip: {
        callbacks: {
          label: (context: any) => `Rating: ${context.parsed.y.toFixed(2)}/5`,
        },
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        max: 5,
        ticks: {
          stepSize: 1,
        },
      },
    },
  }

  if (isLoading) {
    return <Skeleton className="h-full w-full" />
  }

  return chartData ? (
    <Bar data={chartData} options={options} />
  ) : (
    <div className="flex items-center justify-center h-full">No data available</div>
  )
}
