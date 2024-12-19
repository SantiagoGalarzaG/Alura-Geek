async function listarProductos() {
    try {
        const conexion = await fetch("http://localhost:3001/productos", {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        });

        if (!conexion.ok) {
            throw new Error(`Error en la solicitud: ${conexion.status}`);
        }

        const conexionConvertida = await conexion.json();
        return conexionConvertida;
    } catch (error) {
        console.error("Error al listar productos:", error);
        throw error;
    }
}
async function agregarProducto(imagen, nombre, precio){
    const conexion = await fetch("http://localhost:3001/productos", {
        method: "POST",
        headers:{
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            imagen:imagen,
            nombre:nombre,
            precio:precio
        })
    });

    const conexionConvertida = await conexion.json();

    return conexionConvertida;

}
async function eliminarProducto(idProducto) {
    try {
        const conexion = await fetch(`http://localhost:3001/productos/${idProducto}`, {
            method: "DELETE",
        });
        if (!conexion.ok) {
            throw new Error("Error en la solicitud de eliminación");
        }
    } catch (error) {
        console.error("Error al eliminar el producto:", error);
    }
}


export const conectarAPI = {
    listarProductos,
    agregarProducto,
    eliminarProducto
}