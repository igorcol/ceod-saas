/* eslint-disable @next/next/no-img-element */
"use client";

import { Select } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import {
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

import QrTable from "./_components/qr-table";
import { fetchData } from "@/lib/api";
import { QRCodeData } from "@/lib/qrUtils";
import { saveTicketImage } from "@/lib/imageUtils";
import { deleteAllFiles } from "@/lib/deleteAllFiles";

const Page: React.FC = () => {
  const [qrVersion, setQRVersion] = useState("4");
  const [qrData, setQRData] = useState("_id");
  const [backgroundImg, setBackgroundImg] = useState<string | null>(null);
  const [watermark, setWatermark] = useState<string | null>(null);

  const [generatedQRCodes, setGeneratedQRCodes] = useState<QRCodeData[]>([]);

  const [qrColor, setQrColor] = useState("#000000");
  const [qrBgColor, setQrBgColor] = useState("#00000000");

  const [isOnline, setIsOnline] = useState(true);

  const handleFileUpload = (
    event: React.ChangeEvent<HTMLInputElement>,
    setter: (value: string | null) => void
  ) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setter(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  // * Chama a função na API para Gerar o QR CODE
  const generateQrCode = async (QRData: QRCodeData) => {
    try {
      const response = await fetch(`/api/generate-qrcode`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(QRData),
      });
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(
          `[generateQrCode] Erro ao gerar QR Code: ${errorData.error}`
        );
      }

      const jsonResponse = await response.json();

      if (!jsonResponse.qrCode) {
        throw new Error("QR Code não foi gerado corretamente");
      }

      return `data:image/png;base64,${jsonResponse.qrCode}`;
    } catch (err) {
      console.error("Erro ao gerar QR Code:", err);
      return "";
    }
  };

  // * GERAÇÃO DO INGRESSO
  const handleGenerateTicket = async () => {
    // Recebe a lista de usuarios vindo da API
    // Para cada usuario, gera um QRcode -> Processa a imagem -> Salva a imagem
    setGeneratedQRCodes([]); // zera a lista de ingressos gerados
    try {
      const users = await fetchData("users");
      if (!users || !Array.isArray(users)) {
        console.error("Erro: A resposta da API não é uma lista válida de usuários.");
        return;
      }

      await deleteAllFiles("public/uploads"); // Apaga todos os ingressos salvos


      const generatedTickets = await Promise.all(
        users.map(async (user: { ID: number; CODIGO: string; NOME: string; _id: string }) => {
          const newQrStruct: QRCodeData = {
            name: user.NOME,
            id: user.ID, // ID SISDM
            data: (user[qrData as keyof typeof user] as unknown as string).toString(),
            version: Number.parseInt(qrVersion),
            qrColor,
            qrBgColor,
            backgroundImg,
            watermark,
          };

          const qrCodeUrl = await generateQrCode(newQrStruct)
          const ticketImageUrl = saveTicketImage(qrCodeUrl, newQrStruct)

          return {...newQrStruct, ticketUrl: ticketImageUrl}
        })
      );

      setGeneratedQRCodes(generatedTickets)
      console.log("🟣 INGRESSOS GERADOS", generatedTickets);

    } catch (err) {
      console.log("Error gerando ingresso: ", err);
    }
  };

  useEffect(() => {
    setGeneratedQRCodes(generatedQRCodes);
  }, [generatedQRCodes]);

  return (
    <div className="space-y-6 w-full overflow-hidden ">
      <h1 className="text-3xl font-bold">Gerar Ingressos</h1>

      <div className="flex items-center space-x-2">
        <Switch
          id="data-source"
          checked={isOnline}
          onCheckedChange={setIsOnline}
        />
        <Label>
          {isOnline ? "Banco de dados / API" : "Arquivo JSON local"}
        </Label>
      </div>

      <div className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label>Versão do QR Code</Label>
            <Select value={qrVersion} onValueChange={setQRVersion}>
              <SelectTrigger id="qr-version">
                <SelectValue placeholder="Selecione a versão" />
              </SelectTrigger>
              <SelectContent>
                {[...Array(40)].map((_, i) => (
                  <SelectItem key={i + 1} value={(i + 1).toString()}>
                    Versão {i + 1}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="qr-data">Dado</Label>
            <Select onValueChange={setQRData} defaultValue="_id">
              <SelectTrigger id="qr-data">
                <SelectValue placeholder="Dados do QR Code" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="_id">Id</SelectItem>
                <SelectItem value="CODIGO">Código de inscrição</SelectItem>
                <SelectItem value="NOME">Nome</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label>Cor do QR Code</Label>
            <Select value={qrColor} onValueChange={setQrColor}>
              <SelectTrigger id="qr-version">
                <SelectValue placeholder="Selecione a versão" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="#000000">Preto</SelectItem>
                <SelectItem value="#FFFFFF">Branco</SelectItem>
                <SelectItem value="#f55033">Vermelho</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label>Fundo do QR Code</Label>
            <Select value={qrBgColor} onValueChange={setQrBgColor}>
              <SelectTrigger id="qr-version">
                <SelectValue placeholder="Selecione a versão" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="#000000">Preto</SelectItem>
                <SelectItem value="#FFFFFF">Branco</SelectItem>
                <SelectItem value="#00000000">Transparente</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2 ">
            <Label htmlFor="background-img">Imagem de Fundo (opicional)</Label>
            <Input
              id="background-img"
              type="file"
              accept="image/*"
              onChange={(e) => handleFileUpload(e, setBackgroundImg)}
            />
            {backgroundImg && (
              <div className="space-y-2">
                <img
                  src={backgroundImg}
                  alt="Preview da Imagem de Fundo"
                  className="max-w-[200px] h-auto"
                />
              </div>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="watermark">Marca DÁgua (opicional)</Label>
            <Input
              id="watermark"
              type="file"
              accept="image/*"
              onChange={(e) => handleFileUpload(e, setWatermark)}
            />
            {watermark && (
              <div className="space-y-2">
                <img
                  src={watermark}
                  alt="Preview da Marca D'Água"
                  className="max-w-[200px] h-auto"
                />
              </div>
            )}
          </div>
        </div>

        <Button className="hover:bg-red-800" onClick={handleGenerateTicket}>
          Criar QR Codes
        </Button>
      </div>

      <QrTable />
    </div>
  );
};

export default Page;
