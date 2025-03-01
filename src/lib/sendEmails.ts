import nodemailer from 'nodemailer'
import { EmailBody } from './emailBody';

/* 
! ========================= !!! ATENÇÃO !!! ========================= 
* O Gmail tem limites diários para envios via SMTP:
* 
* 500 e-mails/dia para contas normais
* 2.000 e-mails/dia para contas Google Workspace (antigo G Suite)
* Limite de 100 e-mails/hora para evitar bloqueios
* 
* ALTERNATIVAS:
* Reduzir envio para 90 emails por hora -> 450 -> 5h --->> 2 dias e meio (Não consta)
* 
* Outros servicos:
* Amazon SES (Barato, cobra por e-mail enviado)
* Mailgun (Grátis para 5.000 e-mails/mês)
* 
! =================================================================== 
*/

const imagePath = './public/uploads/'


const transporter = nodemailer.createTransport({
    //secure: true, // ! DEIXAR TRUE PARA GOOGLE
    host: process.env.EMAIL_SERVER,
    port: Number(process.env.EMAIL_PORT),
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,     
    },
});

export async function SendEmail(to: string, ticketName: string) {
    console.log('\n -> Enviando Email para', to)

    const subject = 'Seu ingresso para o IV CEOD-SP está aqui! 🎟️'

    const mailOptions = {
        from: process.env.EMAIL_FROM, // Seu e-mail
        to: to,
        subject: subject,
        html: EmailBody,
        attachments: [
            {
                filename: 'ingresso_ceod.png',
                path: imagePath + ticketName + '.png',
                contentType: 'image/png',
                cid: 'ingresso_ceod'
            }
        ],
    };

    try {
        await transporter.sendMail(mailOptions)
        console.log("✔️  Email Enviado")
    }
    catch (error) {
        console.log('Erro ao enviar email', error)
    }
}