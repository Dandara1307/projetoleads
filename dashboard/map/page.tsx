"use client"

import { RealTimeMap } from "@/components/real-time-map"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, MapPin, Phone, Clock, AlertTriangle } from "lucide-react"
import Link from "next/link"

export default function MapPage() {
  return (
    <div className="container mx-auto p-6">
      <div className="flex items-center gap-2 mb-6">
        <Link href="/dashboard">
          <Button variant="outline" size="icon">
            <ArrowLeft className="h-4 w-4" />
          </Button>
        </Link>
        <div>
          <h1 className="text-2xl font-bold">Localização em Tempo Real</h1>
          <p className="text-sm text-muted-foreground">Sistema otimizado para localizar mais de 150 empresas por dia</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2">
          <RealTimeMap />
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Leads Próximos</CardTitle>
              <CardDescription>Empresas com necessidades urgentes</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="border rounded-md p-3">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <div className="bg-red-500 rounded-full w-2 h-2"></div>
                      <span className="font-medium">Drogaria São Paulo</span>
                    </div>
                    <Badge>Farmácia</Badge>
                  </div>
                  <div className="grid grid-cols-2 gap-2 text-sm">
                    <div className="flex items-center gap-1">
                      <MapPin className="h-3 w-3 text-muted-foreground" />
                      <span className="text-muted-foreground">1.2km</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <AlertTriangle className="h-3 w-3 text-red-500" />
                      <span className="text-red-500">Urgência Crítica</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Phone className="h-3 w-3 text-muted-foreground" />
                      <span className="text-muted-foreground">(11) 3224-5678</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="h-3 w-3 text-muted-foreground" />
                      <span className="text-muted-foreground">Há 15min</span>
                    </div>
                  </div>
                  <div className="mt-2 text-xs bg-muted p-1 rounded flex justify-between">
                    <span>Origem: São Paulo - SP</span>
                    <span>Destino: Rio de Janeiro - RJ</span>
                  </div>
                  <div className="flex justify-end mt-2">
                    <Button size="sm">Contatar</Button>
                  </div>
                </div>

                <div className="border rounded-md p-3">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <div className="bg-orange-500 rounded-full w-2 h-2"></div>
                      <span className="font-medium">Banco Itaú</span>
                    </div>
                    <Badge>Banco</Badge>
                  </div>
                  <div className="grid grid-cols-2 gap-2 text-sm">
                    <div className="flex items-center gap-1">
                      <MapPin className="h-3 w-3 text-muted-foreground" />
                      <span className="text-muted-foreground">2.5km</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <AlertTriangle className="h-3 w-3 text-orange-500" />
                      <span className="text-orange-500">Urgência Alta</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Phone className="h-3 w-3 text-muted-foreground" />
                      <span className="text-muted-foreground">(11) 4004-4828</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="h-3 w-3 text-muted-foreground" />
                      <span className="text-muted-foreground">Há 28min</span>
                    </div>
                  </div>
                  <div className="mt-2 text-xs bg-muted p-1 rounded flex justify-between">
                    <span>Origem: São Paulo - SP</span>
                    <span>Destino: Brasília - DF</span>
                  </div>
                  <div className="flex justify-end mt-2">
                    <Button size="sm">Contatar</Button>
                  </div>
                </div>

                <div className="border rounded-md p-3">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <div className="bg-red-500 rounded-full w-2 h-2"></div>
                      <span className="font-medium">Magazine Luiza</span>
                    </div>
                    <Badge>Eletrônicos</Badge>
                  </div>
                  <div className="grid grid-cols-2 gap-2 text-sm">
                    <div className="flex items-center gap-1">
                      <MapPin className="h-3 w-3 text-muted-foreground" />
                      <span className="text-muted-foreground">3.1km</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <AlertTriangle className="h-3 w-3 text-red-500" />
                      <span className="text-red-500">Urgência Crítica</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Phone className="h-3 w-3 text-muted-foreground" />
                      <span className="text-muted-foreground">(11) 3508-9000</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="h-3 w-3 text-muted-foreground" />
                      <span className="text-muted-foreground">Há 42min</span>
                    </div>
                  </div>
                  <div className="mt-2 text-xs bg-muted p-1 rounded flex justify-between">
                    <span>Origem: São Paulo - SP</span>
                    <span>Destino: Belo Horizonte - MG</span>
                  </div>
                  <div className="flex justify-end mt-2">
                    <Button size="sm">Contatar</Button>
                  </div>
                </div>

                <Button variant="outline" className="w-full">
                  Ver Todos os Leads
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Integrações de API</CardTitle>
              <CardDescription>Status das conexões externas</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-center justify-between p-2 border rounded-md">
                  <span className="font-medium">Google Maps API</span>
                  <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                    Conectado
                  </Badge>
                </div>
                <div className="flex items-center justify-between p-2 border rounded-md">
                  <span className="font-medium">LinkedIn API</span>
                  <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                    Conectado
                  </Badge>
                </div>
                <div className="flex items-center justify-between p-2 border rounded-md">
                  <span className="font-medium">Casa dos Dados</span>
                  <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                    Conectado
                  </Badge>
                </div>
                <div className="flex items-center justify-between p-2 border rounded-md">
                  <span className="font-medium">Google Places API</span>
                  <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                    Conectado
                  </Badge>
                </div>
              </div>
              <div className="mt-4 p-2 bg-primary/10 border border-primary/20 rounded-md">
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4 text-primary" />
                  <span className="text-sm font-medium">Capacidade de processamento</span>
                </div>
                <p className="text-xs text-muted-foreground mt-1">
                  O sistema está configurado para localizar e processar mais de 150 empresas diariamente em tempo real
                  que necessitam de transporte interestadual.
                </p>
              </div>
              <div className="mt-4 text-xs text-muted-foreground">
                Última verificação: {new Date().toLocaleTimeString()}
              </div>
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

