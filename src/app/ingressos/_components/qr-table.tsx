"use client"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { QRCodeData } from "../page";

interface PageProps {
  generatedQRCodes: QRCodeData[];
}

export default function Page({ generatedQRCodes }: PageProps) {

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">Ingressos Gerados</h2>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Data</TableHead>
            <TableHead>QR Code</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
        {generatedQRCodes.length > 0 ? (
            generatedQRCodes.map((qrCode) => (
              <TableRow key={qrCode.id}>
                <TableCell>{qrCode.data}</TableCell>
                <TableCell>
                  {qrCode.backgroundImg && (
                    <img src={qrCode.backgroundImg} alt="QR Code" className="max-w-[100px] h-auto" />
                  )}
                </TableCell>
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
