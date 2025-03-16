const environment = process.env.NODE_ENV;

const apiUrl = process.env.NEXT_PUBLIC_API_URL || "⚠️ Variável de ambiente não configurada";
const urlParts = apiUrl?.split('.');

console.log(`
===============================
🚀 Iniciando aplicação Next.js
🌍 Ambiente: ${environment}
🔗 API_URL: ${urlParts[0]}...}
===============================

⚙️ Email service: ${process.env.EMAIL_SERVER}
`);
