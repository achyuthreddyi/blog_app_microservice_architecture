const express = require('express')
const axios = require('axios')
const app = express()

//middlewares
app.use(express.json())

const events = []

app.post('/events', (req,res) =>{
  const event = req.body
  events.push(event)

  console.log(req.body.type);
  // what ever we get we need to send it to all the different services
  axios.post('http://localhost:4000/events', event) // to the post service
  axios.post('http://localhost:4001/events', event) // to the comments service
  axios.post('http://localhost:4002/events', event) // to the query service
  axios.post('http://localhost:4003/events', event) // to the moderation service

  res.send({ status: 'OK' })
})

app.get('/events', (req,res) =>{
	res.send(events)
})

app.listen(4005, () =>{
  console.log(`app working in the port 4005`);
})