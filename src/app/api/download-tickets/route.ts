import archiver from 'archiver'
import fs from 'fs'
import { NextResponse } from 'next/server'
import path from 'path'

export async function GET() {
    const uploadsPath = path.join(process.cwd(), 'public/uploads')
    const zipPath = path.join(process.cwd(), 'public/uploads', 'ingressos.zip')

    if (fs.existsSync(zipPath)) {
        fs.unlinkSync(zipPath)
    }

    const output = fs.createWriteStream(zipPath)
    const archive = archiver('zip', {zlib: {level: 9}})

    return new Promise((resolve, reject) => {
        output.on('close', () => {
            console.log(`✅ Arquivo ZIP criado: ${archive.pointer()} bytes`);
            resolve(NextResponse.json({ downloadUrl: '/ingressos.zip' }));
        });
        archive.on('error', (err: Error) => {
            console.error('🚨 Erro ao criar ZIP:', err);
            reject(NextResponse.json({ error: 'Falha ao criar o ZIP' }, { status: 500 }));
        })
        archive.pipe(output)
        archive.directory(uploadsPath, false)
        archive.finalize();
    })
}