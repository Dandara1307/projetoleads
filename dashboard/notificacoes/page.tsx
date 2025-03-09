"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { Loader2 } from "lucide-react"

export default function NotificacoesRedirect() {
  const router = useRouter()

  useEffect(() => {
    // Redirecionar para a página de bot existente
    router.push("/dashboard/bot")
  }, [router])

  return (
    <div className="flex items-center justify-center h-screen">
      <div className="flex flex-col items-center gap-2">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
        <p className="text-sm text-muted-foreground">Redirecionando para Centro de Notificações...</p>
      </div>
    </div>
  )
}

