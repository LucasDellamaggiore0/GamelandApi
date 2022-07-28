const express = require('express');
const router = express.Router();
const {gameDetail} = require('./functions');

router.get('/:id', async (req, res) => {
    const {id} = req.params;
    try {
        const game = await gameDetail(id);
        res.json(game);
    } catch (error) {
        res.status(400).send({error: error.message});
    }
})

module.exports = router;