"use client"

import { BotControl } from "@/components/bot-control"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { MessageSquare, Settings, Users, ArrowLeft } from "lucide-react"
import Link from "next/link"

export default function BotPage() {
  return (
    <div className="container mx-auto p-6">
      <div className="flex items-center gap-2 mb-6">
        <Link href="/dashboard">
          <Button variant="outline" size="icon">
            <ArrowLeft className="h-4 w-4" />
          </Button>
        </Link>
        <h1 className="text-2xl font-bold">Bot de Contato Automático</h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2">
          <BotControl />
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Estatísticas do Bot</CardTitle>
              <CardDescription>Desempenho das mensagens automáticas</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm">Taxa de Entrega</span>
                    <span className="text-sm font-medium">98%</span>
                  </div>
                  <div className="w-full bg-muted rounded-full h-2">
                    <div className="bg-green-500 h-2 rounded-full" style={{ width: "98%" }}></div>
                  </div>
                </div>
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm">Taxa de Abertura</span>
                    <span className="text-sm font-medium">72%</span>
                  </div>
                  <div className="w-full bg-muted rounded-full h-2">
                    <div className="bg-blue-500 h-2 rounded-full" style={{ width: "72%" }}></div>
                  </div>
                </div>
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm">Taxa de Resposta</span>
                    <span className="text-sm font-medium">32%</span>
                  </div>
                  <div className="w-full bg-muted rounded-full h-2">
                    <div className="bg-primary h-2 rounded-full" style={{ width: "32%" }}></div>
                  </div>
                </div>
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm">Taxa de Conversão</span>
                    <span className="text-sm font-medium">12%</span>
                  </div>
                  <div className="w-full bg-muted rounded-full h-2">
                    <div className="bg-yellow-500 h-2 rounded-full" style={{ width: "12%" }}></div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Configurações Rápidas</CardTitle>
              <CardDescription>Ajuste os parâmetros do bot</CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="messages">
                <TabsList className="w-full mb-4">
                  <TabsTrigger value="messages" className="flex-1">
                    <MessageSquare className="h-4 w-4 mr-1" /> Mensagens
                  </TabsTrigger>
                  <TabsTrigger value="settings" className="flex-1">
                    <Settings className="h-4 w-4 mr-1" /> Configurações
                  </TabsTrigger>
                  <TabsTrigger value="targets" className="flex-1">
                    <Users className="h-4 w-4 mr-1" /> Alvos
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="messages">
                  <div className="space-y-4">
                    <div className="border rounded-md p-3">
                      <div className="font-medium mb-1">Transporte Urgente</div>
                      <p className="text-sm text-muted-foreground">
                        Oferecemos serviços de transporte urgente para sua empresa. Podemos ajudar?
                      </p>
                      <div className="flex justify-end mt-2">
                        <Button variant="outline" size="sm">
                          Editar
                        </Button>
                      </div>
                    </div>
                    <div className="border rounded-md p-3">
                      <div className="font-medium mb-1">Armazenagem</div>
                      <p className="text-sm text-muted-foreground">
                        Precisa de soluções de armazenagem temporária? Temos espaço disponível!
                      </p>
                      <div className="flex justify-end mt-2">
                        <Button variant="outline" size="sm">
                          Editar
                        </Button>
                      </div>
                    </div>
                    <Button className="w-full">Adicionar Modelo</Button>
                  </div>
                </TabsContent>

                <TabsContent value="settings">
                  <div className="space-y-4">
                    <div className="border rounded-md p-3">
                      <div className="font-medium mb-1">Frequência de Envio</div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-muted-foreground">A cada 30 segundos</span>
                        <Button variant="outline" size="sm">
                          Ajustar
                        </Button>
                      </div>
                    </div>
                    <div className="border rounded-md p-3">
                      <div className="font-medium mb-1">Canais Ativos</div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-muted-foreground">Email, WhatsApp, SMS</span>
                        <Button variant="outline" size="sm">
                          Ajustar
                        </Button>
                      </div>
                    </div>
                    <div className="border rounded-md p-3">
                      <div className="font-medium mb-1">Horário de Funcionamento</div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-muted-foreground">8:00 - 18:00</span>
                        <Button variant="outline" size="sm">
                          Ajustar
                        </Button>
                      </div>
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="targets">
                  <div className="space-y-4">
                    <div className="border rounded-md p-3">
                      <div className="font-medium mb-1">Segmentos Alvo</div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-muted-foreground">Farmácias, Bancos, Eletrônicos</span>
                        <Button variant="outline" size="sm">
                          Ajustar
                        </Button>
                      </div>
                    </div>
                    <div className="border rounded-md p-3">
                      <div className="font-medium mb-1">Prioridade de Urgência</div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-muted-foreground">Crítica, Alta, Média</span>
                        <Button variant="outline" size="sm">
                          Ajustar
                        </Button>
                      </div>
                    </div>
                    <div className="border rounded-md p-3">
                      <div className="font-medium mb-1">Localização</div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-muted-foreground">Raio de 50km</span>
                        <Button variant="outline" size="sm">
                          Ajustar
                        </Button>
                      </div>
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>
      </div>

      <div className="mt-6 text-center text-xs text-muted-foreground">
        © Dandara Silva 2025. Todos os direitos reservados.
      </div>
    </div>
  )
}

