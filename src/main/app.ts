import fastify, { type FastifyRequest, type FastifyInstance } from 'fastify';
import {
  jsonSchemaTransform,
  serializerCompiler,
  validatorCompiler,
} from 'fastify-type-provider-zod';
import { z } from 'zod';

import { AppError } from '@/shared/errors/app.error';
import fastifySwagger from '@fastify/swagger';
import fastifySwaggerUi from '@fastify/swagger-ui';
import { type PrismaClient } from '@prisma/client';

import { envVars } from './config/env';
import { AppRoutes } from './routes';
import { zodSchemaValidationErrorParse } from './zod/helpers';

const buildApp = async (prisma: PrismaClient): Promise<FastifyInstance> => {
  const app = fastify({
    logger:
      envVars.NODE_ENV === 'development'
        ? {
            transport: {
              target: 'pino-pretty',
            },
          }
        : false,
  });

  app.setValidatorCompiler(validatorCompiler);
  app.setSerializerCompiler(serializerCompiler);

  await app.register(fastifySwagger, {
    openapi: {
      info: {
        title: 'SampleApi',
        description: 'Sample backend service',
        version: '1.0.0',
      },
      servers: [],
    },
    transform: jsonSchemaTransform,
  });

  await app.register(fastifySwaggerUi, {
    routePrefix: '/documentation',
  });

  app.addHook('onRequest', async (req: FastifyRequest) => {
    req.prisma = prisma;
  });

  app.setErrorHandler(function (error, _, reply) {
    app.log.error(error);
    if (error instanceof z.ZodError) {
      reply.statusCode = 400;

      return zodSchemaValidationErrorParse(error);
    }

    return new AppError(500, [
      { code: 'INTERNAL_SERVER_ERROR', message: 'Internal server error' },
    ]);
  });

  app.get('/healthcheck', async () => {
    return { status: 'ok' };
  });

  await AppRoutes(app);

  return app;
};

export { buildApp };
