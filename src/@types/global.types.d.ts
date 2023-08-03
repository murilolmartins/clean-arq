import { type PrismaClient } from '@prisma/client';

declare module 'fastify' {
  interface FastifyRequest {
    prisma: PrismaClient;
    jwt: JWT;
  }
}

declare module '@fastify/jwt' {
  interface FastifyJWT {
    id: string;
  }
}
