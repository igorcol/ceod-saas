


export const ApiSendEmails = async (emails: Array<object>) => {

  try {
    const response: Response = await fetch(`/api/send-emails`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(emails),
    });

    const responseData = await response.json()
    //console.log("📩 Resultados do envio:", responseData.results);

    alert("✅ Emails Enviados.");
    return responseData;
  }
  catch (error) {
    console.error("Erro ao enviar e-mails:", error);
    return { error }
  }
}