// TODO: fetchUsers()

let API_URL = process.env.NEXT_PUBLIC_API_URL
let API_PORT = process.env.NEXT_PUBLIC_API_PORT

interface ApiResponse {
    [key: string]: any;
}

// Fetch
async function fetchData(get_data:string)  {
    const data = await GetFromDb(get_data);
    return data
}

// Retorna uma lista com todos os emais
async function GetEmailsFromDb() {
    try {
        // Fazendo uma requisição GET para a API
        const response = await fetch('http://localhost:3030/inscritos');
        
        if (!response.ok) {
            throw new Error('Erro na requisição: ' + response.statusText);
        }

        const data = await response.json(); // Converte a resposta para JSON
        
        if (!data ) {
            throw new Error('Dados de inscritos não encontrados');
        }

        // Extraindo apenas os e-mails dos inscritos
        const emails: string[] = data.map((inscrito: { EMAIL: string }) => inscrito.EMAIL);
        return emails; // Retorna os e-mails

    } catch (error) {
        console.error('Erro:', error);
    }
}

// GET FROM DB 
async function GetFromDb(get_data: string): Promise<ApiResponse | undefined> {
    try {
        
        // Fazendo uma requisição GET para a API | https://localhost:3030/users
        let api_users_url = `${API_URL}:${API_PORT}/${get_data}`
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
    GetEmailsFromDb
} 