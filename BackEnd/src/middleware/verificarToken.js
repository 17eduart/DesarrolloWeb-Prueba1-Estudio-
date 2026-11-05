export const verificarToken = (req, res, next) =>{
    const token = req.headers["x-token"];
    if(token !== "ventas2026"){
        return res.status(401).json({
            mensaje:"Acceso Denegado. Token Invalido"
        });
    }
    next();
}