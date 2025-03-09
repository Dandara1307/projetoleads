"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import {
  LayoutDashboard,
  Users,
  TrendingUp,
  Settings,
  Bell,
  Truck,
  LogOut,
  Menu,
  X,
  MapPin,
  FileText,
  Calendar,
} from "lucide-react"
import { useState } from "react"

// Atualizar as rotas para apontar para os caminhos corretos
const routes = [
  {
    label: "Dashboard",
    icon: LayoutDashboard,
    href: "/dashboard",
    color: "text-red-500",
  },
  {
    label: "Leads em Tempo Real",
    icon: MapPin,
    href: "/dashboard/leads-tempo-real",
    color: "text-red-500",
  },
  {
    label: "Cotações Automáticas",
    icon: TrendingUp,
    href: "/dashboard/quotes",
    color: "text-red-500",
  },
  {
    label: "Clientes",
    icon: Users,
    href: "/dashboard/leads",
    color: "text-red-500",
  },
  {
    label: "Frota",
    icon: Truck,
    href: "/dashboard/map",
    color: "text-red-500",
  },
  {
    label: "Relatórios",
    icon: FileText,
    href: "/dashboard/analytics",
    color: "text-red-500",
  },
  {
    label: "Calendário",
    icon: Calendar,
    href: "/dashboard/calendar",
    color: "text-red-500",
  },
  {
    label: "Notificações",
    icon: Bell,
    href: "/dashboard/bot",
    color: "text-red-500",
  },
  {
    label: "Configurações",
    icon: Settings,
    href: "/dashboard/settings",
    color: "text-red-500",
  },
]

export function Sidebar() {
  const pathname = usePathname()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  return (
    <>
      {/* Mobile Menu Button */}
      <Button
        variant="outline"
        size="icon"
        className="fixed top-4 left-4 z-50 md:hidden"
        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
      >
        {isMobileMenuOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
      </Button>

      {/* Sidebar */}
      <div
        className={cn(
          "fixed inset-y-0 left-0 z-40 w-52 border-r bg-background transition-transform duration-300 md:translate-x-0",
          isMobileMenuOpen ? "translate-x-0" : "-translate-x-full",
        )}
      >
        <div className="flex flex-col h-full">
          <div className="p-2">
            <h1 className="text-lg font-bold tracking-tight">
              <span className="text-red-600">Transportadora</span>
              <span className="text-black">Leads</span>
            </h1>
            <p className="text-[10px] text-muted-foreground">Sistema de prospecção automática</p>
            <p className="text-[10px] text-red-600 font-medium">+500 empresas/dia</p>
          </div>
          <ScrollArea className="flex-1 px-3">
            <div className="space-y-1 py-1">
              {routes.map((route) => (
                <Link key={route.href} href={route.href} onClick={() => setIsMobileMenuOpen(false)}>
                  <Button
                    variant={pathname === route.href ? "secondary" : "ghost"}
                    className="w-full justify-start h-8 text-sm"
                  >
                    <route.icon className={cn("mr-2 h-3 w-3", route.color)} />
                    {route.label}
                  </Button>
                </Link>
              ))}
            </div>
          </ScrollArea>
          <div className="p-2 border-t">
            <div className="flex items-center gap-2 mb-1">
              <div className="w-8 h-8 rounded-full bg-red-100 flex items-center justify-center">
                <span className="font-semibold text-xs text-red-600">DS</span>
              </div>
              <div>
                <p className="text-xs font-medium">Dandara Silva</p>
                <p className="text-[10px] text-muted-foreground">dandarasilva20@icloud.com</p>
                <p className="text-[10px] text-muted-foreground">11 983861551</p>
              </div>
            </div>
            <Button variant="outline" className="w-full justify-start mt-1 h-7 text-xs">
              <LogOut className="mr-2 h-3 w-3" />
              Sair
            </Button>
          </div>
        </div>
      </div>
    </>
  )
}

