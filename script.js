/*
let signUp = document.getElementById("signUp");
let signIn = document.getElementById("signIn");
let nameInput = document.getElementById("nameInput");
let title = document.getElementById("title");

signIn.onclick = function() {
    nameInput.style.maxHeight = "0";
    title.innerHTML = "Login";
    signUp.classList.add("disable");
    signIn.classList.remove("disable");
}

signUp.onclick = function() {
    nameInput.style.maxHeight = "60px";
    title.innerHTML = "Registro";
    signUp.classList.remove("disable");
    signIn.classList.add("disable");
}
*/

document.addEventListener("DOMContentLoaded", function () {
    const botonesAcordeon = document.querySelectorAll(".boton-acordeon");

    botonesAcordeon.forEach((boton) => {
        boton.addEventListener("click", function () {
            const contenido = this.nextElementSibling;

            if (contenido.style.display === "block") {
                contenido.style.display = "none";
            } else {
                contenido.style.display = "block";
            }
        });
    });
});

// FORMULARIO LACTEOS

let sesionLacteos = document.getElementById('milkProducts')

// se le agrega el escuchador al DOM con 'document.addEventListener'
document.addEventListener('DOMContentLoaded', () => {
    const productForm = document.getElementById('productForm')
    const productTableBody = document.querySelector('#productTable tbody')
    const alertsDiv = document.getElementById('alerts')
    const alertsDiv1 = document.getElementById('alerts1')

    let products = JSON.parse(localStorage.getItem('products')) || []
    products = products.map(product => ({
        ...product,
        expiryDate: new Date(product.expiryDate)
    }))

    updateProductTable()
    checkExpiringProducts()

    productForm.addEventListener('submit', (e) => {
        e.preventDefault()

        const productName = document.getElementById('productName').value
        const productQuantity = document.getElementById('productQuantity').value
        const expiryDate = document.getElementById('expiryDate').value

        const product = {
            name: productName,
            quantity: productQuantity,
            expiryDate: new Date(expiryDate)
        }

        products.push(product)
        saveProductsToLocalStorage()
        updateProductTable()
        checkExpiringProducts()
        productForm.reset()
    })

    let botonPaEnvia = document.getElementById('sendEmailButton')
    botonPaEnvia.addEventListener('click', () => {

        const email = prompt('Introduce tu correo electrónico:')
        if (email) {
            sendEmail(email, products)
        }
    })

    function sendEmail(email, stock) {
        fetch('http://localhost:3002/send-email', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email, stock })
        })
            .then(response => response.text())
            .then(data => {
                alert('Correo enviado exitosamente!')
            })
            .catch(error => {
                console.error('Error:', error)
                alert('Error al enviar el correo.')
            })
    }

    // Función para guardar los productos en el local storage
    function saveProductsToLocalStorage() {
        localStorage.setItem('products', JSON.stringify(products))
    }

    // funcion para renderizar la tabla de los PRODUCTOS AGREGADOS al stock

    function updateProductTable() {
        productTableBody.innerHTML = ''
        const now = new Date()
        const nextWeek = new Date(now)
        nextWeek.setDate(now.getDate() + 7)

        products.forEach((product, index) => {
            const row = document.createElement('tr')

            // Determinar la clase CSS a aplicar
            let className = ''
            if (product.expiryDate < now) {
                className = 'expired'
            } else if (product.expiryDate <= nextWeek) {
                className = 'expiring-soon'
            }

            row.innerHTML = `
                <td class="${className}">${product.name}</td>
                <td>${product.quantity}</td>
                <td>${product.expiryDate.toISOString().split('T')[0]}</td>
                <td>
                    <button onclick="deleteProduct(${index})">Eliminar</button>
                </td>
            `

            productTableBody.appendChild(row)
        })
    }

    // funcion para ELIMINAR productos del stock
    window.deleteProduct = function (index) {
        products.splice(index, 1)
        saveProductsToLocalStorage()
        updateProductTable()
        checkExpiringProducts()
    }

    // funcion para renderizar los productos A EXPIRAR
    function checkExpiringProducts() {
        const now = new Date()
        const nextWeek = new Date(now)
        nextWeek.setDate(now.getDate() + 7)

        const expiringProducts = products.filter(product => product.expiryDate <= nextWeek && product.expiryDate >= now)
        const expiredProducts = products.filter(product => product.expiryDate < now)

        // suponiendo 'alertsDiv1' como productos proximos a vencer, y 'alertsDiv' a los vencidos
        alertsDiv1.innerHTML = ''

        if (expiringProducts.length > 0) {
            expiringProducts.forEach(product => {
                Toastify({
                    text: ` ¡Producto próximo a vencer! :
                    ${product.quantity} unidades de ${product.name},
                    `,
                    duration: 3000,
                    destination: "https://github.com/apvarun/toastify-js",
                    newWindow: true,
                    close: true,
                    gravity: "top", // `top` or `bottom`
                    position: "left", // `left`, `center` or `right`
                    stopOnFocus: true, // Prevents dismissing of toast on hover
                    style: {
                        background: "yellow",
                        color: "black"
                    },
                    onClick: function () { } // Callback after click
                }).showToast()

                alertsDiv1.innerHTML += `<p>Alerta: Los siguientes productos están a punto de vencer en los próximos 7 días:</p><ul>`
                expiringProducts.forEach(product => {
                    alertsDiv1.innerHTML += `
                        <li>
                        ${product.name}<br>
                        Fecha de Vencimiento: ${product.expiryDate.toISOString().split('T')[0]} <br>
                        Cantidad: ${product.quantity}
                        </li>
    
                        `
                })
                alertsDiv1.innerHTML += `</ul>`
            })



        }


        // productos VENCIDOS
        if (expiredProducts.length > 0) {
            expiredProducts.forEach(product => {
                Toastify({
                    text: ` ¡Producto vencido! :
                ${product.quantity} unidades de ${product.name},
                `,
                    duration: 10000,
                    destination: "https://github.com/apvarun/toastify-js",
                    newWindow: true,
                    close: true,
                    gravity: "top", // `top` or `bottom`
                    position: "left", // `left`, `center` or `right`
                    stopOnFocus: true, // Prevents dismissing of toast on hover
                    style: {
                        background: "red",
                        color: "black"
                    },
                    onClick: function () { } // Callback after click
                }).showToast()
                alertsDiv.innerHTML += `
                    <p>
                    Estos son los productos vencidos. <br>
                    Por favor, comunicarse con el proveedor de manera inmediata para realizar el cambio:</p><ul>`

                expiredProducts.forEach(product => {
                    alertsDiv.innerHTML += `
                        <li>
                        ${product.name} - Fecha de Vencimiento: ${product.expiryDate.toISOString().split('T')[0]}
                        Cantidad: ${product.quantity}
                        </li>
                `
                })
                alertsDiv.innerHTML += `</ul>`
            })
        }
    }
})


