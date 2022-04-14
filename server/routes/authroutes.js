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
        console.log(users)
        console.log(user)
        if (user && user.password === password) {
            console.log("user found")
            res.json("user found")
        } else {
            console.log("user not found")
            res.status(403).send({message: "user not found"})
        }

    
})

router.post('/signup', (req, res) => {
    const { username, name, password } = req.body;
    users[username] = {
      name,
      password, // NOTE: Passwords should NEVER be stored in the clear like this. Use a
      // library like bcrypt to Hash the password. For demo purposes only.
    };
    console.log(users)
    res.json({ success: 'true' });
  });

  router.get('/logout', (req,res) => {
      //add logout method
      //redirect user to app
  })


module.exports = router;