const express = require('express');
const app = express();
const workoutHistoryRoutes = require('./routes/workouthistory');
const cors = require('cors');
const authRoutes = require("./routes/authroutes");
const knex = require('knex')(require('./knexfile.js').development);
const fs = require("fs");
const axios = require("axios");

require('dotenv').config();
const { PORT, REACT_APP_BACKEND_URL } = process.env;

app.use(cors());
app.use(express.json());
app.use(express.static('public'));

//route for workout history
app.use('/history', workoutHistoryRoutes);

//auth routes
app.use('/auth',authRoutes);

//gets database list
// getWorkoutData = () => {
//     const options = {
//         method: "GET",
//         url: "https://exercisedb.p.rapidapi.com/exercises",
//         headers: {
//           "X-RapidAPI-Host": "exercisedb.p.rapidapi.com",
//           "X-RapidAPI-Key": "d9e03fdda1mshb3be7c734128a94p1339e8jsn02c1ef35f74d",
//         },
//       };

//       axios
//       .request(options)
//       .then((res) => {
//         //console.log(res.data);
//         const workoutData = JSON.stringify(res.data)
//         console.log(workoutData)
//         return workoutData;
        
//       })
//       .catch((error) => {
//         console.error(error);
//       });
// }



app.listen(PORT, () => {
    // fs.writeFile("./data/workoutdb.json", getWorkoutData(), (err) => {
    //     if (err) throw err;
    //     else console.log("Workout Libarary data set");
    //   });
    console.log('🚀 We have takeoff on port 8080')
})