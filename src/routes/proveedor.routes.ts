import express from 'express'
import * as proveedorController from '../controllers/proveedor.controller'
import { Proveedor } from '../models/Proveedor';

const router = express.Router();

router.get('/', (req, res) => {
    proveedorController.listarProveedores().then((data) => {
        res.json(data);
    })
        .catch(() => {
            res.status(500).send();
        })
})

router.post('/add', (req, res) => {
    proveedorController.crearProveedor(req.body as Proveedor)
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
        proveedorController.EliminarProveedor(id)
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
        if (Number(req.params.id) != (req.body as Proveedor).id) {
            res.status(400).send({ message: "El ID de la request no coincide con el del body" });
        } else {

            proveedorController.ActualizarProveedor(req.body as Proveedor, id)
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
