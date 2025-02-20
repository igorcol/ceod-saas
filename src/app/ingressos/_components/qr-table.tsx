"use client"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { QRCodeData } from "@/lib/qrUtils";
import { useEffect, useState } from "react";

interface PageProps {
  generatedQRCodes: QRCodeData[];
}

export default function Page({ generatedQRCodes }: PageProps) {

  const [tickets, setTickets] = useState<{ name: string; url: string }[]>([]);

  const loadSavedTickets = async () => {
    try {
      const response = await fetch("/api/list-tickets")
      if (!response.ok) throw new Error("Erro ao carregar ingressos salvos.")
      const {tickets} = await response.json()
      setTickets(tickets)
    }
    catch (error) {
      console.error("Erro ao buscar ingressos:", error);
    }
  }
  useEffect(() => {
    loadSavedTickets()
  }, [])

  return (
    <div className="w-screen">
      <h2 className="text-2xl font-semibold mb-4">Ingressos Gerados</h2>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Ingresso:</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
        {tickets.length > 0 ? (
            tickets.map((ticket) => (
              <TableRow key={ticket.name} className="cursor-pointer">
                <TableCell>+ {ticket.name}</TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={2} >
                Nenhum ingresso gerado ainda.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}
