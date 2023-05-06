const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

mongoose.connect('mongodb://localhost:27017/blog', {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => console.log('Connected to MongoDB!'))
  .catch((error) => console.error('Error connecting to MongoDB:', error));

const app = express();
app.use(cors());

app.get('/', (req, res) => {
  res.send('Hello, world!');
});

app.get('/blogs', async (req, res) => {
  const blogPosts = await mongoose.connection.db.collection('blogs').find().toArray();
  res.send(blogPosts);
});



app.get('/tags', async (req, res) => {
  const blogPosts = await mongoose.connection.db.collection('tags').find().toArray();
  res.send(blogPosts);
});

app.get('/comments/:blogPostId', async (req, res) => {
  const comments = await mongoose.connection.db.collection('comments')
    .find({/*DB:Blogs*/ bblogiID: /*DB:comments*/req.params.blogiID }).toArray();
  res.send(comments);
});



app.listen(3001, () => {
  console.log('Server listening on port 3001');
});