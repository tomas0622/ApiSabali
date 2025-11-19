import express from 'express';
import insumoRouter from './routes/insumo.routes';
import cors from 'cors';
import clienteRouter from './routes/cliente.routes';
import proveedorRouter from './routes/proveedor.routes';
import usuarioRouter from './routes/usuario.routes';
import ventaRouter from './routes/venta.routes';

const app = express();
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cors());
// Forzar charset UTF-8 en respuestas JSON para asegurar que tildes/ñ se muestren correctamente
app.use((req, res, next) => {
    res.setHeader('Content-Type', 'application/json; charset=utf-8');
    next();
});
const PORT = Number(process.env.PORT) || 3000;

app.use('/api/insumo', insumoRouter);
app.use('/api/cliente', clienteRouter);
app.use('/api/proveedor', proveedorRouter);
app.use('/api/usuario', usuarioRouter);
app.use('/api/venta', ventaRouter)

app.listen(PORT, () => {
    console.log(`Servidor escucha el puerto ${PORT}`)
})