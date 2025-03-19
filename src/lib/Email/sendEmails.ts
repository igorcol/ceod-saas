
import { EmailBody } from './emailBody';
import path from 'path';
import fs from 'fs';
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

const DELAY = (ms: number) => new Promise(resolve => setTimeout(resolve, ms)) // DEFINE O DELAY

function pathExists(path: string) {
    return fs.existsSync(path)
}

export async function SendEmail(to: string, ticketName: string) {
    if (!to || typeof to !== "string" || to.trim() === "") {
        throw new Error(`Endereço de e-mail inválido ou inexistente: ${to}`);
    }
    const ticketImagePath = path.join(imagePath, `${ticketName}.png`)
    if (!pathExists(ticketImagePath)) {
        throw new Error(`Não existe nenhum ingresso gerado para este usuário.`)
    }

    const emailSubject = 'Seu ingresso para o CREOD MACRO K está aqui! 🎟️'

    const mailOptions = {
        from: process.env.EMAIL_FROM, 
        to,
        subject: emailSubject,
        html: EmailBody,
        attachments: [
            {
                filename: `ingresso_ceod_${ticketName}.png`,
                path: ticketImagePath,
                contentType: 'image/png'
            }
        ],
    };
    
    await DELAY(2000) // ESPERA 2 SEGUNDOS ANTES DE ENVIAR O PRÓXIMO EMAIL
    try {
        console.log(`✉️ Enviando Email para - ${mailOptions.to || "null"}`)
        await transporter.sendMail(mailOptions)
        //console.log(`✔️\t ${mailOptions.to} \t |\t Enviado`)
        return { 
            user: {
                email: to,
                id: ticketName
            }, 
            success: true 
        }
    }
    catch (error) {
        //console.log('[sendEmail] - Erro ao enviar email', error)
        //console.log(`❌\t${mailOptions.to ? mailOptions.to : 'Usuário sem email'} \t\t |\t Erro ao enviar`)
        return { 
            user: {
                email: to,
                id: ticketName
            }, 
            success: false, 
            error: error
        }
    }
}