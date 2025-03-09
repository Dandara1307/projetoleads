import { NextResponse } from "next/server"

// Simulação de API para buscar leads de empresas específicas (farmácias, bancos, eletrônicos)
// Em um ambiente real, isso se conectaria a APIs externas como:
// - LinkedIn API
// - Casa dos Dados
// - Google API
// - APIs de associações comerciais

export async function GET(request: Request) {
  // Parâmetros de busca que seriam enviados para APIs externas
  const { searchParams } = new URL(request.url)
  const segment = searchParams.get("segment")
  const location = searchParams.get("location")
  const urgency = searchParams.get("urgency")
  const limit = searchParams.get("limit") || "10"

  // Simulação de dados que seriam retornados por APIs externas
  const mockLeads = [
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
      employees: 120,
      urgency: "Alta",
      urgencyReason: "Medicamentos com prazo de validade próximo",
      source: "LinkedIn",
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
      employees: 350,
      urgency: "Crítica",
      urgencyReason: "Transporte de valores entre agências",
      source: "Casa dos Dados",
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
      employees: 85,
      urgency: "Média",
      urgencyReason: "Lançamento de novos produtos",
      source: "Google API",
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
      employees: 75,
      urgency: "Crítica",
      urgencyReason: "Transporte de vacinas com refrigeração",
      source: "LinkedIn",
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
      employees: 180,
      urgency: "Alta",
      urgencyReason: "Transporte de documentos confidenciais",
      source: "Casa dos Dados",
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
      employees: 120,
      urgency: "Alta",
      urgencyReason: "Reposição de estoque para Black Friday",
      source: "Google API",
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
      employees: 95,
      urgency: "Crítica",
      urgencyReason: "Distribuição de medicamentos controlados",
      source: "LinkedIn",
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
      employees: 65,
      urgency: "Média",
      urgencyReason: "Entrega de cartões e tokens",
      source: "Casa dos Dados",
    },
    {
      id: 9,
      company: "Eletrônicos Inovação",
      contact: "Lucas Mendes",
      phone: "(85) 90987-6543",
      email: "lucas@inovacao.com.br",
      address: "Av. Tecnológica, 350, Fortaleza - CE",
      segment: "Eletrônicos",
      volume: "2.5 ton",
      frequency: "Semanal",
      employees: 110,
      urgency: "Alta",
      urgencyReason: "Transporte de produtos importados do porto",
      source: "Google API",
    },
    {
      id: 10,
      company: "Rede Farmácias Vida",
      contact: "Mariana Lima",
      phone: "(91) 89876-5432",
      email: "mariana@redevida.com.br",
      address: "Rua da Saúde, 200, Belém - PA",
      segment: "Farmácia",
      volume: "1.8 ton",
      frequency: "Diária",
      employees: 130,
      urgency: "Crítica",
      urgencyReason: "Distribuição de insumos hospitalares",
      source: "LinkedIn",
    },
  ]

  // Filtragem baseada nos parâmetros (simulando o que seria feito com dados reais)
  let filteredLeads = [...mockLeads]

  if (segment) {
    filteredLeads = filteredLeads.filter((lead) => lead.segment.toLowerCase().includes(segment.toLowerCase()))
  }

  if (location) {
    filteredLeads = filteredLeads.filter((lead) => lead.address.toLowerCase().includes(location.toLowerCase()))
  }

  if (urgency) {
    filteredLeads = filteredLeads.filter((lead) => lead.urgency.toLowerCase() === urgency.toLowerCase())
  }

  // Limitando o número de resultados
  filteredLeads = filteredLeads.slice(0, Number.parseInt(limit))

  return NextResponse.json({
    leads: filteredLeads,
    total: filteredLeads.length,
    message:
      "Em um ambiente real, estes dados seriam obtidos de APIs públicas como LinkedIn, Casa dos Dados e Google API.",
  })
}

