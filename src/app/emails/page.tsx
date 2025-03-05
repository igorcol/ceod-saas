"use client";
import { Button } from "@/components/ui/button";
import { GetEmailsFromDb } from "@/lib/api";
import { ApiSendEmails } from "@/lib/Email/_requests/SendEmails";

export default function Page() {

  async function handleSendEmails() {
    const emails = await GetEmailsFromDb();
    const results = await ApiSendEmails(emails);

    interface EmailResult {
      email: string;
      success: boolean;
      error?: { response: string };
    }

    if (results && results.results) {
      results.results.forEach((result: EmailResult) => {
        if (result.success) {
          console.log(`✔️\t${result.email}`);
        } else {
          const error = result.error as { response: string };
          console.log(`❌\t${result.email}\t->\t${error.response}`);
        }
      });
    }
  }

  return (
    <div className="space-y-5">
      <Button onClick={() => handleSendEmails()}>Enviar Emails</Button>
      <p>Não implementado</p>
    </div>
  );
}
