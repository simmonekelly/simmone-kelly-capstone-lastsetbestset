const express = require("express");
const fs = require("fs");
const router = express.Router();
const jwt = require("jsonwebtoken");
require("dotenv").config();
const { v4: uuidv4 } = require("uuid");

const users = {
  testu: {
    name: "test1",
    password: "test",
  },
};

//gets sign in info
router.post("/login", (req, res) => {
  console.log(req.body);
  const { username, password } = req.body;
  //const user = users[username];
  //console.log(users);
  //console.log(user);

  fs.readFile("./data/testdata.json", "utf8", (err, data) => {
    if (err) throw err;
    const users = JSON.parse(data);
    if(users.find(user => user.username === username && user.password === password)) {
      console.log("user found");
      const currentUser = users.filter(user => user.username === username)
      console.log(currentUser)
      const token = jwt.sign(
        {
          name: currentUser.name,
          username: username,
        },
        process.env.JWT_SECRET
      );
      res.json({ token });
    } else {
    console.log("user not found");
    res.status(403).send({ message: "invalid" });
  }
});
})

router.post("/signup", (req, res) => {
  const { username, name, password } = req.body;


  fs.readFile("./data/testdata.json", "utf8", (err, data) => {
    if (err) throw err;

    const users = JSON.parse(data);

    if(users.find(user => user.username === username)){
      res.status(200).json({ success: false });
    } else {
      const addedNew = users

      const newUser = {
        username: username,
        id: uuidv4(),
        name: name,
        password: password,
        workouts: []
      };
  
      addedNew.push(newUser)
  
      const strAddedUser = JSON.stringify(addedNew);
  
      fs.writeFile("./data/testdata.json", strAddedUser, (err) => {
        if (err) throw err;
        console.log("new user added");
  
        // const token = jwt.sign({
        //   name:name,
        //   username: username,
        // }, process.env.JWT_SECRET);
        // res.json({ token })
  
        res.status(200).json({ success: true });
      });
    }
  });

  //   knex('users')
  //         .select('username')
  //         .where({ username: username })
  //         .then(user => {
  //           if (user.length) {
  //             // If user is found, pass the user object to serialize function
  //             done(null, user[0]);
  //           } else {
  //             // If user isn't found, we create a record
  //             knex('users')
  //               .insert({
  //                 github_id: profile.id,
  //                 avatar_url: profile._json.avatar_url,
  //                 username: profile.username
  //               })
  //               .then(userId => {
  //                 // Pass the user object to serialize function
  //                 done(null, { id: userId[0] });
  //               })
  //               .catch(err => {
  //                 console.log('Error creating a user', err);
  //               });
  //           }
  //         })
  //         .catch(err => {
  //           console.log('Error fetching a user', err);
  //         });
});

router.post("/logout", (req, res) => {
  res.status(200).json({ success: "true" });
});

module.exports = router;
