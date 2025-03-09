"use client";
import { Button } from "@/components/ui/button";
import { GetEmailsFromDb } from "@/lib/api";
//import { ApiGetEmails } from "@/lib/Email/_requests/GetEmails";
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

  type TUsersEmails = {
    user: {
      email: string,
      id: string
    }
    success: boolean;
    error?: { response: string };
  };

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [sentEmails, SetSentEmails] = useState<EmailResult[]>([]);
  const [statusMessage, setStatusMessage] = useState<string>(
    "Nenhum usuário encontrado."
  );

  const [usersEmails, setUsersEmails] = useState<TUsersEmails[]>([]);

  // * FETCH EMAILS * \\
  //  Pega todos os emails e seta no usersEmails
  useEffect(() => {
    async function getEmails() {
      const emails = await GetEmailsFromDb();

      const usersEmailsArray: TUsersEmails[] = emails.map((user) => ({
        user: { email: user.EMAIL, id: user._id }, 
        success: false
      }));

      setUsersEmails(usersEmailsArray);
    }

    getEmails();
  }, []);
  useEffect(() => {
    usersEmails.map((emailObj) => {
      console.log(emailObj.user.email);
    });
  }, [usersEmails]);

  // * ENVIO DE EMAILS * \\
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
        <h1 className="text-xl font-bold">Inscritos:</h1>

        {usersEmails.length > 0 ? ( // * SE HOUVER EMAILS ENVIADOS
          usersEmails.map((emailObj, index) => {
            return (
              <div key={emailObj?.user.id || index} className="mt-3 space-y-1">
                <div className=" w-[screen] flex flex-row border border-border p-2 gap-x-3">
                  <p className="border-r border-border pr-3">🔵</p>
                  <div className="flex flex-row items-center justify-between w-screen">
                    <p>
                      {emailObj?.user.email
                        ? emailObj?.user.email
                        : "- Usuário sem Email -"}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {emailObj.user.id}
                    </p>
                  </div>
                </div>
                <div>
                  {emailObj?.error && (
                    <p className="text-xs text-muted-foreground">
                      {emailObj?.error?.response}
                    </p>
                  )}
                </div>
              </div>
            );
          })
        ) : (
          // * SE NÃO HOUVER EMAILS ENVIADOS
          <p className="text-muted-foreground font-light">{statusMessage}</p>
        )}
      </div>
    </div>
  );
}
