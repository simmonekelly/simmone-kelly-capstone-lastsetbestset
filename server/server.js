const express = require('express');
const app = express();
const workoutHistoryRoutes = require('./routes/workouthistory');
const cors = require('cors');
const authRoutes = require("./routes/authroutes");
const knex = require('knex')(require('./knexfile.js').development);

require('dotenv').config();
const { PORT, REACT_APP_BACKEND_URL } = process.env;

app.use(cors());
app.use(express.json());
app.use(express.static('public'));

//route for workout history
app.use('/history', workoutHistoryRoutes);

//auth routes
app.use('/auth',authRoutes);



app.listen(PORT, () => {
    console.log('🚀 We have takeoff on port 8080')
})