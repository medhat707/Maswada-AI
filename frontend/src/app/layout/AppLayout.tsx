import { Outlet } from "react-router-dom"

import { Footer } from "@/app/layout/Footer"
import { Header } from "@/app/layout/Header"
import { Toaster } from "@/components/ui/sonner"

export function AppLayout() {
  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground">
      <Header />
      <Toaster theme="dark" richColors position="top-center"/>
      <main className="mx-auto w-full max-w-6xl flex-1 px-3 pb-12 pt-4 sm:px-6 sm:pb-16 sm:pt-6 lg:px-8">
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}
