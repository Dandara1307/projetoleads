"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { Loader2 } from "lucide-react"

export default function RelatoriosRedirect() {
  const router = useRouter()

  useEffect(() => {
    // Redirecionar para a página de analytics existente
    router.push("/dashboard/analytics")
  }, [router])

  return (
    <div className="flex items-center justify-center h-screen">
      <div className="flex flex-col items-center gap-2">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
        <p className="text-sm text-muted-foreground">Redirecionando para Relatórios Analíticos...</p>
      </div>
    </div>
  )
}

