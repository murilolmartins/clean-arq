import {
  type FastifyRequest,
  type FastifyInstance,
  type FastifyReply,
} from 'fastify';
import { type ZodTypeProvider } from 'fastify-type-provider-zod';

import { fastifyControllerAdapter } from '@/main/adapters/fastify-controller.adapter';
import { type User } from '@prisma/client';

import { createUserFactory } from '../factories/create-user.factory';
import { type CreateUserType, createUserSchema } from '../schemas';

export type CreateUserResponse = Omit<User, 'password'>;

export const createUserRoute = (app: FastifyInstance): void => {
  app.withTypeProvider<ZodTypeProvider>().route({
    method: 'POST',
    url: '/',
    schema: {
      body: createUserSchema,
    },
    handler: async (
      request: FastifyRequest<{ Body: CreateUserType }>,
      reply: FastifyReply,
    ) => fastifyControllerAdapter(createUserFactory())(request, reply),
  });
};
