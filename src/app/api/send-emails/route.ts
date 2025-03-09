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
        const results = await Promise.allSettled(
            DATA.map((person) => SendEmail(person.EMAIL, person["_id"]))
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