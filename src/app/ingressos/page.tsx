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

import QrTable from './_components/qr-table'
import { fetchData } from "@/lib/api";
import { QRCodeData } from "@/lib/qrUtils"
import { saveTicketImage } from '@/lib/imageUtils'

const page: React.FC = () => {
  const [qrVersion, setQRVersion] = useState("4");
  const [qrData, setQRData] = useState("CODIGO");
  const [backgroundImg, setBackgroundImg] = useState<string | null>(null);
  const [watermark, setWatermark] = useState<string | null>(null);
  const [generatedQRCodes, setGeneratedQRCodes] = useState<QRCodeData[]>([]);

  const [qrColor, setQrColor] = useState('white')
  const [qrBgColor, setQrBgColor] = useState('transparent')

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
  const generateQrCode = async (QRData : QRCodeData) => {
    //console.log("[generateQrCode] QRData: ", QRData)
    try {
      const response = await fetch(`/api/generate-qrcode`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(QRData),
      })
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(`[generateQrCode] Erro ao gerar QR Code: ${errorData.error}`);
      }

      const jsonResponse = await response.json()

      if (!jsonResponse.qrCode) {
        throw new Error("QR Code não foi gerado corretamente");
      }

      return `data:image/png;base64,${jsonResponse.qrCode}`;

    } catch (err) {
      console.error("Erro ao gerar QR Code:", err);
      return ""
    }
  }

  // * GERAÇÃO DO INGRESSO
  const handleGenerateTicket = async () => {
    // Recebe a lista de usuarios vindo da API
    // Para cada usuario, gera um QRcode -> Processa a imagem -> Salva a imagem
    setGeneratedQRCodes([]) // zera a lista de ingressos gerados
    try {
      fetchData('users').then(async (users) => {
        users?.forEach(async (user: { ID: number; qrData: string; [key: string]: any; }) => { 
          const newQrStruct: QRCodeData = {
            id: user.ID,
            data: user[qrData],
            version: Number.parseInt(qrVersion),
            backgroundImg,
            watermark, 
          };

          //* Gera o QR Code e retorna um link com a imagem
          const qrCodeUrl = await generateQrCode(newQrStruct) 
          // * Gera a imagem do Ingresso e salva 
          const ticketImageUrl = await saveTicketImage(qrCodeUrl, newQrStruct)

          //setGeneratedQRCodes((prev) => [newQrStruct, ...prev]);
          setGeneratedQRCodes((prev) => [{ ...newQrStruct, ticketUrl: ticketImageUrl }, ...prev]);
        });
      })
    } catch(err) {
      console.log("Error gerando ingresso: ",err)
    }
  }

  useEffect(() => {
    setGeneratedQRCodes(generatedQRCodes);
  }, [generatedQRCodes]);


  return (
    <div className="space-y-6 w-full overflow-hidden ">
      <h1 className="text-3xl font-bold">Gerar Ingressos</h1>

      <div className="flex items-center space-x-2">
        <Switch id="data-source" checked={isOnline} onCheckedChange={setIsOnline} />
        <Label>
          {isOnline ? "Banco de dados / API" : "Arquivo JSON local"}
        </Label>
      </div>

      <div className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label>Versão do QR Code</Label>
            <Select value={qrVersion} onValueChange={setQRVersion} >
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
            <Select onValueChange={setQRData} defaultValue="CODIGO">
              <SelectTrigger id="qr-data">
                <SelectValue placeholder="Dados do QR Code" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="ID">Id</SelectItem>
                <SelectItem value="CODIGO">Código de inscrição</SelectItem>
                <SelectItem value="NOME">Nome</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label>Cor do QR Code</Label>
            <Select value={qrColor} onValueChange={setQrColor} >
              <SelectTrigger id="qr-version">
                <SelectValue placeholder="Selecione a versão" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="black">Preto</SelectItem>
                <SelectItem value="white">Branco</SelectItem>
                <SelectItem value="red">Vermelho</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label>Fundo do QR Code</Label>
            <Select value={qrBgColor} onValueChange={setQrBgColor} >
              <SelectTrigger id="qr-version">
                <SelectValue placeholder="Selecione a versão" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="black">Preto</SelectItem>
                <SelectItem value="white">Branco</SelectItem>
                <SelectItem value="transparent">Transparente</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2 ">
            <Label htmlFor="background-img">Imagem de Fundo</Label>
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
            <Label htmlFor="watermark">Marca D'Água</Label>
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

        <Button onClick={handleGenerateTicket}>Criar QR Codes</Button>
      </div>

      <QrTable generatedQRCodes={generatedQRCodes}/>

    </div>
  );
};

export default page;
