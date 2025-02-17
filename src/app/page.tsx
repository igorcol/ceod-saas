
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FileSpreadsheet, Mail, QrCode } from "lucide-react";
import Link from "next/link";

const DashboardItems = [
  {
    title: "Converter Planilha",
    description: "Converte XLS para JSON",
    icon: FileSpreadsheet,
    href: "/spreadsheet"
  },
  {
    title: "Gerar Ingressos",
    description: "Gerar os ingressos para cada inscrito.",
    icon: QrCode,
    href: "/ingressos"
  },
  {
    title: "Enviar Emails",
    description: "Envia o ingresso para o endereço de email de cada inscrito.",
    icon: Mail,
    href: "/emails"
  },
]

export default function Home() {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Gerador de Ingressos</h1>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {DashboardItems.map((item) => {
          return (
            <Card key={item.title} className="hover:shadow-lg">
            <Link href={item.href}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle >{item.title}</CardTitle>
                <item.icon className="text-muted-foreground"/>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">{item.description}</p>
              </CardContent>
            </Link>
          </Card>
          )
        })}
      </div>
    </div>
  );
}
