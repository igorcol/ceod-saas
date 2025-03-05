"use client";
import { Button } from "@/components/ui/button";
import { GetEmailsFromDb } from "@/lib/api";
import { ApiSendEmails } from "@/lib/Email/_requests/SendEmails";

export default function Page() {

  async function handleSendEmails() {
    const emails = await GetEmailsFromDb();
    ApiSendEmails(emails)
  }

  return (
    <div className="space-y-5">
      <Button onClick={() => handleSendEmails()}>Enviar Emails</Button>
      <p>Não implementado</p>
    </div>
  );
}
