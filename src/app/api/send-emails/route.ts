import { SendEmail } from "@/lib/Email/sendEmails";
import StatusCodes from "http-status-codes";
import { NextResponse } from "next/server";


export async function POST(req: Request) {
    try {
        const DATA = await req.json()
        /*
            DATA:  
            {
                emails: ['',''],
                ticketNames: ['','']
            }
        */

        if (!DATA || !Array.isArray(DATA)) {
            return NextResponse.json({ error: "Lista de e-mails inválida" }, { status: StatusCodes.BAD_REQUEST });
        }

        // * Enviar e-mails
        const results = await Promise.all(
            DATA.map((person) => SendEmail(person.EMAIL, person["_id"]))
        );

        // LOG NO SERVIDOR (VS CODE)
        console.log("\n✅ RESULTADOS DOS E-MAILS ENVIADOS:");
        results.forEach((result) => {
            if (result.success) {
                console.log(`✔️\t${result.email}`);
            } else {
                const error = result.error as { response: string };
                console.log(`❌\t${result.email}\t->\t${error.response}`);
            }
        });

        return NextResponse.json(
            ({ message: "E-mails enviados", results })
        );


    }
    catch (error) {
        console.error("❌ send-emails | Erro na API:", error);
        return NextResponse.json({ error: "Erro interno no servidor" }, { status: 500 });
    }
}