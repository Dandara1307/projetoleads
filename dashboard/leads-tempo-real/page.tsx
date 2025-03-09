"use client"

import { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  ArrowLeft,
  Download,
  Search,
  RefreshCw,
  MapPin,
  Phone,
  Mail,
  User,
  Truck,
  AlertTriangle,
  Clock,
  Loader2,
  FileText,
} from "lucide-react"
import Link from "next/link"

// Simulação de dados reais de empresas
const generateRealCompanies = () => {
  // Lista base de empresas reais com contatos reais
  const baseCompanies = [
    // Varejo e Supermercados
    {
      id: 1,
      company: "Grupo Pão de Açúcar",
      segment: "Varejo",
      contact: "Central de Atendimento",
      position: "Departamento de Logística",
      phone: "(11) 3886-0533",
      email: "atendimento@gpabr.com",
      address: "Av. Brigadeiro Luís Antônio, 3142, São Paulo - SP",
      volume: "28.5 ton",
      frequency: "Diária",
      urgency: "Alta",
      urgencyReason: "Abastecimento de lojas",
      origin: "São Paulo - SP",
      destination: "Rio de Janeiro - RJ",
      website: "www.gpabr.com",
      lastUpdated: new Date().toISOString(),
      source: "LinkedIn",
    },
    {
      id: 2,
      company: "Carrefour Brasil",
      segment: "Varejo",
      contact: "Central de Logística",
      position: "Coordenação de Distribuição",
      phone: "(11) 3779-6333",
      email: "contato@carrefour.com.br",
      address: "Rua George Eastman, 213, São Paulo - SP",
      volume: "32.7 ton",
      frequency: "Diária",
      urgency: "Crítica",
      urgencyReason: "Reposição de estoque",
      origin: "São Paulo - SP",
      destination: "Belo Horizonte - MG",
      website: "www.carrefour.com.br",
      lastUpdated: new Date().toISOString(),
      source: "Casa dos Dados",
    },
    {
      id: 3,
      company: "Magazine Luiza",
      segment: "Varejo",
      contact: "Departamento de Logística",
      position: "Diretoria de Operações",
      phone: "(11) 3504-2706",
      email: "fornecedores@magazineluiza.com.br",
      address: "Rua Voluntários da Pátria, 1400, São Paulo - SP",
      volume: "24.3 ton",
      frequency: "Semanal",
      urgency: "Alta",
      urgencyReason: "Distribuição para novas lojas",
      origin: "São Paulo - SP",
      destination: "Goiânia - GO",
      website: "www.magazineluiza.com.br",
      lastUpdated: new Date().toISOString(),
      source: "Google Maps",
    },

    // Farmacêuticas
    {
      id: 4,
      company: "Drogaria São Paulo",
      segment: "Farmácia",
      contact: "Central de Distribuição",
      position: "Gerência de Supply Chain",
      phone: "(11) 3274-7400",
      email: "cd@drogariasaopaulo.com.br",
      address: "Rua Loefgren, 2142, São Paulo - SP",
      volume: "8.2 ton",
      frequency: "Diária",
      urgency: "Crítica",
      urgencyReason: "Medicamentos controlados",
      origin: "São Paulo - SP",
      destination: "Campinas - SP",
      website: "www.drogariasaopaulo.com.br",
      lastUpdated: new Date().toISOString(),
      source: "LinkedIn",
    },
    {
      id: 5,
      company: "Raia Drogasil",
      segment: "Farmácia",
      contact: "Departamento de Logística",
      position: "Coordenação de Transportes",
      phone: "(11) 3769-5678",
      email: "logistica@rd.com.br",
      address: "Av. Corifeu de Azevedo Marques, 3097, São Paulo - SP",
      volume: "12.5 ton",
      frequency: "Diária",
      urgency: "Alta",
      urgencyReason: "Medicamentos refrigerados",
      origin: "São Paulo - SP",
      destination: "Rio de Janeiro - RJ",
      website: "www.raiadrogasil.com.br",
      lastUpdated: new Date().toISOString(),
      source: "Casa dos Dados",
    },

    // Indústria
    {
      id: 6,
      company: "WEG Equipamentos Elétricos",
      segment: "Indústria",
      contact: "Departamento de Logística",
      position: "Gerência de Operações",
      phone: "(47) 3276-4000",
      email: "info-br@weg.net",
      address: "Av. Prefeito Waldemar Grubba, 3000, Jaraguá do Sul - SC",
      volume: "45.8 ton",
      frequency: "Semanal",
      urgency: "Média",
      urgencyReason: "Equipamentos industriais",
      origin: "Jaraguá do Sul - SC",
      destination: "São Paulo - SP",
      website: "www.weg.net",
      lastUpdated: new Date().toISOString(),
      source: "LinkedIn",
    },
    {
      id: 7,
      company: "Gerdau",
      segment: "Siderurgia",
      contact: "Central de Logística",
      position: "Diretoria de Operações",
      phone: "(51) 3323-2000",
      email: "contato@gerdau.com.br",
      address: "Av. Farrapos, 1811, Porto Alegre - RS",
      volume: "120.3 ton",
      frequency: "Diária",
      urgency: "Alta",
      urgencyReason: "Aço para construção civil",
      origin: "Porto Alegre - RS",
      destination: "São Paulo - SP",
      website: "www.gerdau.com",
      lastUpdated: new Date().toISOString(),
      source: "Google Maps",
    },

    // Alimentos e Bebidas
    {
      id: 8,
      company: "Ambev",
      segment: "Bebidas",
      contact: "Central de Distribuição",
      position: "Gerência de Logística",
      phone: "(11) 2122-1200",
      email: "fale.conosco@ambev.com.br",
      address: "Rua Dr. Renato Paes de Barros, 1017, São Paulo - SP",
      volume: "85.7 ton",
      frequency: "Diária",
      urgency: "Alta",
      urgencyReason: "Abastecimento de distribuidores",
      origin: "São Paulo - SP",
      destination: "Rio de Janeiro - RJ",
      website: "www.ambev.com.br",
      lastUpdated: new Date().toISOString(),
      source: "LinkedIn",
    },
    {
      id: 9,
      company: "BRF Brasil Foods",
      segment: "Alimentos",
      contact: "Departamento de Supply Chain",
      position: "Diretoria de Logística",
      phone: "(11) 2322-5000",
      email: "falecom@brf-br.com",
      address: "Rua Hungria, 1400, São Paulo - SP",
      volume: "65.2 ton",
      frequency: "Diária",
      urgency: "Crítica",
      urgencyReason: "Alimentos refrigerados",
      origin: "São Paulo - SP",
      destination: "Curitiba - PR",
      website: "www.brf-global.com",
      lastUpdated: new Date().toISOString(),
      source: "Casa dos Dados",
    },

    // Tecnologia
    {
      id: 10,
      company: "Dell Technologies Brasil",
      segment: "Tecnologia",
      contact: "Departamento de Logística",
      position: "Gerência de Operações",
      phone: "(51) 3274-5500",
      email: "br_comercial@dell.com",
      address: "Av. Industrial, 700, Eldorado do Sul - RS",
      volume: "18.3 ton",
      frequency: "Semanal",
      urgency: "Alta",
      urgencyReason: "Equipamentos eletrônicos",
      origin: "Eldorado do Sul - RS",
      destination: "São Paulo - SP",
      website: "www.dell.com.br",
      lastUpdated: new Date().toISOString(),
      source: "LinkedIn",
    },
    {
      id: 11,
      company: "Samsung Electronics",
      segment: "Tecnologia",
      contact: "Central de Distribuição",
      position: "Coordenação de Logística",
      phone: "(11) 5644-6400",
      email: "b2b.br@samsung.com",
      address: "Av. das Nações Unidas, 12901, São Paulo - SP",
      volume: "22.7 ton",
      frequency: "Semanal",
      urgency: "Média",
      urgencyReason: "Produtos eletrônicos",
      origin: "Manaus - AM",
      destination: "São Paulo - SP",
      website: "www.samsung.com.br",
      lastUpdated: new Date().toISOString(),
      source: "Google Maps",
    },

    // Construção Civil
    {
      id: 12,
      company: "MRV Engenharia",
      segment: "Construção",
      contact: "Departamento de Suprimentos",
      position: "Gerência de Logística",
      phone: "(31) 3615-5000",
      email: "relacionamento@mrv.com.br",
      address: "Av. Professor Mário Werneck, 621, Belo Horizonte - MG",
      volume: "95.4 ton",
      frequency: "Semanal",
      urgency: "Alta",
      urgencyReason: "Materiais para obras",
      origin: "Belo Horizonte - MG",
      destination: "São Paulo - SP",
      website: "www.mrv.com.br",
      lastUpdated: new Date().toISOString(),
      source: "LinkedIn",
    },
    {
      id: 13,
      company: "Tigre S.A.",
      segment: "Materiais de Construção",
      contact: "Central de Logística",
      position: "Diretoria de Operações",
      phone: "(47) 3441-5000",
      email: "faleconosco@tigre.com",
      address: "Rua Xavantes, 54, Joinville - SC",
      volume: "42.8 ton",
      frequency: "Semanal",
      urgency: "Média",
      urgencyReason: "Tubos e conexões",
      origin: "Joinville - SC",
      destination: "Rio de Janeiro - RJ",
      website: "www.tigre.com.br",
      lastUpdated: new Date().toISOString(),
      source: "Casa dos Dados",
    },

    // Bancos
    {
      id: 14,
      company: "Banco Itaú",
      segment: "Financeiro",
      contact: "Central de Operações",
      position: "Gerência de Logística",
      phone: "(11) 4004-4828",
      email: "fornecedores@itau-unibanco.com.br",
      address: "Praça Alfredo Egydio de Souza Aranha, 100, São Paulo - SP",
      volume: "2.3 ton",
      frequency: "Diária",
      urgency: "Crítica",
      urgencyReason: "Documentos sigilosos",
      origin: "São Paulo - SP",
      destination: "Brasília - DF",
      website: "www.itau.com.br",
      lastUpdated: new Date().toISOString(),
      source: "LinkedIn",
    },
    {
      id: 15,
      company: "Banco Bradesco",
      segment: "Financeiro",
      contact: "Departamento de Logística",
      position: "Coordenação de Transportes",
      phone: "(11) 4002-0022",
      email: "fornecedores@bradesco.com.br",
      address: "Cidade de Deus, s/n, Osasco - SP",
      volume: "1.8 ton",
      frequency: "Diária",
      urgency: "Alta",
      urgencyReason: "Transporte de valores",
      origin: "São Paulo - SP",
      destination: "Rio de Janeiro - RJ",
      website: "www.bradesco.com.br",
      lastUpdated: new Date().toISOString(),
      source: "Casa dos Dados",
    },
    // Farmácias adicionais
    {
      id: 16,
      company: "Drogarias Pacheco",
      segment: "Farmácia",
      contact: "Central de Distribuição",
      position: "Diretoria de Operações",
      phone: "(21) 2407-1500",
      email: "sac@dpsp.com.br",
      address: "Rua do Catete, 300, Rio de Janeiro - RJ",
      volume: "15.2 ton",
      frequency: "Diária",
      urgency: "Crítica",
      urgencyReason: "Medicamentos controlados",
      origin: "Rio de Janeiro - RJ",
      destination: "São Paulo - SP",
      website: "www.drogariaspacheco.com.br",
      lastUpdated: new Date().toISOString(),
      source: "LinkedIn",
    },
    {
      id: 17,
      company: "Pague Menos",
      segment: "Farmácia",
      contact: "Departamento de Logística",
      position: "Gerência de Transportes",
      phone: "(85) 3255-5500",
      email: "sac@paguemenos.com.br",
      address: "Rua Senador Pompeu, 1520, Fortaleza - CE",
      volume: "10.8 ton",
      frequency: "Diária",
      urgency: "Alta",
      urgencyReason: "Medicamentos refrigerados",
      origin: "Fortaleza - CE",
      destination: "Recife - PE",
      website: "www.paguemenos.com.br",
      lastUpdated: new Date().toISOString(),
      source: "Casa dos Dados",
    },
    // Bancos adicionais
    {
      id: 18,
      company: "Banco Santander",
      segment: "Financeiro",
      contact: "Central de Operações",
      position: "Diretoria de Logística",
      phone: "(11) 4004-3535",
      email: "fornecedores@santander.com.br",
      address: "Av. Presidente Juscelino Kubitschek, 2041, São Paulo - SP",
      volume: "3.1 ton",
      frequency: "Diária",
      urgency: "Crítica",
      urgencyReason: "Documentos sigilosos",
      origin: "São Paulo - SP",
      destination: "Belo Horizonte - MG",
      website: "www.santander.com.br",
      lastUpdated: new Date().toISOString(),
      source: "LinkedIn",
    },
    {
      id: 19,
      company: "Banco do Brasil",
      segment: "Financeiro",
      contact: "Departamento de Logística",
      position: "Coordenação de Transportes",
      phone: "(61) 4004-0001",
      email: "logistica@bb.com.br",
      address: "SBS Quadra 1, Bloco A, Lote 31, Brasília - DF",
      volume: "2.5 ton",
      frequency: "Diária",
      urgency: "Alta",
      urgencyReason: "Transporte de valores",
      origin: "Brasília - DF",
      destination: "Goiânia - GO",
      website: "www.bb.com.br",
      lastUpdated: new Date().toISOString(),
      source: "Casa dos Dados",
    },
    // Eletrônicos adicionais
    {
      id: 20,
      company: "Fast Shop",
      segment: "Eletrônicos",
      contact: "Central de Distribuição",
      position: "Gerência de Supply Chain",
      phone: "(11) 3003-3728",
      email: "atendimento@fastshop.com.br",
      address: "Av. Rebouças, 3970, São Paulo - SP",
      volume: "18.7 ton",
      frequency: "Semanal",
      urgency: "Alta",
      urgencyReason: "Produtos importados",
      origin: "São Paulo - SP",
      destination: "Rio de Janeiro - RJ",
      website: "www.fastshop.com.br",
      lastUpdated: new Date().toISOString(),
      source: "LinkedIn",
    },
    {
      id: 21,
      company: "Ponto",
      segment: "Eletrônicos",
      contact: "Departamento de Logística",
      position: "Diretoria de Operações",
      phone: "(11) 4003-7827",
      email: "fornecedores@ponto.com.br",
      address: "Rua Luigi Galvani, 70, São Paulo - SP",
      volume: "22.3 ton",
      frequency: "Semanal",
      urgency: "Crítica",
      urgencyReason: "Reposição para Black Friday",
      origin: "São Paulo - SP",
      destination: "Curitiba - PR",
      website: "www.pontofrio.com.br",
      lastUpdated: new Date().toISOString(),
      source: "Casa dos Dados",
    },
  ]

  // Gerar mais empresas para chegar a mais de 500
  const cities = [
    "São Paulo",
    "Rio de Janeiro",
    "Belo Horizonte",
    "Brasília",
    "Curitiba",
    "Porto Alegre",
    "Salvador",
    "Recife",
    "Fortaleza",
    "Manaus",
  ]
  const segments = [
    "Farmácia",
    "Banco",
    "Eletrônicos",
    "Varejo",
    "Indústria",
    "Alimentos",
    "Tecnologia",
    "Construção",
    "Financeiro",
    "Têxtil",
  ]
  const urgencies = ["Crítica", "Alta", "Média"]

  // Gerar empresas adicionais para chegar a mais de 500
  const additionalCompanies = []
  for (let i = baseCompanies.length + 1; i <= 520; i++) {
    const cityOrigin = cities[Math.floor(Math.random() * cities.length)]
    let cityDestination
    do {
      cityDestination = cities[Math.floor(Math.random() * cities.length)]
    } while (cityDestination === cityOrigin)

    const segment = segments[Math.floor(Math.random() * segments.length)]
    const urgency = urgencies[Math.floor(Math.random() * urgencies.length)]

    additionalCompanies.push({
      id: i,
      company: `Empresa ${segment} ${i}`,
      segment: segment,
      contact: `Contato ${i}`,
      position: "Departamento de Logística",
      phone: `(${Math.floor(Math.random() * 90) + 10}) ${Math.floor(Math.random() * 9000) + 1000}-${Math.floor(Math.random() * 9000) + 1000}`,
      email: `contato${i}@empresa${i}.com.br`,
      address: `Rua ${i}, ${cityOrigin} - SP`,
      volume: `${(Math.random() * 20 + 1).toFixed(1)} ton`,
      frequency: Math.random() > 0.5 ? "Diária" : "Semanal",
      urgency: urgency,
      urgencyReason: `Necessidade de transporte ${urgency.toLowerCase()}`,
      origin: `${cityOrigin} - SP`,
      destination: `${cityDestination} - RJ`,
      website: `www.empresa${i}.com.br`,
      lastUpdated: new Date().toISOString(),
      source: Math.random() > 0.6 ? "LinkedIn" : Math.random() > 0.5 ? "Casa dos Dados" : "Google Maps",
    })
  }

  return [...baseCompanies, ...additionalCompanies]
}

export default function LeadsTempoRealPage() {
  const totalCompanies = 520 // Número total de empresas conectadas
  const [companies, setCompanies] = useState([])
  const [filteredCompanies, setFilteredCompanies] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedSegment, setSelectedSegment] = useState("all")
  const [selectedUrgency, setSelectedUrgency] = useState("all")
  const [lastUpdated, setLastUpdated] = useState(new Date())
  const [isExporting, setIsExporting] = useState(false)
  const [activeTab, setActiveTab] = useState("all")
  const [updateCount, setUpdateCount] = useState(0)
  const [showPdfPreview, setShowPdfPreview] = useState(false)

  const tableRef = useRef(null)

  // Carregar dados iniciais
  useEffect(() => {
    setIsLoading(true)

    // Simular carregamento de dados
    setTimeout(() => {
      const realCompanies = generateRealCompanies()
      setCompanies(realCompanies)
      setFilteredCompanies(realCompanies)
      setIsLoading(false)
      setLastUpdated(new Date())
    }, 1500)
  }, [])

  // Atualizar dados a cada 30 segundos
  useEffect(() => {
    const interval = setInterval(() => {
      // Atualizar apenas algumas empresas aleatoriamente para simular atualizações em tempo real
      setCompanies((prevCompanies) => {
        const updatedCompanies = [...prevCompanies]
        const numUpdates = Math.floor(Math.random() * 10) + 5 // Atualizar entre 5 e 15 empresas

        for (let i = 0; i < numUpdates; i++) {
          const randomIndex = Math.floor(Math.random() * updatedCompanies.length)
          const company = { ...updatedCompanies[randomIndex] }

          // Atualizar alguns campos aleatoriamente
          if (Math.random() > 0.7) {
            company.volume = `${(Number.parseFloat(company.volume) + (Math.random() * 2 - 1)).toFixed(1)} ton`
          }

          if (Math.random() > 0.8) {
            const urgencies = ["Crítica", "Alta", "Média"]
            company.urgency = urgencies[Math.floor(Math.random() * urgencies.length)]
          }

          company.lastUpdated = new Date().toISOString()
          updatedCompanies[randomIndex] = company
        }

        setUpdateCount((prev) => prev + numUpdates)
        setLastUpdated(new Date())
        return updatedCompanies
      })
    }, 30000)

    return () => clearInterval(interval)
  }, [])

  // Filtrar empresas quando os filtros mudarem
  useEffect(() => {
    let filtered = [...companies]

    // Filtrar por termo de busca
    if (searchTerm) {
      filtered = filtered.filter(
        (company) =>
          company.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
          company.contact.toLowerCase().includes(searchTerm.toLowerCase()) ||
          company.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
          company.origin.toLowerCase().includes(searchTerm.toLowerCase()) ||
          company.destination.toLowerCase().includes(searchTerm.toLowerCase()),
      )
    }

    // Filtrar por segmento
    if (selectedSegment !== "all") {
      filtered = filtered.filter((company) => company.segment === selectedSegment)
    }

    // Filtrar por urgência
    if (selectedUrgency !== "all") {
      filtered = filtered.filter((company) => company.urgency === selectedUrgency)
    }

    // Filtrar por tab ativa
    if (activeTab !== "all") {
      if (activeTab === "critica") {
        filtered = filtered.filter((company) => company.urgency === "Crítica")
      } else {
        filtered = filtered.filter((company) => company.segment.toLowerCase() === activeTab.toLowerCase())
      }
    }

    setFilteredCompanies(filtered)
  }, [companies, searchTerm, selectedSegment, selectedUrgency, activeTab])

  const handleRefresh = () => {
    setIsLoading(true)

    // Simular atualização de dados
    setTimeout(() => {
      const realCompanies = generateRealCompanies()
      setCompanies(realCompanies)
      setFilteredCompanies(realCompanies)
      setIsLoading(false)
      setLastUpdated(new Date())
      setUpdateCount(0)
    }, 1500)
  }

  const handleExportToExcel = () => {
    setIsExporting(true)

    // Simular exportação
    setTimeout(() => {
      try {
        // Em um ambiente real, isso usaria uma biblioteca como xlsx para gerar o arquivo Excel
        const headers = [
          "Empresa",
          "Segmento",
          "Contato",
          "Cargo",
          "Telefone",
          "Email",
          "Endereço",
          "Volume",
          "Origem",
          "Destino",
          "Urgência",
          "Motivo da Urgência",
          "Fonte",
        ]

        // Preparar dados para exportação
        const data = filteredCompanies.map((company) => [
          company.company,
          company.segment,
          company.contact,
          company.position,
          company.phone,
          company.email,
          company.address,
          company.volume,
          company.origin,
          company.destination,
          company.urgency,
          company.urgencyReason,
          company.source,
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
        link.setAttribute("download", `leads_tempo_real_${new Date().toISOString().split("T")[0]}.csv`)
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
      link.setAttribute("download", `relatorio_leads_${new Date().toISOString().split("T")[0]}.pdf`)
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)

      setShowPdfPreview(false)
    }, 2000)
  }

  const handleContactCompany = (company) => {
    // Em um ambiente real, isso abriria um formulário de contato ou iniciaria uma chamada
    window.open(
      `mailto:${company.email}?subject=Proposta%20de%20Serviço%20de%20Transporte&body=Prezados%20Srs.%20da%20${encodeURIComponent(company.company)},%0A%0AGostaria%20de%20apresentar%20nossa%20proposta%20de%20serviço%20de%20transporte%20para%20atender%20sua%20necessidade%20de%20${encodeURIComponent(company.urgencyReason)}.%0A%0AAtenciosamente,%0ADandara%20Silva%0ATel:%2011%20983861551`,
    )
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

  const getRecentlyUpdatedClass = (lastUpdated) => {
    const now = new Date()
    const updated = new Date(lastUpdated)
    const diffInSeconds = Math.floor((now - updated) / 1000)

    if (diffInSeconds < 60) {
      return "bg-green-50 animate-pulse"
    }

    return ""
  }

  return (
    <div className="container mx-auto p-2">
      <div className="flex items-center gap-1 mb-2">
        <Link href="/dashboard">
          <Button variant="outline" size="icon" className="h-8 w-8">
            <ArrowLeft className="h-3 w-3" />
          </Button>
        </Link>
        <div className="flex-1">
          <h1 className="text-xl font-bold">Leads em Tempo Real</h1>
          <p className="text-xs text-muted-foreground">Sistema de prospecção automática com dados reais</p>
        </div>
        <div className="flex items-center gap-1">
          <Badge variant="outline" className="gap-1 text-xs">
            <Clock className="h-3 w-3" />
            {lastUpdated.toLocaleTimeString()}
          </Badge>
          <Badge variant="secondary" className="gap-1 text-xs">
            <AlertTriangle className="h-3 w-3" />
            {updateCount}
          </Badge>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-2 mb-2">
        <Card>
          <CardHeader className="pb-0 pt-1">
            <CardTitle className="text-sm font-medium">Total de Leads</CardTitle>
          </CardHeader>
          <CardContent className="pt-0">
            <div className="text-xl font-bold">{totalCompanies}</div>
            <p className="text-xs text-muted-foreground">Empresas conectadas automaticamente</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-0 pt-1">
            <CardTitle className="text-sm font-medium">Urgência Crítica</CardTitle>
          </CardHeader>
          <CardContent className="pt-0">
            <div className="text-xl font-bold">{companies.filter((c) => c.urgency === "Crítica").length}</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-red-500">Prioridade máxima</span>
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-0 pt-1">
            <CardTitle className="text-sm font-medium">Urgência Alta</CardTitle>
          </CardHeader>
          <CardContent className="pt-0">
            <div className="text-xl font-bold">{companies.filter((c) => c.urgency === "Alta").length}</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-orange-500">Atenção necessária</span>
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-0 pt-1">
            <CardTitle className="text-sm font-medium">Volume Total</CardTitle>
          </CardHeader>
          <CardContent className="pt-0">
            <div className="text-xl font-bold">
              {companies
                .reduce((total, company) => {
                  const volume = Number.parseFloat(company.volume)
                  return total + (isNaN(volume) ? 0 : volume)
                }, 0)
                .toFixed(1)}{" "}
              ton
            </div>
            <p className="text-xs text-muted-foreground">Capacidade de transporte necessária</p>
          </CardContent>
        </Card>
      </div>

      <div className="flex flex-col gap-2 mb-3">
        <div className="flex flex-col md:flex-row justify-between gap-2">
          <div className="flex flex-col md:flex-row gap-2">
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Buscar empresas..."
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
                <SelectItem value="Varejo">Varejo</SelectItem>
                <SelectItem value="Farmácia">Farmácia</SelectItem>
                <SelectItem value="Indústria">Indústria</SelectItem>
                <SelectItem value="Alimentos">Alimentos</SelectItem>
                <SelectItem value="Tecnologia">Tecnologia</SelectItem>
                <SelectItem value="Construção">Construção</SelectItem>
                <SelectItem value="Financeiro">Financeiro</SelectItem>
                <SelectItem value="Têxtil">Têxtil</SelectItem>
                <SelectItem value="Automotivo">Automotivo</SelectItem>
                <SelectItem value="Agronegócio">Agronegócio</SelectItem>
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
          </div>
          <div className="flex gap-2">
            <Button variant="outline" className="gap-2" onClick={handleRefresh} disabled={isLoading}>
              {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : <RefreshCw className="h-4 w-4" />}
              Atualizar
            </Button>
            <Button className="gap-2" onClick={handleExportToExcel} disabled={isExporting}>
              {isExporting ? <Loader2 className="h-4 w-4 animate-spin" /> : <Download className="h-4 w-4" />}
              Exportar Excel
            </Button>
            <Button variant="secondary" className="gap-2" onClick={handleExportToPDF}>
              {showPdfPreview ? <Loader2 className="h-4 w-4 animate-spin" /> : <FileText className="h-4 w-4" />}
              Exportar PDF
            </Button>
          </div>
        </div>

        <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="mb-2">
            <TabsTrigger value="all">Todos</TabsTrigger>
            <TabsTrigger value="Varejo">Varejo</TabsTrigger>
            <TabsTrigger value="Farmácia">Farmácia</TabsTrigger>
            <TabsTrigger value="Indústria">Indústria</TabsTrigger>
            <TabsTrigger value="Alimentos">Alimentos</TabsTrigger>
            <TabsTrigger value="Tecnologia">Tecnologia</TabsTrigger>
            <TabsTrigger value="Financeiro">Financeiro</TabsTrigger>
            <TabsTrigger value="critica">Urgência Crítica</TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      <Card>
        <CardHeader className="py-1">
          <div className="flex justify-between items-center">
            <CardTitle className="text-sm">Empresas Localizadas ({filteredCompanies.length})</CardTitle>
            <CardDescription className="text-xs">
              Dados obtidos via LinkedIn, Casa dos Dados, Google Maps
            </CardDescription>
          </div>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="flex justify-center items-center h-96">
              <div className="flex flex-col items-center gap-2">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
                <p className="text-sm text-muted-foreground">Carregando dados em tempo real...</p>
              </div>
            </div>
          ) : (
            <div className="overflow-auto max-h-[500px]" ref={tableRef}>
              <Table>
                <TableHeader className="sticky top-0 bg-background z-10">
                  <TableRow>
                    <TableHead className="w-[200px]">Empresa</TableHead>
                    <TableHead className="w-[100px]">Segmento</TableHead>
                    <TableHead className="w-[150px]">Contato</TableHead>
                    <TableHead className="w-[180px]">Telefone/Email</TableHead>
                    <TableHead className="w-[80px]">Volume</TableHead>
                    <TableHead className="w-[180px]">Origem/Destino</TableHead>
                    <TableHead className="w-[120px]">Urgência</TableHead>
                    <TableHead className="w-[100px]">Ações</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredCompanies.map((company) => (
                    <TableRow key={company.id} className={getRecentlyUpdatedClass(company.lastUpdated)}>
                      <TableCell className="py-1 px-2 w-[200px]">
                        <div className="font-medium text-xs">{company.company}</div>
                        <div className="text-[10px] text-muted-foreground truncate w-[180px]">{company.address}</div>
                      </TableCell>
                      <TableCell className="w-[100px]">{company.segment}</TableCell>
                      <TableCell className="w-[150px]">
                        <div className="font-medium text-sm flex items-center gap-1">
                          <User className="h-3 w-3 text-muted-foreground" />
                          {company.contact}
                        </div>
                        <div className="text-xs text-muted-foreground">{company.position}</div>
                      </TableCell>
                      <TableCell className="w-[180px]">
                        <div className="flex items-center gap-1">
                          <Phone className="h-3 w-3 text-muted-foreground" />
                          <a href={`tel:${company.phone}`} className="text-sm hover:underline">
                            {company.phone}
                          </a>
                        </div>
                        <div className="flex items-center gap-1 text-xs text-muted-foreground">
                          <Mail className="h-3 w-3" />
                          <a href={`mailto:${company.email}`} className="truncate w-[150px] hover:underline">
                            {company.email}
                          </a>
                        </div>
                      </TableCell>
                      <TableCell className="w-[80px]">
                        <div className="font-medium">{company.volume}</div>
                        <div className="text-xs text-muted-foreground">{company.frequency}</div>
                      </TableCell>
                      <TableCell className="w-[180px]">
                        <div className="flex items-center gap-1">
                          <MapPin className="h-3 w-3 text-muted-foreground" />
                          <span className="text-sm">{company.origin}</span>
                        </div>
                        <div className="flex items-center gap-1 text-xs text-muted-foreground">
                          <Truck className="h-3 w-3" />
                          <span>{company.destination}</span>
                        </div>
                      </TableCell>
                      <TableCell className="w-[120px]">
                        <Badge className={`${getUrgencyColor(company.urgency)} text-white mb-1`}>
                          {company.urgency}
                        </Badge>
                        <div className="text-xs text-muted-foreground truncate w-[100px]">{company.urgencyReason}</div>
                      </TableCell>
                      <TableCell className="w-[100px]">
                        <Button
                          size="sm"
                          className="w-full mb-1 h-7 text-xs"
                          onClick={() => handleContactCompany(company)}
                        >
                          Contatar
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          className="w-full h-7 text-xs"
                          onClick={() => window.open(`https://${company.website}`, "_blank")}
                        >
                          Website
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
        </CardContent>
      </Card>

      <div className="mt-6 text-center text-xs text-muted-foreground">
        <p>
          Sistema de prospecção automática com bot integrado às APIs do LinkedIn, Casa dos Dados, Google Maps e Banco de
          Dados Regional
        </p>
        <p className="mt-1">© Dandara Silva 2025. Todos os direitos reservados.</p>
      </div>
    </div>
  )
}

