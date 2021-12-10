const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connection = require('./config')

dotenv.config();

const App = express();

App.use(cors());
App.use(express.json());


App.get('/', (req, res) => {
    res.send('Welcome to API MAIN')
});


const PORT = process.env.PORT || 8000;

connection.once('open', () => {
    console.log('databse connected');
});

App.listen(PORT, () => {
    console.log(`server running on ${PORT}`)
});