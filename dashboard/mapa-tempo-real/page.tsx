"use client"

import { RealTimeMap } from "@/components/real-time-map"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"

export default function MapaTempoRealPage() {
  return (
    <div className="container mx-auto p-6">
      <div className="flex items-center gap-2 mb-6">
        <Link href="/dashboard">
          <Button variant="outline" size="icon">
            <ArrowLeft className="h-4 w-4" />
          </Button>
        </Link>
        <div>
          <h1 className="text-2xl font-bold">Mapa em Tempo Real</h1>
          <p className="text-sm text-muted-foreground">Visualize a localização de leads com necessidades urgentes</p>
        </div>
      </div>

      <RealTimeMap />

      <div className="mt-6 text-center text-xs text-muted-foreground">
        <p>© Dandara Silva 2025. Todos os direitos reservados.</p>
      </div>
    </div>
  )
}

