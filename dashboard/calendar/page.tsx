"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowLeft, ChevronLeft, ChevronRight, Plus } from "lucide-react"
import { Badge } from "@/components/ui/badge"

export default function CalendarPage() {
  const [currentMonth, setCurrentMonth] = useState(new Date())

  // Função para obter o nome do mês
  const getMonthName = (date) => {
    return date.toLocaleString("pt-BR", { month: "long" })
  }

  // Função para obter o ano
  const getYear = (date) => {
    return date.getFullYear()
  }

  // Função para navegar para o mês anterior
  const prevMonth = () => {
    const newMonth = new Date(currentMonth)
    newMonth.setMonth(newMonth.getMonth() - 1)
    setCurrentMonth(newMonth)
  }

  // Função para navegar para o próximo mês
  const nextMonth = () => {
    const newMonth = new Date(currentMonth)
    newMonth.setMonth(newMonth.getMonth() + 1)
    setCurrentMonth(newMonth)
  }

  // Função para gerar os dias do mês atual
  const generateCalendarDays = () => {
    const year = currentMonth.getFullYear()
    const month = currentMonth.getMonth()

    // Primeiro dia do mês
    const firstDay = new Date(year, month, 1)
    // Último dia do mês
    const lastDay = new Date(year, month + 1, 0)

    // Dia da semana do primeiro dia (0 = Domingo, 1 = Segunda, etc.)
    const firstDayOfWeek = firstDay.getDay()

    // Total de dias no mês
    const daysInMonth = lastDay.getDate()

    // Array para armazenar os dias
    const days = []

    // Adicionar dias vazios para o início do mês
    for (let i = 0; i < firstDayOfWeek; i++) {
      days.push({ day: null, events: [] })
    }

    // Adicionar os dias do mês
    for (let day = 1; day <= daysInMonth; day++) {
      // Simular eventos para alguns dias
      const events = []

      // Adicionar eventos aleatórios para alguns dias
      if (Math.random() > 0.7) {
        const eventTypes = [
          { title: "Coleta Farmácia", type: "coleta", urgency: "Crítica" },
          { title: "Entrega Banco", type: "entrega", urgency: "Alta" },
          { title: "Coleta Eletrônicos", type: "coleta", urgency: "Média" },
          { title: "Entrega Urgente", type: "entrega", urgency: "Crítica" },
          { title: "Reunião Cliente", type: "reuniao", urgency: "Média" },
        ]

        const numEvents = Math.floor(Math.random() * 3) + 1
        for (let i = 0; i < numEvents; i++) {
          const eventType = eventTypes[Math.floor(Math.random() * eventTypes.length)]
          events.push(eventType)
        }
      }

      days.push({ day, events })
    }

    return days
  }

  const days = generateCalendarDays()

  // Função para obter a cor do evento com base no tipo
  const getEventColor = (type) => {
    switch (type) {
      case "coleta":
        return "bg-blue-500"
      case "entrega":
        return "bg-green-500"
      case "reuniao":
        return "bg-purple-500"
      default:
        return "bg-gray-500"
    }
  }

  // Função para obter a cor da urgência
  const getUrgencyColor = (urgency) => {
    switch (urgency) {
      case "Crítica":
        return "bg-red-600"
      case "Alta":
        return "bg-orange-500"
      case "Média":
        return "bg-yellow-500"
      default:
        return "bg-gray-500"
    }
  }

  // Nomes dos dias da semana
  const weekDays = ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"]

  return (
    <div className="container mx-auto p-6">
      <div className="flex items-center gap-2 mb-6">
        <Link href="/dashboard">
          <Button variant="outline" size="icon">
            <ArrowLeft className="h-4 w-4" />
          </Button>
        </Link>
        <div>
          <h1 className="text-2xl font-bold">Calendário de Operações</h1>
          <p className="text-sm text-muted-foreground">Visualize e gerencie coletas, entregas e reuniões</p>
        </div>
      </div>

      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle>
              {getMonthName(currentMonth).charAt(0).toUpperCase() + getMonthName(currentMonth).slice(1)}{" "}
              {getYear(currentMonth)}
            </CardTitle>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="icon" onClick={prevMonth}>
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="icon" onClick={nextMonth}>
                <ChevronRight className="h-4 w-4" />
              </Button>
              <Button className="gap-2">
                <Plus className="h-4 w-4" />
                Novo Evento
              </Button>
            </div>
          </div>
          <CardDescription>Calendário de coletas, entregas e reuniões com clientes</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-7 gap-1">
            {/* Cabeçalho dos dias da semana */}
            {weekDays.map((day, index) => (
              <div key={index} className="text-center font-medium p-2">
                {day}
              </div>
            ))}

            {/* Dias do calendário */}
            {days.map((day, index) => (
              <div
                key={index}
                className={`min-h-[100px] border rounded-md p-2 ${day.day ? "bg-background" : "bg-muted/30"}`}
              >
                {day.day && (
                  <>
                    <div className="text-right font-medium mb-1">{day.day}</div>
                    <div className="space-y-1">
                      {day.events.map((event, eventIndex) => (
                        <div
                          key={eventIndex}
                          className={`${getEventColor(event.type)} text-white text-xs p-1 rounded truncate flex justify-between items-center`}
                        >
                          <span>{event.title}</span>
                          <Badge className={`${getUrgencyColor(event.urgency)} text-[10px] h-4 px-1`}>
                            {event.urgency}
                          </Badge>
                        </div>
                      ))}
                    </div>
                  </>
                )}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <div className="mt-6 text-center text-xs text-muted-foreground">
        <p>© Dandara Silva 2025. Todos os direitos reservados.</p>
      </div>
    </div>
  )
}

