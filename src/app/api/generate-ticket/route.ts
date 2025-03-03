import { NextResponse } from "next/server";
import { GenerateQrImage } from "@/lib/imageUtils";
import fs from 'fs'
import path from 'path'

export async function POST(req: Request) {
    try {
        const reqBody = await req.json()
        const {qrBuffer,backgroundImg,watermark,saveName} = reqBody

        if (!qrBuffer||!saveName) {
            return NextResponse.json({error: "Dados Insuficientes para a geração do ingresso"}, {status: 401}) //! Voltar para 400
        }

        console.log("📥 Gerando imagem:", saveName);

        // Converte base64 para buffer
        const buffer = Buffer.from(qrBuffer.replace(/^data:image\/\w+;base64,/, ""), "base64");
        
        const outputPath = path.join(process.cwd(), "public/uploads");
        const filePath = path.join(outputPath, `${saveName}.png`);

        if (!fs.existsSync(outputPath)) {
            fs.mkdirSync(outputPath, { recursive: true });
        }

        await GenerateQrImage(buffer, backgroundImg, watermark, filePath as `${string}.${string}`);

        return NextResponse.json({ imageUrl: `/uploads/${saveName}.png` });
    }
    catch (error) {
        console.error("🚨 Erro ao gerar ingresso:", error);
        return NextResponse.json({ error: "Erro ao salvar imagem" }, { status: 500 });
    }
}

