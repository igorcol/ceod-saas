"use client";
import { Button } from "@/components/ui/button";
import { GetEmailsFromDb } from "@/lib/api";
import { ApiSendEmails } from "@/lib/Email/_requests/SendEmails";
import { useEffect, useState } from "react";

  // TODO : ----------> ALTERAR EMAILRECEIVED PARA TRUE

export default function Page() {
  interface EmailResult {
    user: {
      email: string;
      id: string;
    };
    success: boolean;
    error?: { response: string };
  }

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [sentEmails, SetSentEmails] = useState<EmailResult[]>([]);
  const [statusMessage, setStatusMessage] = useState<string>("Nenhum email enviado ainda.");

  
  async function handleSendEmails() {
    setIsLoading(true);
    setStatusMessage("Enviando emails...");

    const emails = await GetEmailsFromDb();
    const results = await ApiSendEmails(emails);

    if (results && results.results) {
      SetSentEmails(results.results);
    }

    setIsLoading(false);
  }

  useEffect(() => {
    console.log(sentEmails);
  }, [sentEmails]);

  return (
    <div className="space-y-5">
      <Button disabled={isLoading} onClick={() => handleSendEmails()}>
        Enviar Emails
      </Button>

      <div className="space-y-3">
        <h1 className="text-xl font-bold">Emails Enviados:</h1>

        {sentEmails.length > 0 ? ( // * SE HOUVER EMAILS ENVIADOS
          sentEmails.map((email) => {
            return (
              <div key={email.user.id} className="mt-3 space-y-1">
                <div className=" w-[screen] flex flex-row border border-border p-2 gap-x-3">
                  <p className="border-r border-border pr-3">
                    {email.success ? "✅" : "❌"}
                  </p>
                  <div className="flex flex-row items-center justify-between w-screen">
                    <p>
                      {email.user.email
                        ? email.user.email
                        : "- Usuário sem Email -"}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {email.user.id}
                    </p>
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
          })
        ) : (  // * SE NÃO HOUVER EMAILS ENVIADOS
          <p className="text-muted-foreground font-light">{statusMessage}</p>
        )}
      </div>
    </div>
  );
}
