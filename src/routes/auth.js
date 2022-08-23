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
                msg: 'User not found'
            });
        }
        const validPassword = bycrypt.compareSync(password, user.password);
        if(!validPassword){
            return res.status(400).send({
                ok: false,
                msg: 'Password incorrect'
            });
        }
        if(!user.isActive){
            return res.status(400).send({
                ok: false,
                msg: 'User not active'
            });
        }
        const token = jwt.sign({
            id: user.id,
            name: user.name,
            isActive: user.isActive
        }, JWT_SECRET, {
            expiresIn: "1h" // 1 dia
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
            msg: "There was an error logging in"
        });
    }
})



module.exports = router;