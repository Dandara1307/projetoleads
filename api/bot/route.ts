import { NextResponse } from "next/server"

// API para o bot de contato automático
// Esta API simula o envio de mensagens automáticas para leads

export async function POST(request: Request) {
  try {
    const data = await request.json()
    const { leadId, contactType, message } = data

    // Validação básica
    if (!leadId || !contactType || !message) {
      return NextResponse.json({ error: "Dados insuficientes para enviar mensagem" }, { status: 400 })
    }

    // Simulação de envio de mensagem
    // Em um sistema real, isso se conectaria a APIs de email, WhatsApp, etc.

    // Simular um pequeno atraso para parecer mais realista
    await new Promise((resolve) => setTimeout(resolve, 1500))

    // Resposta simulada
    return NextResponse.json({
      success: true,
      messageId: `MSG-${Math.floor(Math.random() * 10000)
        .toString()
        .padStart(4, "0")}`,
      leadId,
      contactType,
      status: "sent",
      sentAt: new Date().toISOString(),
      message: {
        preview: message.substring(0, 100) + (message.length > 100 ? "..." : ""),
        full: message,
      },
    })
  } catch (error) {
    console.error("Erro ao enviar mensagem:", error)
    return NextResponse.json({ error: "Erro ao processar a solicitação de envio" }, { status: 500 })
  }
}

// Endpoint para obter histórico de mensagens
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const leadId = searchParams.get("leadId")

  // Dados simulados de histórico de mensagens
  const messageHistory = [
    {
      id: "MSG-0001",
      leadId: leadId || "1",
      contactType: "email",
      status: "delivered",
      sentAt: new Date(Date.now() - 3600000).toISOString(), // 1 hora atrás
      message: "Prezado cliente, gostaríamos de oferecer nossos serviços de transporte urgente para sua empresa...",
      recipient: "contato@empresa.com.br",
    },
    {
      id: "MSG-0002",
      leadId: leadId || "1",
      contactType: "whatsapp",
      status: "read",
      sentAt: new Date(Date.now() - 7200000).toISOString(), // 2 horas atrás
      message: "Olá! Somos especializados em transporte de produtos com urgência. Podemos ajudar sua empresa?",
      recipient: "(11) 98765-4321",
    },
    {
      id: "MSG-0003",
      leadId: leadId || "1",
      contactType: "sms",
      status: "sent",
      sentAt: new Date(Date.now() - 10800000).toISOString(), // 3 horas atrás
      message:
        "TransportaLead: Oferecemos serviços de transporte, manuseio, coleta e armazenagem. Responda para mais informações.",
      recipient: "(11) 98765-4321",
    },
  ]

  return NextResponse.json({
    success: true,
    messages: messageHistory,
  })
}

