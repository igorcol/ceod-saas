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
    secure: true,
    host: 'smtp.gmail.com',
    port: 465,
    auth: {
        user: 'igor.colombini@gmail.com', // !!!! - PASSAR PARA O .ENV
        pass: 'wcfa lsgq jezo dacf',      // !!!! - PASSAR PARA O .ENV  
    }
});

export async function SendEmail(to: string, ticketName: string) {
    console.log('\n -> Enviando Email para', to)

    const subject = 'Seu ingresso para o IV CEOD-SP está aqui! 🎟️'
    const from = '"CEOD Sorocaba" <igor.colombini@gmail.com>'

    const mailOptions = {
        from: from, // Seu e-mail
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
        console.log("✔️ Email Enviado")
    }
    catch (error) {
        console.log('Erro ao enviar email', error)
    }
}