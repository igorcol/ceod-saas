import { SendEmail } from "@/lib/sendEmails";


export async function POST(req: Request) {
    try {
        const body = await req.json();
        if (!body || !body.emails) {
            return new Response('Invalid request body', { status: 400 });
        }

        await SendEmail(body.emails, '2');
        return new Response('Emails sent successfully', { status: 200 });
    } catch (error) {
        console.error('Error sending emails:', error);
        return new Response('Internal Server Error', { status: 500 });
    }
}