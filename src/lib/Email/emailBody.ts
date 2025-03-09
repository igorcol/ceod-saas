/* eslint-disable @typescript-eslint/no-unused-vars */

const temp_EmailBody = "<h1>teste ignora</h1>"

const EmailBody = `
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Seu ingresso para o CREOD-SP</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            background-color: #f4f4f4;
            color: #333;
            padding: 20px;
        }
        h1 {
            color: #0047ab;
        }
        .content {
            background-color: #ffffff;
            padding: 20px;
            border-radius: 5px;
            box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
        }
        .important {
            color: #ff0000;
            font-weight: bold;
        }
        .cta {
            background-color: #0047ab;
            color: #ffffff;
            padding: 10px 20px;
            text-decoration: none;
            border-radius: 5px;
            margin-top: 20px;
            display: inline-block;
        }
        .footer {
            text-align: center;
            font-size: 12px;
            color: #777;
            margin-top: 20px;
        }
    </style>
</head>
<body>
    <div class="content">
        <h1>Seu ingresso para o CREOD-SP está aqui! 🎟️</h1>
        <p>Olá! 👋</p>
        <p>O Congresso Regional da Macro Região K está chegando, e estamos muito felizes em contar com a sua presença!</p>

        <p><strong>Data:</strong> 22 de MARÇO de 2025</p>
        <p><strong>Local:</strong> Av. Peixoto Gomide, 198; Centro, Itapetininga - SP.</p>
        <p><strong>Check-In:</strong> 07:00 às 08:30</p>

        <p>Prepare-se para um dia repleto de aprendizado, integração e fortalecimento dos laços fraternais com irmãos de toda nossa macro região.</p>

        <p class="important">IMPORTANTE: O seu ingresso para o evento está em anexo a este e-mail. Ele deverá ser apresentado no check-in, seja impresso ou na tela do seu celular, para garantir sua entrada.</p>

        <a href="https://www.instagram.com/32regiaosp" class="cta">Ver detalhes do evento</a>

        <p class="footer">Nos vemos em breve! Qualquer dúvida, estamos à disposição.</p>
        <p class="footer">Fraternalmente, <br> Comissão Organizadora do CREOD-SP</p>
        <p> </p>
        <p class="footer">Sistema desenvolvido pelo Irmão Sênior Igor Colombini ID: 92321</p>
    </div>
</body>

`


export {
    EmailBody
}