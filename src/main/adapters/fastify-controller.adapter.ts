import { type FastifyReply, type FastifyRequest } from 'fastify';

import { type Controller } from '@/shared/contracts/controller';

export const fastifyControllerAdapter = (controller: Controller) => {
  return async (request: FastifyRequest, reply: FastifyReply) => {
    const httpRequest = {
      body: request.body,
      params: request.params,
      query: request.query,
      headers: request.headers,
    };

    const httpResponse = await controller.handle(httpRequest);

    return reply.code(httpResponse.statusCode).send(httpResponse.body);
  };
};
