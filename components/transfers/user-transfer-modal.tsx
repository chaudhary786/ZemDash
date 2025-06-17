"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { format } from "date-fns"
import { CalendarIcon } from "lucide-react"

export interface UserTransfer {
  id?: string
  date: Date
  time: string
  day: string
  pickup: string
  dropoff: string
  type: string
  amount: number
  name: string
}

interface UserTransferModalProps {
  isOpen: boolean
  onClose: () => void
  onSave: (transfer: UserTransfer) => void
  editingTransfer: UserTransfer | null
}

export function UserTransferModal({ isOpen, onClose, onSave, editingTransfer }: UserTransferModalProps) {
  const isEditing = !!editingTransfer

  const [transfer, setTransfer] = useState<UserTransfer>(
    editingTransfer || {
      date: new Date(),
      time: "12:00",
      day: format(new Date(), "EEEE"),
      pickup: "HBF",
      dropoff: "Sony",
      type: "One Way",
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

  const handleInputChange = (field: keyof UserTransfer, value: string | number) => {
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
    <Dialog open={isOpen} onOpenChange={onClose}>
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
                    {format(transfer.date, "PPP")}
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
                onChange={(e) => handleInputChange("time", e.target.value)}
              />
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="day">Day</Label>
            <Input
              id="day"
              value={transfer.day}
              onChange={(e) => handleInputChange("day", e.target.value)}
              readOnly
            />
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="pickup">Pickup Location</Label>
              <Input
                id="pickup"
                value={transfer.pickup}
                onChange={(e) => handleInputChange("pickup", e.target.value)}
                placeholder="Enter pickup location"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="dropoff">Dropoff Location</Label>
              <Input
                id="dropoff"
                value={transfer.dropoff}
                onChange={(e) => handleInputChange("dropoff", e.target.value)}
                placeholder="Enter dropoff location"
              />
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="type">Type</Label>
              <Select
                value={transfer.type}
                onValueChange={(value) => handleInputChange("type", value)}
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
            <div className="space-y-2">
              <Label htmlFor="amount">Amount (€)</Label>
              <Input
                id="amount"
                type="number"
                value={transfer.amount}
                onChange={(e) => handleInputChange("amount", parseFloat(e.target.value))}
                placeholder="0.00"
              />
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="name">Name</Label>
            <Input
              id="name"
              value={transfer.name}
              onChange={(e) => handleInputChange("name", e.target.value)}
              placeholder="Enter name"
            />
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={onClose}>Cancel</Button>
          <Button onClick={handleSubmit}>{isEditing ? "Save Changes" : "Add Transfer"}</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
