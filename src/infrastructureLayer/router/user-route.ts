import express from 'express';

const route = express.Router();


route.post('/user/signup', (req, res, next) =>{
    let variable = 'ready to go'
    res.status(201).json({ variable });
})




export default route;