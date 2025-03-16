

export const ApiUpdateReceived = async (id: string, status: boolean) => {

    try {
      const response: Response = await fetch(`/api/update-email-received`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            where: id,
            emailReceived: status
        }),
      });
      
      if(!response.ok) {
        console.log('[ApiUpdateReceived] Erro no response', response.statusText)
      }
      
      const responseData = await response.json()
      console.log('[ApiUpdateReceived] ResponseData: \t', responseData)
      return responseData;
    }

    catch (error) {
      console.error("Erro ao atualizar envio de email:", error);
      return { error }
    }
  }