"use client"
import {
    Sidebar as SidebarComponent,
    SidebarContent,
    SidebarFooter,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem
} from "@/components/ui/sidebar"
import { FileSpreadsheet, Home, Mail, QrCode } from "lucide-react"
import { usePathname } from "next/navigation"
import Link from "next/link"

const menuItems = [
    { icon: Home, label: "Inicio", href: "/" },
    { icon: QrCode, label: "Criar Ingressos", href: "/ingressos" },
    { icon: Mail, label: "Enviar Emails", href: "/emails" },
    { icon: FileSpreadsheet, label: "Converter Planilha", href: "/spreadsheet" },
  ]

export default function Page() {
    const pathname = usePathname()

    return (
        <SidebarComponent>

            <SidebarHeader className="p-4">
                <h2 className="text-xl font-bold">Gerador de Ingressos</h2>
            </SidebarHeader>

            <SidebarContent>
                <SidebarMenu>
                    {menuItems.map((item) => (
                        <SidebarMenuItem key={item.href}>
                            <SidebarMenuButton asChild isActive={pathname === item.href}>
                                <Link href={item.href} className="flex items-center
                                 gap-2">
                                    <item.icon className="h-5 w-5"/>
                                    {item.label}
                                </Link>
                            </SidebarMenuButton>
                        </SidebarMenuItem>
                    ))}
                </SidebarMenu>
            </SidebarContent>
        </SidebarComponent>
    )
}