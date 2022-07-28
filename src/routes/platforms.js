const express = require('express');
const router = express.Router();
const {postPlatform, getPlatforms} = require('./functions');

router.get('/', async (req, res) => {
    try {
        const platforms = await getPlatforms();
        res.json(platforms);
    } catch (error) {
        res.status(400).send({error: error.message});
    }
})



router.post('/', async (req, res) => {
    const {name} = req.body;
    try {
        const newPlatform = await postPlatform(name);
        res.json(newPlatform);
    } catch (error) {
        res.status(400).send({error: error.message});
    }
})


module.exports = router;