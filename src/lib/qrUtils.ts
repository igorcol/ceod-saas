"use server"
import QRCode  from 'qrcode'
import { Buffer } from "buffer";

// Estrutura para a criação do QrCode
export interface QRCodeData { 
    name: string;
    id: number;
    data: string;
    version: number;
    qrColor: string;
    qrBgColor: string;
    backgroundImg?: string | null;
    watermark?: string | null;
}


// Cria o QR code e salva em BUFFER (variavel)
export async function CreateAndBufferQrCode( QRData:QRCodeData ): Promise<string> {
    
    try {
        const DATA = QRData.data
        const VERSION = QRData.version
        const qrBuffer = await QRCode.toBuffer(DATA, { 
            type: 'png',  
            version: VERSION,  
            errorCorrectionLevel: 'H',  
            margin: 0,
            color: {
                dark: QRData.qrColor,
                light: QRData.qrBgColor,
            }
        });
        // Buffer com a imagem do QR code
        return qrBuffer.toString("base64");
    } catch (err) {
        console.error("[CreateAndBufferQrCode] Erro:", err);
        throw new Error("[CreateAndBufferQrCode]  Erro na criação do QR Code");
    }
}



