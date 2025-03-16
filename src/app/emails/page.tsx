"use client";
import { Button } from "@/components/ui/button";
import { GetEmailsFromDb } from "@/lib/api";
import { ApiSendEmails } from "@/lib/Email/_requests/SendEmails";
import { ApiUpdateReceived } from "@/lib/Email/_requests/UpdateReceived";
import { useEffect, useState } from "react";
import { TUsersEmails } from "./types";
import EmailCard from "./_components/EmailCard";

// TODO : ----------> ALTERAR EMAILRECEIVED PARA TRUE

export default function Page() {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [usersEmails, setUsersEmails] = useState<TUsersEmails[]>([]);
  const [statusMessage, setStatusMessage] = useState<string>("");

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
    console.log("result ApiSendEmails(emails):", result);
    //TODO -- SETAR UM OUTRO <p> DE STATUS PARA RESULT.MESSAGE

    // --
    if (result && result.results) {
      const usersEmailsArray: TUsersEmails[] = await Promise.all(
        result.results.map(async (result: TUsersEmails) => {
          const emailSuccess = result.value?.success || false;

          if (emailSuccess) {
            // Se conseguiu enviar o email
            await ApiUpdateReceived(result.value?.user.id, true); // Atualiza EmailReceived
          }

          return {
            ...result,
            value: {
              ...result.value,
              user: {
                ...result.value.user,
                emailReceived: emailSuccess,
              },
              error: {
                response: result.value?.error?.response,
              },
            },
          };
          
        })
      );

      // Atualiza os emails com os resultados, mantendo os emails que não foram atualizados
      setUsersEmails((prevUsersEmails) => {
        const updatedUsersMap = new Map( 
          usersEmailsArray.map((user) => [user.value.user.id, user])
        );
        return prevUsersEmails.map((prevUser) =>
          updatedUsersMap.get(prevUser.value.user.id) || prevUser
        );
      });
      // ? SE O PROCESSO PARAR NO MEIO, EMAILS JA ENVIADOS ESTÃO COMO "emailReceived": true ???
    }
    
    setStatusMessage(result.error ? `${result.error} -> ${result.message}` : "")
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
        <p>{statusMessage}</p>

        {usersEmails.map((emailObj, index) => (
          <EmailCard
            key={emailObj?.value.user.id || index}
            emailObj={emailObj}
            index={index}
          />
        ))}
      </div>
    </div>
  );
}
