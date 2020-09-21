const User = require('../../models/users')

module.exports = function (fastify, opts, next) {
  fastify.post('/register', async (req, res) => {
    const {
      name,
      email,
      password
    } = req.body

    const newUser = new User({
      name,
      email,
      password
    })

    await newUser.save();

    res.send({
      name,
      email,
      password
    })
  })

  next()
}
