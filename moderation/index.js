const express = require('express')
const axios = require('axios')

const app = express()

//middleware
app.use(express.json())

app.post('/events', async (req, res) =>{
  const {type, data} = req.body

  if(type === 'CommentCreated'){
    const status = data.content.includes('orange')? 'rejected' : 'accepted'

    await axios.post('http://localhost:4005/events', {
      type: 'CommentModerated',
      data: {
        id: data.id,
        postId: data.postId,
        status,
        content: data.content
      }
    })
  }

  res.send({})
})

app.listen(4003, console.log('moderation service working on port number 4003'))