const bycrypt = require('bcryptjs');
const express = require('express');
const router = express.Router();
const {check} = require('express-validator');
const {validateFields} = require('../middlewares/validateFields');
const {loginUser} = require('./functions');
const jwt = require('jsonwebtoken');
const {JWT_SECRET} = process.env;

router.post('/signin', [
    check('email', 'El email del usuario es obligatorio').not().isEmpty(),
    check('password', 'La contraseña del usuario es obligatoria').not().isEmpty(),
], validateFields, async (req, res) => {
    const {email, password} = req.body;
    try {
        const user = await loginUser(email);
        if(!user){
            return res.status(400).send({
                ok: false,
                msg: 'Usuario no encontrado'
            });
        }

        //! Verificar contraseñas
        const validPassword = bycrypt.compareSync(password, user.password);

        if(!validPassword){
            return res.status(400).send({
                ok: false,
                msg: 'Contraseña incorrecta'
            });
        }
        
        //! Generar JWT
        const token = jwt.sign({
            id: user.id,
            name: user.name,
        }, JWT_SECRET, {
            expiresIn: 86400 // 1 dia
        })
        res.json({
            ok: true,
            token: token,
            user: {
                id: user.id,
                name: user.name,
            }
        });

    } catch (error) {
        res.status(400).send({
            ok:false,
            msg: "Hubo un error al iniciar sesión"
        });
    }
})



module.exports = router;