"use client"

import { useEffect, useState } from "react"
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet"
import "leaflet/dist/leaflet.css"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

// Função para obter a cor da urgência para os badges
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

export default function MapComponent({ leads, apiKey, center, zoom }) {
  const [mapReady, setMapReady] = useState(false)

  useEffect(() => {
    // Corrigir o problema dos ícones do Leaflet
    if (typeof window !== "undefined") {
      // Importar o Leaflet dinamicamente
      import("leaflet").then((L) => {
        delete L.Icon.Default.prototype._getIconUrl
        L.Icon.Default.mergeOptions({
          iconRetinaUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png",
          iconUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png",
          shadowUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png",
        })
        setMapReady(true)
      })
    }
  }, [])

  if (!mapReady) {
    return <div className="w-full h-full bg-muted flex items-center justify-center">Carregando mapa...</div>
  }

  return (
    <MapContainer center={center} zoom={zoom} style={{ height: "100%", width: "100%" }}>
      <TileLayer
        url={`https://tile.openstreetmap.org/{z}/{x}/{y}.png`}
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        apiKey={apiKey}
      />
      {leads.map((lead) => (
        <Marker key={lead.id} position={lead.coordinates}>
          <Popup>
            <div className="p-1">
              <h3 className="font-bold text-sm">{lead.company}</h3>
              <div className="flex items-center gap-1 mt-1">
                <Badge className={`${getUrgencyColor(lead.urgency)} text-white text-xs py-0 h-4`}>{lead.urgency}</Badge>
                <Badge className="text-xs py-0 h-4">{lead.segment}</Badge>
              </div>
              <div className="text-xs mt-1">
                <p>
                  <strong>Origem:</strong> {lead.origin}
                </p>
                <p>
                  <strong>Destino:</strong> {lead.destination}
                </p>
                <p>
                  <strong>Telefone:</strong> {lead.phone}
                </p>
                <p>
                  <strong>Atualizado:</strong> há {lead.lastUpdated}
                </p>
              </div>
              <Button size="sm" className="w-full mt-1 text-xs h-7">
                Contatar
              </Button>
            </div>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  )
}

