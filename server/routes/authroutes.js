const express = require("express");
const fs = require("fs");
const router = express.Router();
const jwt = require('jsonwebtoken');
require('dotenv').config();

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
  const user = users[username];
  console.log(users);
  console.log(user);
  if (user && user.password === password) {
    console.log("user found");
    //res.json("user found");

    const token = jwt.sign({
        name:user.name,
        username: username,
    }, process.env.JWT_SECRET);
    res.json({ token })
  } else {
    console.log("user not found");
    res.status(403).send({ message: "invalid" });
  }
});

router.post("/signup", (req, res) => {
  const { username, name, password } = req.body;
  users[username] = {
    name,
    password, // NOTE: Passwords should NEVER be stored in the clear like this. Use a
    // library like bcrypt to Hash the password. For demo purposes only.
  };
  console.log(users);
  res.json({ success: "true" });

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

router.get("/logout", (req, res) => {
  //add logout method
  //redirect user to app
});

module.exports = router;
