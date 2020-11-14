const express = require('express')
const cors = require('cors')
const axios = require('axios')

const app = express()

//middleware
app.use(express.json())
app.use(cors())

//objects to store all the posts and comments

const posts = {}

const handleEvents = (type, data) =>{
	if(type === 'PostCreated'){
		const { id, title }  = data

		posts[id] = { id, title, comments:[]}
	}

	if(type === 'CommentCreated'){
		const {id, content, postId, status } = data		

		const post = posts[postId]
		post.comments.push({ id, content, status })
	}

	if(type === 'CommentUpdated'){
		const {id, content, postId, status } = data	

		const post = posts[postId]
		const comment = post.comments.find(comment =>{
			return comment.id === id
		})

		comment.status = status
		comment.content = content	
	}
}



//routes
app.get('/posts', (req, res) =>{
	res.send(posts)

})

app.post('/events', (req, res) =>{
	const { type, data } = req.body;
	
	handleEvents(type, data)

	res.send({})
})


app.listen(4002, async () =>{
	console.log(`query service app working on port 4002`)
	const res = await axios.get('http://localhost:4005/events')

	for(let event of res.data){
		console.log('Processing events: ', event.type);
		handleEvents(event.type, event.data)		
	}
})





// example
// posts === {
// 	'sfla89':{
// 		id: 'sfla89',
// 		title: 'post one',
// 		comments: [
// 			{id: '90gsdf', content: 'comment!'}
// 		]
// 	}    
// }