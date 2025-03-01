"use client";
import { Button } from "@/components/ui/button";

export default function Page() {

  async function handleSendEmails() {
    console.log(">> handleSendEmails");
    /* 
    Para cada USER (dar fetch em user):
        Pegar email dele
        Enviar o Email
    */
   const temp_mails = 'igor.colombini@gmail.com'

    try {
      const response = await fetch(`/api/send-emails`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({emails: temp_mails}),
      });
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(
          `[sendEmails] Erro ao enviar Email: ${errorData.error}`
        );
      }

    } catch (err) {
      console.error("Erro ao gerar QR Code:", err);
    }
  }

  return (
    <div className="space-y-5">
      <Button onClick={() => handleSendEmails()}>Enviar Emails</Button>
      <p>Não implementado</p>
    </div>
  );
}
