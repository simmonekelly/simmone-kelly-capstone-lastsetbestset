const express = require('express');
const app = express();
const workoutHistoryRoutes = require('./routes/workouthistory');
const cors = require('cors');

require('dotenv').config();
const { PORT, REACT_APP_BACKEND_URL } = process.env;

app.use(cors());
app.use(express.json());
app.use(express.static('public'));

//route for workout history
app.use('/history', workoutHistoryRoutes);

app.listen(PORT, () => {
    console.log('🚀 We have takeoff on port 8080')
})