import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight, Truck, Users, FileText, Clock } from "lucide-react"

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-2">
            <Truck className="h-6 w-6 text-primary" />
            <span className="text-xl font-bold">TransportaLead</span>
          </div>
          <nav className="hidden md:flex gap-6">
            <Link href="#features" className="text-sm font-medium hover:text-primary">
              Recursos
            </Link>
            <Link href="#how-it-works" className="text-sm font-medium hover:text-primary">
              Como Funciona
            </Link>
          </nav>
          <div className="flex items-center gap-4">
            <Link href="/login">
              <Button variant="outline">Entrar</Button>
            </Link>
            <Link href="/register">
              <Button>Registrar</Button>
            </Link>
          </div>
        </div>
      </header>
      <main className="flex-1">
        <section className="container py-24 space-y-8 md:py-32">
          <div className="mx-auto flex max-w-[58rem] flex-col items-center space-y-4 text-center">
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
              Encontre farmácias, bancos e lojas de eletrônicos que precisam de transporte urgente
            </h1>
            <p className="max-w-[42rem] leading-normal text-muted-foreground sm:text-xl sm:leading-8">
              Automatize a prospecção de leads, localize empresas que precisam de serviços de transporte com urgência e
              gere cotações instantâneas para farmácias, bancos e lojas de eletrônicos.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link href="/register">
                <Button size="lg" className="gap-2">
                  Começar agora <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
              <Link href="#demo">
                <Button size="lg" variant="outline">
                  Ver demonstração
                </Button>
              </Link>
            </div>
          </div>
        </section>

        <section id="features" className="container py-16 space-y-16">
          <div className="text-center space-y-4">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Recursos Principais</h2>
            <p className="max-w-[42rem] mx-auto text-muted-foreground">
              Tudo o que você precisa para encontrar e converter leads de qualidade para sua transportadora.
            </p>
          </div>
          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            <div className="flex flex-col items-center space-y-4 rounded-lg border p-6 shadow-sm">
              <div className="rounded-full bg-primary/10 p-4">
                <Users className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-bold">Prospecção Inteligente</h3>
              <p className="text-center text-muted-foreground">
                Localize farmácias, bancos e lojas de eletrônicos que precisam de serviços de transporte com urgência.
              </p>
            </div>
            <div className="flex flex-col items-center space-y-4 rounded-lg border p-6 shadow-sm">
              <div className="rounded-full bg-primary/10 p-4">
                <Clock className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-bold">Identificação de Urgência</h3>
              <p className="text-center text-muted-foreground">
                Sistema inteligente que identifica empresas com necessidades urgentes de transporte.
              </p>
            </div>
            <div className="flex flex-col items-center space-y-4 rounded-lg border p-6 shadow-sm">
              <div className="rounded-full bg-primary/10 p-4">
                <FileText className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-bold">Cotações Automáticas</h3>
              <p className="text-center text-muted-foreground">
                Gere cotações personalizadas automaticamente com base no volume, distância e tipo de carga.
              </p>
            </div>
          </div>
        </section>

        <section id="how-it-works" className="bg-muted py-16">
          <div className="container space-y-16">
            <div className="text-center space-y-4">
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Como Funciona</h2>
              <p className="max-w-[42rem] mx-auto text-muted-foreground">
                Um processo simples e eficiente para encontrar e converter leads de qualidade.
              </p>
            </div>
            <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
              <div className="flex flex-col items-center space-y-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary text-primary-foreground">
                  1
                </div>
                <h3 className="text-xl font-bold">Conexão com APIs</h3>
                <p className="text-center text-muted-foreground">
                  Nosso sistema se conecta com LinkedIn, Casa dos Dados, Google API e outras fontes para localizar
                  empresas com necessidades urgentes.
                </p>
              </div>
              <div className="flex flex-col items-center space-y-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary text-primary-foreground">
                  2
                </div>
                <h3 className="text-xl font-bold">Filtragem Inteligente</h3>
                <p className="text-center text-muted-foreground">
                  Algoritmos avançados filtram farmácias, bancos e lojas de eletrônicos com necessidades urgentes de
                  transporte.
                </p>
              </div>
              <div className="flex flex-col items-center space-y-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary text-primary-foreground">
                  3
                </div>
                <h3 className="text-xl font-bold">Cotação Automática</h3>
                <p className="text-center text-muted-foreground">
                  Bots inteligentes geram cotações personalizadas com base nos dados coletados da empresa.
                </p>
              </div>
              <div className="flex flex-col items-center space-y-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary text-primary-foreground">
                  4
                </div>
                <h3 className="text-xl font-bold">Acompanhamento</h3>
                <p className="text-center text-muted-foreground">
                  Dashboard completo para acompanhar todo o processo de conversão e relacionamento com o cliente.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
      <footer className="border-t py-12">
        <div className="container flex flex-col items-center justify-between gap-4 md:flex-row">
          <div className="flex items-center gap-2">
            <Truck className="h-6 w-6 text-primary" />
            <span className="text-xl font-bold">TransportaLead</span>
          </div>
          <p className="text-center text-sm text-muted-foreground md:text-left">
            &copy; {new Date().getFullYear()} TransportaLead. Desenvolvido por Dandara Silva. Todos os direitos
            reservados.
          </p>
        </div>
      </footer>
    </div>
  )
}

