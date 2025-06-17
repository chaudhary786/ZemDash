"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { User, Mail, Phone, MapPin, Calendar, Shield, Camera } from "lucide-react"

export default function UserProfilePage() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="glass-card rounded-xl p-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Profile</h1>
            <p className="text-gray-600 dark:text-gray-300">Manage your personal information and preferences</p>
          </div>
          <Badge variant="secondary" className="w-fit">
            User Profile
          </Badge>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Profile Picture & Basic Info */}
        <Card className="glass-card border-0">
          <CardHeader>
            <CardTitle className="text-gray-900 dark:text-white">Profile Picture</CardTitle>
            <CardDescription className="text-gray-600 dark:text-gray-300">Update your profile photo</CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col items-center space-y-4">
            <div className="relative">
              <Avatar className="w-24 h-24">
                <AvatarImage src="/placeholder-user.jpg" />
                <AvatarFallback className="text-2xl">JD</AvatarFallback>
              </Avatar>
              <Button
                size="icon"
                className="absolute -bottom-2 -right-2 rounded-full w-8 h-8 bg-blue-600 hover:bg-blue-700"
              >
                <Camera className="h-4 w-4" />
              </Button>
            </div>
            <div className="text-center">
              <h3 className="font-semibold text-gray-900 dark:text-white">John Doe</h3>
              <p className="text-sm text-gray-600 dark:text-gray-300">john.doe@example.com</p>
              <Badge variant="outline" className="mt-2">
                Verified Account
              </Badge>
            </div>
            <Button variant="outline" className="w-full bg-white/50 dark:bg-gray-800/50">
              Change Photo
            </Button>
          </CardContent>
        </Card>

        {/* Personal Information */}
        <Card className="glass-card border-0 lg:col-span-2">
          <CardHeader>
            <div className="flex items-center space-x-2">
              <User className="h-5 w-5 text-blue-600" />
              <CardTitle className="text-gray-900 dark:text-white">Personal Information</CardTitle>
            </div>
            <CardDescription className="text-gray-600 dark:text-gray-300">Update your personal details</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="first-name" className="text-gray-700 dark:text-gray-300">
                  First Name
                </Label>
                <Input id="first-name" defaultValue="John" className="bg-white/50 dark:bg-gray-800/50" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="last-name" className="text-gray-700 dark:text-gray-300">
                  Last Name
                </Label>
                <Input id="last-name" defaultValue="Doe" className="bg-white/50 dark:bg-gray-800/50" />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="email" className="text-gray-700 dark:text-gray-300">
                Email Address
              </Label>
              <Input
                id="email"
                type="email"
                defaultValue="john.doe@example.com"
                className="bg-white/50 dark:bg-gray-800/50"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="phone" className="text-gray-700 dark:text-gray-300">
                Phone Number
              </Label>
              <Input id="phone" defaultValue="+1 (555) 123-4567" className="bg-white/50 dark:bg-gray-800/50" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="address" className="text-gray-700 dark:text-gray-300">
                Address
              </Label>
              <Input
                id="address"
                defaultValue="123 Main Street, City, State 12345"
                className="bg-white/50 dark:bg-gray-800/50"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="birth-date" className="text-gray-700 dark:text-gray-300">
                Date of Birth
              </Label>
              <Input id="birth-date" defaultValue="15.03.1990" className="bg-white/50 dark:bg-gray-800/50" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Account Information */}
      <Card className="glass-card border-0">
        <CardHeader>
          <div className="flex items-center space-x-2">
            <Shield className="h-5 w-5 text-green-600" />
            <CardTitle className="text-gray-900 dark:text-white">Account Information</CardTitle>
          </div>
          <CardDescription className="text-gray-600 dark:text-gray-300">
            Account status and security details
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-6 md:grid-cols-2">
            <div className="space-y-4">
              <div className="flex items-center justify-between p-3 rounded-lg bg-white/30 dark:bg-gray-800/30">
                <div className="flex items-center space-x-3">
                  <User className="h-5 w-5 text-blue-600" />
                  <div>
                    <p className="font-medium text-gray-900 dark:text-white">Account Type</p>
                    <p className="text-sm text-gray-600 dark:text-gray-300">Personal Account</p>
                  </div>
                </div>
                <Badge variant="secondary">Standard</Badge>
              </div>

              <div className="flex items-center justify-between p-3 rounded-lg bg-white/30 dark:bg-gray-800/30">
                <div className="flex items-center space-x-3">
                  <Calendar className="h-5 w-5 text-purple-600" />
                  <div>
                    <p className="font-medium text-gray-900 dark:text-white">Member Since</p>
                    <p className="text-sm text-gray-600 dark:text-gray-300">15.01.2023</p>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between p-3 rounded-lg bg-white/30 dark:bg-gray-800/30">
                <div className="flex items-center space-x-3">
                  <Mail className="h-5 w-5 text-green-600" />
                  <div>
                    <p className="font-medium text-gray-900 dark:text-white">Email Verification</p>
                    <p className="text-sm text-gray-600 dark:text-gray-300">Verified</p>
                  </div>
                </div>
                <Badge className="bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400">Verified</Badge>
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between p-3 rounded-lg bg-white/30 dark:bg-gray-800/30">
                <div className="flex items-center space-x-3">
                  <Phone className="h-5 w-5 text-orange-600" />
                  <div>
                    <p className="font-medium text-gray-900 dark:text-white">Phone Verification</p>
                    <p className="text-sm text-gray-600 dark:text-gray-300">Verified</p>
                  </div>
                </div>
                <Badge className="bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400">Verified</Badge>
              </div>

              <div className="flex items-center justify-between p-3 rounded-lg bg-white/30 dark:bg-gray-800/30">
                <div className="flex items-center space-x-3">
                  <Shield className="h-5 w-5 text-red-600" />
                  <div>
                    <p className="font-medium text-gray-900 dark:text-white">Two-Factor Auth</p>
                    <p className="text-sm text-gray-600 dark:text-gray-300">Enabled</p>
                  </div>
                </div>
                <Badge className="bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400">Active</Badge>
              </div>

              <div className="flex items-center justify-between p-3 rounded-lg bg-white/30 dark:bg-gray-800/30">
                <div className="flex items-center space-x-3">
                  <MapPin className="h-5 w-5 text-blue-600" />
                  <div>
                    <p className="font-medium text-gray-900 dark:text-white">Location</p>
                    <p className="text-sm text-gray-600 dark:text-gray-300">New York, USA</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Action Buttons */}
      <Card className="glass-card border-0">
        <CardContent className="pt-6">
          <div className="flex flex-col sm:flex-row justify-end space-y-2 sm:space-y-0 sm:space-x-3">
            <Button variant="outline" className="bg-white/50 dark:bg-gray-800/50">
              Cancel Changes
            </Button>
            <Button className="bg-blue-600 hover:bg-blue-700">Save Changes</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
