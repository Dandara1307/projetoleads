"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { Loader2 } from "lucide-react"

export default function CalendarioRedirect() {
  const router = useRouter()

  useEffect(() => {
    // Redirecionar para a página de calendar existente
    router.push("/dashboard/calendar")
  }, [router])

  return (
    <div className="flex items-center justify-center h-screen">
      <div className="flex flex-col items-center gap-2">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
        <p className="text-sm text-muted-foreground">Redirecionando para Calendário de Operações...</p>
      </div>
    </div>
  )
}

