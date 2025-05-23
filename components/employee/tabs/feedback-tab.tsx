"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { generateFeedback } from "@/lib/mock-data"
import { getInitials } from "@/lib/utils"
import { useToast } from "@/components/ui/use-toast"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import type { Employee } from "@/types/employee"

interface FeedbackTabProps {
  employee: Employee
}

export default function FeedbackTab({ employee }: FeedbackTabProps) {
  const [feedbackText, setFeedbackText] = useState("")
  const [feedbackType, setFeedbackType] = useState("positive")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { toast } = useToast()

  const feedback = generateFeedback(employee.id)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (!feedbackText.trim()) {
      toast({
        title: "Error",
        description: "Please enter feedback text",
        variant: "destructive",
      })
      return
    }

    setIsSubmitting(true)

    // Simulate API call
    setTimeout(() => {
      toast({
        title: "Feedback submitted",
        description: "Your feedback has been submitted successfully",
      })
      setFeedbackText("")
      setIsSubmitting(false)
    }, 1000)
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Provide Feedback</CardTitle>
          <CardDescription>Share your thoughts about {employee.firstName}'s performance</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Select defaultValue={feedbackType} onValueChange={setFeedbackType}>
                <SelectTrigger>
                  <SelectValue placeholder="Select feedback type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="positive">Positive Feedback</SelectItem>
                  <SelectItem value="constructive">Constructive Feedback</SelectItem>
                  <SelectItem value="recognition">Recognition</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <Textarea
              placeholder={`Share your ${feedbackType} feedback about ${employee.firstName}...`}
              className="min-h-32"
              value={feedbackText}
              onChange={(e) => setFeedbackText(e.target.value)}
            />

            <div className="flex justify-end">
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? "Submitting..." : "Submit Feedback"}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>

      <div className="space-y-4">
        <h3 className="text-lg font-medium">Recent Feedback</h3>

        {feedback.length === 0 ? (
          <Card>
            <CardContent className="p-6 text-center text-muted-foreground">No feedback available yet.</CardContent>
          </Card>
        ) : (
          feedback.map((item) => (
            <Card key={item.id}>
              <CardHeader className="pb-2">
                <div className="flex justify-between items-start">
                  <div className="flex items-center space-x-4">
                    <Avatar>
                      <AvatarImage src={item.authorAvatar || "/placeholder.svg"} alt={item.author} />
                      <AvatarFallback>{getInitials(item.author)}</AvatarFallback>
                    </Avatar>
                    <div>
                      <CardTitle className="text-base">{item.author}</CardTitle>
                      <CardDescription>{item.date}</CardDescription>
                    </div>
                  </div>
                  <Badge
                    variant={
                      item.type === "positive" ? "success" : item.type === "constructive" ? "destructive" : "default"
                    }
                  >
                    {item.type === "positive"
                      ? "Positive"
                      : item.type === "constructive"
                        ? "Constructive"
                        : "Recognition"}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm">{item.content}</p>
              </CardContent>
              <CardFooter className="flex justify-end">
                <Button variant="ghost" size="sm">
                  Reply
                </Button>
              </CardFooter>
            </Card>
          ))
        )}
      </div>
    </div>
  )
}
