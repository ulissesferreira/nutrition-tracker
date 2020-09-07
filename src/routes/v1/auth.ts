module.exports = function (fastify, opts, next) {

  fastify.get('/', async (request, reply) => {
      reply.header('Content-Type', fastify.Prometheus.register.contentType)
      return fastify.Prometheus.register.metrics()
  })

  next()
}