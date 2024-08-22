import { FastifyInstance } from "fastify";
import { DEFAULT_ROUTE_URL } from "constants/routes";
import { Services } from "services/Services";
import { defaultRoute } from "./routes/default.route";

export function registerRoutes(fastify: FastifyInstance, services: Services) {
   fastify.get(`/${DEFAULT_ROUTE_URL}`, (request, reply) => {
      defaultRoute(request, reply, services);
   });
}
