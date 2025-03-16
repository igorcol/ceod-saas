


export const ApiGetEmails = async () => {

    try {
      const response: Response = await fetch(`/api/get-emails`, {
        method: "GET",
        headers: { "Content-Type": "application/json" }
      });
  
      const responseData = await response.json()
      //console.log("📩 Resultados do envio:", responseData.results);
  
      return responseData;
    }
    catch (error) {
      console.error("> Erro ao pegar e-mails:", error);
      return { error }
    }
  }