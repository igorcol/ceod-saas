// TODO: fetchUsers()

const API_URL = process.env.NEXT_PUBLIC_API_URL
<<<<<<< HEAD
const API_PORT = process.env.NEXT_PUBLIC_API_PORT

interface ApiResponse {
    [key: string]:  any;
=======
//const API_PORT = process.env.NEXT_PUBLIC_API_PORT

interface ApiResponse {
    [key: string]: string | number | boolean | object | null;
>>>>>>> develop
}

// Fetch
async function fetchData(get_data:string)  {
    const data = await GetFromDb(get_data);
    return data
}

<<<<<<< HEAD
=======
// Retorna uma lista com todos os emais
async function GetEmailsFromDb() {
    try {
        // Fazendo uma requisição GET para a API
        const api_users_emails_url = `${API_URL}/users/emails`
        const response = await fetch(api_users_emails_url);
        
        if (!response.ok) {
            throw new Error('Erro na requisição: ' + response.statusText);
        }

        const data = await response.json(); // Converte a resposta para JSON
        
        if (!data ) {
            throw new Error('Dados de inscritos não encontrados');
        }

        return data; 
    } catch (error) {
        console.error('Erro:', error);
    }
}
>>>>>>> develop

// GET FROM DB 
async function GetFromDb(get_data: string): Promise<ApiResponse | undefined> {
    try {
        
<<<<<<< HEAD
        // Fazendo uma requisição GET para a API | https://localhost:3030/users
        const api_users_url = `${API_URL}:${API_PORT}/${get_data}`
=======
        // * Fazendo uma requisição GET para a API
        //const api_users_url = `${API_URL}:${API_PORT}/${get_data}`
        const api_users_url = `${API_URL}/${get_data}`
>>>>>>> develop
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