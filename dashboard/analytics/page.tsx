"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ArrowLeft, Download } from "lucide-react"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import {
  Bar,
  BarChart,
  Line,
  LineChart,
  Pie,
  PieChart,
  XAxis,
  YAxis,
  ResponsiveContainer,
  Tooltip,
  Legend,
  Cell,
} from "recharts"

export default function AnalyticsPage() {
  const [activeTab, setActiveTab] = useState("overview")

  // Dados para os gráficos - atualizados para 2025
  const leadData = [
    { date: "2025-01", leads: 1050, conversions: 420 },
    { date: "2025-02", leads: 1120, conversions: 460 },
    { date: "2025-03", leads: 1180, conversions: 490 },
    { date: "2025-04", leads: 1240, conversions: 520 },
    { date: "2025-05", leads: 1310, conversions: 550 },
    { date: "2025-06", leads: 1380, conversions: 590 },
    { date: "2025-07", leads: 1450, conversions: 630 },
    { date: "2025-08", leads: 1520, conversions: 670 },
    { date: "2025-09", leads: 1590, conversions: 710 },
    { date: "2025-10", leads: 1660, conversions: 750 },
    { date: "2025-11", leads: 1730, conversions: 790 },
    { date: "2025-12", leads: 1800, conversions: 830 },
  ]

  const segmentData = [
    { name: "Farmácia", value: 35 },
    { name: "Banco", value: 20 },
    { name: "Eletrônicos", value: 25 },
    { name: "Alimentos", value: 15 },
    { name: "Outros", value: 5 },
  ]

  const urgencyData = [
    { name: "Crítica", value: 40 },
    { name: "Alta", value: 35 },
    { name: "Média", value: 20 },
    { name: "Baixa", value: 5 },
  ]

  const regionData = [
    { name: "Sudeste", value: 45 },
    { name: "Sul", value: 25 },
    { name: "Nordeste", value: 15 },
    { name: "Centro-Oeste", value: 10 },
    { name: "Norte", value: 5 },
  ]

  const revenueData = [
    { month: "Jan", revenue: 125000, expenses: 85000 },
    { month: "Fev", revenue: 145000, expenses: 90000 },
    { month: "Mar", revenue: 165000, expenses: 95000 },
    { month: "Abr", revenue: 180000, expenses: 100000 },
    { month: "Mai", revenue: 195000, expenses: 105000 },
    { month: "Jun", revenue: 220000, expenses: 110000 },
    { month: "Jul", revenue: 240000, expenses: 115000 },
    { month: "Ago", revenue: 260000, expenses: 120000 },
    { month: "Set", revenue: 280000, expenses: 125000 },
    { month: "Out", revenue: 300000, expenses: 130000 },
    { month: "Nov", revenue: 320000, expenses: 135000 },
    { month: "Dez", revenue: 340000, expenses: 140000 },
  ]

  // Cores para os gráficos de pizza - atualizadas conforme solicitado
  const COLORS = ["hsl(0, 70%, 50%)", "hsl(0, 0%, 50%)", "hsl(0, 0%, 80%)", "hsl(0, 0%, 0%)", "hsl(120, 70%, 40%)"]

  // Função para formatar valores monetários
  const formatCurrency = (value) => {
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(value)
  }

  return (
    <div className="container mx-auto p-6">
      <div className="flex items-center gap-2 mb-6">
        <Link href="/dashboard">
          <Button variant="outline" size="icon">
            <ArrowLeft className="h-4 w-4" />
          </Button>
        </Link>
        <div className="flex-1">
          <h1 className="text-2xl font-bold">Análise de Dados</h1>
          <p className="text-sm text-muted-foreground">Visualize métricas e tendências de leads e conversões</p>
        </div>
        <Button variant="outline" className="gap-2">
          <Download className="h-4 w-4" />
          Exportar Relatório
        </Button>
      </div>

      <Tabs defaultValue="overview" value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList>
          <TabsTrigger value="overview">Visão Geral</TabsTrigger>
          <TabsTrigger value="leads">Leads</TabsTrigger>
          <TabsTrigger value="revenue">Receita</TabsTrigger>
          <TabsTrigger value="segments">Segmentos</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Total de Leads</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">12,752</div>
                <p className="text-xs text-muted-foreground">
                  <span className="text-green-500">+12%</span> em relação ao mês anterior
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Taxa de Conversão</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">48.2%</div>
                <p className="text-xs text-muted-foreground">
                  <span className="text-green-500">+5.3%</span> em relação ao mês anterior
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Receita Total</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">R$ 3.25M</div>
                <p className="text-xs text-muted-foreground">
                  <span className="text-green-500">+18.3%</span> em relação ao mês anterior
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Ticket Médio</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">R$ 4.850</div>
                <p className="text-xs text-muted-foreground">
                  <span className="text-red-500">-2.1%</span> em relação ao mês anterior
                </p>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Desempenho de Leads</CardTitle>
              <CardDescription>Comparação entre leads gerados e conversões</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[300px]">
                <ChartContainer
                  config={{
                    leads: {
                      label: "Leads",
                      color: "hsl(0, 70%, 50%)",
                    },
                    conversions: {
                      label: "Conversões",
                      color: "hsl(0, 0%, 20%)",
                    },
                  }}
                >
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={leadData} barSize={30} barGap={10}>
                      <XAxis
                        dataKey="date"
                        tickLine={false}
                        axisLine={true}
                        height={50}
                        tickMargin={10}
                        tickFormatter={(value) => {
                          const date = new Date(value)
                          return date.toLocaleDateString("pt-BR", { month: "short" }).replace(".", "")
                        }}
                      />
                      <YAxis tickLine={false} axisLine={true} tickFormatter={(value) => `${value}`} />
                      <Bar dataKey="leads" fill="hsl(0, 70%, 50%)" radius={[4, 4, 0, 0]} />
                      <Bar dataKey="conversions" fill="hsl(0, 0%, 20%)" radius={[4, 4, 0, 0]} />
                      <ChartTooltip
                        content={
                          <ChartTooltipContent
                            labelFormatter={(value) => {
                              const date = new Date(value)
                              return date.toLocaleDateString("pt-BR", { month: "long", year: "numeric" })
                            }}
                          />
                        }
                      />
                    </BarChart>
                  </ResponsiveContainer>
                </ChartContainer>
              </div>
            </CardContent>
          </Card>

          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Distribuição por Segmento</CardTitle>
                <CardDescription>Leads por segmento de mercado</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={segmentData}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        outerRadius={100}
                        fill="#8884d8"
                        dataKey="value"
                        label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                      >
                        {segmentData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip formatter={(value) => [`${value} leads`, "Quantidade"]} />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Distribuição por Urgência</CardTitle>
                <CardDescription>Leads por nível de urgência</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={urgencyData}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        outerRadius={100}
                        fill="#8884d8"
                        dataKey="value"
                        label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                      >
                        {urgencyData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip formatter={(value) => [`${value}%`, "Percentual"]} />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="leads" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Tendência de Leads</CardTitle>
              <CardDescription>Evolução mensal de leads gerados</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[400px]">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={leadData}>
                    <XAxis
                      dataKey="date"
                      tickFormatter={(value) => {
                        const date = new Date(value)
                        return date.toLocaleDateString("pt-BR", { month: "short" }).replace(".", "")
                      }}
                    />
                    <YAxis />
                    <Tooltip
                      formatter={(value) => [`${value} leads`, "Quantidade"]}
                      labelFormatter={(value) => {
                        const date = new Date(value)
                        return date.toLocaleDateString("pt-BR", { month: "long", year: "numeric" })
                      }}
                    />
                    <Legend />
                    <Line type="monotone" dataKey="leads" stroke="hsl(0, 70%, 50%)" activeDot={{ r: 8 }} />
                    <Line type="monotone" dataKey="conversions" stroke="hsl(0, 0%, 20%)" />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Distribuição Regional</CardTitle>
                <CardDescription>Leads por região geográfica</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={regionData}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        outerRadius={100}
                        fill="#8884d8"
                        dataKey="value"
                        label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                      >
                        {regionData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip formatter={(value) => [`${value}%`, "Percentual"]} />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Taxa de Conversão por Segmento</CardTitle>
                <CardDescription>Percentual de conversão por segmento</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      layout="vertical"
                      data={[
                        { name: "Farmácia", rate: 65 },
                        { name: "Banco", rate: 72 },
                        { name: "Eletrônicos", rate: 58 },
                        { name: "Alimentos", rate: 45 },
                        { name: "Outros", rate: 40 },
                      ]}
                      margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                    >
                      <XAxis type="number" domain={[0, 100]} />
                      <YAxis dataKey="name" type="category" />
                      <Tooltip formatter={(value) => [`${value}%`, "Taxa de Conversão"]} />
                      <Bar dataKey="rate" fill="hsl(0, 70%, 50%)" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="revenue" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Receita vs Despesas</CardTitle>
              <CardDescription>Comparação mensal entre receita e despesas</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[400px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={revenueData}>
                    <XAxis dataKey="month" />
                    <YAxis tickFormatter={(value) => `R$${value / 1000}k`} />
                    <Tooltip formatter={(value) => [formatCurrency(value), "Valor"]} />
                    <Legend />
                    <Bar dataKey="revenue" name="Receita" fill="hsl(0, 70%, 50%)" />
                    <Bar dataKey="expenses" name="Despesas" fill="hsl(0, 0%, 20%)" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Lucro Mensal</CardTitle>
                <CardDescription>Evolução do lucro nos últimos meses</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart
                      data={revenueData.map((item) => ({
                        ...item,
                        profit: item.revenue - item.expenses,
                      }))}
                    >
                      <XAxis dataKey="month" />
                      <YAxis tickFormatter={(value) => `R$${value / 1000}k`} />
                      <Tooltip formatter={(value) => [formatCurrency(value), "Lucro"]} />
                      <Line type="monotone" dataKey="profit" stroke="hsl(120, 70%, 40%)" strokeWidth={2} />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Margem de Lucro</CardTitle>
                <CardDescription>Percentual de margem de lucro por mês</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      data={revenueData.map((item) => ({
                        month: item.month,
                        margin: (((item.revenue - item.expenses) / item.revenue) * 100).toFixed(1),
                      }))}
                    >
                      <XAxis dataKey="month" />
                      <YAxis domain={[0, 100]} tickFormatter={(value) => `${value}%`} />
                      <Tooltip formatter={(value) => [`${value}%`, "Margem de Lucro"]} />
                      <Bar dataKey="margin" fill="hsl(0, 70%, 50%)" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="segments" className="space-y-6">
          <div className="grid gap-6 md:grid-cols-3">
            <Card>
              <CardHeader>
                <CardTitle>Farmácia</CardTitle>
                <CardDescription>Análise do segmento farmacêutico</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <p className="text-sm font-medium">Total de Leads</p>
                    <p className="text-2xl font-bold">4,312</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium">Taxa de Conversão</p>
                    <p className="text-2xl font-bold">65%</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium">Ticket Médio</p>
                    <p className="text-2xl font-bold">R$ 5,250</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Banco</CardTitle>
                <CardDescription>Análise do segmento bancário</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <p className="text-sm font-medium">Total de Leads</p>
                    <p className="text-2xl font-bold">2,750</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium">Taxa de Conversão</p>
                    <p className="text-2xl font-bold">72%</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium">Ticket Médio</p>
                    <p className="text-2xl font-bold">R$ 7,800</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Eletrônicos</CardTitle>
                <CardDescription>Análise do segmento de eletrônicos</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <p className="text-sm font-medium">Total de Leads</p>
                    <p className="text-2xl font-bold">3,938</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium">Taxa de Conversão</p>
                    <p className="text-2xl font-bold">58%</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium">Ticket Médio</p>
                    <p className="text-2xl font-bold">R$ 6,120</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Comparativo de Segmentos</CardTitle>
              <CardDescription>Desempenho comparativo entre segmentos</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[400px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={[
                      { name: "Farmácia", leads: 4312, conversions: 2803, revenue: 14718250 },
                      { name: "Banco", leads: 2750, conversions: 1980, revenue: 15444000 },
                      { name: "Eletrônicos", leads: 3938, conversions: 2284, revenue: 13977280 },
                      { name: "Alimentos", leads: 1562, conversions: 703, revenue: 3515000 },
                      { name: "Outros", leads: 690, conversions: 276, revenue: 1380000 },
                    ]}
                  >
                    <XAxis dataKey="name" />
                    <YAxis yAxisId="left" orientation="left" stroke="hsl(0, 70%, 50%)" />
                    <YAxis
                      yAxisId="right"
                      orientation="right"
                      stroke="hsl(0, 0%, 20%)"
                      tickFormatter={(value) => `R$${value / 1000}k`}
                    />
                    <Tooltip
                      formatter={(value, name) => {
                        if (name === "revenue") return [formatCurrency(value), "Receita"]
                        return [value, name === "leads" ? "Leads" : "Conversões"]
                      }}
                    />
                    <Legend />
                    <Bar yAxisId="left" dataKey="leads" name="Leads" fill="hsl(0, 70%, 50%)" />
                    <Bar yAxisId="left" dataKey="conversions" name="Conversões" fill="hsl(0, 0%, 20%)" />
                    <Bar yAxisId="right" dataKey="revenue" name="Receita" fill="hsl(120, 70%, 40%)" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <div className="mt-6 text-center text-xs text-muted-foreground">
        <p>© Dandara Silva 2025. Todos os direitos reservados.</p>
      </div>
    </div>
  )
}

