import { NextResponse } from "next/server";
import { CreateAndBufferQrCode, QRCodeData } from "@/lib/qrUtils";
import QRcode from 'qrcode'

export async function POST(req: Request) {
    try {
        const body = await req.json()
        
        if (!body || typeof body !== "object" || !body.data || typeof body.data !== "string") {
            return NextResponse.json({ error: "Parâmetro 'data' ausente ou inválido" }, { status: 400 });
        }
        // const qrCodeBuffer = await CreateAndBufferQrCode(data);
        // const qrCodeBase64 = Buffer.from(qrCodeBuffer).toString('base64');

        const qrCodeData : QRCodeData = {
            id: body.id,
            data: body.data,
            version: body.version,
            backgroundImg: body.backgroundImg,
            watermark: body.watermark
        }
        
        const qrCodeBase64 = await CreateAndBufferQrCode(qrCodeData); // Gera o QR Code em base64

        return NextResponse.json({ qrCode: qrCodeBase64 });
    } 
    catch (error) {
        console.error("[API] Erro ao gerar QR Code:", error);
        return NextResponse.json({ error: "Erro interno no servidor" }, { status: 500 });
    }
}
