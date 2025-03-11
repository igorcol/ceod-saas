import { SendEmail } from "@/lib/Email/sendEmails";
import StatusCodes from "http-status-codes";
import { NextResponse } from "next/server";

interface TReqUser {
    _id: string,
    EMAIL: string,
    emailReceived: boolean
}


export async function POST(req: Request): Promise<Response> {
    try {
        const DATA: Array<TReqUser> = await req.json()
        
        const usersToSend = DATA.filter(person => !person.emailReceived)
        if (usersToSend.length === 0) {
            return NextResponse.json(
                { message: "Todos emails ja foram enviados." },
                { status: StatusCodes.OK }
            );
        }
        /*
            DATA:  
            [
                {
                    '_id': '0934320348',
                    'EMAIL': 'm@example.com',
                    'emailReceived': true | false
                },
            ]
        */

        if (!DATA || !Array.isArray(DATA)) {
            return NextResponse.json({ error: "Lista de e-mails inválida" }, { status: StatusCodes.BAD_REQUEST });
        }

        // * Enviar e-mails
        const results = await Promise.allSettled(
            usersToSend.map((user) => 
                SendEmail(user.EMAIL, user["_id"])
            )
        );

        // LOG NO SERVIDOR (VS CODE)
        console.log("\n✅ RESULTADOS DOS E-MAILS ENVIADOS:");

        results.forEach((result, index) => {
            if (result.status === "fulfilled") {
                if (result.value.success) {
                    console.log(`✔️\t${result.value.user.email}`);
                } else {
                    console.log(`❌\t${result.value.user.email} -> ${result.value.error}`);
                }
            } else {
                console.log(`❌\t${DATA[index].EMAIL || "[ ]"} -> ${result.reason}`);
            }
        });

        // verifica se TODOS falharam
        const allFailed = results.every(result => result.status === "rejected")

        if (allFailed) {
            return NextResponse.json(
                { error: "Nenhum email pôde ser enviado", results },
                { status: StatusCodes.INTERNAL_SERVER_ERROR }
            )
        }


        return NextResponse.json(
            { message: "E-mails processados", results },
            { status: StatusCodes.OK }
        );

    }
    catch (error) {
        console.error("❌ send-emails | Erro na API:", error);
        return NextResponse.json(
            { error: "Erro interno no servidor" },
            { status: StatusCodes.INTERNAL_SERVER_ERROR }
        );
    }
}