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
document.addEventListener('DOMContentLoaded', () => {
    const productForm = document.getElementById('productForm');
    const productTableBody = document.querySelector('#productTable tbody');
    const alertsDiv = document.getElementById('alerts');
    const alertsDiv1 = document.getElementById('alerts1');

    fetchProducts();

    productForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        const productName = document.getElementById('productName').value;
        const productQuantity = document.getElementById('productQuantity').value;
        const expiryDate = document.getElementById('expiryDate').value;

        const product = {
            name: productName,
            quantity: productQuantity,
            expiryDate: new Date(expiryDate)
        };

        await addProduct(product);
        productForm.reset();
        fetchProducts();
    });

    let botonPaEnvia = document.getElementById('sendEmailButton');
    botonPaEnvia.addEventListener('click', () => {
        const email = prompt('Introduce tu correo electrónico:');
        if (email) {
            sendEmail(email);
        }
    });

    async function fetchProducts() {
        const response = await fetch('http://localhost:3000/products'); // Asegúrate de que el puerto coincida
        const products = await response.json();
        updateProductTable(products);
        checkExpiringProducts(products);
    }

    async function addProduct(product) {
        await fetch('http://localhost:3000/products', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(product)
        });
    }

    async function deleteProduct(id) {
        await fetch(`http://localhost:3000/products/${id}`, {
            method: 'DELETE'
        });
        fetchProducts();
    }

    async function sendEmail(email) {
        const response = await fetch('http://localhost:3000/products');
        const products = await response.json();

        await fetch('http://localhost:3002/send-email', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email, stock: products })
        });
        alert('Correo enviado exitosamente!');
    }

    function updateProductTable(products) {
        productTableBody.innerHTML = '';
        const now = new Date();
        const nextWeek = new Date(now);
        nextWeek.setDate(now.getDate() + 7);

        products.forEach((product) => {
            const row = document.createElement('tr');

            let className = '';
            if (new Date(product.expiryDate) < now) {
                className = 'expired';
            } else if (new Date(product.expiryDate) <= nextWeek) {
                className = 'expiring-soon';
            }

            row.innerHTML = `
                <td class="${className}">${product.name}</td>
                <td>${product.quantity}</td>
                <td>${new Date(product.expiryDate).toISOString().split('T')[0]}</td>
                <td>
                    <button onclick="deleteProduct('${product._id}')">Eliminar</button>
                </td>
            `;

            productTableBody.appendChild(row);
        });
    }

    function checkExpiringProducts(products) {
        const now = new Date();
        const nextWeek = new Date(now);
        nextWeek.setDate(now.getDate() + 7);

        const expiringProducts = products.filter(product => new Date(product.expiryDate) <= nextWeek && new Date(product.expiryDate) >= now);
        const expiredProducts = products.filter(product => new Date(product.expiryDate) < now);

        alertsDiv1.innerHTML = '';

        if (expiringProducts.length > 0) {
            expiringProducts.forEach(product => {
                Toastify({
                    text: `¡Producto próximo a vencer! : ${product.quantity} unidades de ${product.name}`,
                    duration: 3000,
                    destination: "https://github.com/apvarun/toastify-js",
                    newWindow: true,
                    close: true,
                    gravity: "top",
                    position: "left",
                    stopOnFocus: true,
                    style: {
                        background: "yellow",
                        color: "black"
                    },
                    onClick: function () {}
                }).showToast();

                alertsDiv1.innerHTML += `<p>Alerta: Los siguientes productos están a punto de vencer en los próximos 7 días:</p><ul>`;
                expiringProducts.forEach(product => {
                    alertsDiv1.innerHTML += `
                        <li>
                        ${product.name}<br>
                        Fecha de Vencimiento: ${new Date(product.expiryDate).toISOString().split('T')[0]}<br>
                        Cantidad: ${product.quantity}
                        </li>
                    `;
                });
                alertsDiv1.innerHTML += `</ul>`;
            });
        }

        if (expiredProducts.length > 0) {
            expiredProducts.forEach(product => {
                Toastify({
                    text: `¡Producto vencido! : ${product.quantity} unidades de ${product.name}`,
                    duration: 10000,
                    destination: "https://github.com/apvarun/toastify-js",
                    newWindow: true,
                    close: true,
                    gravity: "top",
                    position: "left",
                    stopOnFocus: true,
                    style: {
                        background: "red",
                        color: "black"
                    },
                    onClick: function () {}
                }).showToast();
                alertsDiv.innerHTML += `
                    <p>Estos son los productos vencidos. <br>Por favor, comunicarse con el proveedor de manera inmediata para realizar el cambio:</p><ul>`;
                expiredProducts.forEach(product => {
                    alertsDiv.innerHTML += `
                        <li>
                        ${product.name} - Fecha de Vencimiento: ${new Date(product.expiryDate).toISOString().split('T')[0]}<br>
                        Cantidad: ${product.quantity}
                        </li>
                    `;
                });
                alertsDiv.innerHTML += `</ul>`;
            });
        }
    }
});
