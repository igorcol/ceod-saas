"use client";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Download } from "lucide-react";
import { useEffect, useState } from "react";

//import { QRCodeData } from "@/lib/qrUtils";
// interface PageProps {
//   generatedQRCodes: QRCodeData[];
// }

export default function Page() {
  const [tickets, setTickets] = useState<{ name: string; url: string }[]>([]);

  const loadSavedTickets = async () => {
    try {
      const response = await fetch("/api/list-tickets");
      if (!response.ok) throw new Error("Erro ao carregar ingressos salvos.");
      const { tickets } = await response.json();
      setTickets(tickets);
    } catch (error) {
      console.error("Erro ao buscar ingressos:", error);
    }
  };
  useEffect(() => {
    loadSavedTickets();
  }, []);

  const handleTicketsDownload = async () => {
    try {
      const response = await fetch('/api/download-tickets')
      if(!response.ok) throw new Error('Erro ao gerar o arquivo ZIP.');

      const { downloadUrl } = await response.json();

      const link = document.createElement('a');
      link.href = downloadUrl;
      link.download = 'ingressos.zip';
      link.click();
    }
    catch (error) {
      console.error('🚨 Erro ao baixar ingressos:', error);
    }

  }

  return (
    <div className="w-screen">
      <div className="flex flex-row gap-x-4 w-max items-center">
        <h2 className="text-2xl font-semibold">Ingressos Gerados</h2>
        <button onClick={() => handleTicketsDownload()}>
          <Download size={16} color="#72db79" cursor={'pointer'} />
        </button>
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Ingresso:</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {tickets.length > 0 ? (
            tickets.map((ticket) => (
              <TableRow key={ticket.name} className="cursor-pointer" onClick={() => window.open(ticket.url, "_blank")}>
                  <TableCell>
                    {tickets.indexOf(ticket) + 1}. {ticket.name}
                  </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={2}>Nenhum ingresso gerado ainda.</TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}
