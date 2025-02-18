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
import { CreateAndBufferQrCode, QRCodeData } from "@/lib/qrUtils"
import { GenerateQrImage } from '@/lib/imageUtils'

const page: React.FC = () => {
  const [qrVersion, setQRVersion] = useState("4");
  const [qrData, setQRData] = useState("CODIGO");
  const [backgroundImg, setBackgroundImg] = useState<string | null>(null);
  const [watermark, setWatermark] = useState<string | null>(null);
  const [generatedQRCodes, setGeneratedQRCodes] = useState<QRCodeData[]>([]);
  const [isOnline, setIsOnline] = useState(true);

  const [spreadsheetJson, setSpreadsheetJson] = useState(null)

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

 
  // * QR CODE GENERATION
  const handleGenerateTicket = async () => {
    // Recebe a lista de usuarios vindo da API
    // Para cada usuario, gera um QRcode -> Processa a imagem -> Salva a imagem
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
          console.log(newQrStruct)
          setGeneratedQRCodes((prev) => [newQrStruct, ...prev]);

          
          let new_buffer = await CreateAndBufferQrCode(newQrStruct) as Buffer
          GenerateQrImage(
            new_buffer,
            backgroundImg || '',
            watermark || '',
            "@/public/ingressos",
            user.NOME
          )
        });
      // TODO:   Criar qr code
      // TODO:   Processar Imagem
      // TODO:     Salvar imagens
      })
    } catch(err) {
      console.log("Error gerando ingresso: ",err)
    }
  }

  useEffect(() => {
    setGeneratedQRCodes(generatedQRCodes);
  }, [generatedQRCodes]);


  return (
    <div className="space-y-6">
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
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="background-img">Imagem de Fundo (opcional)</Label>
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
