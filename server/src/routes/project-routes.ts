import {Router} from "express";

import { createProject, getProjects } from "../controllers/project-controller";

const router = Router();

router.get("/", getProjects);
router.post("/", createProject);

export default router;