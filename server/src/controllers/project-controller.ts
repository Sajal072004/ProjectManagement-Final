import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const getProjects = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { cognitoId } = req.query;

  if (!cognitoId) {
    return ;
  }

  try {
    const projects = await prisma.project.findMany({
      where: {
        cognitoId: String(cognitoId),
      },
    });

    res.json(projects); 
  } catch (error: any) {
    res.status(500).json({
      message: `Error retrieving projects: ${error.message}`,
    });
  }
};

export const createProject = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { name, description, startDate, endDate, cognitoId } = req.body; // Ensure cognitoId is included in the request body

  try {
    const newProject = await prisma.project.create({
      data: {
        name,
        description,
        startDate: new Date(startDate),
        endDate: new Date(endDate),
        cognitoId: cognitoId, // Associate the project with the cognitoId
      },
    });
    res.status(201).json(newProject);
  } catch (error: any) {
    res.status(500).json({
      message: `Error creating a project: ${error.message}`,
    });
  }
};
