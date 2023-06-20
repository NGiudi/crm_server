
export const activeMsg = (body) => ({
    from: 'hololents@gmail.com',
    to: `${body.email}`,
    subject: 'Cuenta activada en Hololens',
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
        <h1>${body.names}, ¡tu cuenta ya está activada!</h1>
        <p>Para acceder ingresa <a href="http://localhost:5173/">aquí</a> con tu email y contraseña</p>
    
        <p>Email: <span>${body.email}</span></p>
        <p>Contraseña: <span>${body.password}</span></p>
    </body>
</html>`
})