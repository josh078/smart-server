const handleSignin = (req, res, db, bcryptjs) => {
  	const { email, password } = req.body;
	if(!password || !email) {
		return res.status(400).json('incorrect form submission');
	}


	db.select('email', 'hash').from('login')
		.where('email', '=', email)
		.then(data => {
			const isValid = bcryptjs.compareSync(password, data[0].hash);
			if (isValid) {
				return db.select('*').from('users')
					.where('email', '=', email)
					.then(user => {
						//console.log(user);
						res.json(user[0])
					})
					.catch(err => res.status(400).json('unable to signin'))
			} else {
			res.status(400).json('wrong credentials')
		}
		})
		.catch(err => res.status(400).json('wrong credentials'))
}

module.exports = {
	handleSignin: handleSignin
}