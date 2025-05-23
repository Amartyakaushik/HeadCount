"use client"

import { useEffect, useState } from "react"
import { Line } from "react-chartjs-2"
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from "chart.js"
import { generateBookmarkTrends } from "@/lib/mock-data"
import { Skeleton } from "@/components/ui/skeleton"

// Register ChartJS components
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, Filler)

export default function BookmarkTrends() {
  const [chartData, setChartData] = useState<any>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      const trendData = generateBookmarkTrends()

      setChartData({
        labels: trendData.map((item) => item.date),
        datasets: [
          {
            label: "Bookmarks",
            data: trendData.map((item) => item.count),
            borderColor: "rgba(37, 99, 235, 1)",
            backgroundColor: "rgba(37, 99, 235, 0.1)",
            fill: true,
            tension: 0.4,
          },
          {
            label: "Active Employees",
            data: trendData.map((item) => item.activeEmployees),
            borderColor: "rgba(16, 185, 129, 1)",
            backgroundColor: "rgba(16, 185, 129, 0.1)",
            fill: true,
            tension: 0.4,
          },
        ],
      })

      setIsLoading(false)
    }, 1000)
  }, [])

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "top" as const,
      },
      tooltip: {
        mode: "index" as const,
        intersect: false,
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          precision: 0,
        },
      },
    },
    interaction: {
      mode: "nearest" as const,
      axis: "x" as const,
      intersect: false,
    },
  }

  if (isLoading) {
    return <Skeleton className="h-full w-full" />
  }

  return chartData ? (
    <Line data={chartData} options={options} />
  ) : (
    <div className="flex items-center justify-center h-full">No data available</div>
  )
}
