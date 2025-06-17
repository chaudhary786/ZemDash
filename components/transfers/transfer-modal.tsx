"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { CalendarIcon } from "lucide-react"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { format } from "date-fns"

export interface Transfer {
  id?: string
  date: Date
  time: string
  day: string
  direction: "HBF → Sony" | "Sony → HBF"
  type: "One Way" | "Return"
  qty: number
  amount: number
  name: string
}

interface TransferModalProps {
  isOpen: boolean
  onClose: () => void
  onSave: (transfer: Transfer) => void
  editingTransfer: Transfer | null
}

export function TransferModal({ isOpen, onClose, onSave, editingTransfer }: TransferModalProps) {
  const isEditing = !!editingTransfer

  const [transfer, setTransfer] = useState<Transfer>(
    editingTransfer || {
      date: new Date(),
      time: "12:00",
      day: format(new Date(), "EEEE"),
      direction: "HBF → Sony",
      type: "One Way",
      qty: 1,
      amount: 0,
      name: "",
    }
  )

  const handleDateChange = (date: Date | undefined) => {
    if (date) {
      setTransfer({
        ...transfer,
        date,
        day: format(date, "EEEE"),
      })
    }
  }

  const handleChange = (field: keyof Transfer, value: any) => {
    setTransfer({
      ...transfer,
      [field]: value,
    })
  }

  const handleSubmit = () => {
    onSave(transfer)
    onClose()
  }

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>{isEditing ? "Edit Transfer" : "Add New Transfer"}</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="date">Date</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className="w-full justify-start text-left font-normal"
                    id="date"
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {transfer.date ? format(transfer.date, "dd.MM.yyyy") : "Select date"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    mode="single"
                    selected={transfer.date}
                    onSelect={handleDateChange}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>
            <div className="space-y-2">
              <Label htmlFor="time">Time</Label>
              <Input
                id="time"
                type="time"
                value={transfer.time}
                onChange={(e) => handleChange("time", e.target.value)}
              />
            </div>
          </div>
          <div className="space-y-2">
            <Label>Day</Label>
            <Input
              value={transfer.day}
              disabled
              className="bg-gray-100 dark:bg-gray-800"
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="direction">Direction</Label>
              <Select
                value={transfer.direction}
                onValueChange={(value) => handleChange("direction", value)}
              >
                <SelectTrigger id="direction">
                  <SelectValue placeholder="Select direction" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="HBF → Sony">HBF → Sony</SelectItem>
                  <SelectItem value="Sony → HBF">Sony → HBF</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="type">Type</Label>
              <Select
                value={transfer.type}
                onValueChange={(value) => handleChange("type", value as "One Way" | "Return")}
              >
                <SelectTrigger id="type">
                  <SelectValue placeholder="Select type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="One Way">One Way</SelectItem>
                  <SelectItem value="Return">Return</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="qty">Quantity</Label>
              <Input
                id="qty"
                type="number"
                min="1"
                value={transfer.qty}
                onChange={(e) => handleChange("qty", parseInt(e.target.value))}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="amount">Amount (€)</Label>
              <Input
                id="amount"
                type="number"
                min="0"
                step="0.01"
                value={transfer.amount}
                onChange={(e) => handleChange("amount", parseFloat(e.target.value))}
              />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="name">Name</Label>
            <Input
              id="name"
              value={transfer.name}
              onChange={(e) => handleChange("name", e.target.value)}
            />
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={onClose}>Cancel</Button>
          <Button onClick={handleSubmit}>{isEditing ? "Update" : "Save"}</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
