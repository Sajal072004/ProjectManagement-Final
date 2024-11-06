import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// Fetch all teams
export const getAllTeams = async (req: Request, res: Response): Promise<void> => {
  try {
    const teams = await prisma.team.findMany();

    // Add usernames of productOwner and projectManager to each team
    const teamsWithUsernames = await Promise.all(
      teams.map(async (team: any) => {
        const productOwner = await prisma.user.findUnique({
          where: { cognitoId: team.productOwnerUserId! }, // Changed to cognitoId
          select: { username: true },
        });

        const projectManager = await prisma.user.findUnique({
          where: { cognitoId: team.projectManagerUserId! }, // Changed to cognitoId
          select: { username: true },
        });

        return {
          ...team,
          productOwnerUsername: productOwner?.username,
          projectManagerUsername: projectManager?.username,
        };
      })
    );

    res.json(teamsWithUsernames);
  } catch (error: any) {
    res.status(500).json({ message: `Error retrieving teams: ${error.message}` });
  }
};

// Fetch all teams for a specific user
export const getUserTeams = async (req: Request, res: Response): Promise<void> => {
  const { userId } = req.params; // Get the userId (or cognitoId) from the URL parameter

  try {
    // Fetch teams where the user is either the productOwner or projectManager
    const teams = await prisma.team.findMany({
      where: {
        OR: [
          { productOwnerUserId: userId }, // Changed to cognitoId for productOwner
          { projectManagerUserId: userId }, // Changed to cognitoId for projectManager
        ],
      },
    });

    // Add usernames of productOwner and projectManager to each team
    const teamsWithUsernames = await Promise.all(
      teams.map(async (team: any) => {
        const productOwner = await prisma.user.findUnique({
          where: { cognitoId: team.productOwnerUserId! }, // Changed to cognitoId
          select: { username: true },
        });

        const projectManager = await prisma.user.findUnique({
          where: { cognitoId: team.projectManagerUserId! }, // Changed to cognitoId
          select: { username: true },
        });

        return {
          ...team,
          productOwnerUsername: productOwner?.username,
          projectManagerUsername: projectManager?.username,
        };
      })
    );

    res.json(teamsWithUsernames);
  } catch (error: any) {
    res.status(500).json({ message: `Error retrieving teams for user: ${error.message}` });
  }
};

// Create a new team
export const createTeam = async (req: Request, res: Response): Promise<void> => {
  const { teamName, productOwnerUserId, projectManagerUserId } = req.body;

  try {
    // Create a new team
    const newTeam = await prisma.team.create({
      data: {
        teamName,
        productOwnerUserId, // These values should now be cognitoId (String)
        projectManagerUserId, // These values should now be cognitoId (String)
      },
    });

    res.status(201).json(newTeam);
  } catch (error: any) {
    res.status(500).json({ message: `Error creating team: ${error.message}` });
  }
};
