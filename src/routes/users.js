const bycrypt = require('bcryptjs');
const express = require('express');
const router = express.Router();
const {check} = require('express-validator');
const {validateFields} = require('../middlewares/validateFields');
const {postUser} = require('./functions');
const {Users} = require('../db');

router.post('/', [
    check('name', 'El nombre del usuario es obligatorio').not().isEmpty(),
    check('email', 'El email del usuario es obligatorio').not().isEmpty(),
    check('email').custom(value=>{
        return Users.findOne({
            where: {
                email: value
            }
        }).then(user=>{
            if(user){
                return Promise.reject('El email ya existe');
            }
        })
    }),
    check('password', 'La contraseña del usuario es obligatoria').not().isEmpty(),
    check('password', 'La contraseña debe tener al menos 6 caracteres')
        .not()
        .isIn(['123456', 'password', '12345678', 'abcdefgh', 'abcdefghijklmnopqrstuvwxyz', '987654321'])
        .withMessage('La contraseña es insegura')
        .isLength({min: 6})
    
], validateFields, async (req, res) => {
    const {name, email, password} = req.body;
    try {
        const salt = bycrypt.genSaltSync(10);
        const passwordBcrypt = bycrypt.hashSync(password, salt);
        const newUser = await postUser(name, email, passwordBcrypt);
        res.json({
            ok: true,
            msg: 'Usuario creado correctamente',
            newUser
        });
    } catch (error) {
        res.status(400).send({error: error.message});
    }
})


module.exports = router;