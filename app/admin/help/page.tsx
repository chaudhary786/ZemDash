"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { HelpCircle, Mail, Phone, MessageCircle, Search, ChevronDown, ChevronRight, ExternalLink } from "lucide-react"
import { useState } from "react"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"

export default function HelpPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [openFaq, setOpenFaq] = useState<string | null>(null)

  const faqs = [
    {
      id: "faq1",
      question: "How do I create a new transfer?",
      answer:
        "To create a new transfer, navigate to the Transfers page and click the 'New Transfer' button. Fill in the required details including recipient information, amount (in €), and transfer type. The system supports both internal and external transfers with real-time processing.",
    },
    {
      id: "faq2",
      question: "What are the supported currencies?",
      answer:
        "ZemDash primarily operates with Euro (€) as the default currency. All monetary values, transactions, and financial reports are displayed in Euro format. Currency conversion features may be available for international transfers.",
    },
    {
      id: "faq3",
      question: "How do I generate financial reports?",
      answer:
        "Financial reports can be generated from the Finance section. Click on 'Generate Report' to access various report types including monthly summaries, transaction histories, and budget analyses. Reports can be exported in PDF or Excel format.",
    },
    {
      id: "faq4",
      question: "What is the date format used in the system?",
      answer:
        "ZemDash uses the DD.MM.YYYY date format throughout the application. For example, December 15, 2024 is displayed as 15.12.2024. This format is consistently applied across all dates, timestamps, and reports.",
    },
    {
      id: "faq5",
      question: "How do I manage user permissions?",
      answer:
        "User permissions can be managed from the Settings page under 'User Management'. Admin users can assign roles, modify access levels, and configure security settings for different user types including admin and regular users.",
    },
    {
      id: "faq6",
      question: "What should I do if a transfer fails?",
      answer:
        "If a transfer fails, check the transaction details in the Transfers section. Common causes include insufficient funds, incorrect recipient information, or network issues. Failed transfers can be retried or cancelled from the transaction details page.",
    },
  ]

  const contactMethods = [
    {
      icon: Mail,
      title: "Email Support",
      description: "Get help via email",
      contact: "support@zemdash.com",
      availability: "24/7 Response",
    },
    {
      icon: Phone,
      title: "Phone Support",
      description: "Speak with our team",
      contact: "+1 (555) 123-4567",
      availability: "Mon-Fri 9AM-6PM",
    },
    {
      icon: MessageCircle,
      title: "Live Chat",
      description: "Instant messaging support",
      contact: "Available in-app",
      availability: "Mon-Fri 9AM-6PM",
    },
  ]

  const filteredFaqs = faqs.filter(
    (faq) =>
      faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="glass-card rounded-xl p-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Help & Support</h1>
            <p className="text-gray-600 dark:text-gray-300">Find answers to common questions and get assistance</p>
          </div>
          <Badge variant="secondary" className="w-fit">
            Support Center
          </Badge>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid gap-4 md:grid-cols-3">
        {contactMethods.map((method, index) => (
          <Card
            key={index}
            className="glass-card border-0 hover:bg-white/30 dark:hover:bg-gray-800/30 transition-colors cursor-pointer"
          >
            <CardHeader className="pb-3">
              <div className="flex items-center space-x-3">
                <div className="p-2 rounded-lg bg-blue-100 dark:bg-blue-900/20">
                  <method.icon className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                </div>
                <div>
                  <CardTitle className="text-lg text-gray-900 dark:text-white">{method.title}</CardTitle>
                  <CardDescription className="text-gray-600 dark:text-gray-300">{method.description}</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <p className="font-medium text-gray-900 dark:text-white mb-1">{method.contact}</p>
              <p className="text-sm text-gray-600 dark:text-gray-300">{method.availability}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* FAQ Search */}
      <Card className="glass-card border-0">
        <CardHeader>
          <CardTitle className="text-gray-900 dark:text-white">Frequently Asked Questions</CardTitle>
          <CardDescription className="text-gray-600 dark:text-gray-300">
            Search through our knowledge base
          </CardDescription>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Search FAQs..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 bg-white/50 dark:bg-gray-800/50"
            />
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {filteredFaqs.map((faq) => (
              <Collapsible
                key={faq.id}
                open={openFaq === faq.id}
                onOpenChange={(isOpen) => setOpenFaq(isOpen ? faq.id : null)}
              >
                <CollapsibleTrigger className="w-full">
                  <div className="flex items-center justify-between p-4 rounded-lg bg-white/30 dark:bg-gray-800/30 hover:bg-white/40 dark:hover:bg-gray-800/40 transition-colors">
                    <div className="flex items-center space-x-3">
                      <HelpCircle className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                      <span className="font-medium text-left text-gray-900 dark:text-white">{faq.question}</span>
                    </div>
                    {openFaq === faq.id ? (
                      <ChevronDown className="h-4 w-4 text-gray-600 dark:text-gray-300" />
                    ) : (
                      <ChevronRight className="h-4 w-4 text-gray-600 dark:text-gray-300" />
                    )}
                  </div>
                </CollapsibleTrigger>
                <CollapsibleContent>
                  <div className="p-4 ml-8 text-gray-700 dark:text-gray-300 bg-white/20 dark:bg-gray-800/20 rounded-lg mt-2">
                    {faq.answer}
                  </div>
                </CollapsibleContent>
              </Collapsible>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Contact Form */}
      <Card className="glass-card border-0">
        <CardHeader>
          <CardTitle className="text-gray-900 dark:text-white">Contact Support</CardTitle>
          <CardDescription className="text-gray-600 dark:text-gray-300">
            Can't find what you're looking for? Send us a message
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 block">Subject</label>
                <Input placeholder="Brief description of your issue" className="bg-white/50 dark:bg-gray-800/50" />
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 block">Email</label>
                <Input type="email" placeholder="your.email@example.com" className="bg-white/50 dark:bg-gray-800/50" />
              </div>
            </div>
            <div>
              <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 block">Message</label>
              <Textarea
                placeholder="Describe your issue in detail..."
                className="h-32 bg-white/50 dark:bg-gray-800/50"
              />
            </div>
          </div>
          <div className="flex justify-end mt-6">
            <Button className="bg-blue-600 hover:bg-blue-700">
              <Mail className="h-4 w-4 mr-2" />
              Send Message
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Additional Resources */}
      <Card className="glass-card border-0">
        <CardHeader>
          <CardTitle className="text-gray-900 dark:text-white">Additional Resources</CardTitle>
          <CardDescription className="text-gray-600 dark:text-gray-300">
            Helpful links and documentation
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-3 md:grid-cols-2">
            <Button variant="outline" className="justify-start h-auto p-4 bg-white/50 dark:bg-gray-800/50">
              <div className="flex items-center space-x-3">
                <ExternalLink className="h-5 w-5 text-blue-600" />
                <div className="text-left">
                  <p className="font-medium">User Guide</p>
                  <p className="text-sm text-gray-600 dark:text-gray-300">Complete documentation</p>
                </div>
              </div>
            </Button>
            <Button variant="outline" className="justify-start h-auto p-4 bg-white/50 dark:bg-gray-800/50">
              <div className="flex items-center space-x-3">
                <ExternalLink className="h-5 w-5 text-green-600" />
                <div className="text-left">
                  <p className="font-medium">API Documentation</p>
                  <p className="text-sm text-gray-600 dark:text-gray-300">Developer resources</p>
                </div>
              </div>
            </Button>
            <Button variant="outline" className="justify-start h-auto p-4 bg-white/50 dark:bg-gray-800/50">
              <div className="flex items-center space-x-3">
                <ExternalLink className="h-5 w-5 text-purple-600" />
                <div className="text-left">
                  <p className="font-medium">Video Tutorials</p>
                  <p className="text-sm text-gray-600 dark:text-gray-300">Step-by-step guides</p>
                </div>
              </div>
            </Button>
            <Button variant="outline" className="justify-start h-auto p-4 bg-white/50 dark:bg-gray-800/50">
              <div className="flex items-center space-x-3">
                <ExternalLink className="h-5 w-5 text-orange-600" />
                <div className="text-left">
                  <p className="font-medium">System Status</p>
                  <p className="text-sm text-gray-600 dark:text-gray-300">Service availability</p>
                </div>
              </div>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
