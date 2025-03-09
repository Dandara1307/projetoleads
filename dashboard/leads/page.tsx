"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ArrowLeft, ChevronDown, Filter, Plus, Search } from "lucide-react"

// Dados simulados de leads
const leadsData = [
  {
    id: 1,
    company: "Rede Farmácias Saúde Total",
    contact: "Carlos Silva",
    phone: "(11) 98765-4321",
    email: "carlos@saudetotal.com.br",
    volume: "2.3 ton",
    status: "Novo",
    urgency: "Alta",
    segment: "Farmácia",
    date: "2025-03-05",
    origin: "São Paulo - SP",
    destination: "Rio de Janeiro - RJ",
  },
  {
    id: 2,
    company: "Banco Nacional Financeiro",
    contact: "Ana Oliveira",
    phone: "(21) 97654-3210",
    email: "ana@bnf.com.br",
    volume: "1.2 ton",
    status: "Cotação Enviada",
    urgency: "Crítica",
    segment: "Banco",
    date: "2025-03-04",
    origin: "Rio de Janeiro - RJ",
    destination: "Brasília - DF",
  },
  {
    id: 3,
    company: "TechMaster Eletrônicos",
    contact: "Roberto Almeida",
    phone: "(31) 96543-2109",
    email: "roberto@techmaster.com.br",
    volume: "4.5 ton",
    status: "Negociação",
    urgency: "Média",
    segment: "Eletrônicos",
    date: "2025-03-03",
    origin: "Belo Horizonte - MG",
    destination: "São Paulo - SP",
  },
  {
    id: 4,
    company: "Farmácias Bem Estar",
    contact: "Juliana Costa",
    phone: "(41) 95432-1098",
    email: "juliana@bemestar.com.br",
    volume: "1.8 ton",
    status: "Fechado",
    urgency: "Crítica",
    segment: "Farmácia",
    date: "2025-03-02",
    origin: "Curitiba - PR",
    destination: "Florianópolis - SC",
  },
  {
    id: 5,
    company: "Banco Investimentos Seguros",
    contact: "Marcos Pereira",
    phone: "(51) 94321-0987",
    email: "marcos@bis.com.br",
    volume: "0.9 ton",
    status: "Novo",
    urgency: "Alta",
    segment: "Banco",
    date: "2025-03-01",
    origin: "Porto Alegre - RS",
    destination: "Curitiba - PR",
  },
  {
    id: 6,
    company: "Mega Eletrônicos",
    contact: "Patricia Santos",
    phone: "(19) 93210-9876",
    email: "patricia@megaeletronicos.com.br",
    volume: "5.2 ton",
    status: "Novo",
    urgency: "Alta",
    segment: "Eletrônicos",
    date: "2025-02-28",
    origin: "Campinas - SP",
    destination: "Rio de Janeiro - RJ",
  },
  {
    id: 7,
    company: "Indústria Têxtil Nordeste",
    contact: "Fernando Gomes",
    phone: "(81) 92109-8765",
    email: "fernando@textilenordeste.com.br",
    volume: "3.5 ton",
    status: "Cotação Enviada",
    urgency: "Crítica",
    segment: "Têxtil",
    date: "2025-02-27",
    origin: "Recife - PE",
    destination: "São Paulo - SP",
  },
  {
    id: 8,
    company: "Agro Alimentos Brasil",
    contact: "Camila Rodrigues",
    phone: "(71) 91098-7654",
    email: "camila@agroalimentos.com.br",
    volume: "8.3 ton",
    status: "Negociação",
    urgency: "Média",
    segment: "Alimentos",
    date: "2025-02-26",
    origin: "Salvador - BA",
    destination: "Belo Horizonte - MG",
  },
  {
    id: 9,
    company: "Eletrônicos Inovação",
    contact: "Lucas Mendes",
    phone: "(85) 90987-6543",
    email: "lucas@inovacao.com.br",
    volume: "3.7 ton",
    status: "Fechado",
    urgency: "Alta",
    segment: "Eletrônicos",
    date: "2025-02-25",
    origin: "Fortaleza - CE",
    destination: "Recife - PE",
  },
  {
    id: 10,
    company: "Móveis Modernos",
    contact: "Mariana Lima",
    phone: "(91) 89876-5432",
    email: "mariana@moveismodernos.com.br",
    volume: "6.8 ton",
    status: "Novo",
    urgency: "Crítica",
    segment: "Móveis",
    date: "2025-02-24",
    origin: "Belém - PA",
    destination: "Manaus - AM",
  },
  {
    id: 11,
    company: "Cooperativa Agrícola Central",
    contact: "Ricardo Souza",
    phone: "(48) 88765-4321",
    email: "ricardo@coopagricola.com.br",
    volume: "12.5 ton",
    status: "Novo",
    urgency: "Alta",
    segment: "Agrícola",
    date: "2025-02-23",
    origin: "Florianópolis - SC",
    destination: "Porto Alegre - RS",
  },
  {
    id: 12,
    company: "TechStore Eletrônicos",
    contact: "Beatriz Oliveira",
    phone: "(27) 87654-3210",
    email: "beatriz@techstore.com.br",
    volume: "4.2 ton",
    status: "Cotação Enviada",
    urgency: "Média",
    segment: "Eletrônicos",
    date: "2025-02-22",
    origin: "Vitória - ES",
    destination: "Rio de Janeiro - RJ",
  },
  {
    id: 13,
    company: "Indústria Química Brasileira",
    contact: "Gabriel Santos",
    phone: "(62) 76543-2109",
    email: "gabriel@quimicabr.com.br",
    volume: "7.3 ton",
    status: "Negociação",
    urgency: "Crítica",
    segment: "Química",
    date: "2025-02-21",
    origin: "Goiânia - GO",
    destination: "Brasília - DF",
  },
  {
    id: 14,
    company: "Calçados Conforto",
    contact: "Isabela Costa",
    phone: "(82) 65432-1098",
    email: "isabela@calcadosconforto.com.br",
    volume: "2.7 ton",
    status: "Fechado",
    urgency: "Alta",
    segment: "Calçados",
    date: "2025-02-20",
    origin: "Maceió - AL",
    destination: "Salvador - BA",
  },
  {
    id: 15,
    company: "Distribuidora de Bebidas Nacional",
    contact: "Thiago Lima",
    phone: "(92) 54321-0987",
    email: "thiago@bebidasnacional.com.br",
    volume: "9.8 ton",
    status: "Novo",
    urgency: "Média",
    segment: "Bebidas",
    date: "2025-02-19",
    origin: "Manaus - AM",
    destination: "Belém - PA",
  },
]

export default function LeadsPage() {
  const [leads, setLeads] = useState(leadsData)
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedSegment, setSelectedSegment] = useState("all")
  const [selectedUrgency, setSelectedUrgency] = useState("all")
  const [selectedStatus, setSelectedStatus] = useState("all")

  // Filtrar leads quando os filtros mudarem
  useEffect(() => {
    let filtered = [...leadsData]

    // Filtrar por termo de busca
    if (searchTerm) {
      filtered = filtered.filter(
        (lead) =>
          lead.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
          lead.contact.toLowerCase().includes(searchTerm.toLowerCase()) ||
          lead.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
          lead.origin.toLowerCase().includes(searchTerm.toLowerCase()) ||
          lead.destination.toLowerCase().includes(searchTerm.toLowerCase()),
      )
    }

    // Filtrar por segmento
    if (selectedSegment !== "all") {
      filtered = filtered.filter((lead) => lead.segment === selectedSegment)
    }

    // Filtrar por urgência
    if (selectedUrgency !== "all") {
      filtered = filtered.filter((lead) => lead.urgency === selectedUrgency)
    }

    // Filtrar por status
    if (selectedStatus !== "all") {
      filtered = filtered.filter((lead) => lead.status === selectedStatus)
    }

    setLeads(filtered)
  }, [searchTerm, selectedSegment, selectedUrgency, selectedStatus])

  const getStatusColor = (status) => {
    switch (status) {
      case "Novo":
        return "bg-blue-500"
      case "Cotação Enviada":
        return "bg-yellow-500"
      case "Negociação":
        return "bg-purple-500"
      case "Fechado":
        return "bg-green-500"
      default:
        return "bg-gray-500"
    }
  }

  const getUrgencyColor = (urgency) => {
    switch (urgency) {
      case "Crítica":
        return "bg-red-600"
      case "Alta":
        return "bg-orange-500"
      case "Média":
        return "bg-yellow-500"
      case "Baixa":
        return "bg-green-500"
      default:
        return "bg-gray-500"
    }
  }

  return (
    <div className="container mx-auto p-6">
      <div className="flex items-center gap-2 mb-6">
        <Link href="/dashboard">
          <Button variant="outline" size="icon">
            <ArrowLeft className="h-4 w-4" />
          </Button>
        </Link>
        <div>
          <h1 className="text-2xl font-bold">Gerenciamento de Leads</h1>
          <p className="text-sm text-muted-foreground">Visualize e gerencie todos os leads capturados pelo sistema</p>
        </div>
      </div>

      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle>Todos os Leads</CardTitle>
            <CardDescription>Total de {leads.length} leads encontrados</CardDescription>
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row justify-between gap-4 mb-6">
            <div className="flex flex-col md:flex-row gap-2">
              <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Buscar leads..."
                  className="w-full md:w-[300px] pl-8"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <Select value={selectedSegment} onValueChange={setSelectedSegment}>
                <SelectTrigger className="w-full md:w-[180px]">
                  <SelectValue placeholder="Segmento" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todos os segmentos</SelectItem>
                  <SelectItem value="Farmácia">Farmácia</SelectItem>
                  <SelectItem value="Banco">Banco</SelectItem>
                  <SelectItem value="Eletrônicos">Eletrônicos</SelectItem>
                  <SelectItem value="Têxtil">Têxtil</SelectItem>
                  <SelectItem value="Alimentos">Alimentos</SelectItem>
                  <SelectItem value="Móveis">Móveis</SelectItem>
                  <SelectItem value="Agrícola">Agrícola</SelectItem>
                  <SelectItem value="Química">Química</SelectItem>
                  <SelectItem value="Calçados">Calçados</SelectItem>
                  <SelectItem value="Bebidas">Bebidas</SelectItem>
                </SelectContent>
              </Select>
              <Select value={selectedUrgency} onValueChange={setSelectedUrgency}>
                <SelectTrigger className="w-full md:w-[180px]">
                  <SelectValue placeholder="Urgência" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todas urgências</SelectItem>
                  <SelectItem value="Crítica">Crítica</SelectItem>
                  <SelectItem value="Alta">Alta</SelectItem>
                  <SelectItem value="Média">Média</SelectItem>
                </SelectContent>
              </Select>
              <Select value={selectedStatus} onValueChange={setSelectedStatus}>
                <SelectTrigger className="w-full md:w-[180px]">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todos status</SelectItem>
                  <SelectItem value="Novo">Novo</SelectItem>
                  <SelectItem value="Cotação Enviada">Cotação Enviada</SelectItem>
                  <SelectItem value="Negociação">Negociação</SelectItem>
                  <SelectItem value="Fechado">Fechado</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" className="gap-2">
                <Filter className="h-4 w-4" />
                Filtros Avançados
              </Button>
              <Link href="/dashboard/leads-tempo-real">
                <Button className="gap-2">
                  <Plus className="h-4 w-4" />
                  Adicionar Lead
                </Button>
              </Link>
            </div>
          </div>

          <div className="overflow-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Empresa</TableHead>
                  <TableHead>Segmento</TableHead>
                  <TableHead>Contato</TableHead>
                  <TableHead>Telefone</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Volume</TableHead>
                  <TableHead>Origem/Destino</TableHead>
                  <TableHead>Urgência</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Ações</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {leads.map((lead) => (
                  <TableRow key={lead.id}>
                    <TableCell className="font-medium">{lead.company}</TableCell>
                    <TableCell>{lead.segment}</TableCell>
                    <TableCell>{lead.contact}</TableCell>
                    <TableCell>{lead.phone}</TableCell>
                    <TableCell>{lead.email}</TableCell>
                    <TableCell>{lead.volume}</TableCell>
                    <TableCell>
                      <div className="text-xs">
                        <div>{lead.origin}</div>
                        <div className="text-muted-foreground">→ {lead.destination}</div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge className={`${getUrgencyColor(lead.urgency)} text-white`}>{lead.urgency}</Badge>
                    </TableCell>
                    <TableCell>
                      <Badge className={`${getStatusColor(lead.status)} text-white`}>{lead.status}</Badge>
                    </TableCell>
                    <TableCell>
                      <Button variant="ghost" size="icon">
                        <ChevronDown className="h-4 w-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      <div className="mt-6 text-center text-xs text-muted-foreground">
        <p>© Dandara Silva 2025. Todos os direitos reservados.</p>
      </div>
    </div>
  )
}

