const express = require('express')
const cors = require('cors')

const app = express()

//middleware
app.use(express.json())
app.use(cors())

//objects to store all the posts and comments

const posts = {

}

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

//routes
app.get('/posts', (req, res) =>{
	res.send(posts)

})

app.post('/events', (req, res) =>{
	const { type, data } = req.body;

	if(type === 'PostCreated'){
		const { id, title }  = data

		posts[id] = { id, title, comments:[]}
	}

	if(type === 'CommentCreated'){
		const {id, content, postId } = data		

		const post = posts[postId]
		post.comments.push({ id, content })
	}

	console.log(posts);

	res.send({})

})


app.listen(4002,console.log(`query service app working on port 4003`))