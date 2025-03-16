const EmailBody = `
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Seu ingresso para o CREOD-</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            background-color: #e5f7e5; /* Fundo verde claro */
            color: #333;
            padding: 20px;
        }
        .container {
            max-width: 600px;
            background-color: #ffffff;
            padding: 20px;
            border-radius: 8px;
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
            margin: 0 auto;
        }
        h1 {
            color: #2e7d32; /* Verde escuro */
            text-align: center;
        }
        .details {
            background-color: #f0f0f0;
            padding: 15px;
            border-radius: 5px;
            margin: 15px 0;
        }
        .important {
            color: #d32f2f;
            font-weight: bold;
            text-align: center;
            margin-top: 20px;
        }
        .cta {
            background-color: #2e7d32; /* Verde */
            color: #ffffff;
            padding: 12px 20px;
            text-decoration: none;
            border-radius: 6px;
            margin-top: 20px;
            display: block;
            text-align: center;
            font-weight: bold;
            transition: 0.3s;
        }
        .cta:hover {
            background-color: #1b5e20; /* Verde mais escuro no hover */
        }
        .whatsapp {
            background-color: #25D366; /* Verde WhatsApp */
            color: #ffffff;
            padding: 12px 20px;
            text-decoration: none;
            border-radius: 6px;
            margin-top: 20px;
            display: block;
            text-align: center;
            font-weight: bold;
            transition: 0.3s;
        }
        .whatsapp:hover {
            background-color: #1da851; /* Verde mais escuro no hover */
        }
        .footer {
            text-align: center;
            font-size: 12px;
            color: #555;
            margin-top: 20px;
        }
    </style>
</head>
<body>
    <div class="container">
        <h1>Seu ingresso para o CREOD está aqui! 🎟️</h1>
        <p>Olá! 👋</p>
        <p>O Congresso Regional da Macro Região K está chegando, e estamos muito felizes em contar com a sua presença!</p>

        <div class="details">
            <p><strong>📅 Data:</strong> 22 de MARÇO de 2025</p>
            <p><strong>📍 Local:</strong> Av. Peixoto Gomide, 198; Centro, Itapetininga - SP.</p>
            <p><strong>🕖 Check-In:</strong> 07:00 às 08:30</p>
        </div>

        <p>Prepare-se para um dia repleto de aprendizado, integração e fortalecimento dos laços fraternais com irmãos de toda nossa macro região.</p>

        <p class="important">⚠️ IMPORTANTE: O seu ingresso para o evento está em anexo a este e-mail. Ele deverá ser apresentado no check-in, seja impresso ou na tela do seu celular, para garantir sua entrada.</p>

        <a href="https://www.instagram.com/32regiaosp" class="cta">🔗 Ver detalhes do evento</a>

        <p><strong>📢 Não se esqueça de entrar no grupo para ficar por dentro de todas as informações!</strong></p>
        <a href="https://chat.whatsapp.com/FTZTJidlvBZCmUcHpej6Dk" class="whatsapp">💬 Entrar no grupo do WhatsApp</a>

        <p class="footer">Nos vemos em breve! Qualquer dúvida, estamos à disposição.</p>
        <p class="footer">Fraternalmente, <br> Comissão Organizadora do CREOD-SP</p>
        <p> </p>
        <p class="footer">⚙️ Sistema desenvolvido pelo Irmão Sênior Igor Colombini ID: 92321</p>
    </div>
</body>
`;

export { EmailBody };
