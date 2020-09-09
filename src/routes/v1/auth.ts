module.exports = function (fastify, opts, next) {

  fastify.get('/', async (req, res) => {
      res.header('Content-Type', fastify.Prometheus.register.contentType)
      return fastify.Prometheus.register.metrics()
  })

  next()
}