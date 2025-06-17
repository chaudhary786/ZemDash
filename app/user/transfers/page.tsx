"use client"

import { useState } from "react"
import { format, compareAsc, compareDesc } from "date-fns"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Search, Plus, Pencil, Trash2, FileText, Printer } from "lucide-react"
import { useToast } from "@/components/ui/use-toast"
import { UserTransferModal, UserTransfer } from "@/components/transfers/user-transfer-modal"
import { UserTransferFilterControls, UserTransferFilterOptions } from "@/components/transfers/user-transfer-filter-controls"

export default function UserTransfersPage() {
  const { toast } = useToast()
  const [searchTerm, setSearchTerm] = useState("")
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingTransfer, setEditingTransfer] = useState<UserTransfer | null>(null)
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("desc")
  const [filters, setFilters] = useState<UserTransferFilterOptions>({
    year: "",
    month: "",
    day: "",
    name: "",
  })

  // Sample transfer data
  const [transfers, setTransfers] = useState<UserTransfer[]>([
    {
      id: "TRF101",
      date: new Date(2024, 11, 15), // December 15, 2024
      time: "09:30",
      day: "Monday",
      pickup: "HBF",
      dropoff: "Sony Center",
      type: "One Way",
      amount: 250,
      name: "Sarah Wilson",
    },
    {
      id: "TRF102",
      date: new Date(2024, 11, 14), // December 14, 2024
      time: "14:15",
      day: "Sunday",
      pickup: "Airport",
      dropoff: "Hotel Europa",
      type: "One Way",
      amount: 150,
      name: "Mike Johnson",
    },
    {
      id: "TRF103",
      date: new Date(2024, 11, 13), // December 13, 2024
      time: "10:45",
      day: "Saturday",
      pickup: "Hotel Europa",
      dropoff: "Old Town",
      type: "One Way",
      amount: 75.5,
      name: "Alice Brown",
    },
    {
      id: "TRF104",
      date: new Date(2024, 11, 12), // December 12, 2024
      time: "18:00",
      day: "Friday",
      pickup: "Mozart Square",
      dropoff: "Airport",
      type: "One Way",
      amount: 320,
      name: "David Lee",
    },
    {
      id: "TRF105",
      date: new Date(2024, 11, 11), // December 11, 2024
      time: "08:15",
      day: "Thursday",
      pickup: "Mirabell Palace",
      dropoff: "HBF",
      type: "Return",
      amount: 125.75,
      name: "Emma Wilson",
    },
  ])

  // Handle adding a new transfer
  const handleAddTransfer = (transfer: UserTransfer) => {
    const newTransfer = {
      ...transfer,
      id: `TRF${Math.floor(Math.random() * 1000)}`,
    }
    setTransfers([newTransfer, ...transfers])
    toast({
      title: "Transfer Added",
      description: "New transfer has been added successfully.",
    })
  }

  // Handle editing a transfer
  const handleEditTransfer = (updatedTransfer: UserTransfer) => {
    setTransfers(
      transfers.map((transfer) =>
        transfer.id === updatedTransfer.id ? updatedTransfer : transfer
      )
    )
    setEditingTransfer(null)
    toast({
      title: "Transfer Updated",
      description: "Transfer has been updated successfully.",
    })
  }

  // Handle deleting a transfer
  const handleDeleteTransfer = (id: string) => {
    setTransfers(transfers.filter((transfer) => transfer.id !== id))
    toast({
      title: "Transfer Deleted",
      description: "Transfer has been deleted successfully.",
      variant: "destructive",
    })
  }

  // Handle export to PDF
  const handleExportPDF = () => {
    toast({
      title: "Export to PDF",
      description: "Your transfers have been exported to PDF.",
    })
  }

  // Handle print
  const handlePrint = () => {
    toast({
      title: "Print Transfers",
      description: "Sending transfers to printer...",
    })
  }

  // Open modal for adding a new transfer
  const openAddModal = () => {
    setEditingTransfer(null)
    setIsModalOpen(true)
  }

  // Open modal for editing a transfer
  const openEditModal = (transfer: UserTransfer) => {
    setEditingTransfer(transfer)
    setIsModalOpen(true)
  }

  // Handle saving a transfer (add or edit)
  const handleSaveTransfer = (transfer: UserTransfer) => {
    if (editingTransfer) {
      handleEditTransfer(transfer)
    } else {
      handleAddTransfer(transfer)
    }
    setIsModalOpen(false)
  }

  // Toggle sort direction
  const toggleSortDirection = () => {
    setSortDirection(sortDirection === "asc" ? "desc" : "asc")
  }

  // Filter transfers based on search term and filters
  const filteredTransfers = transfers.filter((transfer) => {
    // Search term filter
    const matchesSearch =
      transfer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      transfer.pickup.toLowerCase().includes(searchTerm.toLowerCase()) ||
      transfer.dropoff.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (transfer.id && transfer.id.toLowerCase().includes(searchTerm.toLowerCase()))

    // Date filters
    const matchesYear = !filters.year || transfer.date.getFullYear().toString() === filters.year
    const matchesMonth = !filters.month || (transfer.date.getMonth() + 1).toString() === filters.month
    const matchesDay = !filters.day || transfer.date.getDate().toString() === filters.day
    
    // Name filter
    const matchesName = !filters.name || transfer.name.toLowerCase().includes(filters.name.toLowerCase())

    return matchesSearch && matchesYear && matchesMonth && matchesDay && matchesName
  })

  // Sort transfers by date
  const sortedTransfers = [...filteredTransfers].sort((a, b) => {
    if (sortDirection === "asc") {
      return compareAsc(a.date, b.date)
    } else {
      return compareDesc(a.date, b.date)
    }
  })

  // Calculate totals
  const totalTransfers = filteredTransfers.length
  const totalAmount = filteredTransfers.reduce((sum, transfer) => sum + transfer.amount, 0)

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="glass-card rounded-xl p-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">My Transfers</h1>
            <p className="text-gray-600 dark:text-gray-300">View and manage your transfer history</p>
          </div>
          <Button className="bg-blue-600 hover:bg-blue-700" onClick={openAddModal}>
            <Plus className="h-4 w-4 mr-2" />
            Add New Transfer
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card className="glass-card border-0">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600 dark:text-gray-300">Total Transfers</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-900 dark:text-white">{totalTransfers}</div>
            <p className="text-xs text-gray-600 dark:text-gray-300">{format(new Date(), "MMMM yyyy")}</p>
          </CardContent>
        </Card>

        <Card className="glass-card border-0">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600 dark:text-gray-300">Total Amount</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-900 dark:text-white">€{totalAmount.toFixed(2)}</div>
            <p className="text-xs text-gray-600 dark:text-gray-300">All transfers</p>
          </CardContent>
        </Card>

        <Card className="glass-card border-0">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600 dark:text-gray-300">User</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-900 dark:text-white">John Doe</div>
            <p className="text-xs text-gray-600 dark:text-gray-300">Current user</p>
          </CardContent>
        </Card>
      </div>

      {/* Transfer History */}
      <Card className="glass-card border-0">
        <CardHeader>
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <CardTitle className="text-gray-900 dark:text-white">Transfer History</CardTitle>
              <CardDescription className="text-gray-600 dark:text-gray-300">
                Your transfer records
              </CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          {/* Filter Controls */}
          <UserTransferFilterControls
            filters={filters}
            onFiltersChange={setFilters}
            onExportPDF={handleExportPDF}
            onPrint={handlePrint}
            transferCount={filteredTransfers.length}
            searchTerm={searchTerm}
            onSearchChange={setSearchTerm}
          />
          
          <div className="mt-4 rounded-lg overflow-hidden bg-white/30 dark:bg-gray-800/30">
            <Table>
              <TableHeader>
                <TableRow className="border-white/20 dark:border-gray-700/20">
                  <TableHead 
                    className="text-gray-700 dark:text-gray-300 cursor-pointer hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                    onClick={toggleSortDirection}
                  >
                    <div className="flex items-center gap-1">
                      Date
                      {sortDirection === "asc" ? (
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4"><path d="m5 12 7-7 7 7"/><path d="m5 19 7-7 7 7"/></svg>
                      ) : (
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4"><path d="m5 5 7 7 7-7"/><path d="m5 12 7 7 7-7"/></svg>
                      )}
                    </div>
                  </TableHead>
                  <TableHead className="text-gray-700 dark:text-gray-300">Time</TableHead>
                  <TableHead className="text-gray-700 dark:text-gray-300">Day</TableHead>
                  <TableHead className="text-gray-700 dark:text-gray-300">Pickup</TableHead>
                  <TableHead className="text-gray-700 dark:text-gray-300">Dropoff</TableHead>
                  <TableHead className="text-gray-700 dark:text-gray-300">Type</TableHead>
                  <TableHead className="text-gray-700 dark:text-gray-300">Amount</TableHead>
                  <TableHead className="text-gray-700 dark:text-gray-300">Name</TableHead>
                  <TableHead className="text-gray-700 dark:text-gray-300">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {sortedTransfers.map((transfer) => (
                  <TableRow key={transfer.id} className="border-white/20 dark:border-gray-700/20">
                    <TableCell className="text-gray-700 dark:text-gray-300">
                      {format(transfer.date, "dd.MM.yyyy")}
                    </TableCell>
                    <TableCell className="text-gray-700 dark:text-gray-300">{transfer.time}</TableCell>
                    <TableCell className="text-gray-700 dark:text-gray-300">{transfer.day}</TableCell>
                    <TableCell className="text-gray-700 dark:text-gray-300">{transfer.pickup}</TableCell>
                    <TableCell className="text-gray-700 dark:text-gray-300">{transfer.dropoff}</TableCell>
                    <TableCell className="text-gray-700 dark:text-gray-300">{transfer.type}</TableCell>
                    <TableCell className="font-medium text-gray-900 dark:text-white">€{transfer.amount.toFixed(2)}</TableCell>
                    <TableCell className="text-gray-700 dark:text-gray-300">{transfer.name}</TableCell>
                    <TableCell>
                      <div className="flex items-center space-x-1">
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          className="h-8 w-8 text-blue-600 hover:text-blue-700"
                          onClick={() => openEditModal(transfer)}
                        >
                          <Pencil className="h-4 w-4" />
                        </Button>
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          className="h-8 w-8 text-red-600 hover:text-red-700"
                          onClick={() => handleDeleteTransfer(transfer.id || "")}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
      {/* Transfer Modal */}
      <UserTransferModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSaveTransfer}
        editingTransfer={editingTransfer}
      />
    </div>
  )
}
