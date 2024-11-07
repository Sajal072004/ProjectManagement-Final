import { Router } from "express";

import { getUser, getUsers, postUser, getCognitoIdByUsername, getUsernameByCognitoId } from "../controllers/user-controller";

const router = Router();

router.get("/", getUsers);
router.post("/", postUser);
router.get("/:cognitoId", getUser);
router.get("/username/:username", getCognitoIdByUsername);
router.get("/users/:cognitoId/username", getUsernameByCognitoId);



export default router;
