// Require the framework and instantiate it
const fastify = require("fastify")({ logger: true });
const cors = require("@fastify/cors");
const reportManager = require("./report/report.manager");
const productManager = require("./product/product.manager");
const orderManager = require("./order/order.manager");

(async () => {
  await fastify.register(cors, {
    origin: (origin, cb) => {
      cb(null, true);
    },
  });

  fastify.get("/products", (request, reply) => {
    const products = productManager.getAllProducts();

    reply.send(products);
  });

  fastify.get("/report", (request, reply) => {
    const report = request.query.custom
      ? reportManager.getCustomReport(request.query.income | 0)
      : reportManager.getMonthlyReport(
          request.query.month | 0,
          request.query.year | 0,
        );

    reply.send(report);
  });

  fastify.post("/order", (request, reply) => {
    orderManager.createOrder(request.body);

    reply.send({ success: true });
  });

  // Run the server!
  fastify.listen({ port: 3000 }, (err) => {
    if (err) {
      fastify.log.error(err);
      process.exit(1);
    }
  });
})();
