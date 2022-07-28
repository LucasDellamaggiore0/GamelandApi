const express = require('express');
const router = express.Router();
const {postGenre, getGenres} = require('./functions');

router.get('/', async (req, res) => {
    try {
        const genres = await getGenres();
        res.json(genres);
    } catch (error) {
        res.status(400).send({error: error.message});
    }
})





router.post('/', async (req, res) => {
    const {name} = req.body;
    try {
        const newGenre = await postGenre(name);
        res.json(newGenre);
    } catch (error) {
        res.status(400).send({error: error.message});
    }
})


module.exports = router;