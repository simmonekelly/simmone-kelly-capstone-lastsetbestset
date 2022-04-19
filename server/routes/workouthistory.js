const express = require('express');
const fs = require('fs');
const router = express.Router();
const jwt = require('jsonwebtoken');
require('dotenv').config();


function authorize(req, res, next) {
  
    const authHeader = req.headers.authorization;
    if(!authHeader) {
      res.status(401).json({ message: "we have an error"})
    } else {
      const tokenArr = authHeader.split(' '); //splits "bearer + token" apart to remove the bearer text
      const token = tokenArr[1];
      
      jwt.verify(token, process.env.JWT_SECRET, (err, decodedPayload) => {
        if (err) {
          res.status(401).json({ message: "we have an error"})
        } else {
          req.decoded= decodedPayload;
        }
      });
      next();
    }
  }


//reads all history data
router.get('/', authorize, (req,res) => {
    //console.log(req.decoded)
    fs.readFile('./data/testdata.json', 'utf8', (err, data) => {
        if(err) throw err;
        const history = JSON.parse(data);
        res.json({
            history: history,
            decoded: req.decoded
        })
    })
})

//add authorize?
router.post('/', (req, res) => {
    console.log(req.body)
    //const { username, password } = req.body;
}) 

module.exports = router;