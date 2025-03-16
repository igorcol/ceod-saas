import { StatusCodes } from "http-status-codes";
import { NextResponse } from "next/server"

type TReq = {
    where: string,
    emailReceived: boolean
}

export async function PATCH(req: Request): Promise<Response> {
    try {
        const body: TReq = await req.json();
        console.log('[update-email-received] Body:', body)

        if (!body.where) {
            console.error("ID inválido:", body.where);
            return NextResponse.json({ error: { where: "ID inválido." } }, { status: StatusCodes.BAD_REQUEST });
        }
        else if (!body.emailReceived) {
            console.error("emailReceived deve ser TRUE | FALSE");
            return NextResponse.json({ error: { emailReceived: "emailReceived deve ser TRUE | FALSE" } }, { status: StatusCodes.BAD_REQUEST });
        }

        const result = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/users/update-received/${body.where}`, {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                emailReceived: body.emailReceived
            })
        });

        if (!result.ok) {
            throw new Error(`Result not ok - ${result.statusText}`,);
        }

        return NextResponse.json({ status: result.status })
    }
    catch (error) {
        if (error instanceof Error) {
            console.error("❌ [update-email-received] Erro na requisição:", error);
            return NextResponse.json({
                error: "[update-email-received] Erro ao processar a requisição",
                message: error.message
            }, { status: 500 });
        }
    }

    return NextResponse.json({ error: "Erro inesperado." }, { status: 500 });
}