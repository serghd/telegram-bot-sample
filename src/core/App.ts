import fastify, { FastifyInstance } from "fastify";
import { startBot } from "../web/BotProcessing";
import { registerRoutes } from "../web/AppRouter";
import { Server } from "http";
import { config } from "../config";
import { Services } from "services/Services";

export class App {
   private server: FastifyInstance<Server>;

   constructor(services: Services) {
      this.server = fastify({
         logger: config.debug,
      });

      registerRoutes(this.server, services);
      startBot(services);
   }

   public start(): void {
      const port = config.port;
      this.server.listen({ port: config.port, host: "0.0.0.0" });
      console.log(`🚀 Fastify server is running on http://localhost:${port}`);
   }
}
