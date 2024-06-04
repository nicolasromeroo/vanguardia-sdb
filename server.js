const express = require('express')
const nodemailer = require('nodemailer')
const bodyParser = require('body-parser')
const cors = require('cors')

const app = express()
const port = 3002

app.use(cors())
app.use(bodyParser.json())

// Configuración del transportador de Nodemailer
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'nicolasdev290300@gmail.com', // Tu correo electrónico
        pass: 'vyxj rtvk yprb cikt' // Tu contraseña
    }
})

transporter.verify((error, success) => {
    if (error) {
        console.log('Error en la configuración de Nodemailer:', error)
    } else {
        console.log('Servidor listo para enviar correos')
    }
})

// Ruta para enviar el correo electrónico
app.post('/send-email', (req, res) => {
    const { email, stock } = req.body

    const mailOptions = {
        from: 'nicolasdev290300@gmail.com',
        to: email,
        subject: 'Stock de Productos',
        html: `
            <p>Este es el stock actual:</p>
            <ul>
                ${stock.map(product => `<li> ${product.name} - ${product.quantity} unidad/es</li>`
                ).join('')}
            </ul>
        `
    }

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.error('Error al enviar el correo:', error)
            return res.status(500).send('Error al enviar el correo: ' + error.toString())
        }
        res.send('Correo enviado: ' + info.response)
    })
})

app.listen(port, () => {
    console.log(`Servidor escuchando en http://localhost:${port}`)
})

