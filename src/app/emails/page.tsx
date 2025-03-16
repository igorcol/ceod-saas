"use client";
import { Button } from "@/components/ui/button";
import { GetEmailsFromDb } from "@/lib/api";
import { ApiSendEmails } from "@/lib/Email/_requests/SendEmails";
import { ApiUpdateReceived } from "@/lib/Email/_requests/UpdateReceived";
import { useEffect, useState } from "react";

// TODO : ----------> ALTERAR EMAILRECEIVED PARA TRUE

export default function Page() {
  type TUsersEmails = {
    status: string;
    value: {
      user: {
        email: string;
        id: string;
        emailReceived: boolean;
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
          user: {
            email: user.EMAIL,
            id: user._id,
            emailReceived: user.emailReceived,
          },
          success: user.emailReceived ? true : null,
          error: { response: undefined },
        },
      }));

      setUsersEmails(usersEmailsArray);
    }
    getEmails();
  }, []);

  useEffect(() => {
    usersEmails.map((emailObj) => {
      console.log(emailObj);
    });
  }, [usersEmails]);

  // * --- ENVIO DE EMAILS --- * \\
  async function handleSendEmails() {
    setIsLoading(true);
    setStatusMessage("Enviando emails...");

    // Lista de emails para o envio
    const emailsTosend = usersEmails // apenas usuarios que tem email e que ainda não receberam
      .filter(
        (user) =>
          !user.value.user.emailReceived && user.value.user.email !== null
      )
      .map((user) => ({
        _id: user.value.user.id,
        EMAIL: user.value.user.email,
        emailReceived: user.value.user.emailReceived,
      }));

    // Envia emails
    const result = await ApiSendEmails(emailsTosend);
    console.log("Sending emails to:", emailsTosend);
    console.log("result ApiSendEmails(emails):", result);
    //TODO -- SETAR UM OUTRO <p> DE STATUS PARA RESULT.MESSAGE

    // --
    if (result && result.results) {
      const usersEmailsArray: TUsersEmails[] = await Promise.all(
        result.results.map(async (result: TUsersEmails) => {
          const emailSuccess = result.value?.success || false

          if (emailSuccess) { // Se conseguiu enviar o email
            await ApiUpdateReceived(result.value?.user.id, true) // Atualiza EmailReceived
          }

          return {
            ...result,
            value: {
              ...result.value,
              user: {
                ...result.value.user,
                emailReceived: emailSuccess
              },
              error: {
                response: result.value?.error?.response,
              },
            },
          }

        })
      )

      // Atualiza os emails com os resultados
      setUsersEmails(usersEmailsArray);
      // ? SE O PROCESSO PARAR NO MEIO, EMAILS JA ENVIADOS ESTÃO COMO "emailReceived": true ???
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
