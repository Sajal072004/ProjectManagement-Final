import { Router } from "express";
import { getAllTeams, getUserTeams, createTeam } from "../controllers/team-controller";

const router = Router();

// Route to fetch all teams
router.get("/", getAllTeams);

// Route to fetch all teams for a specific user (based on userId/cognitoId)
router.get("/user/:userId", getUserTeams);

// Route to create a new team
router.post("/", createTeam);

export default router;
