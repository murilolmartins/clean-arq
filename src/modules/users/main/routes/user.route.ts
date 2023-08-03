import type { FastifyInstance } from 'fastify';

import { createUserRoute } from './create-user.route';

const userRoutes = async (app: FastifyInstance): Promise<void> => {
  createUserRoute(app);
};

export default userRoutes;
