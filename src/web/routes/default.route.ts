import { FastifyReply, FastifyRequest } from "fastify";
import { Services } from "services/Services";

export async function defaultRoute(request: FastifyRequest, reply: FastifyReply, services: Services) {
  reply.send({
    message: 'Using external object',
    object: Boolean(services.telegramBot.isPolling)
  });
}
