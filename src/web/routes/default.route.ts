import { DEFAULT_ROUTE_URL } from "constants/routes";
import { FastifyInstance } from "fastify";
import { QueryParam } from "../../common/tools";

export async function defaultRoute(fastify: FastifyInstance) {
   fastify.get<{ Params: QueryParam }>(
      `/${DEFAULT_ROUTE_URL}`,
      async function (request) {
         // const network = checkIfNetwork(request.params.network);
         // const contractsParams: Contracts = getContracts(network);
         // return {
         //    paymentsUSDBContract: contractsParams.paymentsUSDBContract,
         //    paymentsBLASTContract: contractsParams.paymentsBLASTContract,
         //    paymentsPBOTContract: contractsParams.paymentsPBOTContract,
         //    multicollectionContract: contractsParams.multicollectionContract,
         // };


         return "Hello world";

      },
   );
}
