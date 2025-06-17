"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Settings, Shield, Bell, Database } from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useThemeSettings } from "@/hooks/use-theme-settings"

export default function SettingsPage() {
  const { preference, setTheme } = useThemeSettings()

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="glass-card rounded-xl p-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Settings</h1>
            <p className="text-gray-600 dark:text-gray-300">Configure system preferences and administrative settings</p>
          </div>
          <Badge variant="secondary" className="w-fit">
            Admin Configuration
          </Badge>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* General Settings */}
        <Card className="glass-card border-0">
          <CardHeader>
            <div className="flex items-center space-x-2">
              <Settings className="h-5 w-5 text-blue-600" />
              <CardTitle className="text-gray-900 dark:text-white">General Settings</CardTitle>
            </div>
            <CardDescription className="text-gray-600 dark:text-gray-300">Basic system configuration</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="company-name" className="text-gray-700 dark:text-gray-300">
                Company Name
              </Label>
              <Input id="company-name" defaultValue="ZemDash Corporation" className="bg-white/50 dark:bg-gray-800/50" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="default-currency" className="text-gray-700 dark:text-gray-300">
                Default Currency
              </Label>
              <Select defaultValue="eur">
                <SelectTrigger className="bg-white/50 dark:bg-gray-800/50">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="eur">Euro (€)</SelectItem>
                  <SelectItem value="usd">US Dollar ($)</SelectItem>
                  <SelectItem value="gbp">British Pound (£)</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="date-format" className="text-gray-700 dark:text-gray-300">
                Date Format
              </Label>
              <Select defaultValue="ddmmyyyy">
                <SelectTrigger className="bg-white/50 dark:bg-gray-800/50">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="ddmmyyyy">DD.MM.YYYY</SelectItem>
                  <SelectItem value="mmddyyyy">MM/DD/YYYY</SelectItem>
                  <SelectItem value="yyyymmdd">YYYY-MM-DD</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="timezone" className="text-gray-700 dark:text-gray-300">
                Timezone
              </Label>
              <Select defaultValue="cet">
                <SelectTrigger className="bg-white/50 dark:bg-gray-800/50">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="cet">Central European Time</SelectItem>
                  <SelectItem value="utc">UTC</SelectItem>
                  <SelectItem value="est">Eastern Standard Time</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="theme-mode" className="text-gray-700 dark:text-gray-300">
                Theme Mode
              </Label>
              <Select value={preference} onValueChange={(value) => setTheme(value as "system" | "light" | "dark")}>
                <SelectTrigger className="bg-white/50 dark:bg-gray-800/50">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="light">Light</SelectItem>
                  <SelectItem value="dark">Dark</SelectItem>
                  <SelectItem value="system">System</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Security Settings */}
        <Card className="glass-card border-0">
          <CardHeader>
            <div className="flex items-center space-x-2">
              <Shield className="h-5 w-5 text-red-600" />
              <CardTitle className="text-gray-900 dark:text-white">Security Settings</CardTitle>
            </div>
            <CardDescription className="text-gray-600 dark:text-gray-300">
              Manage security and access controls
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label className="text-gray-700 dark:text-gray-300">Two-Factor Authentication</Label>
                <p className="text-sm text-gray-600 dark:text-gray-400">Require 2FA for all admin accounts</p>
              </div>
              <Switch defaultChecked />
            </div>
            <Separator className="bg-white/20 dark:bg-gray-700/20" />
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label className="text-gray-700 dark:text-gray-300">Session Timeout</Label>
                <p className="text-sm text-gray-600 dark:text-gray-400">Auto-logout after inactivity</p>
              </div>
              <Select defaultValue="30">
                <SelectTrigger className="w-24 bg-white/50 dark:bg-gray-800/50">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="15">15 min</SelectItem>
                  <SelectItem value="30">30 min</SelectItem>
                  <SelectItem value="60">1 hour</SelectItem>
                  <SelectItem value="120">2 hours</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <Separator className="bg-white/20 dark:bg-gray-700/20" />
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label className="text-gray-700 dark:text-gray-300">Password Policy</Label>
                <p className="text-sm text-gray-600 dark:text-gray-400">Enforce strong passwords</p>
              </div>
              <Switch defaultChecked />
            </div>
            <Separator className="bg-white/20 dark:bg-gray-700/20" />
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label className="text-gray-700 dark:text-gray-300">Login Attempts</Label>
                <p className="text-sm text-gray-600 dark:text-gray-400">Lock account after failed attempts</p>
              </div>
              <Select defaultValue="5">
                <SelectTrigger className="w-16 bg-white/50 dark:bg-gray-800/50">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="3">3</SelectItem>
                  <SelectItem value="5">5</SelectItem>
                  <SelectItem value="10">10</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Notification Settings */}
        <Card className="glass-card border-0">
          <CardHeader>
            <div className="flex items-center space-x-2">
              <Bell className="h-5 w-5 text-yellow-600" />
              <CardTitle className="text-gray-900 dark:text-white">Notifications</CardTitle>
            </div>
            <CardDescription className="text-gray-600 dark:text-gray-300">
              Configure notification preferences
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label className="text-gray-700 dark:text-gray-300">Email Notifications</Label>
                <p className="text-sm text-gray-600 dark:text-gray-400">Receive updates via email</p>
              </div>
              <Switch defaultChecked />
            </div>
            <Separator className="bg-white/20 dark:bg-gray-700/20" />
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label className="text-gray-700 dark:text-gray-300">SMS Notifications</Label>
                <p className="text-sm text-gray-600 dark:text-gray-400">Critical alerts via SMS</p>
              </div>
              <Switch />
            </div>
            <Separator className="bg-white/20 dark:bg-gray-700/20" />
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label className="text-gray-700 dark:text-gray-300">Push Notifications</Label>
                <p className="text-sm text-gray-600 dark:text-gray-400">Browser notifications</p>
              </div>
              <Switch defaultChecked />
            </div>
            <Separator className="bg-white/20 dark:bg-gray-700/20" />
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label className="text-gray-700 dark:text-gray-300">Transaction Alerts</Label>
                <p className="text-sm text-gray-600 dark:text-gray-400">Notify on large transactions</p>
              </div>
              <Switch defaultChecked />
            </div>
          </CardContent>
        </Card>

        {/* System Settings */}
        <Card className="glass-card border-0">
          <CardHeader>
            <div className="flex items-center space-x-2">
              <Database className="h-5 w-5 text-green-600" />
              <CardTitle className="text-gray-900 dark:text-white">System Settings</CardTitle>
            </div>
            <CardDescription className="text-gray-600 dark:text-gray-300">
              Advanced system configuration
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label className="text-gray-700 dark:text-gray-300">Maintenance Mode</Label>
                <p className="text-sm text-gray-600 dark:text-gray-400">Enable system maintenance</p>
              </div>
              <Switch />
            </div>
            <Separator className="bg-white/20 dark:bg-gray-700/20" />
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label className="text-gray-700 dark:text-gray-300">Debug Mode</Label>
                <p className="text-sm text-gray-600 dark:text-gray-400">Enable detailed logging</p>
              </div>
              <Switch />
            </div>
            <Separator className="bg-white/20 dark:bg-gray-700/20" />
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label className="text-gray-700 dark:text-gray-300">Auto Backup</Label>
                <p className="text-sm text-gray-600 dark:text-gray-400">Automatic data backups</p>
              </div>
              <Switch defaultChecked />
            </div>
            <Separator className="bg-white/20 dark:bg-gray-700/20" />
            <div className="space-y-2">
              <Label className="text-gray-700 dark:text-gray-300">Backup Frequency</Label>
              <Select defaultValue="daily">
                <SelectTrigger className="bg-white/50 dark:bg-gray-800/50">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="hourly">Hourly</SelectItem>
                  <SelectItem value="daily">Daily</SelectItem>
                  <SelectItem value="weekly">Weekly</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Action Buttons */}
      <Card className="glass-card border-0">
        <CardContent className="pt-6">
          <div className="flex justify-end space-x-3">
            <Button variant="outline" className="bg-white/50 dark:bg-gray-800/50">
              Reset to Defaults
            </Button>
            <Button className="bg-blue-600 hover:bg-blue-700">Save Changes</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
