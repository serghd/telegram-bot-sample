import { FastifyInstance } from "fastify";
import { defaultRoute } from "./routes/default.route";

export async function appRouter(fastify: FastifyInstance) {
   fastify.register(defaultRoute);
}
