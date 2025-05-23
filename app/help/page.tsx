"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Badge } from "@/components/ui/badge"
import { useToast } from "@/components/ui/use-toast"
import {
  HelpCircle,
  MessageSquare,
  Book,
  Video,
  Mail,
  Phone,
  Search,
  ExternalLink,
  FileText,
  Users,
  BarChart3,
} from "lucide-react"

export default function HelpPage() {
  const { toast } = useToast()
  const [searchQuery, setSearchQuery] = useState("")
  const [contactForm, setContactForm] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  })

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    toast({
      title: "Message sent",
      description: "We'll get back to you within 24 hours.",
    })
    setContactForm({ name: "", email: "", subject: "", message: "" })
  }

  const faqs = [
    {
      question: "How do I add a new employee to the system?",
      answer:
        "Click the 'Add Employee' button on the dashboard, fill in the required information including name, email, department, and performance rating, then click 'Create Employee'.",
    },
    {
      question: "How can I search for specific employees?",
      answer:
        "Use the search bar at the top of the dashboard. You can search by name, email, or department. You can also use the filter options to narrow down results by department or performance rating.",
    },
    {
      question: "What do the performance ratings mean?",
      answer:
        "Performance ratings are on a scale of 1-5 stars: 1-2 stars indicate needs improvement, 3 stars is satisfactory, 4 stars is good performance, and 5 stars represents excellent performance.",
    },
    {
      question: "How do I bookmark employees?",
      answer:
        "Click the bookmark icon on any employee card. Bookmarked employees can be viewed and managed from the Bookmarks page accessible from the sidebar.",
    },
    {
      question: "Can I export employee data?",
      answer:
        "Yes, you can request a data export from the Settings > Data & Privacy section. The export will be sent to your email address.",
    },
    {
      question: "How do I change the theme?",
      answer:
        "Click the theme toggle button in the header (sun/moon icon) to switch between light, dark, and system themes. You can also change this in Settings > Appearance.",
    },
    {
      question: "What analytics are available?",
      answer:
        "The Analytics page provides department-wise performance charts, performance distribution, bookmark trends, and a list of top performers.",
    },
    {
      question: "How do I manage notifications?",
      answer:
        "Go to Settings > Notifications to configure email notifications, push notifications, weekly reports, and performance alerts according to your preferences.",
    },
  ]

  const filteredFaqs = faqs.filter(
    (faq) =>
      faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  const quickLinks = [
    { title: "Getting Started Guide", icon: Book, description: "Learn the basics of using the HR Dashboard" },
    { title: "Video Tutorials", icon: Video, description: "Watch step-by-step video guides" },
    { title: "User Manual", icon: FileText, description: "Complete documentation and features" },
    { title: "Best Practices", icon: Users, description: "Tips for effective HR management" },
  ]

  const features = [
    {
      title: "Employee Management",
      icon: Users,
      description: "Add, edit, and manage employee profiles with detailed information and performance tracking.",
    },
    {
      title: "Performance Analytics",
      icon: BarChart3,
      description: "View comprehensive analytics including department performance, trends, and insights.",
    },
    {
      title: "Bookmark System",
      icon: HelpCircle,
      description: "Save important employees for quick access and perform bulk actions.",
    },
    {
      title: "Advanced Search",
      icon: Search,
      description: "Find employees quickly using powerful search and filtering capabilities.",
    },
  ]

  return (
    <div className="container mx-auto px-4 py-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight">Help & Support</h1>
        <p className="text-muted-foreground mt-1">Get help with using the HR Performance Dashboard</p>
      </div>

      <Tabs defaultValue="faq" className="space-y-4">
        <TabsList>
          <TabsTrigger value="faq">FAQ</TabsTrigger>
          <TabsTrigger value="guides">Guides</TabsTrigger>
          <TabsTrigger value="features">Features</TabsTrigger>
          <TabsTrigger value="contact">Contact</TabsTrigger>
        </TabsList>

        <TabsContent value="faq" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <HelpCircle className="mr-2 h-5 w-5" />
                Frequently Asked Questions
              </CardTitle>
              <CardDescription>Find answers to common questions about the HR Dashboard</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="mb-6">
                <div className="relative">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search FAQs..."
                    className="pl-8"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
              </div>

              <Accordion type="single" collapsible className="w-full">
                {filteredFaqs.map((faq, index) => (
                  <AccordionItem key={index} value={`item-${index}`}>
                    <AccordionTrigger className="text-left">{faq.question}</AccordionTrigger>
                    <AccordionContent>{faq.answer}</AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>

              {filteredFaqs.length === 0 && (
                <div className="text-center py-8">
                  <p className="text-muted-foreground">No FAQs found matching your search.</p>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="guides" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {quickLinks.map((link, index) => (
              <Card key={index} className="cursor-pointer hover:bg-accent/50 transition-colors">
                <CardHeader>
                  <CardTitle className="flex items-center text-lg">
                    <link.icon className="mr-2 h-5 w-5" />
                    {link.title}
                    <ExternalLink className="ml-auto h-4 w-4" />
                  </CardTitle>
                  <CardDescription>{link.description}</CardDescription>
                </CardHeader>
              </Card>
            ))}
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Quick Start Guide</CardTitle>
              <CardDescription>Get up and running with the HR Dashboard in minutes</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <div className="flex items-start space-x-3">
                  <Badge className="mt-0.5">1</Badge>
                  <div>
                    <h4 className="font-medium">Explore the Dashboard</h4>
                    <p className="text-sm text-muted-foreground">
                      Familiarize yourself with the main dashboard showing all employees and key metrics.
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <Badge className="mt-0.5">2</Badge>
                  <div>
                    <h4 className="font-medium">Add Your First Employee</h4>
                    <p className="text-sm text-muted-foreground">
                      Click "Add Employee" and fill in the required information to create your first employee profile.
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <Badge className="mt-0.5">3</Badge>
                  <div>
                    <h4 className="font-medium">Use Search and Filters</h4>
                    <p className="text-sm text-muted-foreground">
                      Try searching for employees and using the filter options to find specific team members.
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <Badge className="mt-0.5">4</Badge>
                  <div>
                    <h4 className="font-medium">Bookmark Important Employees</h4>
                    <p className="text-sm text-muted-foreground">
                      Use the bookmark feature to save frequently accessed employee profiles.
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <Badge className="mt-0.5">5</Badge>
                  <div>
                    <h4 className="font-medium">View Analytics</h4>
                    <p className="text-sm text-muted-foreground">
                      Check the Analytics page for insights into team performance and trends.
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="features" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {features.map((feature, index) => (
              <Card key={index}>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <feature.icon className="mr-2 h-5 w-5" />
                    {feature.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Keyboard Shortcuts</CardTitle>
              <CardDescription>Speed up your workflow with these keyboard shortcuts</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm">Search employees</span>
                    <Badge variant="outline">Ctrl + K</Badge>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">Add new employee</span>
                    <Badge variant="outline">Ctrl + N</Badge>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">Toggle theme</span>
                    <Badge variant="outline">Ctrl + T</Badge>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm">Go to dashboard</span>
                    <Badge variant="outline">Ctrl + H</Badge>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">Go to analytics</span>
                    <Badge variant="outline">Ctrl + A</Badge>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">Open settings</span>
                    <Badge variant="outline">Ctrl + ,</Badge>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="contact" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <MessageSquare className="mr-2 h-5 w-5" />
                  Contact Support
                </CardTitle>
                <CardDescription>Send us a message and we'll get back to you</CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleContactSubmit} className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Name</Label>
                      <Input
                        id="name"
                        value={contactForm.name}
                        onChange={(e) => setContactForm((prev) => ({ ...prev, name: e.target.value }))}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input
                        id="email"
                        type="email"
                        value={contactForm.email}
                        onChange={(e) => setContactForm((prev) => ({ ...prev, email: e.target.value }))}
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="subject">Subject</Label>
                    <Input
                      id="subject"
                      value={contactForm.subject}
                      onChange={(e) => setContactForm((prev) => ({ ...prev, subject: e.target.value }))}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="message">Message</Label>
                    <Textarea
                      id="message"
                      rows={4}
                      value={contactForm.message}
                      onChange={(e) => setContactForm((prev) => ({ ...prev, message: e.target.value }))}
                      required
                    />
                  </div>

                  <Button type="submit" className="w-full">
                    Send Message
                  </Button>
                </form>
              </CardContent>
            </Card>

            <div className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Mail className="mr-2 h-5 w-5" />
                    Email Support
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-2">For general inquiries and support</p>
                  <p className="font-medium">support@hrdasboard.com</p>
                  <p className="text-sm text-muted-foreground mt-2">Response time: 24 hours</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Phone className="mr-2 h-5 w-5" />
                    Phone Support
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-2">For urgent technical issues</p>
                  <p className="font-medium">+1 (555) 123-4567</p>
                  <p className="text-sm text-muted-foreground mt-2">Mon-Fri, 9 AM - 6 PM EST</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>System Status</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span className="text-sm">All systems operational</span>
                  </div>
                  <p className="text-sm text-muted-foreground mt-2">Last updated: Just now</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
