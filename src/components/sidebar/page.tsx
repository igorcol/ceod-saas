"use client";
import {
  Sidebar as SidebarComponent,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { ChartSpline, FileSpreadsheet, Home, Mail, QrCode } from "lucide-react";
import { usePathname } from "next/navigation";
import Link from "next/link";

import ThemeToggle from "@/components/theme-provider/_components/theme-toggle";
import { useEffect, useRef, useState } from "react";

const menuItems = [
  { icon: Home, label: "Inicio", href: "/" },
  { icon: FileSpreadsheet, label: "Converter Planilha", href: "/spreadsheet" },
  { icon: QrCode, label: "Gerar Ingressos", href: "/ingressos" },
  { icon: Mail, label: "Enviar Emails", href: "/emails" },
  { icon: ChartSpline, label: "Dashboard", href: "/dashboard" },
];

export default function Page() {
  const pathname = usePathname();

  const [isApiOnline, setApiOnline] = useState<boolean | null>(null);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const checkApiStatus = async () => {
      try {
        const response = await fetch("/api/get-status");
        //console.log('RESPONSE STATUS:', response.status)

        const newStatus = response.ok;
        setApiOnline(
          (prevStatus) => (prevStatus !== newStatus ? newStatus : prevStatus) // Só altera o estado se for diferente
        );

        //console.log('-> Is Api Online? >', newStatus)
      } catch {
        setApiOnline(false);
      }
    };

    // Chamada inicial
    checkApiStatus();

    // Configura o intervalo apenas uma vez
    intervalRef.current = setInterval(checkApiStatus, 5000);

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, []);

  return (
    <SidebarComponent>
      <Link href="/" className="block">
        <SidebarHeader className="p-4">
          <h2 className="text-xl font-bold">Gerador de Ingressos</h2>
        </SidebarHeader>
      </Link>

      <SidebarContent>
        <SidebarMenu>
          {menuItems.map((item) => (
            <SidebarMenuItem key={item.href}>
              <SidebarMenuButton asChild isActive={pathname === item.href}>
                <Link
                  href={item.href}
                  className="flex items-center
                                 gap-2"
                >
                  <item.icon className="h-5 w-5" />
                  {item.label}
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarContent>
      <SidebarFooter className="p-4">
        <div className="flex items-center justify-start borde">
          {/* Indicador de status (Círculo) */}
          <div
            className={`w-4 h-4 rounded-full ${
              isApiOnline === null
                ? "bg-gray-500"
                : isApiOnline
                ? "bg-green-600"
                : "bg-red-700"
            }`}
          ></div>

          {/* Texto do status */}
          <span className="ml-2 text-black text-sm">
            {isApiOnline === null
              ? "Verificando..."
              : isApiOnline
              ? "API ONLINE"
              : "API OFFLINE"}
          </span>
        </div>
        <ThemeToggle />
      </SidebarFooter>
    </SidebarComponent>
  );
}
