"use client"

import { useEffect, useState, useMemo, useCallback } from "react"
import {useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import {
  LogOut,
  Search,
  FileText,
  MessageSquare,
  DollarSign,
  TrendingUp,
  RefreshCw,
  ExternalLink,
  ChevronLeft,
  ChevronRight,
  LayoutDashboard,
} from "lucide-react"

// Types
interface Submission {
  id: string
  timestamp: string
  name: string
  email: string
  industry: string
  projectType: string
  budget: string
  selectedServices: string[]
  totalPrice: number
  personalizedMessage: string
}

interface Contact {
  id: string
  timestamp: string
  name: string
  email: string
  message: string
}

const ITEMS_PER_PAGE = 8

export default function AdminDashboardPage() {
  const router = useRouter()
  const [submissions, setSubmissions] = useState<Submission[]>([])
  const [contacts, setContacts] = useState<Contact[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")
  const [searchSubmissions, setSearchSubmissions] = useState("")
  const [searchContacts, setSearchContacts] = useState("")
  const [selectedSubmission, setSelectedSubmission] =
    useState<Submission | null>(null)
  const [selectedContact, setSelectedContact] = useState<Contact | null>(null)
  const [submissionsPage, setSubmissionsPage] = useState(1)
  const [contactsPage, setContactsPage] = useState(1)
  const [loggingOut, setLoggingOut] = useState(false)

  const fetchData = useCallback(async () => {
    setLoading(true)
    setError("")
    try {
      const [subsRes, contactsRes] = await Promise.all([
        fetch("/api/project-builder"),
        fetch("/api/contact"),
      ])

      

      const [subsData, contactsData] = await Promise.all([
        subsRes.json(),
        contactsRes.json(),
      ])

      setSubmissions(
        Array.isArray(subsData)
          ? subsData.sort(
              (a: Submission, b: Submission) =>
                new Date(b.timestamp).getTime() -
                new Date(a.timestamp).getTime()
            )
          : []
      )
      setContacts(
        Array.isArray(contactsData)
          ? contactsData.sort(
              (a: Contact, b: Contact) =>
                new Date(b.timestamp).getTime() -
                new Date(a.timestamp).getTime()
            )
          : []
      )
    } catch {
      setError("Failed to load data. Please try again.")
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchData()
  }, [fetchData])

  async function handleLogout() {
    setLoggingOut(true)
    try {
      await fetch("/api/admin/logout", { method: "POST" })
      router.push("/admin/login")
      router.refresh()
    } catch {
      setLoggingOut(false)
    }
  }

  // Filtered data
  const filteredSubmissions = useMemo(() => {
    if (!searchSubmissions.trim()) return submissions
    const q = searchSubmissions.toLowerCase()
    return submissions.filter(
      (s) =>
        s.name.toLowerCase().includes(q) ||
        s.email.toLowerCase().includes(q) ||
        s.industry.toLowerCase().includes(q) ||
        s.projectType.toLowerCase().includes(q) ||
        s.budget.toLowerCase().includes(q)
    )
  }, [submissions, searchSubmissions])

  const filteredContacts = useMemo(() => {
    if (!searchContacts.trim()) return contacts
    const q = searchContacts.toLowerCase()
    return contacts.filter(
      (c) =>
        c.name.toLowerCase().includes(q) ||
        c.email.toLowerCase().includes(q) ||
        c.message.toLowerCase().includes(q)
    )
  }, [contacts, searchContacts])

  // Pagination
  const paginatedSubmissions = useMemo(() => {
    const start = (submissionsPage - 1) * ITEMS_PER_PAGE
    return filteredSubmissions.slice(start, start + ITEMS_PER_PAGE)
  }, [filteredSubmissions, submissionsPage])

  const paginatedContacts = useMemo(() => {
    const start = (contactsPage - 1) * ITEMS_PER_PAGE
    return filteredContacts.slice(start, start + ITEMS_PER_PAGE)
  }, [filteredContacts, contactsPage])

  const totalSubmissionsPages = Math.max(
    1,
    Math.ceil(filteredSubmissions.length / ITEMS_PER_PAGE)
  )
  const totalContactsPages = Math.max(
    1,
    Math.ceil(filteredContacts.length / ITEMS_PER_PAGE)
  )

  // Stats
  const totalRevenue = submissions.reduce((sum, s) => sum + s.totalPrice, 0)
  const avgProjectValue =
    submissions.length > 0 ? totalRevenue / submissions.length : 0

  function formatDate(dateStr: string) {
    return new Date(dateStr).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    })
  }

  function formatCurrency(amount: number) {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
    }).format(amount)
  }

  // Reset page when search changes
  useEffect(() => {
    setSubmissionsPage(1)
  }, [searchSubmissions])

  useEffect(() => {
    setContactsPage(1)
  }, [searchContacts])

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 border-b border-border/50 bg-card/80 backdrop-blur-md">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 lg:px-8">
          <div className="flex items-center gap-3">
            <div className="flex size-9 items-center justify-center rounded-lg bg-primary/10 ring-1 ring-primary/20">
              <LayoutDashboard className="size-5 text-primary" />
            </div>
            <div>
              <h1 className="font-heading text-lg font-bold tracking-tight text-foreground">
                Nexora Admin
              </h1>
              <p className="text-xs text-muted-foreground">Dashboard</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Button
              variant="outline"
              size="sm"
              onClick={fetchData}
              disabled={loading}
              className="gap-2"
            >
              <RefreshCw
                className={`size-4 ${loading ? "animate-spin" : ""}`}
              />
              <span className="hidden sm:inline">Refresh</span>
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={handleLogout}
              disabled={loggingOut}
              className="gap-2 text-muted-foreground hover:text-foreground"
            >
              <LogOut className="size-4" />
              <span className="hidden sm:inline">
                {loggingOut ? "Signing out..." : "Sign out"}
              </span>
            </Button>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-4 py-8 lg:px-8">
        {error && (
          <div className="mb-6 rounded-lg border border-destructive/30 bg-destructive/10 px-4 py-3 text-sm text-destructive">
            {error}
          </div>
        )}

        {/* Stats Cards */}
        <div className="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <StatsCard
            title="Total Projects"
            value={submissions.length.toString()}
            description="Build My Project submissions"
            icon={<FileText className="size-5 text-primary" />}
            loading={loading}
          />
          <StatsCard
            title="Contact Messages"
            value={contacts.length.toString()}
            description="Contact form submissions"
            icon={<MessageSquare className="size-5 text-primary" />}
            loading={loading}
          />
          <StatsCard
            title="Total Revenue"
            value={formatCurrency(totalRevenue)}
            description="Estimated project value"
            icon={<DollarSign className="size-5 text-primary" />}
            loading={loading}
          />
          <StatsCard
            title="Avg. Project Value"
            value={formatCurrency(avgProjectValue)}
            description="Per submission"
            icon={<TrendingUp className="size-5 text-primary" />}
            loading={loading}
          />
        </div>

        {/* Tabs */}
        <Tabs defaultValue="submissions" className="gap-6">
          <TabsList className="h-11 w-full sm:w-auto">
            <TabsTrigger value="submissions" className="gap-2 px-4">
              <FileText className="size-4" />
              Projects
              {submissions.length > 0 && (
                <Badge variant="secondary" className="ml-1 text-xs">
                  {submissions.length}
                </Badge>
              )}
            </TabsTrigger>
            <TabsTrigger value="contacts" className="gap-2 px-4">
              <MessageSquare className="size-4" />
              Contacts
              {contacts.length > 0 && (
                <Badge variant="secondary" className="ml-1 text-xs">
                  {contacts.length}
                </Badge>
              )}
            </TabsTrigger>
          </TabsList>

          {/* Submissions Tab */}
          <TabsContent value="submissions">
            <Card>
              <CardHeader>
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <CardTitle>Project Submissions</CardTitle>
                    <CardDescription>
                      All Build My Project form submissions
                    </CardDescription>
                  </div>
                  <div className="relative w-full sm:w-72">
                    <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
                    <Input
                      placeholder="Search by name, email, industry..."
                      value={searchSubmissions}
                      onChange={(e) => setSearchSubmissions(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                {loading ? (
                  <TableSkeleton columns={6} />
                ) : filteredSubmissions.length === 0 ? (
                  <EmptyState
                    icon={<FileText className="size-10 text-muted-foreground/50" />}
                    title="No project submissions yet"
                    description={
                      searchSubmissions
                        ? "No results match your search. Try a different query."
                        : 'Submissions from "Build My Project" will appear here.'
                    }
                  />
                ) : (
                  <>
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Name</TableHead>
                          <TableHead>Email</TableHead>
                          <TableHead className="hidden md:table-cell">
                            Industry
                          </TableHead>
                          <TableHead className="hidden lg:table-cell">
                            Project Type
                          </TableHead>
                          <TableHead>Total</TableHead>
                          <TableHead className="hidden sm:table-cell">
                            Date
                          </TableHead>
                          <TableHead className="text-right">Action</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {paginatedSubmissions.map((sub) => (
                          <TableRow key={sub.id}>
                            <TableCell className="font-medium">
                              {sub.name}
                            </TableCell>
                            <TableCell className="max-w-[180px] truncate text-muted-foreground">
                              {sub.email}
                            </TableCell>
                            <TableCell className="hidden md:table-cell">
                              <Badge variant="outline">{sub.industry}</Badge>
                            </TableCell>
                            <TableCell className="hidden lg:table-cell">
                              <Badge variant="secondary">
                                {sub.projectType}
                              </Badge>
                            </TableCell>
                            <TableCell className="font-semibold text-primary">
                              {formatCurrency(sub.totalPrice)}
                            </TableCell>
                            <TableCell className="hidden text-muted-foreground sm:table-cell">
                              {formatDate(sub.timestamp)}
                            </TableCell>
                            <TableCell className="text-right">
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => setSelectedSubmission(sub)}
                                className="gap-1 text-xs"
                              >
                                <ExternalLink className="size-3.5" />
                                View
                              </Button>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>

                    {/* Pagination */}
                    {totalSubmissionsPages > 1 && (
                      <div className="mt-4 flex items-center justify-between border-t border-border/50 pt-4">
                        <p className="text-sm text-muted-foreground">
                          Showing{" "}
                          {(submissionsPage - 1) * ITEMS_PER_PAGE + 1} to{" "}
                          {Math.min(
                            submissionsPage * ITEMS_PER_PAGE,
                            filteredSubmissions.length
                          )}{" "}
                          of {filteredSubmissions.length} results
                        </p>
                        <div className="flex items-center gap-2">
                          <Button
                            variant="outline"
                            size="sm"
                            disabled={submissionsPage === 1}
                            onClick={() =>
                              setSubmissionsPage((p) => Math.max(1, p - 1))
                            }
                          >
                            <ChevronLeft className="size-4" />
                          </Button>
                          <span className="px-2 text-sm text-muted-foreground">
                            {submissionsPage} / {totalSubmissionsPages}
                          </span>
                          <Button
                            variant="outline"
                            size="sm"
                            disabled={
                              submissionsPage === totalSubmissionsPages
                            }
                            onClick={() =>
                              setSubmissionsPage((p) =>
                                Math.min(totalSubmissionsPages, p + 1)
                              )
                            }
                          >
                            <ChevronRight className="size-4" />
                          </Button>
                        </div>
                      </div>
                    )}
                  </>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Contacts Tab */}
          <TabsContent value="contacts">
            <Card>
              <CardHeader>
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <CardTitle>Contact Messages</CardTitle>
                    <CardDescription>
                      All contact form submissions
                    </CardDescription>
                  </div>
                  <div className="relative w-full sm:w-72">
                    <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
                    <Input
                      placeholder="Search by name, email, message..."
                      value={searchContacts}
                      onChange={(e) => setSearchContacts(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                {loading ? (
                  <TableSkeleton columns={4} />
                ) : filteredContacts.length === 0 ? (
                  <EmptyState
                    icon={<MessageSquare className="size-10 text-muted-foreground/50" />}
                    title="No contact messages yet"
                    description={
                      searchContacts
                        ? "No results match your search. Try a different query."
                        : "Messages from the contact form will appear here."
                    }
                  />
                ) : (
                  <>
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Name</TableHead>
                          <TableHead>Email</TableHead>
                          <TableHead className="hidden md:table-cell">
                            Message
                          </TableHead>
                          <TableHead className="hidden sm:table-cell">
                            Date
                          </TableHead>
                          <TableHead className="text-right">Action</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {paginatedContacts.map((contact) => (
                          <TableRow key={contact.id}>
                            <TableCell className="font-medium">
                              {contact.name}
                            </TableCell>
                            <TableCell className="max-w-[180px] truncate text-muted-foreground">
                              {contact.email}
                            </TableCell>
                            <TableCell className="hidden max-w-[300px] truncate text-muted-foreground md:table-cell">
                              {contact.message}
                            </TableCell>
                            <TableCell className="hidden text-muted-foreground sm:table-cell">
                              {formatDate(contact.timestamp)}
                            </TableCell>
                            <TableCell className="text-right">
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => setSelectedContact(contact)}
                                className="gap-1 text-xs"
                              >
                                <ExternalLink className="size-3.5" />
                                View
                              </Button>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>

                    {/* Pagination */}
                    {totalContactsPages > 1 && (
                      <div className="mt-4 flex items-center justify-between border-t border-border/50 pt-4">
                        <p className="text-sm text-muted-foreground">
                          Showing{" "}
                          {(contactsPage - 1) * ITEMS_PER_PAGE + 1} to{" "}
                          {Math.min(
                            contactsPage * ITEMS_PER_PAGE,
                            filteredContacts.length
                          )}{" "}
                          of {filteredContacts.length} results
                        </p>
                        <div className="flex items-center gap-2">
                          <Button
                            variant="outline"
                            size="sm"
                            disabled={contactsPage === 1}
                            onClick={() =>
                              setContactsPage((p) => Math.max(1, p - 1))
                            }
                          >
                            <ChevronLeft className="size-4" />
                          </Button>
                          <span className="px-2 text-sm text-muted-foreground">
                            {contactsPage} / {totalContactsPages}
                          </span>
                          <Button
                            variant="outline"
                            size="sm"
                            disabled={contactsPage === totalContactsPages}
                            onClick={() =>
                              setContactsPage((p) =>
                                Math.min(totalContactsPages, p + 1)
                              )
                            }
                          >
                            <ChevronRight className="size-4" />
                          </Button>
                        </div>
                      </div>
                    )}
                  </>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>

      {/* Submission Detail Dialog */}
      <Dialog
        open={!!selectedSubmission}
        onOpenChange={(open) => !open && setSelectedSubmission(null)}
      >
        <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-xl">
          {selectedSubmission && (
            <>
              <DialogHeader>
                <DialogTitle className="font-heading">
                  Project Submission
                </DialogTitle>
                <DialogDescription>
                  Submitted on {formatDate(selectedSubmission.timestamp)}
                </DialogDescription>
              </DialogHeader>

              <div className="flex flex-col gap-5 py-2">
                <div className="grid grid-cols-2 gap-4">
                  <DetailField label="Name" value={selectedSubmission.name} />
                  <DetailField label="Email" value={selectedSubmission.email} />
                  <DetailField
                    label="Industry"
                    value={selectedSubmission.industry}
                  />
                  <DetailField
                    label="Project Type"
                    value={selectedSubmission.projectType}
                  />
                  <DetailField
                    label="Budget Range"
                    value={selectedSubmission.budget}
                  />
                  <DetailField
                    label="Total Price"
                    value={formatCurrency(selectedSubmission.totalPrice)}
                    highlight
                  />
                </div>

                {selectedSubmission.selectedServices.length > 0 && (
                  <div>
                    <p className="mb-2 text-xs font-medium uppercase tracking-wider text-muted-foreground">
                      Selected Services
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {selectedSubmission.selectedServices.map((service) => (
                        <Badge key={service} variant="outline">
                          {service}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}

                {selectedSubmission.personalizedMessage && (
                  <div>
                    <p className="mb-2 text-xs font-medium uppercase tracking-wider text-muted-foreground">
                      Personalized Message
                    </p>
                    <p className="rounded-lg border border-border/50 bg-secondary/50 p-4 text-sm leading-relaxed text-foreground">
                      {selectedSubmission.personalizedMessage}
                    </p>
                  </div>
                )}
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>

      {/* Contact Detail Dialog */}
      <Dialog
        open={!!selectedContact}
        onOpenChange={(open) => !open && setSelectedContact(null)}
      >
        <DialogContent className="sm:max-w-lg">
          {selectedContact && (
            <>
              <DialogHeader>
                <DialogTitle className="font-heading">
                  Contact Message
                </DialogTitle>
                <DialogDescription>
                  Received on {formatDate(selectedContact.timestamp)}
                </DialogDescription>
              </DialogHeader>

              <div className="flex flex-col gap-5 py-2">
                <div className="grid grid-cols-2 gap-4">
                  <DetailField label="Name" value={selectedContact.name} />
                  <DetailField label="Email" value={selectedContact.email} />
                </div>

                <div>
                  <p className="mb-2 text-xs font-medium uppercase tracking-wider text-muted-foreground">
                    Message
                  </p>
                  <p className="rounded-lg border border-border/50 bg-secondary/50 p-4 text-sm leading-relaxed text-foreground">
                    {selectedContact.message}
                  </p>
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}

// --- Sub-components ---

function StatsCard({
  title,
  value,
  description,
  icon,
  loading,
}: {
  title: string
  value: string
  description: string
  icon: React.ReactNode
  loading: boolean
}) {
  return (
    <Card>
      <CardContent className="flex items-center gap-4 pt-0">
        <div className="flex size-11 shrink-0 items-center justify-center rounded-lg bg-primary/10 ring-1 ring-primary/20">
          {icon}
        </div>
        <div className="min-w-0">
          <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
            {title}
          </p>
          {loading ? (
            <div className="mt-1 h-7 w-20 animate-pulse rounded bg-secondary" />
          ) : (
            <p className="truncate font-heading text-2xl font-bold tracking-tight text-foreground">
              {value}
            </p>
          )}
          <p className="text-xs text-muted-foreground">{description}</p>
        </div>
      </CardContent>
    </Card>
  )
}

function DetailField({
  label,
  value,
  highlight = false,
}: {
  label: string
  value: string
  highlight?: boolean
}) {
  return (
    <div>
      <p className="mb-1 text-xs font-medium uppercase tracking-wider text-muted-foreground">
        {label}
      </p>
      <p
        className={`text-sm font-medium ${highlight ? "text-primary" : "text-foreground"}`}
      >
        {value}
      </p>
    </div>
  )
}

function TableSkeleton({ columns }: { columns: number }) {
  return (
    <div className="flex flex-col gap-3">
      {Array.from({ length: 5 }).map((_, i) => (
        <div key={i} className="flex gap-4">
          {Array.from({ length: columns }).map((_, j) => (
            <div
              key={j}
              className="h-8 flex-1 animate-pulse rounded bg-secondary"
            />
          ))}
        </div>
      ))}
    </div>
  )
}

function EmptyState({
  icon,
  title,
  description,
}: {
  icon: React.ReactNode
  title: string
  description: string
}) {
  return (
    <div className="flex flex-col items-center justify-center py-16 text-center">
      <div className="mb-4">{icon}</div>
      <h3 className="mb-1 font-heading text-lg font-semibold text-foreground">
        {title}
      </h3>
      <p className="max-w-sm text-sm text-muted-foreground">{description}</p>
    </div>
  )
}
