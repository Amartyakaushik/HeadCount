// Generate performance history for an employee
export function generatePerformanceHistory(employeeId: number) {
  // Use employeeId as seed for consistent random generation
  const seed = employeeId % 10

  // Generate 4 quarters of performance data
  return [
    {
      period: "Q1 2023",
      rating: Math.min(5, Math.max(1, 3 + (seed % 3) - 1)),
    },
    {
      period: "Q2 2023",
      rating: Math.min(5, Math.max(1, 3 + (seed % 3) - 0.5)),
    },
    {
      period: "Q3 2023",
      rating: Math.min(5, Math.max(1, 3 + (seed % 3))),
    },
    {
      period: "Q4 2023",
      rating: Math.min(5, Math.max(1, 3 + (seed % 3) + 0.5)),
    },
  ]
}

// Generate projects for an employee
export function generateProjects(employeeId: number) {
  // Use employeeId as seed for consistent random generation
  const seed = employeeId % 10
  const numProjects = 2 + (seed % 4) // 2-5 projects

  const projectNames = [
    "Website Redesign",
    "Mobile App Development",
    "Data Migration",
    "Cloud Infrastructure",
    "Marketing Campaign",
    "Product Launch",
    "Customer Portal",
    "Internal Dashboard",
    "API Integration",
    "Security Audit",
  ]

  const roles = ["Project Lead", "Developer", "Designer", "Analyst", "Consultant", "QA Tester"]

  const teamMembers = [
    "John Smith",
    "Emily Johnson",
    "Michael Brown",
    "Sarah Davis",
    "David Wilson",
    "Jessica Martinez",
    "Robert Taylor",
    "Jennifer Anderson",
    "William Thomas",
    "Lisa Jackson",
  ]

  const projects = []

  for (let i = 0; i < numProjects; i++) {
    const isCompleted = i >= numProjects - 2 // Make some projects completed

    const project = {
      id: `${employeeId}-${i}`,
      name: projectNames[(seed + i) % projectNames.length],
      description: `A project to ${projectNames[(seed + i) % projectNames.length].toLowerCase()} for the organization.`,
      status: isCompleted ? "Completed" : "In Progress",
      progress: isCompleted ? 100 : 25 + ((seed + i * 15) % 50),
      role: roles[(seed + i) % roles.length],
      deadline: `${isCompleted ? "Completed" : "Due"} ${["Jan", "Feb", "Mar", "Apr", "May", "Jun"][(seed + i) % 6]} ${isCompleted ? "2023" : "2024"}`,
      completedDate: isCompleted ? `${["Oct", "Nov", "Dec"][(seed + i) % 3]} 2023` : null,
      team: Array.from({ length: 2 + (i % 3) }, (_, j) => teamMembers[(seed + i + j) % teamMembers.length]),
    }

    projects.push(project)
  }

  return projects
}

// Generate feedback for an employee
export function generateFeedback(employeeId: number) {
  // Use employeeId as seed for consistent random generation
  const seed = employeeId % 10
  const numFeedback = 1 + (seed % 4) // 1-4 feedback items

  const authors = [
    "Jane Smith (Manager)",
    "Robert Johnson (Team Lead)",
    "Emily Davis (HR)",
    "Michael Wilson (Director)",
    "Sarah Brown (Colleague)",
  ]

  const positiveContent = [
    "Consistently delivers high-quality work ahead of deadlines. A valuable team member who goes above and beyond.",
    "Excellent communication skills and team collaboration. Always willing to help others and share knowledge.",
    "Demonstrates strong problem-solving abilities and technical expertise. Quickly adapts to new challenges.",
    "Shows great initiative and leadership potential. Proactively identifies and addresses issues before they escalate.",
    "Exceptional attention to detail and commitment to quality. Sets a high standard for the team.",
  ]

  const constructiveContent = [
    "Could improve time management skills to better prioritize tasks. Sometimes takes on too many responsibilities at once.",
    "Would benefit from more detailed documentation of work processes to help with knowledge transfer.",
    "Should work on providing more regular updates during project implementation to keep stakeholders informed.",
    "Could enhance presentation skills for more effective communication with senior management and clients.",
    "Needs to delegate more effectively to avoid bottlenecks in project workflows.",
  ]

  const recognitionContent = [
    "Recognized for outstanding contribution to the recent product launch. The project's success was largely due to their efforts.",
    "Awarded Employee of the Month for exceptional performance and dedication to team goals.",
    "Commended by the client for excellent service delivery and professional attitude.",
    "Received special recognition for innovative solution that saved the company significant resources.",
    "Acknowledged by leadership for mentoring new team members and fostering a collaborative environment.",
  ]

  const feedback = []

  for (let i = 0; i < numFeedback; i++) {
    const type = ["positive", "constructive", "recognition"][(seed + i) % 3]

    const content =
      type === "positive"
        ? positiveContent[(seed + i) % positiveContent.length]
        : type === "constructive"
          ? constructiveContent[(seed + i) % constructiveContent.length]
          : recognitionContent[(seed + i) % recognitionContent.length]

    const feedback_item = {
      id: `${employeeId}-${i}`,
      author: authors[(seed + i) % authors.length],
      authorAvatar: `/placeholder.svg?height=40&width=40`,
      date: `${["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"][(seed + i) % 12]} ${i + 1}, 2023`,
      type,
      content,
    }

    feedback.push(feedback_item)
  }

  return feedback
}

// Generate bookmark trends data
export function generateBookmarkTrends() {
  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]

  const currentYear = new Date().getFullYear()

  return months.map((month, index) => {
    // Generate some realistic looking data with an upward trend
    const baseCount = 5 + Math.floor(index / 2)
    const randomVariation = Math.floor(Math.random() * 3) - 1

    return {
      date: `${month} ${currentYear}`,
      count: baseCount + randomVariation,
      activeEmployees: 15 + index + Math.floor(Math.random() * 5) - 2,
    }
  })
}
