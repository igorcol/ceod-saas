import { NextResponse } from "next/server";
import { CreateAndBufferQrCode, QRCodeData } from "@/lib/qrUtils";

// * GERA A IMAGEM

export async function POST(req: Request) {
    try {
        const body = await req.json()
        
        if (!body || typeof body !== "object" || !body.data || typeof body.data !== "string") {
            return NextResponse.json({ error: "Parâmetro 'data' ausente ou inválido" }, { status: 400 });
        }

        const qrCodeData : QRCodeData = {
            id: body.id,
            name: body.nome,
            data: body.data,
            version: body.version,
            qrColor: body.qrColor,
            qrBgColor: body.qrBgColor,
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
