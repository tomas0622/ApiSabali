import express from 'express'
import * as usuarioController from '../controllers/usuario.controller'
import { Usuario } from '../models/Usuario';

const router = express.Router();

router.get('/', (req, res) => {
    usuarioController.listarUsuarios().then((data) => {
        res.json(data);
    })
        .catch(() => {
            res.status(500).send();
        })
})

router.post('/add', (req, res) => {
    usuarioController.crearUsuario(req.body as Usuario)
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
        usuarioController.EliminarUsuario(id)
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
        if (Number(req.params.id) != (req.body as Usuario).id) {
            res.status(400).send({ message: "El ID de la request no coincide con el del body" });
        } else {

            usuarioController.ActualizarUsuario(req.body as Usuario, id)
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
