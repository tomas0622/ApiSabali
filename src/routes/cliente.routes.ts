import express from 'express'
import * as clienteController from '../controllers/cliente.controller'
import { Cliente } from '../models/Cliente';

const router = express.Router();

router.get('/', (req, res) => {
    clienteController.listarClientes().then((data) => {
        res.json(data);
    })
        .catch(() => {
            res.status(500).send();
        })
})

router.get('/movimiento', (req, res) => {
    clienteController.GetMovimientos().then((data) => {
        res.json(data);
    })
        .catch(() => {
            res.status(500).send();
        })
})

router.post('/add', (req, res) => {
    clienteController.crearCliente(req.body as Cliente)
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
        clienteController.EliminarCliente(id)
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
        if (Number(req.params.id) != (req.body as Cliente).id) {
            res.status(400).send({ message: "El ID de la request no coincide con el del body" });
        } else {

            clienteController.ActualizarCliente(req.body as Cliente, id)
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
