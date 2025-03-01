const EmailBody = 
`
    <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Seu ingresso para o IV CEOD-SP</title>
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
        <h1>Seu ingresso para o IV CEOD-SP está aqui! 🎟️</h1>
        <p>Olá! 👋</p>
        <p>O IV Congresso Estadual da Ordem DeMolay de São Paulo está chegando, e estamos muito felizes em contar com a sua presença!!.</p>

        <p><strong>Data:</strong> 27, 28 e 29 de JUNHO de 2025</p>
        <p><strong>Local:</strong> Faculdade de Engenharia de Sorocaba - Rodovia Senador José Ermírio de Moraes, 1425 - Jardim Constantino Matucci, Sorocaba - SP, 18085-784</p>
        <p><strong>Início do Check-In:</strong> Sexta (28) às 16:00 - Prédio L </p>

        <p>Prepare-se para uma programação especial, cheia de palestras inspiradoras, competições emocionantes e a oportunidade de fortalecer laços com irmãos de todo o estado.</p>

        <p class="important">IMPORTANTE: O seu ingresso para o evento está em anexo a este e-mail. Ele deverá ser apresentado no check-in, seja impresso ou na tela do seu celular, para garantir sua entrada.</p>

        <a href="https://www.instagram.com/demolay.sp?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==" class="cta">Ver detalhes do evento</a>

        <p class="footer">Nos vemos em breve! Qualquer dúvida, estamos à disposição.</p>
        <p class="footer">Fraternalmente, <br> Comissão Organizadora do IV CEOD-SP</p>
    </div>
</body>
`

export {
    EmailBody
}