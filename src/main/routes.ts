import type { FastifyInstance } from 'fastify';

import userRoutes from '@/modules/users/main/routes/user.route';

const AppRoutes = async (app: FastifyInstance): Promise<void> => {
  await app.register(userRoutes, { prefix: '/user' });
};

export { AppRoutes };
