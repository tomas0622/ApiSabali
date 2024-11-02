import express from 'express'
import * as ventaController from '../controllers/venta.controller'
import { Venta } from '../models/Venta';
import { VMVentaDetalle } from '../models/VMVentaDetalle';

const router = express.Router();

router.get('/', (req, res) => {
    ventaController.listarVentas().then((data) => {
        res.json(data);
    })
        .catch(() => {
            res.status(500).send();
        })
})

router.get('/detalle', (req, res) => {
    ventaController.listarVentasDetalle().then((data) => {
        res.json(data);
    })
        .catch(() => {
            res.status(500).send();
        })
})

router.post('/add', (req, res) => {
    ventaController.crearVenta(req.body as VMVentaDetalle)
        .then((f) => {
            if (f)
                res.status(201).send();
            else
                res.status(500).send();
        })
        .catch((e) => {
            console.log(e);
            res.status(500).send();
        })
});

router.delete('/:id', (req, res) => {
    const id = Number(req.params.id)
    if (!isNaN(id)) {
        ventaController.EliminarVenta(id)
            .then((f) => {
                if (f)
                    res.status(202).send();
                else
                    res.status(500).send();
            })
            .catch((e) => {
                console.log(e);
                res.status(500).send();
            })
    } else {
        res.status(400).send({ message: 'ID inválido, solo se permiten numeros' });
    }
});

// router.put('/:id', (req, res) => {
//     const id = Number(req.params.id)
//     if (!isNaN(id)) {
//         if (Number(req.params.id) != (req.body as VMVentaDetalle).id) {
//             res.status(400).send({ message: "El ID de la request no coincide con el del body" });
//         } else {

//             ventaController.ActualizarVenta(req.body as VMVentaDetalle, id)
//                 .then((f) => {
//                     if (f)
//                         res.status(202).send();
//                     else
//                         res.status(500).send();
//                 })
//                 .catch((e) => {
//                     console.log(e);
//                     res.status(500).send();
//                 })
//         }
//     } else {
//         res.status(400).send({ message: 'ID inválido, solo se permiten numeros' });

//     }
// });

export default router;
