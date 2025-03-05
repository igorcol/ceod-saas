
import { EmailBody } from './emailBody';
import path from 'path';
import { imagePath, transporter } from './config';

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



export async function SendEmail(to: string, ticketName: string) {

    const emailSubject = 'Seu ingresso para o IV CEOD-SP está aqui! 🎟️'

    const mailOptions = {
        from: process.env.EMAIL_FROM, 
        to,
        subject: emailSubject,
        html: EmailBody,
        attachments: [
            {
                filename: `ingresso_ceod_${ticketName}.png`,
                path: path.join(imagePath, `${ticketName}.png`),
                contentType: 'image/png'
            }
        ],
    };

    try {
        await transporter.sendMail(mailOptions)
        console.log(`✔️\t ${mailOptions.to} \t |\t Enviado`)
        return { email: to, sucess: true }
    }
    catch (error) {
        //console.log('[sendEmail] - Erro ao enviar email', error)
        console.log(`❌\t${mailOptions.to ? mailOptions.to : 'Usuário sem email'} \t\t |\t Erro ao enviar`)
        return { email: to, success: false, error: error}
    }
}