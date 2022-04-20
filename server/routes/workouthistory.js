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
    const {exercises} = req.body
    //const { username, password } = req.body;
    fs.readFile("./data/testdata.json", 'utf8', (err, data) => {
      if(err) throw err;
      const history = JSON.parse(data)
      const currentUserIndex = history.findIndex(user => user.username === "testu")

      const addedExercise = {
        id: 2, //change to uuid
        date: "4/20/21",
        exercises: exercises
      }

      console.log(history[currentUserIndex])
      //const newHistory = history[currentUserIndex].workouts
      const newHistory = history
      console.log(newHistory)
      newHistory[currentUserIndex].workouts.push(addedExercise)
      console.log(newHistory)
      const strNewHistory = JSON.stringify(newHistory)

      fs.writeFile('./data/testdata.json', strNewHistory, (err) => {
        if(err) throw err;
        console.log('new workout saved')

        //add a res.json to push a messge that it saved 
        //then reroute to dashboard page
        res.status(200).send({ message: "Workout Saved Successfully!" })
      })

    })
}) 

module.exports = router;