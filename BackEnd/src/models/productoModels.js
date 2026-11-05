import {readFile, writeFile} from "node:fs/promises";

const archivo = new URL("../data/productos.json", import.meta.url);

export const listarProductos = async()=>{
    const datos = await readFile(archivo, "utf8");
    return JSON.parse(datos);
};

export const registrarProducto = async(producto) =>{
    const productos = await listarProductos();

    const nuevoId = productos.length > 0
    ? Math.max(...productos.map(p => p.id)) + 1:1;

    const nuevoProducto={
        id:nuevoId,
        ...producto
    };
    productos.push(nuevoProducto);

    await writeFile(
        archivo, JSON.stringify(productos, null, 2),
        "utf8"
    );

    return nuevoProducto;
};

export const buscarProductoPorId = async(id) =>{
    const productos = await listarProductos();
    const producto = productos.find(p => p.id ==id);

    return producto;
};

export const actualizarProducto = async(id, datosActualizados) =>{
    const productos = await listarProductos();
    const producto = productos.find(p => p.id == id);

    if(!producto){return null;}
    producto.nombre=datosActualizados.nombre;
    producto.precio=datosActualizados.precio;
    producto.stock=datosActualizados.stock;

    await writeFile(
        archivo, JSON.stringify(productos, null, 2),
        "utf8"
    );
    return producto;
};

export const eliminarProducto = async(id) =>{
    const productos = await listarProductos();
    const producto = productos.find(p =>p.id ==id);
    if(!producto){return false;}
    
    const productosActualizados = productos.filter(
        p =>p.id !== id
    );
    await writeFile(
        archivo, JSON.stringify(productosActualizados, null, 2),
        "utf8"
    );

    return true;
};

export const buscarPorNombre = async(nombre)=>{
    const productos = await listarProductos();
    const encontrados = productos.filter((producto)=>
        producto.nombre.toLowerCase().includes(nombre.toLowerCase())
    );
    return encontrados;
};