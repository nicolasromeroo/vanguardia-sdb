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
// */
// document.addEventListener('DOMContentLoaded', () => {
//     const productForm = document.getElementById('productForm');
//     const productTableBody = document.querySelector('#productTable tbody');
//     const alertsDiv = document.getElementById('alerts');
//     const alertsDiv1 = document.getElementById('alerts1');

//     fetchProducts();

//     productForm.addEventListener('submit', async (e) => {
//         e.preventDefault();

//         const productName = document.getElementById('productName').value;
//         const productQuantity = document.getElementById('productQuantity').value;
//         const expiryDate = document.getElementById('expiryDate').value;

//         const product = {
//             name: productName,
//             quantity: productQuantity,
//             expiryDate: new Date(expiryDate)
//         };

//         await addProduct(product);
//         productForm.reset();
//         fetchProducts();
//     });

//     let botonPaEnvia = document.getElementById('sendEmailButton');
//     botonPaEnvia.addEventListener('click', () => {
//         const email = prompt('Introduce tu correo electrónico:');
//         if (email) {
//             sendEmail(email);
//         }
//     });

//     async function fetchProducts() {
//         const response = await fetch('http://localhost:3000/products'); // Asegúrate de que el puerto coincida
//         const products = await response.json();
//         updateProductTable(products);
//         checkExpiringProducts(products);
//     }

//     async function addProduct(product) {
//         await fetch('http://localhost:3000/products', {
//             method: 'POST',
//             headers: {
//                 'Content-Type': 'application/json'
//             },
//             body: JSON.stringify(product)
//         });
//     }

//     async function deleteProduct(id) {
//         await fetch(`http://localhost:3000/products/${id}`, {
//             method: 'DELETE'
//         });
//         fetchProducts();
//     }

//     async function sendEmail(email) {
//         const response = await fetch('http://localhost:3000/products');
//         const products = await response.json();

//         await fetch('http://localhost:3002/send-email', {
//             method: 'POST',
//             headers: {
//                 'Content-Type': 'application/json'
//             },
//             body: JSON.stringify({ email, stock: products })
//         });
//         alert('Correo enviado exitosamente!');
//     }

//     function updateProductTable(products) {
//         productTableBody.innerHTML = '';
//         const now = new Date();
//         const nextWeek = new Date(now);
//         nextWeek.setDate(now.getDate() + 7);

//         products.forEach((product) => {
//             const row = document.createElement('tr');

//             let className = '';
//             if (new Date(product.expiryDate) < now) {
//                 className = 'expired';
//             } else if (new Date(product.expiryDate) <= nextWeek) {
//                 className = 'expiring-soon';
//             }

//             row.innerHTML = `
//                 <td class="${className}">${product.name}</td>
//                 <td>${product.quantity}</td>
//                 <td>${new Date(product.expiryDate).toISOString().split('T')[0]}</td>
//                 <td>
//                     <button onclick="deleteProduct('${product._id}')">Eliminar</button>
//                 </td>
//             `;

//             productTableBody.appendChild(row);
//         });
//     }

//     function checkExpiringProducts(products) {
//         const now = new Date();
//         const nextWeek = new Date(now);
//         nextWeek.setDate(now.getDate() + 7);

//         const expiringProducts = products.filter(product => new Date(product.expiryDate) <= nextWeek && new Date(product.expiryDate) >= now);
//         const expiredProducts = products.filter(product => new Date(product.expiryDate) < now);

//         alertsDiv1.innerHTML = '';

//         if (expiringProducts.length > 0) {
//             expiringProducts.forEach(product => {
//                 Toastify({
//                     text: `¡Producto próximo a vencer! : ${product.quantity} unidades de ${product.name}`,
//                     duration: 3000,
//                     destination: "https://github.com/apvarun/toastify-js",
//                     newWindow: true,
//                     close: true,
//                     gravity: "top",
//                     position: "left",
//                     stopOnFocus: true,
//                     style: {
//                         background: "yellow",
//                         color: "black"
//                     },
//                     onClick: function () {}
//                 }).showToast();

//                 alertsDiv1.innerHTML += `<p>Alerta: Los siguientes productos están a punto de vencer en los próximos 7 días:</p><ul>`;
//                 expiringProducts.forEach(product => {
//                     alertsDiv1.innerHTML += `
//                         <li>
//                         ${product.name}<br>
//                         Fecha de Vencimiento: ${new Date(product.expiryDate).toISOString().split('T')[0]}<br>
//                         Cantidad: ${product.quantity}
//                         </li>
//                     `;
//                 });
//                 alertsDiv1.innerHTML += `</ul>`;
//             });
//         }

//         if (expiredProducts.length > 0) {
//             expiredProducts.forEach(product => {
//                 Toastify({
//                     text: `¡Producto vencido! : ${product.quantity} unidades de ${product.name}`,
//                     duration: 10000,
//                     destination: "https://github.com/apvarun/toastify-js",
//                     newWindow: true,
//                     close: true,
//                     gravity: "top",
//                     position: "left",
//                     stopOnFocus: true,
//                     style: {
//                         background: "red",
//                         color: "black"
//                     },
//                     onClick: function () {}
//                 }).showToast();
//                 alertsDiv.innerHTML += `
//                     <p>Estos son los productos vencidos. <br>Por favor, comunicarse con el proveedor de manera inmediata para realizar el cambio:</p><ul>`;
//                 expiredProducts.forEach(product => {
//                     alertsDiv.innerHTML += `
//                         <li>
//                         ${product.name} - Fecha de Vencimiento: ${new Date(product.expiryDate).toISOString().split('T')[0]}<br>
//                         Cantidad: ${product.quantity}
//                         </li>
//                     `;
//                 });
//                 alertsDiv.innerHTML += `</ul>`;
//             });
//         }
//     }
// });
document.addEventListener('DOMContentLoaded', () => {
    const productForm = document.getElementById('productForm');
    const productTableBody = document.querySelector('#productTable tbody');
    const alertsDiv = document.getElementById('alerts');
    const alertsDiv1 = document.getElementById('alerts1');

    // Configuración de Firebase
    const firebaseConfig = {
        apiKey: "AIzaSyAIa38cyGGKdQA5jOXA-NUL5Tm-_jaDsp4",
        authDomain: "proyecto-firebase-cf192.firebaseapp.com",
        databaseURL: "https://proyecto-firebase-cf192-default-rtdb.firebaseio.com",
        projectId: "proyecto-firebase-cf192",
        storageBucket: "proyecto-firebase-cf192.appspot.com",
        messagingSenderId: "1051898919951",
        appId: "1:1051898919951:web:e25f54b07c1c06ec5df77a"
    };

    // Inicializar Firebase
    firebase.initializeApp(firebaseConfig);
    const db = firebase.database();

    fetchProducts();

    productForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        const productName = document.getElementById('productName').value;
        const productQuantity = document.getElementById('productQuantity').value;
        const expiryDate = document.getElementById('expiryDate').value;

        if (!productName || !productQuantity || !expiryDate) {
            console.error('Todos los campos son obligatorios');
            return;
        }

        const product = {
            name: productName,
            quantity: parseInt(productQuantity, 10),
            expiryDate: new Date(expiryDate).toISOString()
        };

        await addProduct(product);
        productForm.reset();
        fetchProducts();
    });

    async function fetchProducts() {
        const productsRef = db.ref('products');
        productsRef.on('value', (snapshot) => {
            const products = snapshot.val() ? snapshot.val() : {};
            updateProductTable(products);
            checkExpiringProducts(Object.values(products));
        });
    }

    async function addProduct(product) {
        const newProductRef = db.ref('products').push();
        await newProductRef.set(product);
    }

    async function updateProduct(id, updatedProduct) {
        const productRef = db.ref('products').child(id);
        await productRef.update(updatedProduct);
        fetchProducts();
    }

    async function deleteProduct(id) {
        if (!id) {
            console.error('ID del producto no definido');
            return;
        }
        const productRef = db.ref('products').child(id);
        await productRef.remove();
        fetchProducts();
    }

    function isValidDate(dateString) {
        const date = new Date(dateString);
        return !isNaN(date.getTime());
    }

    function updateProductTable(products) {
        productTableBody.innerHTML = '';
        const now = new Date();
        const nextFiveDays = new Date(now);
        nextFiveDays.setDate(now.getDate() + 5);
        const nextSevenDays = new Date(now);
        nextSevenDays.setDate(now.getDate() + 7);
        const nextTenDays = new Date(now);
        nextTenDays.setDate(now.getDate() + 10);

        // Ordenar productos por fecha de vencimiento (primero los que vencen)
        const productsArray = Object.keys(products).map(key => ({ id: key, ...products[key] }));
        productsArray.sort((a, b) => new Date(a.expiryDate) - new Date(b.expiryDate));

        productsArray.forEach((product) => {
            const row = document.createElement('tr');
            const expiryDate = new Date(product.expiryDate);

            if (!isValidDate(expiryDate)) {
                console.error(`Fecha de vencimiento inválida para el producto ${product.name}`);
                return;
            }

            let className = '';
            if (expiryDate < now) {
                className = 'expired';
            } else if (expiryDate <= nextFiveDays || (expiryDate > nextFiveDays && product.quantity > 20)) {
                className = 'red';
            } else if (expiryDate <= nextSevenDays) {
                className = 'orange';
            } else if (expiryDate <= nextTenDays) {
                className = 'yellow';
            } else {
                className = 'green';
            }

            const nameCell = document.createElement('td');
            nameCell.className = className;
            nameCell.textContent = product.name;

            const quantityCell = document.createElement('td');
            quantityCell.innerHTML = `
                <button onclick="decrementQuantity('${product.id}', ${product.quantity})">-</button>
                <span>${product.quantity}</span>
                <button onclick="incrementQuantity('${product.id}', ${product.quantity})">+</button>
            `;

            const expiryDateCell = document.createElement('td');
            expiryDateCell.textContent = expiryDate.toISOString().split('T')[0];

            const actionsCell = document.createElement('td');
            const deleteButton = document.createElement('button');
            deleteButton.textContent = 'Eliminar';
            deleteButton.addEventListener('click', () => deleteProduct(product.id));
            actionsCell.appendChild(deleteButton);

            row.appendChild(nameCell);
            row.appendChild(quantityCell);
            row.appendChild(expiryDateCell);
            row.appendChild(actionsCell);

            productTableBody.appendChild(row);
        });
    }

    window.incrementQuantity = async function(id, currentQuantity) {
        const newQuantity = currentQuantity + 1;
        await updateProduct(id, { quantity: newQuantity });
    }

    window.decrementQuantity = async function(id, currentQuantity) {
        const newQuantity = currentQuantity - 1;
        if (newQuantity >= 0) {
            await updateProduct(id, { quantity: newQuantity });
        }
    }

    function checkExpiringProducts(products) {
        const now = new Date();
        const nextWeek = new Date(now);
        nextWeek.setDate(now.getDate() + 7);

        const expiringProducts = products.filter(product => new Date(product.expiryDate) <= nextWeek && new Date(product.expiryDate) >= now);
        const expiredProducts = products.filter(product => new Date(product.expiryDate) < now);

        alertsDiv1.innerHTML = '';

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
