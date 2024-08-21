import fastify, { FastifyInstance } from "fastify";
import { appRouter } from "../web/appRouter";
import { Server } from "http";
import { config } from "../config";

export class App {
   private server: FastifyInstance<Server>;

   constructor() {
      this.server = fastify({
         logger: config.debug,
      });
      this.server.register(appRouter);
   }

   public start(): void {
      const port = config.port;
      this.server.listen({ port: config.port, host: "0.0.0.0" });
      console.log(`🚀 Fastify server is running on http://localhost:${port}`);
   }
}
