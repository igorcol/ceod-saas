"use client";
import { Button } from "@/components/ui/button";
import { GetEmailsFromDb } from "@/lib/api";
//import { ApiGetEmails } from "@/lib/Email/_requests/GetEmails";
import { ApiSendEmails } from "@/lib/Email/_requests/SendEmails";
import { useEffect, useState } from "react";

// TODO : ----------> ALTERAR EMAILRECEIVED PARA TRUE

export default function Page() {
  type TUsersEmails = {
    status: string;
    value: {
      user: {
        email: string;
        id: string;
      };
      success: boolean | null;
      error?: { response: string | undefined };
    };
  };

  const [isLoading, setIsLoading] = useState<boolean>(false);
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
        status: "undefined",
        value: {
          user: { email: user.EMAIL, id: user._id },
          success: null,
          error: { response: undefined },
        },
      }));

      setUsersEmails(usersEmailsArray);
    }

    getEmails();
  }, []);
  // useEffect(() => {
  //   usersEmails.map((emailObj) => {
  //     console.log(emailObj);
  //   });
  // }, [usersEmails]);

  // * ENVIO DE EMAILS * \\
  async function handleSendEmails() {
    setIsLoading(true);
    setStatusMessage("Enviando emails...");

    const emails = usersEmails.map(emailObj => ({
      _id: emailObj.value.user.id,
      EMAIL: emailObj.value.user.email
    }));
    const result = await ApiSendEmails(emails); // Espera um array de objetos com _id e EMAIL

    if (result && result.results) {
      console.log("result.results", result.results);
      const usersEmailsArray: TUsersEmails[] = result.results.map(
        (result: TUsersEmails) => ({
          status: result.status,
          value: {
            success: result.value?.success || false,
            user: {
              email: result.value?.user.email || "-- Usuário sem email --",
              id: result.value?.user.id || " -- Usuário sem ID --",
            },
            error: {
              response: result.value?.error?.response,
            },
          },
        })
      );

      console.log("usersEmailsArray", usersEmailsArray);
      setUsersEmails(usersEmailsArray);
    }

    setIsLoading(false);
  }

  useEffect(() => {
    console.log(usersEmails);
  }, [usersEmails]);

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
              <div
                key={emailObj?.value.user.id || index}
                className="mt-3 space-y-1"
              >
                <div className=" w-[screen] flex flex-row border border-border p-2 gap-x-3">
                  <p className="border-r border-border pr-3">
                    {emailObj?.value.success === null
                      ? "🔵"
                      : emailObj?.value.success
                      ? "🟢"
                      : "🔴"}
                  </p>
                  <div className="flex flex-row items-center justify-between w-screen">
                    <p>
                      {emailObj?.value.user.email
                        ? emailObj?.value.user.email
                        : "- Usuário sem Email -"}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {emailObj.value.user.id}
                    </p>
                  </div>
                </div>
                <div>
                  {emailObj?.value.error && (
                    <p className="text-xs text-muted-foreground">
                      {emailObj?.value.error?.response}
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
