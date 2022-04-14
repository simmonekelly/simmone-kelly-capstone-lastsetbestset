const express = require('express');
const fs = require('fs');
const router = express.Router();

const users = {
    testu: {
      name: 'test1',
      password: 'test'
    }
  };

//gets sign in info
router.post('/login', (req, res) => {
    console.log(req.body)
    const { username, password} = req.body;
    const user = users[username];

    // if(err) throw err;
        console.log(users)
        console.log(user)
        if (user) {
            console.log("user found")
            res.json("user found")
        } else {
            console.log("user not found")
            res.status(403).send({message: "user not found"})
        }

    // fs.readFile('./data/testdata.json', 'utf8', (err, data) => {
    //     if(err) throw err;
    //     const users = JSON.parse(data);
    //     console.log(users)
    //     console.log(users.username)
    //     if (users.username === username) {
    //         console.log("user found")
    //         res.json("user found")
    //     } else {
    //         console.log("user not found")
    //         res.status(403).send({message: "user not found"})
    //     }
    // })
    //res.json("recieved request")
})

// //reads all history data
// router.get('/', (_,res) => {
//     fs.readFile('./data/testdata.json', 'utf8', (err, data) => {
//         if(err) throw err;
//         const history = JSON.parse(data);
//         res.json(history)
//     })
// })


module.exports = router;