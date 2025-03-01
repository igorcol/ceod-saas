import { SendEmail } from "@/lib/Email/sendEmails";
import StatusCodes from "http-status-codes";
import { NextResponse } from "next/server";


export async function POST(req: Request) {
    try {
        const DATA = await req.json()
        const { emails, ticketNames } = DATA
        /*
            DATA:  
            {
                emails: ['',''],
                ticketNames: ['','']
            }
        */

        if(!emails || !Array.isArray(emails)) {
            return NextResponse.json({ error: "Lista de e-mails inválida" }, { status: StatusCodes.BAD_REQUEST });
        }

        if (!ticketNames || !Array.isArray(ticketNames)) {
            return NextResponse.json({ error: "Lista de ingressos inválida" }, { status: StatusCodes.BAD_REQUEST });
        }

        // * Enviar e-mails
        const results = await Promise.all(
            emails.map((email, index) => SendEmail(email, ticketNames[index]))
        );

        return NextResponse.json({ message: "E-mails enviados", results });

    } 
    catch (error) {
        console.error("❌ send-emails | Erro na API:", error);
        return NextResponse.json({ error: "Erro interno no servidor" }, { status: 500 });
    }
}