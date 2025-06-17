"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Settings, Bell, Shield, Eye, Lock } from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useThemeSettings } from "@/hooks/use-theme-settings"

export default function UserSettingsPage() {
  const { preference, setTheme } = useThemeSettings()

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="glass-card rounded-xl p-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Settings</h1>
            <p className="text-gray-600 dark:text-gray-300">Manage your account preferences and security</p>
          </div>
          <Badge variant="secondary" className="w-fit">
            User Settings
          </Badge>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Preferences */}
        <Card className="glass-card border-0">
          <CardHeader>
            <div className="flex items-center space-x-2">
              <Settings className="h-5 w-5 text-blue-600" />
              <CardTitle className="text-gray-900 dark:text-white">Preferences</CardTitle>
            </div>
            <CardDescription className="text-gray-600 dark:text-gray-300">Customize your experience</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="language" className="text-gray-700 dark:text-gray-300">
                Language
              </Label>
              <Select defaultValue="en">
                <SelectTrigger className="bg-white/50 dark:bg-gray-800/50">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="en">English</SelectItem>
                  <SelectItem value="de">Deutsch</SelectItem>
                  <SelectItem value="fr">Français</SelectItem>
                  <SelectItem value="es">Español</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="currency" className="text-gray-700 dark:text-gray-300">
                Preferred Currency
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
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label className="text-gray-700 dark:text-gray-300">Dark Mode</Label>
                <p className="text-sm text-gray-600 dark:text-gray-400">Choose your preferred theme</p>
              </div>
              <Select value={preference} onValueChange={(value) => setTheme(value as "system" | "light" | "dark")}>
                <SelectTrigger className="w-32 bg-white/50 dark:bg-gray-800/50">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="light">Light</SelectItem>
                  <SelectItem value="dark">Dark</SelectItem>
                  <SelectItem value="system">System</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <Separator className="bg-white/20 dark:bg-gray-700/20" />
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label className="text-gray-700 dark:text-gray-300">Dark Mode</Label>
                <p className="text-sm text-gray-600 dark:text-gray-400">Use dark theme</p>
              </div>
              <Switch />
            </div>
          </CardContent>
        </Card>

        {/* Notifications */}
        <Card className="glass-card border-0">
          <CardHeader>
            <div className="flex items-center space-x-2">
              <Bell className="h-5 w-5 text-yellow-600" />
              <CardTitle className="text-gray-900 dark:text-white">Notifications</CardTitle>
            </div>
            <CardDescription className="text-gray-600 dark:text-gray-300">
              Choose what you want to be notified about
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
                <Label className="text-gray-700 dark:text-gray-300">Push Notifications</Label>
                <p className="text-sm text-gray-600 dark:text-gray-400">Browser notifications</p>
              </div>
              <Switch defaultChecked />
            </div>
            <Separator className="bg-white/20 dark:bg-gray-700/20" />
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label className="text-gray-700 dark:text-gray-300">Transaction Alerts</Label>
                <p className="text-sm text-gray-600 dark:text-gray-400">Notify on transactions</p>
              </div>
              <Switch defaultChecked />
            </div>
            <Separator className="bg-white/20 dark:bg-gray-700/20" />
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label className="text-gray-700 dark:text-gray-300">Marketing Emails</Label>
                <p className="text-sm text-gray-600 dark:text-gray-400">Promotional content</p>
              </div>
              <Switch />
            </div>
          </CardContent>
        </Card>

        {/* Security */}
        <Card className="glass-card border-0">
          <CardHeader>
            <div className="flex items-center space-x-2">
              <Shield className="h-5 w-5 text-red-600" />
              <CardTitle className="text-gray-900 dark:text-white">Security</CardTitle>
            </div>
            <CardDescription className="text-gray-600 dark:text-gray-300">Manage your account security</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label className="text-gray-700 dark:text-gray-300">Two-Factor Authentication</Label>
                <p className="text-sm text-gray-600 dark:text-gray-400">Extra security for your account</p>
              </div>
              <Switch defaultChecked />
            </div>
            <Separator className="bg-white/20 dark:bg-gray-700/20" />
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label className="text-gray-700 dark:text-gray-300">Login Alerts</Label>
                <p className="text-sm text-gray-600 dark:text-gray-400">Notify on new device login</p>
              </div>
              <Switch defaultChecked />
            </div>
            <Separator className="bg-white/20 dark:bg-gray-700/20" />
            <Button variant="outline" className="w-full bg-white/50 dark:bg-gray-800/50">
              <Lock className="h-4 w-4 mr-2" />
              Change Password
            </Button>
          </CardContent>
        </Card>

        {/* Privacy */}
        <Card className="glass-card border-0">
          <CardHeader>
            <div className="flex items-center space-x-2">
              <Eye className="h-5 w-5 text-purple-600" />
              <CardTitle className="text-gray-900 dark:text-white">Privacy</CardTitle>
            </div>
            <CardDescription className="text-gray-600 dark:text-gray-300">
              Control your privacy settings
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label className="text-gray-700 dark:text-gray-300">Profile Visibility</Label>
                <p className="text-sm text-gray-600 dark:text-gray-400">Who can see your profile</p>
              </div>
              <Select defaultValue="contacts">
                <SelectTrigger className="w-32 bg-white/50 dark:bg-gray-800/50">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="public">Public</SelectItem>
                  <SelectItem value="contacts">Contacts</SelectItem>
                  <SelectItem value="private">Private</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <Separator className="bg-white/20 dark:bg-gray-700/20" />
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label className="text-gray-700 dark:text-gray-300">Activity Status</Label>
                <p className="text-sm text-gray-600 dark:text-gray-400">Show when you're online</p>
              </div>
              <Switch defaultChecked />
            </div>
            <Separator className="bg-white/20 dark:bg-gray-700/20" />
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label className="text-gray-700 dark:text-gray-300">Data Analytics</Label>
                <p className="text-sm text-gray-600 dark:text-gray-400">Help improve our service</p>
              </div>
              <Switch />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Action Buttons */}
      <Card className="glass-card border-0">
        <CardContent className="pt-6">
          <div className="flex flex-col sm:flex-row justify-end space-y-2 sm:space-y-0 sm:space-x-3">
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
