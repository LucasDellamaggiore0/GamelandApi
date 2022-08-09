const express = require('express');
const router = express.Router();
const {check} = require('express-validator');
const {getGames, postGame, getGamesByName, searchByGenre, searchByPlatform} = require('./functions');
const {validateFields} = require('../middlewares/validateFields');

router.get('/', async (req, res) => {
    const {name, genres, platform} = req.query;
    try {
        if(!name && !genres && !platform) {
            const games = await getGames();
            res.json(games);
        }else if(name && !genres && !platform) {
            const games = await getGamesByName(name);
            res.json(games);
        }else if(!name && genres && !platform) {
            const games = await searchByGenre(genres);
            res.json(games);
        }else if(!name && !genres && platform) {
            const games = await searchByPlatform(platform);
            res.json(games);
        }
    } catch (error) {
        res.status(400).send({error: error.message});
    }
})


router.post('/', [
    check('name', 'El nombre del juego es obligatorio').not().isEmpty(),
    check('description', 'La descripcion del juego es obligatoria').not().isEmpty(),
    check('genres', 'El juego debe tener al menos un género').not().isEmpty(),
    check('platforms', 'El juego debe tener al menos una plataforma').not().isEmpty(),
    check('released_date', 'La fecha de lanzamiento es obligatoria').not().isEmpty(),

],validateFields, async (req, res) => {
    const {name, description, genres, platforms, img, released_date} = req.body;
    //! IMPORTANTE : IMG ES UN ARRAY DE OBJETOS, CHEQUEAR QUE DESDE EL FRONT SE ENVIE UN ARRAY DE OBJETOS
    try {
        const newGame = await postGame(name, description, genres, platforms, img, released_date);
        res.json({
            ok: true,
            game: newGame
        });
    } catch (error) {
        res.status(400).send({
            ok: false,
            msg: 'Ya existe un juego con ese nombre'
        });
    }
})

module.exports = router;