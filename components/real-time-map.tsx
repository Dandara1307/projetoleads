"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { RefreshCw, Filter, Layers, Search } from "lucide-react"
import dynamic from "next/dynamic"

// Dados simulados de leads com coordenadas
const leadsWithCoordinates = [
  {
    id: 1,
    company: "Drogaria São Paulo",
    segment: "Farmácia",
    urgency: "Crítica",
    phone: "(11) 3224-5678",
    origin: "São Paulo - SP",
    destination: "Rio de Janeiro - RJ",
    coordinates: [-23.55052, -46.633308], // São Paulo
    lastUpdated: "15min",
  },
  {
    id: 2,
    company: "Banco Itaú",
    segment: "Banco",
    urgency: "Alta",
    phone: "(11) 4004-4828",
    origin: "São Paulo - SP",
    destination: "Brasília - DF",
    coordinates: [-23.548943, -46.638818], // São Paulo - outro ponto
    lastUpdated: "28min",
  },
  {
    id: 3,
    company: "Magazine Luiza",
    segment: "Eletrônicos",
    urgency: "Crítica",
    phone: "(11) 3508-9000",
    origin: "São Paulo - SP",
    destination: "Belo Horizonte - MG",
    coordinates: [-23.54314, -46.642426], // São Paulo - outro ponto
    lastUpdated: "42min",
  },
  {
    id: 4,
    company: "Drogasil",
    segment: "Farmácia",
    urgency: "Alta",
    phone: "(11) 3769-5678",
    origin: "São Paulo - SP",
    destination: "Porto Alegre - RS",
    coordinates: [-23.557259, -46.639393], // São Paulo - outro ponto
    lastUpdated: "1h",
  },
  {
    id: 5,
    company: "Banco Bradesco",
    segment: "Banco",
    urgency: "Média",
    phone: "(11) 4002-0022",
    origin: "São Paulo - SP",
    destination: "Rio de Janeiro - RJ",
    coordinates: [-23.562114, -46.654709], // São Paulo - outro ponto
    lastUpdated: "1h30min",
  },
  {
    id: 6,
    company: "Casas Bahia",
    segment: "Eletrônicos",
    urgency: "Alta",
    phone: "(11) 3003-8889",
    origin: "São Paulo - SP",
    destination: "Curitiba - PR",
    coordinates: [-23.546377, -46.64613], // São Paulo - outro ponto
    lastUpdated: "2h",
  },
  {
    id: 7,
    company: "Farmácias Pague Menos",
    segment: "Farmácia",
    urgency: "Crítica",
    phone: "(11) 3003-9303",
    origin: "São Paulo - SP",
    destination: "Salvador - BA",
    coordinates: [-23.553118, -46.662769], // São Paulo - outro ponto
    lastUpdated: "2h15min",
  },
  {
    id: 8,
    company: "Banco Santander",
    segment: "Banco",
    urgency: "Alta",
    phone: "(11) 4004-3535",
    origin: "São Paulo - SP",
    destination: "Belo Horizonte - MG",
    coordinates: [-23.564631, -46.652357], // São Paulo - outro ponto
    lastUpdated: "2h30min",
  },
]

// Componente de mapa carregado dinamicamente para evitar problemas de SSR
const MapComponent = dynamic(() => import("../components/map-component"), {
  loading: () => <p>Carregando mapa...</p>,
  ssr: false,
})

export function RealTimeMap() {
  const [isLoading, setIsLoading] = useState(false)
  const [lastUpdated, setLastUpdated] = useState(new Date())
  const [activeLeads, setActiveLeads] = useState(156)
  const [selectedSegment, setSelectedSegment] = useState("all")
  const [selectedUrgency, setSelectedUrgency] = useState("all")
  const [filteredLeads, setFilteredLeads] = useState(leadsWithCoordinates)

  // Filtrar leads quando os filtros mudarem
  useEffect(() => {
    let filtered = [...leadsWithCoordinates]

    if (selectedSegment !== "all") {
      filtered = filtered.filter((lead) => lead.segment === selectedSegment)
    }

    if (selectedUrgency !== "all") {
      filtered = filtered.filter((lead) => lead.urgency === selectedUrgency)
    }

    setFilteredLeads(filtered)
  }, [selectedSegment, selectedUrgency])

  // Simular atualização do mapa a cada 20 segundos
  useEffect(() => {
    const interval = setInterval(() => {
      setIsLoading(true)

      // Simular carregamento
      setTimeout(() => {
        setIsLoading(false)
        setLastUpdated(new Date())
        setActiveLeads(Math.floor(Math.random() * 20) + 150) // Entre 150 e 170 leads
      }, 1500)
    }, 20000)

    return () => clearInterval(interval)
  }, [])

  const handleRefresh = () => {
    setIsLoading(true)

    // Simular carregamento
    setTimeout(() => {
      setIsLoading(false)
      setLastUpdated(new Date())
      setActiveLeads(Math.floor(Math.random() * 20) + 150) // Entre 150 e 170 leads
    }, 1500)
  }

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

  return (
    <Card>
      <CardHeader className="pt-2 pb-1">
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-base">Localização em Tempo Real</CardTitle>
            <CardDescription className="text-xs">
              Empresas com necessidades urgentes de transporte interestadual
            </CardDescription>
          </div>
          <Badge variant="outline" className={isLoading ? "animate-pulse" : ""}>
            {isLoading ? "Atualizando..." : `${activeLeads} leads ativos`}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="p-2">
        <div className="flex items-center justify-between mb-2">
          <div className="flex gap-1">
            <Select defaultValue={selectedSegment} onValueChange={setSelectedSegment}>
              <SelectTrigger className="w-[120px] h-8 text-xs">
                <SelectValue placeholder="Segmento" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todos</SelectItem>
                <SelectItem value="Farmácia">Farmácias</SelectItem>
                <SelectItem value="Banco">Bancos</SelectItem>
                <SelectItem value="Eletrônicos">Eletrônicos</SelectItem>
              </SelectContent>
            </Select>
            <Select defaultValue={selectedUrgency} onValueChange={setSelectedUrgency}>
              <SelectTrigger className="w-[120px] h-8 text-xs">
                <SelectValue placeholder="Urgência" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todas</SelectItem>
                <SelectItem value="Crítica">Crítica</SelectItem>
                <SelectItem value="Alta">Alta</SelectItem>
                <SelectItem value="Média">Média</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="flex gap-1">
            <Button variant="outline" size="sm" className="h-8 w-8 p-0">
              <Layers className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="sm" className="h-8 w-8 p-0">
              <Filter className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="sm" className="h-8 w-8 p-0" onClick={handleRefresh} disabled={isLoading}>
              <RefreshCw className="h-4 w-4" />
            </Button>
          </div>
        </div>

        <div className="aspect-video rounded-md relative overflow-hidden">
          {/* Mapa real com Leaflet */}
          <MapComponent
            leads={filteredLeads}
            apiKey="5a8baf01a682e9d149510eaec94f5756"
            center={[-23.55052, -46.633308]}
            zoom={13}
          />

          {/* Overlay de carregamento */}
          {isLoading && (
            <div className="absolute inset-0 bg-background/50 flex items-center justify-center z-10">
              <div className="flex flex-col items-center gap-2">
                <RefreshCw className="h-8 w-8 animate-spin text-primary" />
                <span className="text-sm font-medium">Atualizando mapa...</span>
              </div>
            </div>
          )}

          {/* Legenda */}
          <div className="absolute bottom-2 left-2 bg-background/80 p-1 rounded-md text-xs z-[400]">
            <div className="font-medium mb-1">Legenda</div>
            <div className="flex items-center gap-1 mb-1">
              <div className="bg-red-500 rounded-full w-2 h-2"></div>
              <span>Urgência Crítica</span>
            </div>
            <div className="flex items-center gap-1 mb-1">
              <div className="bg-orange-500 rounded-full w-2 h-2"></div>
              <span>Urgência Alta</span>
            </div>
            <div className="flex items-center gap-1">
              <div className="bg-yellow-500 rounded-full w-2 h-2"></div>
              <span>Urgência Média</span>
            </div>
          </div>

          {/* Barra de pesquisa */}
          <div className="absolute top-2 left-1/2 transform -translate-x-1/2 bg-background/80 rounded-md flex items-center p-1 w-48 z-[400]">
            <Search className="h-3 w-3 ml-1 text-muted-foreground" />
            <input
              type="text"
              placeholder="Buscar localização..."
              className="bg-transparent border-none text-xs p-1 focus:outline-none w-full"
            />
          </div>
        </div>
        <div className="mt-1 text-xs text-primary font-medium">
          Sistema otimizado para localizar mais de 500 empresas por dia em tempo real com necessidades de transporte
          interestadual.
        </div>

        <div className="mt-2 text-xs">
          <div className="font-medium">Empresas próximas com necessidades urgentes:</div>
          <ul className="mt-1 space-y-1">
            {filteredLeads.slice(0, 3).map((lead) => (
              <li key={lead.id} className="flex items-center justify-between">
                <div className="flex items-center gap-1">
                  <div
                    className={`${lead.urgency === "Crítica" ? "bg-red-500" : lead.urgency === "Alta" ? "bg-orange-500" : "bg-yellow-500"} rounded-full w-2 h-2`}
                  ></div>
                  <span className="text-xs">{lead.company}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Badge className="text-[10px] py-0 h-4">{lead.segment}</Badge>
                  <span className="text-[10px] text-muted-foreground">
                    {lead.origin.split(" - ")[0]} → {lead.destination.split(" - ")[0]}
                  </span>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between p-2 text-xs">
        <div className="text-xs text-muted-foreground">Última atualização: {lastUpdated.toLocaleTimeString()}</div>
        <Button size="sm" className="h-7 text-xs">
          Ver todos os leads no mapa
        </Button>
      </CardFooter>
    </Card>
  )
}

