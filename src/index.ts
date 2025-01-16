
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

import UserRoute from './infrastructureLayer/router/user-route'
import AdminRoute from './infrastructureLayer/router/admin-route'
import AgentRoute from './infrastructureLayer/router/agent-route'

app.use(express.json())

app.use(
    cors({
        origin: process.env.PORT, // Specify the frontend URL
        credentials: true, // Allow credentials (cookies, tokens)
    })
)


app.use("/api/user", UserRoute);

app.use("/api/admin", AdminRoute);

app.use("/api/agent", AgentRoute);


app.listen(8000,()=>{
    console.log("Server is running....")
})

module.exports = app ;