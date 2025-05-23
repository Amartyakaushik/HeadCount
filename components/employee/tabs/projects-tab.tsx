import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Button } from "@/components/ui/button"
import { generateProjects } from "@/lib/mock-data"
import type { Employee } from "@/types/employee"

interface ProjectsTabProps {
  employee: Employee
}

export default function ProjectsTab({ employee }: ProjectsTabProps) {
  const projects = generateProjects(employee.id)

  const activeProjects = projects.filter((project) => project.status === "In Progress")
  const completedProjects = projects.filter((project) => project.status === "Completed")

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Project Summary</CardTitle>
          <CardDescription>Overview of employee's project involvement</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-1">
              <p className="text-sm font-medium">Total Projects</p>
              <p className="text-2xl font-bold">{projects.length}</p>
            </div>

            <div className="space-y-1">
              <p className="text-sm font-medium">Active Projects</p>
              <p className="text-2xl font-bold">{activeProjects.length}</p>
            </div>

            <div className="space-y-1">
              <p className="text-sm font-medium">Completed Projects</p>
              <p className="text-2xl font-bold">{completedProjects.length}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="space-y-4">
        <h3 className="text-lg font-medium">Active Projects</h3>

        {activeProjects.length === 0 ? (
          <Card>
            <CardContent className="p-6 text-center text-muted-foreground">
              No active projects at the moment.
            </CardContent>
          </Card>
        ) : (
          activeProjects.map((project) => (
            <Card key={project.id}>
              <CardHeader className="pb-2">
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle>{project.name}</CardTitle>
                    <CardDescription>{project.description}</CardDescription>
                  </div>
                  <Badge>{project.status}</Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-sm">Progress</span>
                      <span className="text-sm font-medium">{project.progress}%</span>
                    </div>
                    <Progress value={project.progress} className="h-2" />
                  </div>

                  <div className="flex flex-wrap gap-2">
                    <div className="flex items-center text-sm">
                      <span className="text-muted-foreground mr-2">Role:</span>
                      <span>{project.role}</span>
                    </div>
                    <div className="flex items-center text-sm">
                      <span className="text-muted-foreground mr-2">Deadline:</span>
                      <span>{project.deadline}</span>
                    </div>
                  </div>

                  <div>
                    <span className="text-sm font-medium">Team:</span>
                    <div className="flex flex-wrap gap-2 mt-1">
                      {project.team.map((member, i) => (
                        <Badge key={i} variant="outline">
                          {member}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex justify-end gap-2">
                <Button variant="outline" size="sm">
                  View Details
                </Button>
                <Button size="sm">Update Progress</Button>
              </CardFooter>
            </Card>
          ))
        )}
      </div>

      <div className="space-y-4">
        <h3 className="text-lg font-medium">Completed Projects</h3>

        {completedProjects.length === 0 ? (
          <Card>
            <CardContent className="p-6 text-center text-muted-foreground">No completed projects yet.</CardContent>
          </Card>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {completedProjects.map((project) => (
              <Card key={project.id}>
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-start">
                    <CardTitle className="text-base">{project.name}</CardTitle>
                    <Badge variant="outline">{project.status}</Badge>
                  </div>
                  <CardDescription>{project.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-sm">
                    <div className="flex items-center">
                      <span className="text-muted-foreground mr-2">Role:</span>
                      <span>{project.role}</span>
                    </div>
                    <div className="flex items-center">
                      <span className="text-muted-foreground mr-2">Completed:</span>
                      <span>{project.completedDate || "N/A"}</span>
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button variant="outline" size="sm" className="w-full">
                    View Details
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
