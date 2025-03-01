// TODO: fetchUsers()

const API_URL = process.env.NEXT_PUBLIC_API_URL
const API_PORT = process.env.NEXT_PUBLIC_API_PORT

interface ApiResponse {
    [key: string]:  any;
}

// Fetch
async function fetchData(get_data:string)  {
    const data = await GetFromDb(get_data);
    return data
}


// GET FROM DB 
async function GetFromDb(get_data: string): Promise<ApiResponse | undefined> {
    try {
        
        // Fazendo uma requisição GET para a API | https://localhost:3030/users
        const api_users_url = `${API_URL}:${API_PORT}/${get_data}`
        console.log(`Fetching "${get_data}" from ${api_users_url}`)

        const response = await fetch(api_users_url);
        console.log(`> "${get_data}" Fetched Sucessfully`)
        
        // Verifica se a resposta foi bem-sucedida
        if (!response.ok) {
            throw new Error('Erro na requisição: ' + response.statusText);
        }

        // Converte a resposta para JSON
        const data: ApiResponse = await response.json(); 
        return data; 

    } catch (error) {
        console.error('Erro:', error);
    }
}


export {
    fetchData,
} 