const router = require('express').Router();
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const { jwtSecret } = require('./config')
const Auth = require('./auth-model')

router.post('/register', (req, res) => {
  // implement registration
  let user = req.body
  let hash = bcrypt.hashSync(user.password, 8)
  user.password = hash
  console.log(user)
  Auth.add(user)
    .then(newUser => {
      res.status(201).json(newUser)
    })
    .catch(err => {
      console.log(err)
      res.status(500).json({ message: '500: server unreachable' })
    })
});

router.post('/login', (req, res) => {
  // implement login
  let { username, password } = req.body
  Auth.findBy({ username })
    .first()
    .then(user => {
      console.log('1')
      if (user && bcrypt.compareSync(password, user.password)) {
        console.log('2')
        console.log(user)
        const token = signToken(user);

        res.status(200).json({ token });
      } else {
        res.status(401).json({ message: 'Username or Password invalid' })
      }
    })
    .catch(err => {
      console.log(err)
      res.status(500).json(err)
    })

});

function signToken(user) {
  console.log('3')
  const payload = {
    username: user.username,
  };

  const options = {
    expiresIn: '1d'
  };

  return jwt.sign(payload, jwtSecret, options);
}

module.exports = router;
