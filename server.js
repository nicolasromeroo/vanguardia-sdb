// // server.js
// const express = require('express')
// const nodemailer = require('nodemailer')
// const bodyParser = require('body-parser')
// const cors = require('cors')

// const app = express()
// const port = 3002

// app.use(cors())
// app.use(bodyParser.json())

// // Configuración del transportador de Nodemailer
// const transporter = nodemailer.createTransport({
//     service: 'gmail',
//     auth: {
//         user: 'tu_correo@gmail.com', // Tu correo electrónico
//         pass: 'tu_contraseña' // Tu contraseña
//     }
// })

// transporter.verify((error, success) => {
//     if (error) {
//         console.log('Error en la configuración de Nodemailer:', error)
//     } else {
//         console.log('Servidor listo para enviar correos')
//     }
// })

// // // Ruta para enviar el correo electrónico
// // app.post('/send-email', (req, res) => {
// //     const { email, stock } = req.body

// //     const mailOptions = {
// //         from: 'tu_correo@gmail.com',
// //         to: email,
// //         subject: 'Stock de Productos',
// //         html: `
// //             <p>Este es el stock actual:</p>
// //             <ul>
// //                 ${stock.map(product => `<li> ${product.name} - ${product.quantity} unidad/es</li>`
// //                 ).join('')}
// //             </ul>
// //         `
// //     }

// //     transporter.sendMail(mailOptions, (error, info) => {
// //         if (error) {
// //             console.error('Error al enviar el correo:', error)
// //             return res.status(500).send('Error al enviar el correo: ' + error.toString())
// //         }
// //         res.send('Correo enviado: ' + info.response)
// //     })
// // })

// // app.listen(port, () => {
// //     console.log(`Servidor escuchando en http://localhost:${port}`)
// // })

const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const port = 3000; // Cambia el puerto a 3000 o cualquier otro puerto que no esté en uso por MongoDB

// Conectar a MongoDB
mongoose.connect('mongodb://localhost:27017/productDB', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

const productSchema = new mongoose.Schema({
    name: String,
    quantity: Number,
    expiryDate: Date,
});

const Product = mongoose.model('Product', productSchema);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors()); // Habilitar CORS

// Ruta para obtener todos los productos
app.get('/products', async (req, res) => {
    const products = await Product.find({});
    res.json(products);
});

// Ruta para agregar un producto
app.post('/products', async (req, res) => {
    const newProduct = new Product(req.body);
    await newProduct.save();
    res.json(newProduct);
});

// Ruta para eliminar un producto
app.delete('/products/:id', async (req, res) => {
    await Product.findByIdAndDelete(req.params.id);
    res.json({ message: 'Producto eliminado' });
});

app.listen(port, () => {
    console.log(`Servidor corriendo en http://localhost:${port}`);
});
