"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { ArrowLeft, Save } from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState("profile")
  const [isSaving, setIsSaving] = useState(false)

  const handleSave = () => {
    setIsSaving(true)

    // Simular salvamento
    setTimeout(() => {
      setIsSaving(false)
    }, 1500)
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
          <h1 className="text-2xl font-bold">Configurações</h1>
          <p className="text-sm text-muted-foreground">Gerencie suas preferências e configurações do sistema</p>
        </div>
      </div>

      <Tabs defaultValue="profile" value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList>
          <TabsTrigger value="profile">Perfil</TabsTrigger>
          <TabsTrigger value="notifications">Notificações</TabsTrigger>
          <TabsTrigger value="api">Integrações API</TabsTrigger>
          <TabsTrigger value="bot">Bot Automático</TabsTrigger>
        </TabsList>

        <TabsContent value="profile" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Informações do Perfil</CardTitle>
              <CardDescription>Atualize suas informações pessoais e da empresa</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Nome</Label>
                  <Input id="name" placeholder="Seu nome completo" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" type="email" placeholder="seu@email.com" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Telefone</Label>
                  <Input id="phone" placeholder="(00) 00000-0000" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="position">Cargo</Label>
                  <Input id="position" placeholder="Seu cargo na empresa" />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="company">Empresa</Label>
                <Input id="company" defaultValue="TransportaLead Logística Ltda." />
              </div>

              <div className="space-y-2">
                <Label htmlFor="address">Endereço</Label>
                <Textarea id="address" defaultValue="Av. Paulista, 1000, São Paulo - SP" />
              </div>
            </CardContent>
            <CardFooter>
              <Button className="gap-2" onClick={handleSave} disabled={isSaving}>
                {isSaving ? (
                  <>Salvando...</>
                ) : (
                  <>
                    <Save className="h-4 w-4" />
                    Salvar Alterações
                  </>
                )}
              </Button>
            </CardFooter>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Segurança</CardTitle>
              <CardDescription>Gerencie sua senha e configurações de segurança</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="current-password">Senha Atual</Label>
                  <Input id="current-password" type="password" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="new-password">Nova Senha</Label>
                  <Input id="new-password" type="password" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="confirm-password">Confirmar Nova Senha</Label>
                  <Input id="confirm-password" type="password" />
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <Switch id="two-factor" />
                <Label htmlFor="two-factor">Ativar autenticação de dois fatores</Label>
              </div>
            </CardContent>
            <CardFooter>
              <Button className="gap-2" onClick={handleSave} disabled={isSaving}>
                {isSaving ? (
                  <>Salvando...</>
                ) : (
                  <>
                    <Save className="h-4 w-4" />
                    Atualizar Senha
                  </>
                )}
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="notifications" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Preferências de Notificação</CardTitle>
              <CardDescription>Configure como e quando deseja receber notificações</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <h3 className="text-sm font-medium">Notificações por Email</h3>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="email-leads">Novos leads</Label>
                    <Switch id="email-leads" defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <Label htmlFor="email-quotes">Cotações solicitadas</Label>
                    <Switch id="email-quotes" defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <Label htmlFor="email-approvals">Cotações aprovadas</Label>
                    <Switch id="email-approvals" defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <Label htmlFor="email-reports">Relatórios semanais</Label>
                    <Switch id="email-reports" />
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-sm font-medium">Notificações no Sistema</h3>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="system-leads">Novos leads</Label>
                    <Switch id="system-leads" defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <Label htmlFor="system-quotes">Cotações solicitadas</Label>
                    <Switch id="system-quotes" defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <Label htmlFor="system-approvals">Cotações aprovadas</Label>
                    <Switch id="system-approvals" defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <Label htmlFor="system-messages">Mensagens de clientes</Label>
                    <Switch id="system-messages" defaultChecked />
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-sm font-medium">Notificações por SMS</h3>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="sms-leads">Novos leads urgentes</Label>
                    <Switch id="sms-leads" defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <Label htmlFor="sms-approvals">Cotações aprovadas</Label>
                    <Switch id="sms-approvals" />
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button className="gap-2" onClick={handleSave} disabled={isSaving}>
                {isSaving ? (
                  <>Salvando...</>
                ) : (
                  <>
                    <Save className="h-4 w-4" />
                    Salvar Preferências
                  </>
                )}
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="api" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Integrações API</CardTitle>
              <CardDescription>Configure as integrações com APIs externas</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <h3 className="text-sm font-medium">LinkedIn API</h3>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="linkedin-api">Status da Integração</Label>
                    <Switch id="linkedin-api" defaultChecked />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="linkedin-key">API Key</Label>
                    <Input id="linkedin-key" defaultValue="••••••••••••••••••••••••••••••" type="password" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="linkedin-secret">API Secret</Label>
                    <Input id="linkedin-secret" defaultValue="••••••••••••••••••••••••••••••" type="password" />
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-sm font-medium">Casa dos Dados API</h3>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="casadosdados-api">Status da Integração</Label>
                    <Switch id="casadosdados-api" defaultChecked />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="casadosdados-key">API Key</Label>
                    <Input id="casadosdados-key" defaultValue="••••••••••••••••••••••••••••••" type="password" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="casadosdados-plan">Plano</Label>
                    <Select defaultValue="premium">
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione o plano" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="basic">Básico</SelectItem>
                        <SelectItem value="standard">Padrão</SelectItem>
                        <SelectItem value="premium">Premium</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-sm font-medium">Google Maps API</h3>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="google-api">Status da Integração</Label>
                    <Switch id="google-api" defaultChecked />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="google-key">API Key</Label>
                    <Input id="google-key" defaultValue="••••••••••••••••••••••••••••••" type="password" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="google-services">Serviços Habilitados</Label>
                    <div className="grid grid-cols-2 gap-2">
                      <div className="flex items-center space-x-2">
                        <Switch id="maps-service" defaultChecked />
                        <Label htmlFor="maps-service">Maps</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Switch id="places-service" defaultChecked />
                        <Label htmlFor="places-service">Places</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Switch id="directions-service" defaultChecked />
                        <Label htmlFor="directions-service">Directions</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Switch id="distance-service" defaultChecked />
                        <Label htmlFor="distance-service">Distance Matrix</Label>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button className="gap-2" onClick={handleSave} disabled={isSaving}>
                {isSaving ? (
                  <>Salvando...</>
                ) : (
                  <>
                    <Save className="h-4 w-4" />
                    Salvar Configurações
                  </>
                )}
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="bot" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Configurações do Bot Automático</CardTitle>
              <CardDescription>Configure o comportamento do bot de contato automático</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <h3 className="text-sm font-medium">Status do Bot</h3>
                <div className="flex items-center justify-between">
                  <Label htmlFor="bot-status">Ativar Bot Automático</Label>
                  <Switch id="bot-status" defaultChecked />
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-sm font-medium">Canais de Contato</h3>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="channel-email">Email</Label>
                    <Switch id="channel-email" defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <Label htmlFor="channel-whatsapp">WhatsApp</Label>
                    <Switch id="channel-whatsapp" defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <Label htmlFor="channel-sms">SMS</Label>
                    <Switch id="channel-sms" />
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-sm font-medium">Critérios de Contato</h3>
                <div className="space-y-2">
                  <Label htmlFor="urgency-level">Nível de Urgência Mínimo</Label>
                  <Select defaultValue="alta">
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione o nível de urgência" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="critica">Apenas Crítica</SelectItem>
                      <SelectItem value="alta">Alta ou Crítica</SelectItem>
                      <SelectItem value="media">Média ou superior</SelectItem>
                      <SelectItem value="todas">Todas as urgências</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="segments">Segmentos Alvo</Label>
                  <Select defaultValue="todos">
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione os segmentos" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="todos">Todos os segmentos</SelectItem>
                      <SelectItem value="prioritarios">Apenas prioritários (Farmácia, Banco, Eletrônicos)</SelectItem>
                      <SelectItem value="customizado">Customizado</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="frequency">Frequência de Contato</Label>
                  <Select defaultValue="imediato">
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione a frequência" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="imediato">Imediato</SelectItem>
                      <SelectItem value="hora">A cada hora</SelectItem>
                      <SelectItem value="dia">Uma vez ao dia</SelectItem>
                      <SelectItem value="manual">Manual</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-sm font-medium">Mensagens Automáticas</h3>
                <div className="space-y-2">
                  <Label htmlFor="email-template">Template de Email</Label>
                  <Textarea
                    id="email-template"
                    rows={4}
                    defaultValue="Prezado(a) [NOME],

Identificamos que sua empresa [EMPRESA] está buscando serviços de transporte para [ORIGEM] até [DESTINO].

A TransportaLead oferece soluções de logística personalizadas com preços competitivos. Podemos ajudar com o transporte de [VOLUME] com urgência [URGENCIA].

Entre em contato conosco para uma cotação personalizada.

Atenciosamente,
Equipe TransportaLead"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="whatsapp-template">Template de WhatsApp</Label>
                  <Textarea
                    id="whatsapp-template"
                    rows={4}
                    defaultValue="Olá [NOME], somos da TransportaLead! 👋

Podemos ajudar sua empresa [EMPRESA] com o transporte de [VOLUME] de [ORIGEM] para [DESTINO].

Temos disponibilidade imediata para atender sua demanda com urgência [URGENCIA].

Responda a esta mensagem para receber uma cotação personalizada! 🚚"
                  />
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button className="gap-2" onClick={handleSave} disabled={isSaving}>
                {isSaving ? (
                  <>Salvando...</>
                ) : (
                  <>
                    <Save className="h-4 w-4" />
                    Salvar Configurações
                  </>
                )}
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>

      <div className="mt-6 text-center text-xs text-muted-foreground">
        <p>© Dandara Silva 2025. Todos os direitos reservados.</p>
      </div>
    </div>
  )
}

