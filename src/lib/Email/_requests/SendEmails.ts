


export const ApiSendEmails = async (emails: Array<object>) => {

  try {
    const response: Response = await fetch(`/api/send-emails`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(emails),
    });
    
    if (!response.ok) {
      console.error('[ApiSendEmails] Erro na requisição:', response.statusText);
      return { error: '[ApiSendEmails] Erro ao enviar e-mails', message: response.statusText };
    }

    alert("✅ Emails Enviados.");
    const responseData = await response.json()
    return responseData;
  }
  catch (error) {
    console.error("Erro ao enviar e-mails:", error);
    return { error }
  }
}