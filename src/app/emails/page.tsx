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
   const emails = [
    "igor.colombini@gmail.com",
    "fabiorcolombini@gmail.com"
    ]
   const ticketNames = ['1', '2']

    try {
      const response = await fetch(`/api/send-emails`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ emails: emails, ticketNames: ticketNames }),
      });
      const data = await response.json()
      if (data.ok) {
        alert('✅ Emails Enviados Com Sucesso!')
      }
      else {
        alert(`❌ [handleSendEmails] Erro: ${data}`)
      }

    } catch (error) {
      console.error("Erro ao enviar e-mails:", error);
    }
  }

  return (
    <div className="space-y-5">
      <Button onClick={() => handleSendEmails()}>Enviar Emails</Button>
      <p>Não implementado</p>
    </div>
  );
}
