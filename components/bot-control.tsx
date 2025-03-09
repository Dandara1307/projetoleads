"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Clock, MessageSquare, Settings, Play, Pause, RefreshCw, Edit } from "lucide-react"

export function BotControl() {
  const [isActive, setIsActive] = useState(true)
  const [messages, setMessages] = useState([
    {
      id: 1,
      time: "12:45",
      recipient: "carlos@saudetotal.com.br",
      content: "Apresentação de serviços de transporte urgente para medicamentos",
      status: "Enviado",
    },
    {
      id: 2,
      time: "12:44",
      recipient: "(21) 97654-3210",
      content: "Proposta de serviço de transporte seguro para valores bancários",
      status: "Entregue",
    },
    {
      id: 3,
      time: "12:42",
      recipient: "roberto@techmaster.com.br",
      content: "Cotação para transporte de produtos eletrônicos",
      status: "Lido",
    },
  ])
  const [lastUpdated, setLastUpdated] = useState(new Date())

  // Simular envio de novas mensagens a cada 30 segundos
  useEffect(() => {
    if (!isActive) return

    const interval = setInterval(() => {
      const newMessage = {
        id: Date.now(),
        time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        recipient: getRandomRecipient(),
        content: getRandomContent(),
        status: "Enviado",
      }

      setMessages((prev) => [newMessage, ...prev.slice(0, 9)])
      setLastUpdated(new Date())
    }, 30000)

    return () => clearInterval(interval)
  }, [isActive])

  const getRandomRecipient = () => {
    const recipients = [
      "contato@drogariasaopaulo.com.br",
      "transportes@itau.com.br",
      "logistica@magazineluiza.com.br",
      "(11) 98765-4321",
      "(21) 97654-3210",
      "logistica@drogasil.com.br",
    ]
    return recipients[Math.floor(Math.random() * recipients.length)]
  }

  const getRandomContent = () => {
    const contents = [
      "Apresentação de serviços de transporte urgente para sua empresa",
      "Proposta de serviço de transporte seguro para documentos confidenciais",
      "Cotação para transporte de produtos com refrigeração",
      "Oferta de serviços de armazenagem temporária",
      "Proposta de serviço de coleta e entrega no mesmo dia",
      "Serviços de manuseio especializado para produtos frágeis",
    ]
    return contents[Math.floor(Math.random() * contents.length)]
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>Bot de Contato Automático</CardTitle>
            <CardDescription>Oferecendo serviços de transporte, manuseio, coleta e armazenagem</CardDescription>
          </div>
          <Badge variant={isActive ? "default" : "outline"}>{isActive ? "Ativo" : "Pausado"}</Badge>
        </div>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="messages">
          <TabsList className="mb-4">
            <TabsTrigger value="messages">Mensagens</TabsTrigger>
            <TabsTrigger value="settings">Configurações</TabsTrigger>
            <TabsTrigger value="stats">Estatísticas</TabsTrigger>
          </TabsList>

          <TabsContent value="messages">
            <div className="border rounded-md p-4 max-h-[300px] overflow-auto space-y-3">
              {messages.map((msg) => (
                <div key={msg.id} className="flex flex-col gap-1">
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-muted-foreground">{msg.time}</span>
                    <Badge variant="outline" className="text-xs">
                      {msg.status}
                    </Badge>
                  </div>
                  <div className="bg-muted p-3 rounded-md text-sm">
                    <div className="font-medium mb-1">Para: {msg.recipient}</div>
                    {msg.content}
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-4 text-xs text-muted-foreground flex items-center justify-between">
              <span>Última atualização: {lastUpdated.toLocaleTimeString()}</span>
              <Button variant="ghost" size="sm" onClick={() => setLastUpdated(new Date())}>
                <RefreshCw className="h-3 w-3 mr-1" /> Atualizar
              </Button>
            </div>
          </TabsContent>

          <TabsContent value="settings">
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="border rounded-md p-4">
                  <h4 className="font-medium mb-2">Frequência de Envio</h4>
                  <div className="flex items-center justify-between">
                    <span>A cada 30 segundos</span>
                    <Button variant="outline" size="sm">
                      <Settings className="h-4 w-4 mr-1" /> Ajustar
                    </Button>
                  </div>
                </div>
                <div className="border rounded-md p-4">
                  <h4 className="font-medium mb-2">Canais de Contato</h4>
                  <div className="flex items-center justify-between">
                    <span>Email, WhatsApp, SMS</span>
                    <Button variant="outline" size="sm">
                      <Settings className="h-4 w-4 mr-1" /> Ajustar
                    </Button>
                  </div>
                </div>
              </div>
              <div className="border rounded-md p-4">
                <h4 className="font-medium mb-2">Modelos de Mensagem</h4>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span>Transporte Urgente</span>
                    <Button variant="ghost" size="sm">
                      <Edit className="h-4 w-4" />
                    </Button>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Armazenagem Temporária</span>
                    <Button variant="ghost" size="sm">
                      <Edit className="h-4 w-4" />
                    </Button>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Coleta e Entrega</span>
                    <Button variant="ghost" size="sm">
                      <Edit className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="stats">
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div className="border rounded-md p-4">
                <div className="text-2xl font-bold">247</div>
                <div className="text-sm text-muted-foreground">Mensagens enviadas hoje</div>
              </div>
              <div className="border rounded-md p-4">
                <div className="text-2xl font-bold">32%</div>
                <div className="text-sm text-muted-foreground">Taxa de resposta</div>
              </div>
              <div className="border rounded-md p-4">
                <div className="text-2xl font-bold">18</div>
                <div className="text-sm text-muted-foreground">Cotações solicitadas</div>
              </div>
              <div className="border rounded-md p-4">
                <div className="text-2xl font-bold">5</div>
                <div className="text-sm text-muted-foreground">Conversões hoje</div>
              </div>
            </div>
            <div className="border rounded-md p-4">
              <h4 className="font-medium mb-2">Desempenho por Segmento</h4>
              <div className="space-y-3">
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm">Farmácias</span>
                    <span className="text-sm font-medium">42%</span>
                  </div>
                  <div className="w-full bg-muted rounded-full h-2">
                    <div className="bg-primary h-2 rounded-full" style={{ width: "42%" }}></div>
                  </div>
                </div>
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm">Bancos</span>
                    <span className="text-sm font-medium">28%</span>
                  </div>
                  <div className="w-full bg-muted rounded-full h-2">
                    <div className="bg-primary h-2 rounded-full" style={{ width: "28%" }}></div>
                  </div>
                </div>
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm">Eletrônicos</span>
                    <span className="text-sm font-medium">30%</span>
                  </div>
                  <div className="w-full bg-muted rounded-full h-2">
                    <div className="bg-primary h-2 rounded-full" style={{ width: "30%" }}></div>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
      <CardFooter className="flex justify-between">
        <div className="flex items-center gap-2">
          <Clock className="h-4 w-4 text-muted-foreground" />
          <span className="text-sm text-muted-foreground">Próxima mensagem em 30s</span>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={() => setIsActive(!isActive)}>
            {isActive ? <Pause className="h-4 w-4 mr-1" /> : <Play className="h-4 w-4 mr-1" />}
            {isActive ? "Pausar" : "Iniciar"}
          </Button>
          <Button>
            <MessageSquare className="h-4 w-4 mr-1" /> Configurar Mensagens
          </Button>
        </div>
      </CardFooter>
    </Card>
  )
}

