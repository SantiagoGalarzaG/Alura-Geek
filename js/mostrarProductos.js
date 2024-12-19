import { conectarAPI } from "./conectarAPI.js";

const cards = document.querySelector("[data-targetas]");

export default function construyeCard(imagen, nombre, precio, id) {
    const card = document.createElement("div");
    card.className = "card";

    card.innerHTML = `
        <img class="card__imagen" src="${imagen}" alt="${nombre}" loading="lazy"/>
        <div class="card-container--info">
            <p>${nombre}</p>
            <div class="card-container--value">
                <p>$ ${precio}</p>
                <a href="#" class="boton__eliminar" data-boton data-id="${id}"> 
                    <img src="./assets/🦆 icon _trash 2_.png" alt="Eliminar" loading="lazy"/>
                </a>
            </div>
        </div>
    `;

    return card;
}

async function listarProductos() {
    try {
        const listaAPI = await conectarAPI.listarProductos();
        listaAPI.forEach(producto => {
            cards.appendChild(construyeCard(producto.imagen, producto.nombre, producto.precio, producto.id));
        });
        agregarEventListeners();
    } catch (error) {
        console.error("Error fetching products:", error);
    }
}

function agregarEventListeners() {
    const botonesEliminar = document.querySelectorAll(".boton__eliminar");
    botonesEliminar.forEach(boton => {
        boton.addEventListener("click", eliminarProducto);
    });
}

async function eliminarProducto(evento) {
    evento.preventDefault();
    const idProducto = evento.target.closest(".boton__eliminar").dataset.id;

    try {
        await conectarAPI.eliminarProducto(idProducto);
        const card = evento.target.closest(".card");
        card.remove();
        console.log("Producto eliminado exitosamente");
    } catch (error) {
        console.error("Error al eliminar el producto:", error);
    }
}

listarProductos();
