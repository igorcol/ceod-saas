"use client";
import { Button } from "@/components/ui/button";
import { GetEmailsFromDb } from "@/lib/api";
import { ApiSendEmails } from "@/lib/Email/_requests/SendEmails";
import { useEffect, useState } from "react";

export default function Page() {
  interface EmailResult {
    email: string;
    success: boolean;
    error?: { response: string };
  }

  const [sentEmails, SetSentEmails] = useState<EmailResult[]>([]);

  async function handleSendEmails() {
    const emails = await GetEmailsFromDb();
    const temp_emails = [
      {
        _id: "67c4baba4f422570d47ae99d",
        EMAIL: "igor.colombini@gmail.com",
      },
      {
        _id: "67c4baba4f422570d47ae99e",
      },
    ];
    const results = await ApiSendEmails(temp_emails);

    if (results && results.results) {
      SetSentEmails(results.results);
    }
  }

  useEffect(() => {
    console.log(sentEmails);
  }, [sentEmails]);

  return (
    <div className="space-y-5">
      <Button onClick={() => handleSendEmails()}>Enviar Emails</Button>
      <div>
        <h1 className="text-xl font-bold">Emails Enviados:</h1>

        {sentEmails.map((email) => {
          return (
            <div key={email.email} className="mt-3 space-y-1">
              <div className=" w-[screen] flex flex-row border border-border p-2 gap-x-3">
                <p className="border-r border-border pr-3">
                  {email.success ? "✅" : "❌"}
                </p>
                <div className="flex flex-row items-center justify-between w-screen">
                  <p>{email.email ? email.email : "- Usuário sem Email -"}</p>
                  <p className="text-xs text-muted-foreground">ID DO USUARIO</p>
                </div>
              </div>
              <div>
                {email.error && (
                  <p className="text-xs text-muted-foreground">
                    {email.error.response}
                  </p>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
