import { conectarAPI } from "./conectarAPI.js";

const formulario = document.querySelector("[data-formulario]");

async function agregarProducto(evento){
    evento.preventDefault();
    const nombre = document.querySelector("[data-nombre]").value;
    const precio = document.querySelector("[data-precio]").value;
    const imagen = document.querySelector("[data-imagen]").value;

    await conectarAPI.agregarProducto(imagen, nombre, precio);
}

formulario.addEventListener("submit",evento=>agregarProducto(evento));