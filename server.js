const express = require('express');
const cors = require('cors');
const knex = require('knex');
const bcryptjs = require('bcryptjs');
const register = require('./contollers/register');
const signin = require('./contollers/signin');
const profile = require('./contollers/profile');
const image = require('./contollers/image');

const db = knex({
  client: 'pg',
  connection: {
    host : '127.0.0.1',
    user : 'postgres',
    password : '7878',
    database : 'smart_brain'
  }
});

const app = express();

app.use(express.json());
app.use(cors())


app.get('/', (req, res) => {
	res.send(db.users);
})

app.post('/signin', (req, res) => { signin.handleSignin(req, res, db, bcryptjs)})

app.post('/register', (req, res) => { register.handleRegister(req, res, db, bcryptjs)})

app.get('/profile/:id', (req, res) => { profile.handleProfile(req, res, db)})

app.put('/image', (req, res) => { image.handleImage(req, res, db)})
app.post('/imageurl', (req, res) => { image.handleApiCall(req, res)})

app.listen(3000, ()=> {
	console.log('app is running');
})