

export async function GET() {
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/users/emails`, {
            method: "GET",
            headers: { "Content-Type": "application/json" }
        });
        if (!response.ok) throw new Error(`❌ Erro na api externa: ${response.statusText}`)

        const emails = await response.json()

        return new Response(JSON.stringify(emails), {
            status: 200,
            headers: { "Content-Type": "application/json" }
        })

    }
    catch (error) {
        console.error("❌ get-emails | ERROR ->", error);

        return new Response(JSON.stringify({ error: "Erro ao buscar e-mails" }), {
            status: 500,
            headers: { "Content-Type": "application/json" }
        });
    }
}

