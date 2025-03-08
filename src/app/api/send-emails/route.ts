import { SendEmail } from "@/lib/Email/sendEmails";
import StatusCodes from "http-status-codes";
import { NextResponse } from "next/server";


export async function POST(req: Request): Promise<Response> {
    try {
        const DATA = await req.json()
        /*
            DATA:  
            [
                {
                    '_id': '0934320348',
                    'EMAIL': 'm@example.com'
                },
            ]
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
                console.log(`✔️\t${result.user.email}`);
            } else {
                const error = result.error as { response: string };
                console.log(`❌\t${result.user.email}\t->\t${error}`);
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