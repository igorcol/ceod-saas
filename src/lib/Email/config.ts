import nodemailer from 'nodemailer'
import path from "path";

// Caminho da imagem dos ingressos
export const imagePath = path.join(process.cwd(), '/public/uploads/') 

// Configuração do serviço
export const transporter = nodemailer.createTransport({
    //secure: true, // ! DEIXAR TRUE PARA GOOGLE
    host: process.env.EMAIL_SERVER,
    port: Number(process.env.EMAIL_PORT),
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,     
    },
});

