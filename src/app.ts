require('dotenv').config()

const fastify = require('fastify')({ logger: true })

/*
 * Prometheus metrics
 */
const { plugin: promsterPlugin } = require('@promster/fastify');
fastify.register(promsterPlugin);

/*
 *  Register fastify plugins
 */
fastify.register(require('fastify-cors'), {
  origin: '*'
})

fastify.register(require('fastify-cookie'), {
  secret: process.env.COOKIES_SECRET,
  parseOptions: {}
})

/*
 * Routes import and register
 */
const metrics = require('./routes/v1/metrics')
const auth = require('./routes/v1/auth')
const food = require('./routes/v1/food')

fastify.register(metrics, { prefix: '/metrics' })
fastify.register(auth, { prefix: '/auth' })
fastify.register(food, { prefix: '/food' })

const start = async () => {
  try {
    await fastify.listen(process.env.PORT)
    fastify.log.info(`server listening on ${fastify.server.address().port}`)
  } catch (err) {
    fastify.log.error(err)
    process.exit(1)
  }
}

start()