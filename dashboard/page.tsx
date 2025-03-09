"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts"
import { ArrowUpRight, Users, TrendingUp, Truck, Bell, Clock, Calendar } from "lucide-react"
import Link from "next/link"

// Dados para o gráfico de barras
const leadData = [
  { name: "Jan", leads: 520, converted: 350 },
  { name: "Fev", leads: 540, converted: 360 },
  { name: "Mar", leads: 570, converted: 380 },
  { name: "Abr", leads: 590, converted: 400 },
  { name: "Mai", leads: 610, converted: 420 },
  { name: "Jun", leads: 630, converted: 440 },
  { name: "Jul", leads: 650, converted: 460 },
  { name: "Ago", leads: 670, converted: 480 },
  { name: "Set", leads: 690, converted: 500 },
  { name: "Out", leads: 710, converted: 520 },
  { name: "Nov", leads: 730, converted: 540 },
  { name: "Dez", leads: 750, converted: 560 },
]

// Dados para o gráfico de pizza de segmentos
const segmentData = [
  { name: "Farmácias", value: 35 },
  { name: "Bancos", value: 25 },
  { name: "Eletrônicos", value: 20 },
  { name: "Outros", value: 20 },
]

// Dados para o gráfico de pizza de urgência
const urgencyData = [
  { name: "Crítica", value: 45 },
  { name: "Alta", value: 35 },
  { name: "Média", value: 20 },
]

// Cores para os gráficos de pizza
const SEGMENT_COLORS = ["#ff0000", "#000000", "#666666", "#999999"]
const URGENCY_COLORS = ["#ff0000", "#000000", "#666666"]

export default function DashboardPage() {
  const [activeTab, setActiveTab] = useState("overview")
  const [currentTime, setCurrentTime] = useState(new Date())
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      title: "Novo lead de alta prioridade",
      description: "Farmácia São João necessita transporte urgente",
      time: "Agora mesmo",
    },
    {
      id: 2,
      title: "5 novos leads adicionados",
      description: "Novos leads do segmento bancário",
      time: "5 minutos atrás",
    },
    {
      id: 3,
      title: "Cotação automática enviada",
      description: "Proposta enviada para Eletrônicos Silva",
      time: "15 minutos atrás",
    },
  ])

  // Atualizar o relógio a cada segundo
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date())
    }, 1000)

    return () => {
      clearInterval(timer)
    }
  }, [])

  // Adicionar novas notificações aleatoriamente
  useEffect(() => {
    const notificationTimer = setInterval(() => {
      const newNotificationTypes = [
        {
          title: "Novo lead detectado",
          description: "Lead urgente do segmento farmacêutico",
        },
        {
          title: "Cotação aprovada",
          description: "Cliente Banco Nacional aceitou a proposta",
        },
        {
          title: "Atualização de sistema",
          description: "Novas funcionalidades disponíveis",
        },
        {
          title: "Lead com urgência crítica",
          description: "Necessidade de transporte imediato",
        },
      ]

      const randomNotification = newNotificationTypes[Math.floor(Math.random() * newNotificationTypes.length)]

      setNotifications((prev) => [
        {
          id: Date.now(),
          title: randomNotification.title,
          description: randomNotification.description,
          time: "Agora mesmo",
        },
        ...prev.slice(0, 4), // Manter apenas os 5 mais recentes
      ])
    }, 45000) // A cada 45 segundos

    return () => clearInterval(notificationTimer)
  }, [])

  return (
    <div className="flex-1 space-y-3 p-3 md:p-5 pt-4">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
          <p className="text-muted-foreground">Bem-vindo ao seu painel de controle de leads e prospecção</p>
        </div>
        <div className="flex items-center space-x-2">
          <div className="hidden md:flex items-center space-x-2">
            <Clock className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm text-muted-foreground">{currentTime.toLocaleTimeString()}</span>
          </div>
          <div className="hidden md:flex items-center space-x-2">
            <Calendar className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm text-muted-foreground">{currentTime.toLocaleDateString()}</span>
          </div>
        </div>
      </div>

      <Tabs defaultValue="overview" value={activeTab} onValueChange={setActiveTab}>
        <TabsList>
          <TabsTrigger value="overview">Visão Geral</TabsTrigger>
          <TabsTrigger value="analytics">Análise</TabsTrigger>
          <TabsTrigger value="reports">Relatórios</TabsTrigger>
          <TabsTrigger value="notifications">Notificações</TabsTrigger>
        </TabsList>
        <TabsContent value="overview" className="space-y-4">
          <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total de Leads</CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">+7,500</div>
                <p className="text-xs text-muted-foreground">+20.1% em relação ao mês anterior</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Leads Convertidos</CardTitle>
                <TrendingUp className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">+2,350</div>
                <p className="text-xs text-muted-foreground">+15.2% em relação ao mês anterior</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Transportes Agendados</CardTitle>
                <Truck className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">1,429</div>
                <p className="text-xs text-muted-foreground">+12.5% em relação ao mês anterior</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Leads em Tempo Real</CardTitle>
                <Bell className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">+532</div>
                <p className="text-xs text-muted-foreground">Empresas conectadas automaticamente hoje</p>
              </CardContent>
            </Card>
          </div>

          {/* Gráfico de Desempenho de Leads - CORRIGIDO PARA FICAR DENTRO DO LAYOUT */}
          <Card>
            <CardHeader>
              <CardTitle>Desempenho de Leads</CardTitle>
              <CardDescription>Mais de 500 novas empresas localizadas diariamente em 2025</CardDescription>
            </CardHeader>
            <CardContent className="h-[300px] overflow-hidden">
              {" "}
              {/* Altura fixa e overflow controlado */}
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={leadData} margin={{ top: 5, right: 30, left: 20, bottom: 20 }}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip
                    formatter={(value) => [`${value} leads`, "Total"]}
                    labelFormatter={(label) => `Mês: ${label}`}
                  />
                  <Legend />
                  <Bar dataKey="leads" fill="#ff0000" name="Leads" />
                  <Bar dataKey="converted" fill="#000000" name="Convertidos" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-7">
            <Card className="col-span-4">
              <CardHeader>
                <CardTitle>Conexões com Empresas</CardTitle>
                <CardDescription>Empresas que procuram serviços de transporte interestadual</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="border rounded-md p-3">
                    <h3 className="font-medium mb-2">Conexões Automáticas Diárias</h3>
                    <div className="flex items-center justify-between">
                      <p className="text-sm">Empresas conectadas hoje:</p>
                      <p className="text-lg font-bold">532</p>
                    </div>
                    <div className="flex items-center justify-between mt-1">
                      <p className="text-sm">Meta diária:</p>
                      <p className="text-sm font-medium">500</p>
                    </div>
                    <div className="w-full bg-muted rounded-full h-2 mt-2">
                      <div className="bg-primary h-2 rounded-full" style={{ width: "106%" }}></div>
                    </div>
                    <p className="text-xs text-muted-foreground mt-2">
                      O sistema conecta automaticamente mais de 500 empresas diariamente que precisam de transporte
                      interestadual
                    </p>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="border rounded-md p-3">
                      <h3 className="font-medium mb-2">Por Segmento</h3>
                      <div className="space-y-1 text-sm">
                        <div className="flex justify-between">
                          <span>Farmácias</span>
                          <span className="font-medium">187</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Bancos</span>
                          <span className="font-medium">134</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Eletrônicos</span>
                          <span className="font-medium">106</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Outros</span>
                          <span className="font-medium">105</span>
                        </div>
                      </div>
                    </div>
                    <div className="border rounded-md p-3">
                      <h3 className="font-medium mb-2">Próximas Entregas</h3>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span>Banco Itaú</span>
                          <span className="text-muted-foreground">Hoje</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Drogaria São Paulo</span>
                          <span className="text-muted-foreground">Amanhã</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Magazine Luiza</span>
                          <span className="text-muted-foreground">23/03</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="col-span-3">
              <CardHeader>
                <CardTitle>Distribuição por Segmento</CardTitle>
                <CardDescription>Todos os segmentos de mercado</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[200px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={segmentData}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                        label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                      >
                        {segmentData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={SEGMENT_COLORS[index % SEGMENT_COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip formatter={(value) => [`${value}%`, "Porcentagem"]} />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            <Card className="col-span-4">
              <CardHeader>
                <CardTitle>Notificações Recentes</CardTitle>
                <CardDescription>Atualizações em tempo real do sistema</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {notifications.map((notification) => (
                    <div key={notification.id} className="flex items-start space-x-4">
                      <div className="rounded-full bg-red-500/20 p-2">
                        <Bell className="h-4 w-4 text-red-500" />
                      </div>
                      <div className="flex-1 space-y-1">
                        <p className="text-sm font-medium">{notification.title}</p>
                        <p className="text-xs text-muted-foreground">{notification.description}</p>
                        <p className="text-xs text-muted-foreground">{notification.time}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="col-span-3">
              <CardHeader>
                <CardTitle>Distribuição por Urgência</CardTitle>
                <CardDescription>Priorização de leads por urgência</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[200px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={urgencyData}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                        label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                      >
                        {urgencyData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={URGENCY_COLORS[index % URGENCY_COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip formatter={(value) => [`${value}%`, "Porcentagem"]} />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Ações Rápidas</CardTitle>
                <CardDescription>Acesse rapidamente as principais funcionalidades</CardDescription>
              </CardHeader>
              <CardContent className="grid gap-2">
                <Link href="/dashboard/leads-tempo-real">
                  <Button className="w-full justify-between">
                    Ver Leads em Tempo Real
                    <ArrowUpRight className="h-4 w-4" />
                  </Button>
                </Link>
                <Link href="/dashboard/cotacoes">
                  <Button className="w-full justify-between" variant="outline">
                    Gerar Cotação Automática
                    <ArrowUpRight className="h-4 w-4" />
                  </Button>
                </Link>
                <Link href="/dashboard/relatorios">
                  <Button className="w-full justify-between" variant="outline">
                    Relatório de Desempenho
                    <ArrowUpRight className="h-4 w-4" />
                  </Button>
                </Link>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Informações do Sistema</CardTitle>
                <CardDescription>Detalhes sobre o funcionamento do sistema</CardDescription>
              </CardHeader>
              <CardContent className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-sm">Última atualização de dados:</span>
                  <span className="text-sm font-medium">{currentTime.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm">Próxima atualização em:</span>
                  <span className="text-sm font-medium">5 segundos</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm">APIs conectadas:</span>
                  <span className="text-sm font-medium">LinkedIn, Casa dos Dados, Google</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm">Status do sistema:</span>
                  <span className="text-sm font-medium text-green-500">Online</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm">Contato:</span>
                  <span className="text-sm font-medium">dandarasilva20@icloud.com</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm">Telefone:</span>
                  <span className="text-sm font-medium">11 983861551</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm">Empresas conectadas hoje:</span>
                  <span className="text-sm font-medium">532 de 500 (meta)</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm">Conexões automáticas:</span>
                  <span className="text-sm font-medium text-green-500">Ativas</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="analytics" className="space-y-4">
          <Card className="col-span-4">
            <CardHeader>
              <CardTitle>Análise de Desempenho</CardTitle>
              <CardDescription>Estatísticas detalhadas de leads e conversões</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[400px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={leadData} margin={{ top: 5, right: 30, left: 20, bottom: 20 }}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip
                      formatter={(value) => [`${value} leads`, "Total"]}
                      labelFormatter={(label) => `Mês: ${label}`}
                    />
                    <Legend />
                    <Bar dataKey="leads" fill="#ff0000" name="Leads" />
                    <Bar dataKey="converted" fill="#000000" name="Convertidos" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
              <div className="mt-4 grid grid-cols-3 gap-4">
                <div className="border rounded-md p-3">
                  <div className="text-sm font-medium">Taxa de Conversão</div>
                  <div className="text-2xl font-bold">42.8%</div>
                  <div className="text-xs text-green-500">+2.5% este mês</div>
                </div>
                <div className="border rounded-md p-3">
                  <div className="text-sm font-medium">Tempo Médio de Conversão</div>
                  <div className="text-2xl font-bold">3.2 dias</div>
                  <div className="text-xs text-green-500">-0.5 dias este mês</div>
                </div>
                <div className="border rounded-md p-3">
                  <div className="text-sm font-medium">Valor Médio</div>
                  <div className="text-2xl font-bold">R$ 4.850</div>
                  <div className="text-xs text-green-500">+R$ 320 este mês</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="reports" className="space-y-4">
          <Card className="col-span-4">
            <CardHeader>
              <CardTitle>Relatórios</CardTitle>
              <CardDescription>Relatórios detalhados de desempenho</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="border rounded-md p-4 flex justify-between items-center">
                  <div>
                    <div className="font-medium">Relatório de Leads Mensal</div>
                    <div className="text-sm text-muted-foreground">Dados completos de leads e conversões</div>
                  </div>
                  <Button>Baixar PDF</Button>
                </div>
                <div className="border rounded-md p-4 flex justify-between items-center">
                  <div>
                    <div className="font-medium">Relatório de Desempenho por Segmento</div>
                    <div className="text-sm text-muted-foreground">Análise detalhada por segmento de mercado</div>
                  </div>
                  <Button>Baixar PDF</Button>
                </div>
                <div className="border rounded-md p-4 flex justify-between items-center">
                  <div>
                    <div className="font-medium">Relatório de Urgência</div>
                    <div className="text-sm text-muted-foreground">Análise de leads por nível de urgência</div>
                  </div>
                  <Button>Baixar PDF</Button>
                </div>
                <div className="border rounded-md p-4 flex justify-between items-center">
                  <div>
                    <div className="font-medium">Relatório de Conversão</div>
                    <div className="text-sm text-muted-foreground">Análise detalhada de taxas de conversão</div>
                  </div>
                  <Button>Baixar PDF</Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="notifications" className="space-y-4">
          <Card className="col-span-4">
            <CardHeader>
              <CardTitle>Centro de Notificações</CardTitle>
              <CardDescription>Acompanhe todas as atualizações do sistema</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {notifications.map((notification) => (
                  <div key={notification.id} className="flex items-start space-x-4 p-4 border rounded-lg">
                    <div className="rounded-full bg-red-500/20 p-2">
                      <Bell className="h-4 w-4 text-red-500" />
                    </div>
                    <div className="flex-1 space-y-1">
                      <p className="text-sm font-medium">{notification.title}</p>
                      <p className="text-xs text-muted-foreground">{notification.description}</p>
                      <p className="text-xs text-muted-foreground">{notification.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <div className="text-center text-xs text-muted-foreground mt-8">
        <p>© Dandara Silva 2025. Todos os direitos reservados.</p>
        <p>Sistema de prospecção automática com integração às APIs do LinkedIn, Casa dos Dados e Google</p>
      </div>
    </div>
  )
}

