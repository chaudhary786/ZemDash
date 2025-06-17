"use client"

import { redirect } from "next/navigation"
import { useEffect } from "react"

export default function UserPermissionPage() {
  useEffect(() => {
    // Redirect to the users page by default
    redirect("/admin/user-permission/users")
  }, [])

  return null
}
