"use client";
import { Button } from "@/components/ui/button";

export default function Page() {
  async function handleSendEmails() {
    /* 
    Para cada USER (dar fetch em user):
        Pegar email dele
        Enviar o Email
    */
    const emails = [
      {
        _id: "67bfeafe30ebca172ce51af0",
        EMAIL: "a- s0fdis-f 0isd0fu93@alo.com.br",
      },
      {
        _id: "67bfeafe30ebca172ce51af1",
        EMAIL: "igor.colombini@gmail.com",
      },
      {
        _id: "67bfeafe30ebca172ce51aef",
        EMAIL: "fabiorcolombini@gmail.com",
      },
    ];

    try {
      await fetch(`/api/send-emails`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(emails),
      });

      alert("✅ Emails Enviados Com Sucesso!");
    } 
    catch (error) {
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
