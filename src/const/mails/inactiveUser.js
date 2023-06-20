
export const inactiveMsg = (body) => ({
    from: 'hololents@gmail.com',
    to: `${body.email}`,
    subject: 'Cuenta desactivada en Hololens',
    html: `<html>
    <head>
        <style>
            body {
                font-family: Arial, sans-serif;
                display: flex;
                flex-direction: column;
                align-items: center;
                justify-content: center;
                height: 100vh;
                margin: 0;
                text-align: center;
            }
            h1 {
                color: #333;
            }
            a{
                text-decoration: none;
                color: #41b883;
            }
            span{
                text-decoration: none;
                color: #41b883;
            }
            p {
                color: #666;
            }
            img {
                max-width: 400px;
                height: auto;
            }
        </style>
    </head>
    
    <body>
        <img src="https://i.ibb.co/QDP1K4t/logo.png">
        <h1>${body.names}, tu cuenta ha sido desactivada</h1>

        <p>En caso de querer relizar una consulta escribir un email a <span>hololents@gmail.com</span></p>
    </body>
</html>`
})