'use server'
import fs from 'fs'
import path from 'path'


export async function deleteAllFiles(dir: string) {
    // Apaga todos os arquivos que exitirem
    const dirpath = path.join(process.cwd(), dir)
    
    if (!fs.existsSync(dirpath)) return;

    const files = fs.readdirSync(dirpath);
    if (files.length > 0){
        for (const file of files) {
            fs.unlinkSync(path.join(dir, file));
        }
    }
}