
// const config = require('./config.json')


// mongoose.connect(config.connectionString)

// const User = require('./model/user_model')
// const Note = require('./model/note_model')
 
import express, { Request, Response } from 'express';
const cors = require('cors');
const app = express()
const mongoose = require('mongoose')
require('dotenv').config();

// const jwt = require('jsonwebtoken');
// const { authenticateToken } = require('./utilities')

app.use(express.json())

app.use(
    cors({
        origin:"*",
    })
)

app.get('/',(req:Request,res:Response)=>{
    res.json({ data : "hello " })
})



app.listen(8000,()=>{
    console.log("Server is running....")
})

module.exports = app ;