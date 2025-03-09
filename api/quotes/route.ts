import { NextResponse } from "next/server"

// Simulação de API para geração automática de cotações
// Em um ambiente real, isso usaria algoritmos de precificação baseados em:
// - Distância entre origem e destino
// - Volume e peso da carga
// - Tipo de material
// - Urgência da entrega
// - Histórico de preços

export async function POST(request: Request) {
  try {
    const data = await request.json()

    // Dados necessários para gerar uma cotação
    const { company, origin, destination, volume, weight, serviceType, urgency } = data

    // Validação básica
    if (!company || !origin || !destination || !volume) {
      return NextResponse.json({ error: "Dados insuficientes para gerar cotação" }, { status: 400 })
    }

    // Simulação de cálculo de cotação
    // Em um sistema real, isso usaria algoritmos complexos de precificação

    // Cálculo básico simulado
    const basePrice = 500 // Preço base em reais

    // Fator de volume (R$ 100 por tonelada)
    const volumeValue = Number.parseFloat(volume) || 1
    const volumeFactor = volumeValue * 100

    // Fator de distância (simulado)
    // Em um sistema real, usaria APIs de geolocalização para calcular distâncias reais
    const distanceFactor = 200 // Valor fixo para simulação

    // Fator de serviço
    let serviceFactor = 1
    switch (serviceType) {
      case "transport":
        serviceFactor = 1
        break
      case "storage":
        serviceFactor = 0.8
        break
      case "handling":
        serviceFactor = 1.2
        break
      case "collection":
        serviceFactor = 0.9
        break
      case "complete":
        serviceFactor = 1.5
        break
      default:
        serviceFactor = 1
    }

    // Fator de urgência
    let urgencyFactor = 1
    switch (urgency) {
      case "low":
        urgencyFactor = 0.9
        break
      case "normal":
        urgencyFactor = 1
        break
      case "high":
        urgencyFactor = 1.3
        break
      case "urgent":
        urgencyFactor = 1.8
        break
      default:
        urgencyFactor = 1
    }

    // Cálculo do preço final
    const totalPrice = (basePrice + volumeFactor + distanceFactor) * serviceFactor * urgencyFactor

    // Arredondamento para duas casas decimais
    const finalPrice = Math.round(totalPrice * 100) / 100

    // Geração de ID único para a cotação
    const quoteId = `COT-${Math.floor(Math.random() * 10000)
      .toString()
      .padStart(4, "0")}`

    // Data de validade (15 dias a partir de hoje)
    const today = new Date()
    const validUntil = new Date(today)
    validUntil.setDate(today.getDate() + 15)

    // Resposta com a cotação gerada
    return NextResponse.json({
      success: true,
      quote: {
        id: quoteId,
        company,
        origin,
        destination,
        volume,
        weight: weight || "Não especificado",
        serviceType: serviceType || "transport",
        price: finalPrice,
        currency: "BRL",
        createdAt: today.toISOString(),
        validUntil: validUntil.toISOString(),
        estimatedDeliveryDays: urgency === "urgent" ? 1 : urgency === "high" ? 2 : 5,
        message: "Cotação gerada automaticamente pelo sistema",
      },
    })
  } catch (error) {
    console.error("Erro ao gerar cotação:", error)
    return NextResponse.json({ error: "Erro ao processar a solicitação de cotação" }, { status: 500 })
  }
}

