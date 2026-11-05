import{
    listarProductos,
    registrarProducto,
    buscarProductoPorId,
    buscarPorNombre,
    actualizarProducto,
    eliminarProducto
} from "../models/productoModels.js";

export const obtenerProductos = async(req, res) =>{
    try{
        const{nombre} = req.query;
        if(nombre!==undefined){
            if(typeof nombre !== "string" || !nombre.trim()){
                return res.status(400).json({
                    mensaje:"Error, nombre del producto invalido."
                });
            }
            const productos =await buscarPorNombre(nombre);
            if(productos.length === 0){
                return res.status(404).json({
                    mensaje:"Error, no se encontro el producto"
                });
            }
            return res.status(200).json(productos);
        }
        const productos = await listarProductos();
        return res.status(200).json(productos);
    }catch(error){
        console.error(error);

        res.status(500).json({
            mensaje:"Error, al consultar los productos"
        });
    }
};

export const obtenerProductoPorId = async(req, res) =>{
    try{
        const id = Number(req.params.id);

        if(!Number.isInteger(id)|| id<=0){
            return res.status(400).json({
                mensaje:"Error, ID invalido"
            });
        }

        const producto = await buscarProductoPorId(id);
        if(!producto){
            return res.status(404).json({
                mensaje:"Error, no se encontro el producto"
            });
        }
        return res.status(200).json(producto)

    }catch (error){
        console.error(error);

        res.status(500).json({
            mensaje:"Error, al buscar el ID"
        });
    }
};

export const crearProducto = async(req, res) =>{
    try{
        const {nombre, precio, stock} = req.body ?? {};
        if(
            typeof nombre !== "string" || nombre.trim() === ""||
            typeof precio !== "number" || !Number.isFinite(precio)|| precio <= 0 ||
            !Number.isInteger(stock) || stock < 0
        ){
            return res.status(400).json({
                mensaje:"Error, datos del producto invalidos"
            });
        }

        const nuevoProducto = await registrarProducto({
            nombre:nombre.trim(),
            precio,
            stock
        });
        res.status(201).json(nuevoProducto);

    }catch (error){
        console.error(error)
        res.status(500).json({
            mensaje:"Error, no se pudo crear el nuevo producto"
        });
    }
};

export const modificarProducto = async(req, res) =>{
    try{
        const id = Number(req.params.id);
        const {nombre, precio, stock} = req.body ?? {};
        
        if(!Number.isInteger(id)|| id <= 0){
            return res.status(400).json({
                mensaje:"Error, ID invalido"
            });
        }

        if(
            typeof nombre !=="string" || nombre.trim() === ""||
            typeof precio !=="number" || !Number.isFinite(precio) || precio <= 0 ||
            !Number.isInteger(stock) || stock<0
        ){
            return res.status(400).json({
                mensaje:"Error, datos del producto invalidos"
            });
        }
        const producto = await actualizarProducto(id, {
            nombre: nombre.trim(),
            precio,
            stock
        });

        if(!producto){
            return res.status(404).json({
                mensaje:"Error, producto no encontrado"
            });
        }

        res.status(200).json(producto)
    } catch (error){
        console.error(error)
        res.status(500).json({
            mensaje:"Error, el producto no pudo ser editado"
        });
    }
};

export const borrarProducto = async(req, res) => {
    try{
        const id = Number(req.params.id);

        if(!Number.isInteger(id)|| id <= 0){
            return res.status(400).json({
                mensaje:"Error, ID invalido"
            });
        }
        const eliminado = await eliminarProducto(id);

        if(!eliminado){
            return res.status(404).json({
                mensaje:"Error, Producto no encontrado"
            });
        }

        res.status(200).json({
            mensaje:"Producto, eliminado exitosamente"
        });
    } catch (error){
        console.error(error);
        res.status(500).json({
            mensaje:"Error, no se pudo eliminar el producto"
        });

    }
};