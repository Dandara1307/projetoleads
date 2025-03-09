"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import {
  Building,
  Download,
  Edit,
  Eye,
  Filter,
  MoreHorizontal,
  Phone,
  Plus,
  Search,
  Send,
  Trash,
  User,
  AlertTriangle,
  Clock,
} from "lucide-react"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

// Banco de dados de empresas para simulação
const companiesDatabase = [
  {
    id: 1,
    company: "Rede Farmácias Saúde Total",
    contact: "Carlos Silva",
    phone: "(11) 98765-4321",
    email: "carlos@saudetotal.com.br",
    address: "Av. Paulista, 1500, São Paulo - SP",
    segment: "Farmácia",
    volume: "1.5 ton",
    frequency: "Diária",
    status: "Novo",
    date: "2023-06-15",
    urgency: "Alta",
    urgencyReason: "Medicamentos com prazo de validade próximo",
    source: "LinkedIn",
    notes: "Rede de farmácias com necessidade urgente de transporte de medicamentos entre unidades.",
  },
  {
    id: 2,
    company: "Banco Nacional Financeiro",
    contact: "Ana Oliveira",
    phone: "(21) 97654-3210",
    email: "ana@bnf.com.br",
    address: "Rua do Comércio, 500, Rio de Janeiro - RJ",
    segment: "Banco",
    volume: "0.8 ton",
    frequency: "Semanal",
    status: "Cotação Enviada",
    date: "2023-06-14",
    urgency: "Crítica",
    urgencyReason: "Transporte de valores entre agências",
    source: "Casa dos Dados",
    notes: "Banco com necessidade de transporte seguro de valores e documentos entre agências.",
  },
  {
    id: 3,
    company: "TechMaster Eletrônicos",
    contact: "Roberto Almeida",
    phone: "(31) 96543-2109",
    email: "roberto@techmaster.com.br",
    address: "Av. Tecnológica, 200, Belo Horizonte - MG",
    segment: "Eletrônicos",
    volume: "3 ton",
    frequency: "Semanal",
    status: "Negociação",
    date: "2023-06-13",
    urgency: "Média",
    urgencyReason: "Lançamento de novos produtos",
    source: "Google API",
    notes: "Empresa de eletrônicos com lançamento de produtos em breve, necessitando distribuição rápida.",
  },
  {
    id: 4,
    company: "Farmácias Bem Estar",
    contact: "Juliana Costa",
    phone: "(41) 95432-1098",
    email: "juliana@bemestar.com.br",
    address: "Rua das Farmácias, 100, Curitiba - PR",
    segment: "Farmácia",
    volume: "1 ton",
    frequency: "Diária",
    status: "Fechado",
    date: "2023-06-12",
    urgency: "Crítica",
    urgencyReason: "Transporte de vacinas com refrigeração",
    source: "LinkedIn",
    notes: "Farmácia com necessidade de transporte refrigerado para vacinas e medicamentos sensíveis.",
  },
  {
    id: 5,
    company: "Banco Investimentos Seguros",
    contact: "Marcos Pereira",
    phone: "(51) 94321-0987",
    email: "marcos@bis.com.br",
    address: "Av. Financeira, 300, Porto Alegre - RS",
    segment: "Banco",
    volume: "0.5 ton",
    frequency: "Diária",
    status: "Novo",
    date: "2023-06-11",
    urgency: "Alta",
    urgencyReason: "Transporte de documentos confidenciais",
    source: "Casa dos Dados",
    notes: "Banco com necessidade de transporte seguro de documentos confidenciais entre filiais.",
  },
  {
    id: 6,
    company: "Mega Eletrônicos",
    contact: "Patricia Santos",
    phone: "(19) 93210-9876",
    email: "patricia@megaeletronicos.com.br",
    address: "Rua da Tecnologia, 400, Campinas - SP",
    segment: "Eletrônicos",
    volume: "4 ton",
    frequency: "Semanal",
    status: "Novo",
    urgency: "Alta",
    urgencyReason: "Reposição de estoque para Black Friday",
    source: "Google API",
    notes: "Loja de eletrônicos precisando de transporte urgente para reposição de estoque.",
  },
  {
    id: 7,
    company: "Farmácias Popular Plus",
    contact: "Fernando Gomes",
    phone: "(81) 92109-8765",
    email: "fernando@popularplus.com.br",
    address: "Av. da Saúde, 250, Recife - PE",
    segment: "Farmácia",
    volume: "2 ton",
    frequency: "Diária",
    status: "Cotação Enviada",
    urgency: "Crítica",
    urgencyReason: "Distribuição de medicamentos controlados",
    source: "LinkedIn",
    notes: "Rede de farmácias com necessidade de transporte de medicamentos controlados.",
  },
  {
    id: 8,
    company: "Banco Digital Futuro",
    contact: "Camila Rodrigues",
    phone: "(71) 91098-7654",
    email: "camila@digitalfuturo.com.br",
    address: "Rua Financeira, 150, Salvador - BA",
    segment: "Banco",
    volume: "0.3 ton",
    frequency: "Semanal",
    status: "Negociação",
    urgency: "Média",
    urgencyReason: "Entrega de cartões e tokens",
    source: "Casa dos Dados",
    notes: "Banco digital com necessidade de transporte de cartões e dispositivos de segurança.",
  },
]

// Simulação de integração com APIs reais
const apiIntegrations = [
  { name: "LinkedIn API", status: "Conectado", lastSync: "Há 5 minutos" },
  { name: "Casa dos Dados", status: "Conectado", lastSync: "Há 12 minutos" },
  { name: "Google Maps API", status: "Conectado", lastSync: "Há 3 minutos" },
  { name: "Google Places API", status: "Conectado", lastSync: "Há 7 minutos" },
]

export default function LeadsPage() {
  const [openNewLead, setOpenNewLead] = useState(false)
  const [openQuote, setOpenQuote] = useState(false)
  const [selectedLead, setSelectedLead] = useState(null)
  const [leads, setLeads] = useState(companiesDatabase.slice(0, 5))
  const [newLeadAlert, setNewLeadAlert] = useState(false)
  const [lastUpdated, setLastUpdated] = useState(new Date())

  // Função para obter novos leads aleatórios
  const getRandomLeads = () => {
    const randomIndexes = []
    while (randomIndexes.length < 5) {
      const randomIndex = Math.floor(Math.random() * companiesDatabase.length)
      if (!randomIndexes.includes(randomIndex)) {
        randomIndexes.push(randomIndex)
      }
    }

    return randomIndexes.map((index) => {
      // Criar uma cópia do lead com um novo ID para simular um novo lead
      const lead = { ...companiesDatabase[index] }
      lead.id = Date.now() + Math.floor(Math.random() * 1000)
      lead.date = new Date().toISOString().split("T")[0]
      return lead
    })
  }

  // Atualizar leads a cada 5 segundos
  useEffect(() => {
    const interval = setInterval(() => {
      const newLeads = getRandomLeads()
      setLeads(newLeads)
      setNewLeadAlert(true)
      setLastUpdated(new Date())

      // Remover o alerta após 2 segundos
      setTimeout(() => {
        setNewLeadAlert(false)
      }, 2000)
    }, 5000)

    return () => clearInterval(interval)
  }, [])

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

  const handleViewLead = (lead) => {
    setSelectedLead(lead)
  }

  const handleCreateQuote = (lead) => {
    setSelectedLead(lead)
    setOpenQuote(true)
  }

  return (
    <div className="container mx-auto p-6">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Gestão de Leads Urgentes</h1>
        <Button onClick={() => setOpenNewLead(true)} className="gap-2">
          <Plus className="h-4 w-4" />
          Novo Lead
        </Button>
      </div>

      {/* Alerta de novos leads */}
      {newLeadAlert && (
        <div className="bg-primary/10 border border-primary/20 rounded-md p-3 mb-6 flex items-center justify-between animate-pulse">
          <div className="flex items-center gap-2">
            <AlertTriangle className="h-5 w-5 text-primary" />
            <span className="font-medium">Novos leads urgentes detectados!</span>
          </div>
          <span className="text-sm text-muted-foreground">Atualizado em: {lastUpdated.toLocaleTimeString()}</span>
        </div>
      )}

      <Tabs defaultValue="all" className="space-y-6">
        <div className="flex items-center justify-between">
          <TabsList>
            <TabsTrigger value="all">Todos</TabsTrigger>
            <TabsTrigger value="farmacia">Farmácias</TabsTrigger>
            <TabsTrigger value="banco">Bancos</TabsTrigger>
            <TabsTrigger value="eletronicos">Eletrônicos</TabsTrigger>
            <TabsTrigger value="critica">Urgência Crítica</TabsTrigger>
          </TabsList>
          <div className="flex items-center gap-2">
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input type="search" placeholder="Buscar leads..." className="w-[250px] pl-8" />
            </div>
            <Button variant="outline" size="icon">
              <Filter className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="icon">
              <Download className="h-4 w-4" />
            </Button>
          </div>
        </div>

        <TabsContent value="all" className="space-y-6">
          <Card>
            <CardContent className="p-0">
              <div className="p-4 flex items-center justify-between bg-muted/30 border-b">
                <span className="text-sm font-medium">Atualização automática a cada 5 segundos</span>
                <span className="text-sm text-muted-foreground">
                  Última atualização: {lastUpdated.toLocaleTimeString()}
                </span>
              </div>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Empresa</TableHead>
                    <TableHead>Segmento</TableHead>
                    <TableHead>Contato</TableHead>
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
                    <TableRow key={lead.id} className={newLeadAlert ? "bg-primary/5" : ""}>
                      <TableCell className="font-medium">{lead.company}</TableCell>
                      <TableCell>{lead.segment}</TableCell>
                      <TableCell>{lead.contact}</TableCell>
                      <TableCell>{lead.email}</TableCell>
                      <TableCell>{lead.volume}</TableCell>
                      <TableCell>
                        <div className="text-xs">
                          <div>{lead.origin || "São Paulo - SP"}</div>
                          <div className="text-muted-foreground">→ {lead.destination || "Rio de Janeiro - RJ"}</div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge className={`${getUrgencyColor(lead.urgency)} text-white`}>{lead.urgency}</Badge>
                      </TableCell>
                      <TableCell>
                        <Badge className={`${getStatusColor(lead.status)} text-white`}>{lead.status}</Badge>
                      </TableCell>
                      <TableCell>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuLabel>Ações</DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem onClick={() => handleViewLead(lead)}>
                              <Eye className="mr-2 h-4 w-4" />
                              Ver Detalhes
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => handleCreateQuote(lead)}>
                              <Send className="mr-2 h-4 w-4" />
                              Criar Cotação
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Edit className="mr-2 h-4 w-4" />
                              Editar
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem className="text-red-600">
                              <Trash className="mr-2 h-4 w-4" />
                              Excluir
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
          <Card className="mt-6">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold">Integração com APIs Externas</h3>
                <Button variant="outline" size="sm">
                  Configurar APIs
                </Button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                {apiIntegrations.map((api) => (
                  <div key={api.name} className="flex items-center justify-between p-3 border rounded-md">
                    <div className="flex items-center gap-2">
                      <div className="h-3 w-3 rounded-full bg-green-500"></div>
                      <span className="font-medium">{api.name}</span>
                    </div>
                    <div className="text-sm text-muted-foreground">
                      {api.status} • {api.lastSync}
                    </div>
                  </div>
                ))}
              </div>
              <div className="border rounded-md p-4">
                <div className="flex items-center justify-between mb-4">
                  <h4 className="font-medium">Localização em Tempo Real</h4>
                  <Badge>Ativo</Badge>
                </div>
                <div className="aspect-video bg-muted rounded-md flex items-center justify-center">
                  <div className="text-center">
                    <p className="text-muted-foreground mb-2">Mapa de localização de clientes potenciais</p>
                    <p className="text-xs text-muted-foreground">Integrado com Google Maps API</p>
                  </div>
                </div>
                <div className="mt-4 text-sm text-muted-foreground">
                  Localizando empresas em tempo real com base em critérios de urgência e segmento.
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Conteúdo para as outras abas seria semelhante, filtrando por segmento */}
        <TabsContent value="farmacia">
          <Card>
            <CardContent className="p-0">
              <div className="p-4 flex items-center justify-between bg-muted/30 border-b">
                <span className="text-sm font-medium">Farmácias com necessidades urgentes</span>
                <span className="text-sm text-muted-foreground">
                  Última atualização: {lastUpdated.toLocaleTimeString()}
                </span>
              </div>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Empresa</TableHead>
                    <TableHead>Contato</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Volume</TableHead>
                    <TableHead>Urgência</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Ações</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {leads
                    .filter((lead) => lead.segment === "Farmácia")
                    .map((lead) => (
                      <TableRow key={lead.id} className={newLeadAlert ? "bg-primary/5" : ""}>
                        <TableCell className="font-medium">{lead.company}</TableCell>
                        <TableCell>{lead.contact}</TableCell>
                        <TableCell>{lead.email}</TableCell>
                        <TableCell>{lead.volume}</TableCell>
                        <TableCell>
                          <Badge className={`${getUrgencyColor(lead.urgency)} text-white`}>{lead.urgency}</Badge>
                        </TableCell>
                        <TableCell>
                          <Badge className={`${getStatusColor(lead.status)} text-white`}>{lead.status}</Badge>
                        </TableCell>
                        <TableCell>
                          <Button variant="ghost" size="icon">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Modal para adicionar novo lead */}
      <Dialog open={openNewLead} onOpenChange={setOpenNewLead}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Adicionar Novo Lead</DialogTitle>
            <DialogDescription>Preencha os dados do novo lead para adicionar ao sistema.</DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="company">Empresa</Label>
                <div className="relative">
                  <Building className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input id="company" placeholder="Nome da empresa" className="pl-8" />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="contact">Contato</Label>
                <div className="relative">
                  <User className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input id="contact" placeholder="Nome do contato" className="pl-8" />
                </div>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="phone">Telefone</Label>
                <div className="relative">
                  <Phone className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input id="phone" placeholder="(00) 00000-0000" className="pl-8" />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" placeholder="email@empresa.com" />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="address">Endereço</Label>
              <Input id="address" placeholder="Endereço completo" />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="segment">Segmento</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione o segmento" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="farmacia">Farmácia</SelectItem>
                    <SelectItem value="banco">Banco</SelectItem>
                    <SelectItem value="eletronicos">Eletrônicos</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="source">Fonte</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione a fonte" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="linkedin">LinkedIn</SelectItem>
                    <SelectItem value="casadosdados">Casa dos Dados</SelectItem>
                    <SelectItem value="googleapi">Google API</SelectItem>
                    <SelectItem value="indicacao">Indicação</SelectItem>
                    <SelectItem value="outro">Outra</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="volume">Volume</Label>
                <Input id="volume" placeholder="Ex: 2.5 ton" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="frequency">Frequência</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione a frequência" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="daily">Diária</SelectItem>
                    <SelectItem value="weekly">Semanal</SelectItem>
                    <SelectItem value="biweekly">Quinzenal</SelectItem>
                    <SelectItem value="monthly">Mensal</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="urgency">Nível de Urgência</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione a urgência" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="critica">Crítica</SelectItem>
                    <SelectItem value="alta">Alta</SelectItem>
                    <SelectItem value="media">Média</SelectItem>
                    <SelectItem value="baixa">Baixa</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="urgencyReason">Motivo da Urgência</Label>
                <Input id="urgencyReason" placeholder="Ex: Transporte de medicamentos" />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="notes">Observações</Label>
              <Textarea id="notes" placeholder="Informações adicionais sobre o lead" />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setOpenNewLead(false)}>
              Cancelar
            </Button>
            <Button>Salvar Lead</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Modal para criar cotação */}
      <Dialog open={openQuote} onOpenChange={setOpenQuote}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Criar Cotação Urgente</DialogTitle>
            <DialogDescription>{selectedLead && `Cotação para ${selectedLead.company}`}</DialogDescription>
          </DialogHeader>
          {selectedLead && (
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Empresa</Label>
                  <Input value={selectedLead.company} readOnly />
                </div>
                <div className="space-y-2">
                  <Label>Contato</Label>
                  <Input value={selectedLead.contact} readOnly />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Segmento</Label>
                  <Input value={selectedLead.segment} readOnly />
                </div>
                <div className="space-y-2">
                  <Label>Urgência</Label>
                  <div className="flex items-center gap-2">
                    <Badge className={`${getUrgencyColor(selectedLead.urgency)} text-white`}>
                      {selectedLead.urgency}
                    </Badge>
                    <span className="text-sm text-muted-foreground">{selectedLead.urgencyReason}</span>
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="service-type">Tipo de Serviço</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione o serviço" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="transport">Transporte</SelectItem>
                      <SelectItem value="storage">Armazenagem</SelectItem>
                      <SelectItem value="handling">Manuseio</SelectItem>
                      <SelectItem value="collection">Coleta</SelectItem>
                      <SelectItem value="complete">Serviço Completo</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="volume">Volume</Label>
                  <Input id="volume" defaultValue={selectedLead.volume} />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="origin">Origem</Label>
                  <Input id="origin" placeholder="Local de origem" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="destination">Destino</Label>
                  <Input id="destination" placeholder="Local de destino" />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="price">Valor</Label>
                  <Input id="price" placeholder="R$ 0,00" />
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
              <div className="flex items-center gap-2 p-2 bg-red-50 border border-red-200 rounded-md">
                <AlertTriangle className="h-5 w-5 text-red-500" />
                <p className="text-sm text-red-600">
                  Este lead requer atenção urgente. Priorize o contato e a cotação.
                </p>
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setOpenQuote(false)}>
              Cancelar
            </Button>
            <Button>Enviar Cotação Urgente</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Modal para visualizar detalhes do lead */}
      {selectedLead && (
        <Dialog open={!!selectedLead && !openQuote} onOpenChange={() => setSelectedLead(null)}>
          <DialogContent className="sm:max-w-[600px]">
            <DialogHeader>
              <DialogTitle>Detalhes do Lead</DialogTitle>
              <DialogDescription>Informações completas sobre o lead selecionado</DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h3 className="font-semibold">Empresa</h3>
                  <p>{selectedLead.company}</p>
                </div>
                <div>
                  <h3 className="font-semibold">Segmento</h3>
                  <p>{selectedLead.segment}</p>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h3 className="font-semibold">Contato</h3>
                  <p>{selectedLead.contact}</p>
                </div>
                <div>
                  <h3 className="font-semibold">Telefone</h3>
                  <p>{selectedLead.phone}</p>
                </div>
              </div>
              <div>
                <h3 className="font-semibold">Email</h3>
                <p>{selectedLead.email}</p>
              </div>
              <div>
                <h3 className="font-semibold">Endereço</h3>
                <p>{selectedLead.address}</p>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h3 className="font-semibold">Volume</h3>
                  <p>{selectedLead.volume}</p>
                </div>
                <div>
                  <h3 className="font-semibold">Frequência</h3>
                  <p>{selectedLead.frequency}</p>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h3 className="font-semibold">Urgência</h3>
                  <Badge className={`${getUrgencyColor(selectedLead.urgency)} text-white`}>
                    {selectedLead.urgency}
                  </Badge>
                </div>
                <div>
                  <h3 className="font-semibold">Status</h3>
                  <Badge className={`${getStatusColor(selectedLead.status)} text-white`}>{selectedLead.status}</Badge>
                </div>
              </div>
              <div>
                <h3 className="font-semibold">Motivo da Urgência</h3>
                <p>{selectedLead.urgencyReason}</p>
              </div>
              <div>
                <h3 className="font-semibold">Data de Cadastro</h3>
                <p>{new Date(selectedLead.date).toLocaleDateString("pt-BR")}</p>
              </div>
              <div>
                <h3 className="font-semibold">Fonte</h3>
                <p>{selectedLead.source}</p>
              </div>
              <div>
                <h3 className="font-semibold">Observações</h3>
                <p>{selectedLead.notes}</p>
              </div>
              {selectedLead.urgency === "Crítica" || selectedLead.urgency === "Alta" ? (
                <div className="flex items-center gap-2 p-2 bg-red-50 border border-red-200 rounded-md">
                  <AlertTriangle className="h-5 w-5 text-red-500" />
                  <p className="text-sm text-red-600">
                    Este lead requer atenção urgente. Priorize o contato e a cotação.
                  </p>
                </div>
              ) : null}
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setSelectedLead(null)}>
                Fechar
              </Button>
              <Button
                onClick={() => {
                  setOpenQuote(true)
                }}
              >
                Criar Cotação Urgente
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}

      {/* Bot de Contato Automático */}
      <Dialog open={false}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Bot de Contato Automático</DialogTitle>
            <DialogDescription>Enviando mensagens automáticas para leads urgentes</DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="flex items-center gap-2 p-3 bg-green-50 border border-green-200 rounded-md">
              <Clock className="h-5 w-5 text-green-500" />
              <div>
                <p className="font-medium">Contato automático em andamento</p>
                <p className="text-sm text-muted-foreground">
                  O bot está oferecendo nossos serviços de transporte, manuseio, coleta e armazenagem para leads
                  urgentes.
                </p>
              </div>
            </div>
            <div className="border rounded-md p-4 max-h-[200px] overflow-auto space-y-3">
              <div className="flex flex-col gap-1">
                <span className="text-xs text-muted-foreground">12:45</span>
                <div className="bg-muted p-3 rounded-md text-sm">
                  Enviando email para carlos@saudetotal.com.br: Apresentação de serviços de transporte urgente para
                  medicamentos
                </div>
              </div>
              <div className="flex flex-col gap-1">
                <span className="text-xs text-muted-foreground">12:44</span>
                <div className="bg-muted p-3 rounded-md text-sm">
                  Enviando WhatsApp para (21) 97654-3210: Proposta de serviço de transporte seguro para valores
                  bancários
                </div>
              </div>
              <div className="flex flex-col gap-1">
                <span className="text-xs text-muted-foreground">12:42</span>
                <div className="bg-muted p-3 rounded-md text-sm">
                  Enviando email para roberto@techmaster.com.br: Cotação para transporte de produtos eletrônicos
                </div>
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline">Pausar Bot</Button>
            <Button>Configurar Mensagens</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}

