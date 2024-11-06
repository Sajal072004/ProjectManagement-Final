import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function updateProjects() {
  const projects = await prisma.project.findMany();

  for (const project of projects) {
    // Replace with the logic to fetch or assign the appropriate cognitoId
    const cognitoId = "user_2oQapGVHCQZ6Ius8CAQtHtnwk8H"; // Adjust this according to your user data

    await prisma.project.update({
      where: { id: project.id },
      data: { cognitoId: cognitoId }, // Assign a cognitoId to each project
    });
  }

  console.log("Projects updated with cognitoId!");
}

updateProjects()
  .catch((error) => console.error(error))
  .finally(async () => {
    await prisma.$disconnect();
  });
