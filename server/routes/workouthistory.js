const express = require('express');
const fs = require('fs');
const router = express.Router();

//reads all history data
router.get('/', (_,res) => {
    fs.readFile('./data/testdata.json', 'utf8', (err, data) => {
        if(err) throw err;
        const history = JSON.parse(data);
        res.json(history)
    })
})

module.exports = router;