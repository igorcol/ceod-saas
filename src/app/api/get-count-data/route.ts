import { NextResponse } from "next/server";

type filteredUser = {
    presenca: boolean | null
}


export async function GET() {
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/users`);
        const users: filteredUser[] = await response.json();

        const totalInscritos = users.length;
        const totalPresentes = users.filter((u) => u.presenca === true).length;
        const totalAusentes  = users.filter((u) => u.presenca === false).length;

        return NextResponse.json(
            {
                totalInscritos,
                totalPresentes,
                totalAusentes
            }
        )
    }
    catch {
        return NextResponse.json({
            error: "Erro ao buscar dados."
        }, { status: 500 })
    }
}