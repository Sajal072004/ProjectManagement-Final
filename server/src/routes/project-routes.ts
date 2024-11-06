import {Router} from "express";

import { createProject, getAllProjects, getProjects } from "../controllers/project-controller";

const router = Router();

router.get("/", getProjects);
router.post("/", createProject);
router.get("/projects", getAllProjects);

export default router;