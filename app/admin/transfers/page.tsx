"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Plus, Pencil, Trash2, ArrowUp, ArrowDown } from "lucide-react"
import { TransferModal, Transfer } from "@/components/transfers/transfer-modal"
import { TransferFilterControls, TransferFilterOptions } from "@/components/transfers/transfer-filter-controls"
import { format, compareAsc, compareDesc } from "date-fns"
import { useToast } from "@/components/ui/use-toast"

export default function TransfersPage() {
  const { toast } = useToast()
  const [searchTerm, setSearchTerm] = useState("")
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingTransfer, setEditingTransfer] = useState<Transfer | null>(null)
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("desc")
  const [filters, setFilters] = useState<TransferFilterOptions>({
    year: "",
    month: "",
    day: "",
    name: "",
  })

  // Sample transfer data
  const [transfers, setTransfers] = useState<Transfer[]>([
    {
      id: "TRF001",
      date: new Date(2024, 5, 15), // June 15, 2024
      time: "09:30",
      day: "Monday",
      direction: "HBF → Sony",
      type: "One Way",
      qty: 2,
      amount: 75.00,
      name: "John Doe",
    },
    {
      id: "TRF002",
      date: new Date(2024, 5, 15), // June 15, 2024
      time: "14:45",
      day: "Monday",
      direction: "Sony → HBF",
      type: "Return",
      qty: 1,
      amount: 50.00,
      name: "Jane Smith",
    },
    {
      id: "TRF003",
      date: new Date(2024, 5, 14), // June 14, 2024
      time: "10:15",
      day: "Sunday",
      direction: "HBF → Sony",
      type: "One Way",
      qty: 3,
      amount: 120.00,
      name: "Mike Johnson",
    },
    {
      id: "TRF004",
      date: new Date(2024, 5, 14), // June 14, 2024
      time: "16:30",
      day: "Sunday",
      direction: "Sony → HBF",
      type: "Return",
      qty: 2,
      amount: 90.00,
      name: "Sarah Wilson",
    },
    {
      id: "TRF005",
      date: new Date(2024, 5, 13), // June 13, 2024
      time: "11:00",
      day: "Saturday",
      direction: "HBF → Sony",
      type: "One Way",
      qty: 1,
      amount: 45.00,
      name: "Bob Davis",
    },
    {
      id: "TRF006",
      date: new Date(2024, 5, 13), // June 13, 2024
      time: "17:15",
      day: "Saturday",
      direction: "Sony → HBF",
      type: "Return",
      qty: 4,
      amount: 160.00,
      name: "Alice Brown",
    },
    {
      id: "TRF007",
      date: new Date(2024, 5, 12), // June 12, 2024
      time: "08:45",
      day: "Friday",
      direction: "HBF → Sony",
      type: "One Way",
      qty: 2,
      amount: 75.00,
      name: "David Lee",
    },
    {
      id: "TRF008",
      date: new Date(2024, 5, 12), // June 12, 2024
      time: "18:00",
      day: "Friday",
      direction: "Sony → HBF",
      type: "Return",
      qty: 3,
      amount: 120.00,
      name: "Carol White",
    },
  ])

  const handleAddTransfer = (newTransfer: Transfer) => {
    const transferWithId = {
      ...newTransfer,
      id: `TRF${String(transfers.length + 1).padStart(3, '0')}`,
    }
    setTransfers([...transfers, transferWithId])
    toast({
      title: "Transfer Added",
      description: "New transfer has been successfully added.",
    })
  }

  const handleEditTransfer = (updatedTransfer: Transfer) => {
    setTransfers(
      transfers.map((transfer) =>
        transfer.id === updatedTransfer.id ? updatedTransfer : transfer
      )
    )
    toast({
      title: "Transfer Updated",
      description: "Transfer has been successfully updated.",
    })
  }

  const handleDeleteTransfer = (id: string) => {
    setTransfers(transfers.filter((transfer) => transfer.id !== id))
    toast({
      title: "Transfer Deleted",
      description: "Transfer has been successfully deleted.",
      variant: "destructive",
    })
  }

  const handleSaveTransfer = (transfer: Transfer) => {
    if (editingTransfer) {
      handleEditTransfer(transfer)
    } else {
      handleAddTransfer(transfer)
    }
    setIsModalOpen(false)
    setEditingTransfer(null)
  }

  const handleOpenEditModal = (transfer: Transfer) => {
    setEditingTransfer(transfer)
    setIsModalOpen(true)
  }

  const handleExportPDF = () => {
    toast({
      title: "Export to PDF",
      description: "Transfers exported to PDF successfully.",
    })
    // Implement actual PDF export functionality here
  }

  const handlePrint = () => {
    toast({
      title: "Print",
      description: "Transfers sent to printer successfully.",
    })
    // Implement actual print functionality here
  }

  // Calculate totals
  const totalTransfers = transfers.length
  const totalAmount = transfers.reduce((sum, transfer) => sum + transfer.amount, 0)

  // Filter transfers based on search and filters
  const filteredTransfers = transfers.filter((transfer) => {
    // Search filter
    const matchesSearch = searchTerm
      ? transfer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        transfer.direction.toLowerCase().includes(searchTerm.toLowerCase())
      : true

    // Year filter
    const matchesYear = filters.year
      ? transfer.date.getFullYear() === parseInt(filters.year)
      : true

    // Month filter
    const matchesMonth = filters.month
      ? transfer.date.getMonth() + 1 === parseInt(filters.month)
      : true

    // Day filter
    const matchesDay = filters.day
      ? transfer.date.getDate() === parseInt(filters.day)
      : true

    // Name filter
    const matchesName = filters.name
      ? transfer.name.toLowerCase().includes(filters.name.toLowerCase())
      : true

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

  // Toggle sort direction
  const toggleSortDirection = () => {
    setSortDirection(sortDirection === "asc" ? "desc" : "asc")
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="glass-card rounded-xl p-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Transfers</h1>
            <p className="text-gray-600 dark:text-gray-300">
              <span className="font-medium">June 2025</span> • <span className="font-medium">Admin User</span> • 
              <span className="font-medium">{totalTransfers} transfers</span> • 
              <span className="font-medium">€{totalAmount.toFixed(2)}</span>
            </p>
          </div>
          <Button 
            className="bg-blue-600 hover:bg-blue-700"
            onClick={() => setIsModalOpen(true)}
          >
            <Plus className="h-4 w-4 mr-2" />
            Add New Transfer
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-2">
        <Card className="glass-card border-0">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600 dark:text-gray-300">Total Transfers</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-900 dark:text-white">{totalTransfers}</div>
            <p className="text-xs text-green-600">+8.3% from last month</p>
          </CardContent>
        </Card>

        <Card className="glass-card border-0">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600 dark:text-gray-300">Total Amount</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-900 dark:text-white">€{totalAmount.toFixed(2)}</div>
            <p className="text-xs text-green-600">+12.5% from last month</p>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <TransferFilterControls
        filters={filters}
        onFiltersChange={setFilters}
        onExportPDF={handleExportPDF}
        onPrint={handlePrint}
        transferCount={filteredTransfers.length}
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
      />

      {/* Transfers List */}
      <Card className="glass-card border-0">
        <CardHeader>
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
              <CardTitle className="text-xl font-semibold text-gray-900 dark:text-white">Transfer History</CardTitle>
              <CardDescription className="text-gray-600 dark:text-gray-300">
                System-wide transfer management
              </CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="rounded-lg overflow-hidden bg-white/30 dark:bg-gray-800/30">
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
                        <ArrowUp className="h-4 w-4" />
                      ) : (
                        <ArrowDown className="h-4 w-4" />
                      )}
                    </div>
                  </TableHead>
                  <TableHead className="text-gray-700 dark:text-gray-300">Time</TableHead>
                  <TableHead className="text-gray-700 dark:text-gray-300">Day</TableHead>
                  <TableHead className="text-gray-700 dark:text-gray-300">Direction</TableHead>
                  <TableHead className="text-gray-700 dark:text-gray-300">Type</TableHead>
                  <TableHead className="text-gray-700 dark:text-gray-300">Qty</TableHead>
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
                    <TableCell className="text-gray-700 dark:text-gray-300">{transfer.direction}</TableCell>
                    <TableCell>
                      <Badge variant="outline" className="capitalize">
                        {transfer.type}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-gray-700 dark:text-gray-300">{transfer.qty}</TableCell>
                    <TableCell className="font-medium text-gray-900 dark:text-white">€{transfer.amount.toFixed(2)}</TableCell>
                    <TableCell className="text-gray-700 dark:text-gray-300">{transfer.name}</TableCell>
                    <TableCell>
                      <div className="flex space-x-2">
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          className="h-8 w-8 text-blue-600 hover:text-blue-700"
                          onClick={() => handleOpenEditModal(transfer)}
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
      <TransferModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false)
          setEditingTransfer(null)
        }}
        onSave={handleSaveTransfer}
        editingTransfer={editingTransfer}
      />
    </div>
  )
}
