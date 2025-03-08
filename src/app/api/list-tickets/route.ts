import fs from 'fs'
import { NextResponse } from 'next/server'
import path from 'path'

// Lista os ingressos salvos na pasta local public/uploads

export async function GET(): Promise<Response> {
    try {
        const uploadsPath = path.join(process.cwd(), "public/uploads")

        if(!fs.existsSync(uploadsPath)){
            return NextResponse.json({tickets: []})
        }

        const files = fs.readdirSync(uploadsPath)

        const ticketUrls = files.map(file => ({
            name: file.replace(".png", ""),
            url: `/uploads/${file}`
        }))

        return NextResponse.json({tickets: ticketUrls})
    }
    catch (error) {
        console.error("🚨 Erro ao listar ingressos:", error);
        return NextResponse.json({ error: "Erro ao carregar ingressos" }, { status: 500 });
    }
}