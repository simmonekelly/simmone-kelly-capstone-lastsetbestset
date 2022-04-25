const express = require('express');
const fs = require('fs');
const router = express.Router();
const jwt = require('jsonwebtoken');
require('dotenv').config();
const { v4: uuidv4 } = require('uuid')

//authorises users
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

  formatDate = (date) => {
    // Return date formatted as 'month/day/year'
    return (new Date(date)).toLocaleDateString('en-US'); 
  }


//reads all history data
router.get('/', authorize, (req,res) => {
  console.log(req.decoded)
  
    fs.readFile('./data/testdata.json', 'utf8', (err, data) => {
        if(err) throw err;
        const allData = JSON.parse(data);
        const currentUser = allData.filter(user => user.username === req.decoded.username)
        res.json({
            history: currentUser,
            decoded: req.decoded
        })
    })
})

//add authorize?
router.post('/', authorize, (req, res) => {
    const {exercises} = req.body
    console.log(req.decoded)

    fs.readFile("./data/testdata.json", 'utf8', (err, data) => {
      if(err) throw err;
      const history = JSON.parse(data)
      const currentUserIndex = history.findIndex(user => user.username === req.decoded.username)
      console.log(currentUserIndex)
      const addedExercise = {
        id: uuidv4(),
        date: formatDate(Date.now()),
        exercises: exercises
      }

      const newHistory = history;
      newHistory[currentUserIndex].workouts.push(addedExercise);
      const strNewHistory = JSON.stringify(newHistory)

      fs.writeFile('./data/testdata.json', strNewHistory, (err) => {
        if(err) throw err;
        console.log('new workout saved')

        res.status(200).send({ message: "Workout Saved Successfully!" })
      })

    })
}) 

module.exports = router;