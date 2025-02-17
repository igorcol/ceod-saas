
import type { Metadata } from "next";
import { Inter } from "next/font/google"
import "./globals.css";
import { SidebarProvider } from "@/components/ui/sidebar";
import Sidebar from "@/components/sidebar/page";

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "CEOD DashBoard"
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
          <SidebarProvider>
            <div className="flex h-screen">
              <Sidebar />
              <main className="flex-1 overflow-y-auto p-8">{children}</main>
            </div>
          </SidebarProvider>
      </body>
    </html>
  )
}
