import { Router } from "express";
import authMiddleware from "../../middleware/auth.js";
import { todoRoutes } from "../../utils/routes.js";

const router = Router();

for (const [method, route, controller] of todoRoutes)
    router[method](route, authMiddleware, controller);

export default router;