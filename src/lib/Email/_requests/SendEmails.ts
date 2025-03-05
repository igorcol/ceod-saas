

export const ApiSendEmails = async (emails: Array<object>) => {

  try {
    console.log('\n ⚪ Enviando emails...') 
    const response = await fetch(`/api/send-emails`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(emails),
    });

    alert("✅ Emails Enviados Com Sucesso!");
    return response
  }
  catch (error) {
    console.error("Erro ao enviar e-mails:", error);
    return error
  }
}