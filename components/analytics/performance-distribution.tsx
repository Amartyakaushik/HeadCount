"use client"

import { useEffect, useState } from "react"
import { Doughnut } from "react-chartjs-2"
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js"
import { getEmployees } from "@/lib/api"
import { Skeleton } from "@/components/ui/skeleton"

// Register ChartJS components
ChartJS.register(ArcElement, Tooltip, Legend)

export default function PerformanceDistribution() {
  const [chartData, setChartData] = useState<any>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const employees = await getEmployees()

        // Count employees by rating
        const ratingCounts = employees.reduce(
          (acc, employee) => {
            const rating = Math.floor(employee.performanceRating)
            acc[rating] = (acc[rating] || 0) + 1
            return acc
          },
          {} as Record<number, number>,
        )

        // Prepare data for chart
        const ratings = [1, 2, 3, 4, 5]
        const counts = ratings.map((rating) => ratingCounts[rating] || 0)

        setChartData({
          labels: ratings.map((r) => `${r} Star${r !== 1 ? "s" : ""}`),
          datasets: [
            {
              data: counts,
              backgroundColor: [
                "rgba(239, 68, 68, 0.7)", // 1 star - red
                "rgba(249, 115, 22, 0.7)", // 2 stars - orange
                "rgba(234, 179, 8, 0.7)", // 3 stars - yellow
                "rgba(16, 185, 129, 0.7)", // 4 stars - green
                "rgba(37, 99, 235, 0.7)", // 5 stars - blue
              ],
              borderColor: [
                "rgba(239, 68, 68, 1)",
                "rgba(249, 115, 22, 1)",
                "rgba(234, 179, 8, 1)",
                "rgba(16, 185, 129, 1)",
                "rgba(37, 99, 235, 1)",
              ],
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
        position: "right" as const,
      },
      tooltip: {
        callbacks: {
          label: (context: any) => {
            const label = context.label || ""
            const value = context.raw || 0
            const total = context.dataset.data.reduce((a: number, b: number) => a + b, 0)
            const percentage = Math.round((value / total) * 100)
            return `${label}: ${value} (${percentage}%)`
          },
        },
      },
    },
  }

  if (isLoading) {
    return <Skeleton className="h-full w-full" />
  }

  return chartData ? (
    <Doughnut data={chartData} options={options} />
  ) : (
    <div className="flex items-center justify-center h-full">No data available</div>
  )
}
