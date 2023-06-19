import { Router } from "express";
import { userRoutes } from "../../utils/routes.js";
import authMiddleware from "../../middleware/auth.js";

const router = Router();

for (const [method, route, controller] of userRoutes)
    router[method](route, authMiddleware, controller);

export default router;