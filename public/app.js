const API = "/api/products";

async function loadInstance(){

    const res = await fetch('/api/instance');
    const data = await res.json();

    document.getElementById("instance").innerHTML =
        "Served by instance: <b>" + data.hostname + "</b>";

}

async function loadProducts(){

    const res = await fetch(API);
    const products = await res.json();

    const table = document.querySelector("#productTable tbody");

    table.innerHTML = "";

    products.forEach(p => {

        const row = `
        <tr>
        <td>${p.name}</td>
        <td>${p.category}</td>
        <td>${p.stock}</td>
        <td>
        <button onclick="deleteProduct('${p.productId}')">Delete</button>
        </td>
        </tr>
        `;

        table.innerHTML += row;

    });

}

async function addProduct(){

    const name = document.getElementById("name").value;
    const category = document.getElementById("category").value;
    const stock = document.getElementById("stock").value;

    await fetch(API,{
        method:'POST',
        headers:{'Content-Type':'application/json'},
        body: JSON.stringify({name,category,stock})
    });

    loadProducts();

}

async function deleteProduct(id){

    await fetch(API + "/" + id,{
        method:'DELETE'
    });

    loadProducts();

}

loadInstance();
loadProducts();
