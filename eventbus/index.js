const express = require('express')
const axios = require('axios')
const app = express()

//middlewares
app.use(express.json())

app.post('/events', (req,res) =>{
    const event = req.body
    console.log(req.body.type);
    // what ever we get we need to send it to all the different services
    axios.post('http://localhost:4000/events', event)
    axios.post('http://localhost:4001/events', event)
    axios.post('http://localhost:4002/events', event) // probably to the query service

    res.send({ status: 'OK' })

})


app.listen(4005, () =>{
    console.log(`app working in the port 4005`);
})