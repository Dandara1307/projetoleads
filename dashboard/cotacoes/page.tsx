"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { Loader2 } from "lucide-react"

export default function CotacoesRedirect() {
  const router = useRouter()

  useEffect(() => {
    // Redirecionar para a página de cotações existente
    router.push("/dashboard/quotes")
  }, [router])

  return (
    <div className="flex items-center justify-center h-screen">
      <div className="flex flex-col items-center gap-2">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
        <p className="text-sm text-muted-foreground">Redirecionando para Cotações Automáticas...</p>
      </div>
    </div>
  )
}

