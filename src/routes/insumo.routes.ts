import express from 'express'
import * as insumoController from '../controllers/insumo.controller'
import { Insumo } from '../models/Insumo';
import { VMInsumoDetalleIP } from '../models/VMInsumoDetalleIP';

const router = express.Router();

router.get('/', (req, res) => {
    insumoController.listarInsumos().then((data) => {
        res.json(data);
    })
        .catch(() => {
            res.status(500).send();
        })
})

router.get('/detalle', (req, res) => {
    insumoController.listarInsumosDetallados().then((data) => {
        res.json(data);
    })
        .catch((e) => {
            console.log(e);
            res.status(500).send();
        })
})

router.post('/add', (req, res) => {
    insumoController.crearInsumo(req.body as VMInsumoDetalleIP)
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
        insumoController.EliminarInsumo(id)
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

router.put('/:id', (req, res) => {
    const id = Number(req.params.id)
    if (!isNaN(id)) {
        if (Number(req.params.id) != (req.body as VMInsumoDetalleIP).id) {
            res.status(400).send({ message: "El ID de la request no coincide con el del body" });
        } else {

            insumoController.ActualizarInsumo(req.body as VMInsumoDetalleIP, id)
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
        }
    } else {
        res.status(400).send({ message: 'ID inválido, solo se permiten numeros' });

    }
});

export default router;
