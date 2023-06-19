import { Router } from 'express';
import { authRoutes } from '../../utils/routes.js';

const router = Router();

for (const [method, route, controller] of authRoutes)
    router[method](route, controller);

export default router;
