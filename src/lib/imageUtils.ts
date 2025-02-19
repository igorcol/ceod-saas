import {Jimp} from 'jimp';
import { QRCodeData } from './qrUtils';
import fs from 'fs';
import path from 'path';


export async function GenerateQrImage(
  qrBuffer: Buffer,
  backImg: Buffer | null,
  watermark: Buffer | null,
  outputPath: `${string}.${string}`
) {
    try {
      // console.log("📥 Processando imagem do ingresso...");
      // console.log("🔹 qrBuffer:", qrBuffer ? "✅ OK" : "❌ Faltando");
      // console.log("🔹 backImg:", backImg ? "✅ OK" : "❌ Faltando");
      // console.log("🔹 watermark:", watermark ? "✅ OK" : "❌ Faltando");

      const isBase64 = (str: string) => str.startsWith("data:image")

      const backgroundPath = path.resolve("public/default-background.png");
      const watermarkPath = path.resolve("public/default-watermark.png");

      // Função auxiliar para carregar a imagem a partir de Buffer ou caminho de arquivo
      const loadImage = async (buffer: Buffer | null, fallbackPath: string) => {
          return buffer ? await Jimp.read(buffer) : await Jimp.read(fallbackPath);
      };

        // Carregar imagens
        const [background, qrImage, watermarkImg] = await Promise.all([
          loadImage(backImg, backgroundPath),
          Jimp.read(qrBuffer), // O QR Code já está em Buffer, não precisa de conversão
          loadImage(watermark, watermarkPath)
      ]);

        // Ajusta o tamanho do QR Code
        qrImage.resize({w: 500, h: 500});

        // Define as coordenadas para posicionar o QR Code e a marca d'água
        const x_qr = Math.floor((background.bitmap.width - qrImage.bitmap.width) / 2);
        const y_qr = Math.floor((background.bitmap.height - qrImage.bitmap.height) / 2);
        const x_wm = Math.floor((background.bitmap.width - watermarkImg.bitmap.width) / 2);
        const y_wm = Math.floor((background.bitmap.height - watermarkImg.bitmap.height) / 2);

        // Mescla as imagens
        background.composite(qrImage, x_qr, y_qr);
        background.composite(watermarkImg, x_wm, y_wm);

        // Salvar a imagem
        await background.write(outputPath);
        console.log("✅ Ingresso salvo:", outputPath);
    } 
    catch (err) {
      console.error("🚨 Erro ao processar imagem do ingresso:", err);
  }
}


// * CHAMA A FUNÇÃO NA API PARA GERAR A IMAGEM
export const generateTicketImage = async (qrCodeBase64: string, qrData: QRCodeData) => {
  try {
      const response = await fetch("/api/generate-ticket", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
              qrCodeBase64,
              backImg: qrData.backgroundImg || '',
              watermark: qrData.watermark || '',
              saveName: qrData.data
          }),
      });

      if (!response.ok) {
          const errorData = await response.json();
          throw new Error(`Erro ao gerar imagem: ${errorData.error}`);
      }

      const { imagePath } = await response.json();
      console.log("Imagem gerada com sucesso:", imagePath);
  } catch (err) {
      console.error("Erro ao gerar imagem:", err);
  }
};



// * Envia os dados para a API /api/generate-ticket para processar a imagem.
export const saveTicketImage = async (qrCodeBase64: string, qrData: QRCodeData) => {
  try {
      const requestBody = {
        qrBuffer: qrCodeBase64, 
        backgroundImg: qrData.backgroundImg || '',
        watermark: qrData.watermark || '',
        saveName: qrData.data
      }
      console.log("🔍 Enviando para API generate-ticket:", requestBody);

      const response = await fetch("/api/generate-ticket", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(requestBody),
      });
      console.log("Gerando img")

      if (!response.ok) {
          const errorData = await response.json();
          throw new Error(`Erro ao salvar imagem: ${errorData.error}`);
      }

      const { imageUrl } = await response.json();
      console.log("🎟️ Ingresso gerado:", imageUrl);
      return imageUrl;
      
  } catch (err) {
    console.error("🚨 Erro ao salvar ingresso:", err);
    return "";
}
};
