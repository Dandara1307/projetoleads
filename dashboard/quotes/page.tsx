"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ArrowLeft, ChevronDown, Filter, Plus, Search, Download, FileText, Mail, Phone, Loader2 } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"

// Dados simulados de cotações
const quotesData = [
  {
    id: "COT-001",
    company: "Rede Farmácias Saúde Total",
    segment: "Farmácia",
    value: "R$ 4.850,00",
    sentDate: "2025-03-05",
    validUntil: "2025-03-20",
    urgency: "Alta",
    status: "Aguardando",
    contact: "Central de Atendimento",
    email: "atendimento@saudetotal.com.br",
    phone: "(11) 3886-0533",
    origin: "São Paulo - SP",
    destination: "Rio de Janeiro - RJ",
    website: "www.saudetotal.com.br",
  },
  {
    id: "COT-002",
    company: "Banco Nacional Financeiro",
    segment: "Banco",
    value: "R$ 7.320,00",
    sentDate: "2025-03-04",
    validUntil: "2025-03-19",
    urgency: "Crítica",
    status: "Em Negociação",
    contact: "Central de Logística",
    email: "logistica@bnf.com.br",
    phone: "(21) 3779-6333",
    origin: "Rio de Janeiro - RJ",
    destination: "Brasília - DF",
    website: "www.bnf.com.br",
  },
  {
    id: "COT-003",
    company: "TechMaster Eletrônicos",
    segment: "Eletrônicos",
    value: "R$ 5.150,00",
    sentDate: "2025-03-03",
    validUntil: "2025-03-18",
    urgency: "Média",
    status: "Aprovada",
    contact: "Departamento de Logística",
    email: "logistica@techmaster.com.br",
    phone: "(31) 3504-2706",
    origin: "Belo Horizonte - MG",
    destination: "São Paulo - SP",
    website: "www.techmaster.com.br",
  },
  {
    id: "COT-004",
    company: "Farmácias Bem Estar",
    segment: "Farmácia",
    value: "R$ 3.750,00",
    sentDate: "2025-03-02",
    validUntil: "2025-03-17",
    urgency: "Crítica",
    status: "Aprovada",
    contact: "Central de Distribuição",
    email: "cd@bemestar.com.br",
    phone: "(41) 3274-7400",
    origin: "Curitiba - PR",
    destination: "Florianópolis - SC",
    website: "www.bemestar.com.br",
  },
  {
    id: "COT-005",
    company: "Banco Investimentos Seguros",
    segment: "Banco",
    value: "R$ 2.980,00",
    sentDate: "2025-03-01",
    validUntil: "2025-03-16",
    urgency: "Alta",
    status: "Aguardando",
    contact: "Departamento de Logística",
    email: "logistica@bis.com.br",
    phone: "(51) 3323-2000",
    origin: "Porto Alegre - RS",
    destination: "Curitiba - PR",
    website: "www.bis.com.br",
  },
  {
    id: "COT-006",
    company: "Mega Eletrônicos",
    segment: "Eletrônicos",
    value: "R$ 8.450,00",
    sentDate: "2025-02-28",
    validUntil: "2025-03-15",
    urgency: "Alta",
    status: "Em Negociação",
    contact: "Departamento de Logística",
    email: "logistica@megaeletronicos.com.br",
    phone: "(19) 3210-9876",
    origin: "Campinas - SP",
    destination: "Rio de Janeiro - RJ",
    website: "www.megaeletronicos.com.br",
  },
  {
    id: "COT-007",
    company: "Indústria Têxtil Nordeste",
    segment: "Têxtil",
    value: "R$ 6.320,00",
    sentDate: "2025-02-27",
    validUntil: "2025-03-14",
    urgency: "Crítica",
    status: "Aguardando",
    contact: "Central de Logística",
    email: "logistica@textilenordeste.com.br",
    phone: "(81) 3231-4567",
    origin: "Recife - PE",
    destination: "São Paulo - SP",
    website: "www.textilenordeste.com.br",
  },
  {
    id: "COT-008",
    company: "Agro Alimentos Brasil",
    segment: "Alimentos",
    value: "R$ 12.750,00",
    sentDate: "2025-02-26",
    validUntil: "2025-03-13",
    urgency: "Média",
    status: "Em Negociação",
    contact: "Departamento de Logística",
    email: "logistica@agroalimentos.com.br",
    phone: "(71) 3345-6789",
    origin: "Salvador - BA",
    destination: "Belo Horizonte - MG",
    website: "www.agroalimentos.com.br",
  },
  {
    id: "COT-009",
    company: "Eletrônicos Inovação",
    segment: "Eletrônicos",
    value: "R$ 5.980,00",
    sentDate: "2025-02-25",
    validUntil: "2025-03-12",
    urgency: "Alta",
    status: "Aprovada",
    contact: "Central de Distribuição",
    email: "cd@inovacao.com.br",
    phone: "(85) 3678-9012",
    origin: "Fortaleza - CE",
    destination: "Recife - PE",
    website: "www.inovacao.com.br",
  },
  {
    id: "COT-010",
    company: "Móveis Modernos",
    segment: "Móveis",
    value: "R$ 9.850,00",
    sentDate: "2025-02-24",
    validUntil: "2025-03-11",
    urgency: "Crítica",
    status: "Aguardando",
    contact: "Departamento de Logística",
    email: "logistica@moveismodernos.com.br",
    phone: "(91) 3456-7890",
    origin: "Belém - PA",
    destination: "Manaus - AM",
    website: "www.moveismodernos.com.br",
  },
  {
    id: "COT-011",
    company: "Cooperativa Agrícola Central",
    segment: "Agrícola",
    value: "R$ 15.320,00",
    sentDate: "2025-02-23",
    validUntil: "2025-03-10",
    urgency: "Alta",
    status: "Em Negociação",
    contact: "Central de Logística",
    email: "logistica@coopagricola.com.br",
    phone: "(48) 3789-0123",
    origin: "Florianópolis - SC",
    destination: "Porto Alegre - RS",
    website: "www.coopagricola.com.br",
  },
  {
    id: "COT-012",
    company: "TechStore Eletrônicos",
    segment: "Eletrônicos",
    value: "R$ 6.750,00",
    sentDate: "2025-02-22",
    validUntil: "2025-03-09",
    urgency: "Média",
    status: "Aguardando",
    contact: "Departamento de Logística",
    email: "logistica@techstore.com.br",
    phone: "(27) 3890-1234",
    origin: "Vitória - ES",
    destination: "Rio de Janeiro - RJ",
    website: "www.techstore.com.br",
  },
  {
    id: "COT-013",
    company: "Indústria Química Brasileira",
    segment: "Química",
    value: "R$ 11.450,00",
    sentDate: "2025-02-21",
    validUntil: "2025-03-08",
    urgency: "Crítica",
    status: "Em Negociação",
    contact: "Central de Logística",
    email: "logistica@quimicabr.com.br",
    phone: "(62) 3123-4567",
    origin: "Goiânia - GO",
    destination: "Brasília - DF",
    website: "www.quimicabr.com.br",
  },
  {
    id: "COT-014",
    company: "Calçados Conforto",
    segment: "Calçados",
    value: "R$ 4.980,00",
    sentDate: "2025-02-20",
    validUntil: "2025-03-07",
    urgency: "Alta",
    status: "Aprovada",
    contact: "Departamento de Logística",
    email: "logistica@calcadosconforto.com.br",
    phone: "(82) 3012-3456",
    origin: "Maceió - AL",
    destination: "Salvador - BA",
    website: "www.calcadosconforto.com.br",
  },
  {
    id: "COT-015",
    company: "Distribuidora de Bebidas Nacional",
    segment: "Bebidas",
    value: "R$ 13.250,00",
    sentDate: "2025-02-19",
    validUntil: "2025-03-06",
    urgency: "Média",
    status: "Aguardando",
    contact: "Central de Distribuição",
    email: "cd@bebidasnacional.com.br",
    phone: "(92) 3901-2345",
    origin: "Manaus - AM",
    destination: "Belém - PA",
    website: "www.bebidasnacional.com.br",
  },
]

export default function QuotesPage() {
  const [quotes, setQuotes] = useState(quotesData)
  const [filteredQuotes, setFilteredQuotes] = useState(quotesData)
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedSegment, setSelectedSegment] = useState("all")
  const [selectedUrgency, setSelectedUrgency] = useState("all")
  const [selectedStatus, setSelectedStatus] = useState("all")
  const [isExporting, setIsExporting] = useState(false)
  const [showPdfPreview, setShowPdfPreview] = useState(false)
  const [selectedQuote, setSelectedQuote] = useState(null)
  const [showQuoteDetails, setShowQuoteDetails] = useState(false)
  const [showNewQuoteDialog, setShowNewQuoteDialog] = useState(false)

  // Filtrar cotações quando os filtros mudarem
  useEffect(() => {
    let filtered = [...quotesData]

    // Filtrar por termo de busca
    if (searchTerm) {
      filtered = filtered.filter(
        (quote) =>
          quote.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
          quote.contact.toLowerCase().includes(searchTerm.toLowerCase()) ||
          quote.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
          quote.id.toLowerCase().includes(searchTerm.toLowerCase()),
      )
    }

    // Filtrar por segmento
    if (selectedSegment !== "all") {
      filtered = filtered.filter((quote) => quote.segment === selectedSegment)
    }

    // Filtrar por urgência
    if (selectedUrgency !== "all") {
      filtered = filtered.filter((quote) => quote.urgency === selectedUrgency)
    }

    // Filtrar por status
    if (selectedStatus !== "all") {
      filtered = filtered.filter((quote) => quote.status === selectedStatus)
    }

    setFilteredQuotes(filtered)
  }, [searchTerm, selectedSegment, selectedUrgency, selectedStatus])

  const getStatusColor = (status) => {
    switch (status) {
      case "Aguardando":
        return "bg-yellow-500"
      case "Em Negociação":
        return "bg-purple-500"
      case "Aprovada":
        return "bg-green-500"
      case "Recusada":
        return "bg-red-600"
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

  const handleExportToExcel = () => {
    setIsExporting(true)

    // Simular exportação
    setTimeout(() => {
      try {
        // Em um ambiente real, isso usaria uma biblioteca como xlsx para gerar o arquivo Excel
        const headers = [
          "ID",
          "Empresa",
          "Segmento",
          "Valor",
          "Data de Envio",
          "Validade",
          "Origem",
          "Destino",
          "Urgência",
          "Status",
          "Contato",
          "Email",
          "Telefone",
        ]

        // Preparar dados para exportação
        const data = filteredQuotes.map((quote) => [
          quote.id,
          quote.company,
          quote.segment,
          quote.value,
          quote.sentDate,
          quote.validUntil,
          quote.origin,
          quote.destination,
          quote.urgency,
          quote.status,
          quote.contact,
          quote.email,
          quote.phone,
        ])

        // Criar CSV
        const csvContent = [headers.join(","), ...data.map((row) => row.map((cell) => `"${cell}"`).join(","))].join(
          "\n",
        )

        // Criar blob e link para download
        const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" })
        const url = URL.createObjectURL(blob)

        // Criar link para download
        const link = document.createElement("a")
        link.href = url
        link.setAttribute("download", `cotacoes_${new Date().toISOString().split("T")[0]}.csv`)
        document.body.appendChild(link)
        link.click()
        document.body.removeChild(link)

        setIsExporting(false)
      } catch (error) {
        console.error("Erro ao exportar para Excel:", error)
        setIsExporting(false)
      }
    }, 2000)
  }

  const handleExportToPDF = () => {
    setShowPdfPreview(true)

    // Simular geração de PDF
    setTimeout(() => {
      // Em um ambiente real, isso usaria uma biblioteca como jsPDF para gerar o PDF
      const pdfBlob = new Blob(["PDF content"], { type: "application/pdf" })
      const url = URL.createObjectURL(pdfBlob)

      // Criar link para download
      const link = document.createElement("a")
      link.href = url
      link.setAttribute("download", `relatorio_cotacoes_${new Date().toISOString().split("T")[0]}.pdf`)
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)

      setShowPdfPreview(false)
    }, 2000)
  }

  const handleViewQuote = (quote) => {
    setSelectedQuote(quote)
    setShowQuoteDetails(true)
  }

  const handleContactClient = (quote) => {
    window.open(
      `mailto:${quote.email}?subject=Cotação%20${quote.id}%20-%20Transportadora%20Leads&body=Prezados%20Srs.%20da%20${encodeURIComponent(quote.company)},%0A%0ASegue%20informações%20sobre%20a%20cotação%20${quote.id}.%0A%0AValor:%20${quote.value}%0AValidade:%20${quote.validUntil}%0AOrigem:%20${encodeURIComponent(quote.origin)}%0ADestino:%20${encodeURIComponent(quote.destination)}%0A%0AAtenciosamente,%0ADandara%20Silva%0ATel:%2011%20983861551`,
    )
  }

  const handleCallClient = (quote) => {
    window.open(`tel:${quote.phone.replace(/\D/g, "")}`)
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
          <h1 className="text-2xl font-bold">Gerenciamento de Cotações</h1>
          <p className="text-sm text-muted-foreground">Visualize e gerencie todas as cotações enviadas aos leads</p>
        </div>
      </div>

      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle>Todas as Cotações</CardTitle>
            <CardDescription>Total de {filteredQuotes.length} cotações encontradas</CardDescription>
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row justify-between gap-4 mb-6">
            <div className="flex flex-col md:flex-row gap-2">
              <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Buscar cotações..."
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
                  <SelectItem value="Aguardando">Aguardando</SelectItem>
                  <SelectItem value="Em Negociação">Em Negociação</SelectItem>
                  <SelectItem value="Aprovada">Aprovada</SelectItem>
                  <SelectItem value="Recusada">Recusada</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" className="gap-2">
                <Filter className="h-4 w-4" />
                Filtros Avançados
              </Button>
              <Button className="gap-2" onClick={() => setShowNewQuoteDialog(true)}>
                <Plus className="h-4 w-4" />
                Nova Cotação
              </Button>
            </div>
          </div>

          <div className="flex gap-2 mb-4">
            <Button variant="outline" className="gap-2" onClick={handleExportToExcel} disabled={isExporting}>
              {isExporting ? <Loader2 className="h-4 w-4 animate-spin" /> : <Download className="h-4 w-4" />}
              Exportar Excel
            </Button>
            <Button variant="outline" className="gap-2" onClick={handleExportToPDF} disabled={showPdfPreview}>
              {showPdfPreview ? <Loader2 className="h-4 w-4 animate-spin" /> : <FileText className="h-4 w-4" />}
              Exportar PDF
            </Button>
          </div>

          <div className="overflow-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>ID</TableHead>
                  <TableHead>Empresa</TableHead>
                  <TableHead>Segmento</TableHead>
                  <TableHead>Valor</TableHead>
                  <TableHead>Data de Envio</TableHead>
                  <TableHead>Validade</TableHead>
                  <TableHead>Origem/Destino</TableHead>
                  <TableHead>Urgência</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Ações</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredQuotes.map((quote) => (
                  <TableRow key={quote.id}>
                    <TableCell className="font-medium">{quote.id}</TableCell>
                    <TableCell>{quote.company}</TableCell>
                    <TableCell>{quote.segment}</TableCell>
                    <TableCell>{quote.value}</TableCell>
                    <TableCell>{new Date(quote.sentDate).toLocaleDateString("pt-BR")}</TableCell>
                    <TableCell>{new Date(quote.validUntil).toLocaleDateString("pt-BR")}</TableCell>
                    <TableCell>
                      <div className="text-xs">
                        <div>{quote.origin}</div>
                        <div className="text-muted-foreground">→ {quote.destination}</div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge className={`${getUrgencyColor(quote.urgency)} text-white`}>{quote.urgency}</Badge>
                    </TableCell>
                    <TableCell>
                      <Badge className={`${getStatusColor(quote.status)} text-white`}>{quote.status}</Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex gap-1">
                        <Button variant="ghost" size="icon" onClick={() => handleViewQuote(quote)}>
                          <ChevronDown className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon" onClick={() => handleContactClient(quote)}>
                          <Mail className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon" onClick={() => handleCallClient(quote)}>
                          <Phone className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* Modal para visualizar detalhes da cotação */}
      <Dialog open={showQuoteDetails} onOpenChange={setShowQuoteDetails}>
        <DialogContent className="sm:max-w-[600px]">
          {selectedQuote && (
            <>
              <DialogHeader>
                <DialogTitle>Detalhes da Cotação {selectedQuote.id}</DialogTitle>
                <DialogDescription>Informações completas sobre a cotação</DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <h3 className="text-sm font-semibold">Empresa</h3>
                    <p className="text-sm">{selectedQuote.company}</p>
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold">Segmento</h3>
                    <p className="text-sm">{selectedQuote.segment}</p>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <h3 className="text-sm font-semibold">Valor</h3>
                    <p className="text-sm font-bold">{selectedQuote.value}</p>
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold">Status</h3>
                    <Badge className={`${getStatusColor(selectedQuote.status)} text-white`}>
                      {selectedQuote.status}
                    </Badge>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <h3 className="text-sm font-semibold">Data de Envio</h3>
                    <p className="text-sm">{new Date(selectedQuote.sentDate).toLocaleDateString("pt-BR")}</p>
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold">Validade</h3>
                    <p className="text-sm">{new Date(selectedQuote.validUntil).toLocaleDateString("pt-BR")}</p>
                  </div>
                </div>
                <div>
                  <h3 className="text-sm font-semibold">Rota</h3>
                  <p className="text-sm">
                    {selectedQuote.origin} → {selectedQuote.destination}
                  </p>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <h3 className="text-sm font-semibold">Contato</h3>
                    <p className="text-sm">{selectedQuote.contact}</p>
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold">Urgência</h3>
                    <Badge className={`${getUrgencyColor(selectedQuote.urgency)} text-white`}>
                      {selectedQuote.urgency}
                    </Badge>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <h3 className="text-sm font-semibold">Email</h3>
                    <a href={`mailto:${selectedQuote.email}`} className="text-sm text-blue-600 hover:underline">
                      {selectedQuote.email}
                    </a>
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold">Telefone</h3>
                    <a href={`tel:${selectedQuote.phone}`} className="text-sm text-blue-600 hover:underline">
                      {selectedQuote.phone}
                    </a>
                  </div>
                </div>
                <div>
                  <h3 className="text-sm font-semibold">Website</h3>
                  <a
                    href={`https://${selectedQuote.website}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-blue-600 hover:underline"
                  >
                    {selectedQuote.website}
                  </a>
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setShowQuoteDetails(false)}>
                  Fechar
                </Button>
                <Button onClick={() => handleContactClient(selectedQuote)}>Enviar Email</Button>
              </DialogFooter>
            </>
          )}
        </DialogContent>
      </Dialog>

      {/* Modal para criar nova cotação */}
      <Dialog open={showNewQuoteDialog} onOpenChange={setShowNewQuoteDialog}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Nova Cotação</DialogTitle>
            <DialogDescription>Preencha os dados para criar uma nova cotação</DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="company">Empresa</Label>
                <Input id="company" placeholder="Nome da empresa" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="segment">Segmento</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione o segmento" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Farmácia">Farmácia</SelectItem>
                    <SelectItem value="Banco">Banco</SelectItem>
                    <SelectItem value="Eletrônicos">Eletrônicos</SelectItem>
                    <SelectItem value="Têxtil">Têxtil</SelectItem>
                    <SelectItem value="Alimentos">Alimentos</SelectItem>
                    <SelectItem value="Móveis">Móveis</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="contact">Contato</Label>
                <Input id="contact" placeholder="Nome do contato" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" placeholder="email@empresa.com" />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="phone">Telefone</Label>
                <Input id="phone" placeholder="(00) 00000-0000" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="urgency">Urgência</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione a urgência" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Crítica">Crítica</SelectItem>
                    <SelectItem value="Alta">Alta</SelectItem>
                    <SelectItem value="Média">Média</SelectItem>
                    <SelectItem value="Baixa">Baixa</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="origin">Origem</Label>
                <Input id="origin" placeholder="Cidade - UF" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="destination">Destino</Label>
                <Input id="destination" placeholder="Cidade - UF" />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="value">Valor</Label>
                <Input id="value" placeholder="R$ 0,00" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="validity">Validade</Label>
                <Input id="validity" type="date" />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="details">Detalhes da Cotação</Label>
              <Textarea id="details" placeholder="Descreva os detalhes da cotação" />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowNewQuoteDialog(false)}>
              Cancelar
            </Button>
            <Button
              onClick={() => {
                alert("Cotação criada com sucesso!")
                setShowNewQuoteDialog(false)
              }}
            >
              Criar Cotação
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <div className="mt-6 text-center text-xs text-muted-foreground">
        <p>© Dandara Silva 2025. Todos os direitos reservados.</p>
      </div>
    </div>
  )
}

