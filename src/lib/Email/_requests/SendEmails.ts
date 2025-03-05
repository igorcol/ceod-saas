

export const ApiSendEmails = async (emails: Array<object>) => {
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