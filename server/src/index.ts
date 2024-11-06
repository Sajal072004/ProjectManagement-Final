import express from 'express';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import { PrismaClient } from '@prisma/client';
import crypto from 'crypto';
import { clerkMiddleware } from '@clerk/express'; // Import the required middleware
const cron = require('node-cron');

// Import Routes
import projectRoutes from './routes/project-routes';
import taskRoutes from './routes/task-routes';
import searchRoutes from './routes/search-routes';
import userRoutes from './routes/user-routes';
import teamRoutes from './routes/team-routes';

// Configurations
dotenv.config();
const app = express();
const prisma = new PrismaClient();

app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(morgan('common'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());

// Use Clerk middleware for authentication
app.use(clerkMiddleware()); // Apply the Clerk middleware to all routes

// Home Route
app.get("/", (req, res) => {
    res.send("This is the home route");
});

// Protected Routes
app.use("/projects", projectRoutes); // Protect project routes
app.use('/tasks', taskRoutes); // Protect task routes
app.use('/search', searchRoutes); // Protect search routes
app.use('/users', userRoutes); // Protect user routes
app.use('/teams', teamRoutes); // Protect team routes

// Webhook Endpoint
app.post('/webhook/clerk', async (req, res) => {
    console.log('Incoming webhook request:', req.body);
    console.log('Headers:', req.headers);

    // Directly handle the event without signature verification
    const event = req.body;

    // Validate the incoming webhook payload
    if (!event || !event.type || !event.data) {
        return res.status(400).send('Invalid payload');
    }

    // Handle the event
    switch (event.type) {
        case 'user.created':
            const user = event.data;
            // Create user in your database
            try {
                await prisma.user.create({
                    data: {
                        cognitoId: user.id,
                        username: user.username,
                        profilePictureUrl: user.image_url || null,
                    },
                });
                console.log('User created in database:', user.username);
            } catch (error) {
                console.error('Error creating user in database:', error);
                return res.status(500).send('Error creating user');
            }
            break;

        case 'user.updated':
            const updatedUser = event.data;
            // Update user in your database if necessary
            try {
                await prisma.user.update({
                    where: { cognitoId: updatedUser.id },
                    data: {
                        username: updatedUser.username,
                        profilePictureUrl: updatedUser.profile_picture_url || null,
                    },
                });
                console.log('User updated in database:', updatedUser.username);
            } catch (error) {
                console.error('Error updating user in database:', error);
                return res.status(500).send('Error updating user');
            }
            break;

        default:
            console.log('Unhandled event type:', event.type);
    }

    res.sendStatus(200);
});

// Function to update projects with cognitoId
async function updateProjects() {
    try {
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
    } catch (error) {
        console.error("Error updating projects:", error);
    } finally {
        await prisma.$disconnect();
    }
}

// Endpoint to trigger the project update
app.get('/update-projects', async (req, res) => {
    await updateProjects();
    res.send('Projects update initiated. Check the console for results.');
});

cron.schedule('*/2 * * * *', async () => {
    const url = 'https://projectmanagement-final.onrender.com/projects/projects';
    try {
        const response = await fetch(url, {
            method: 'GET',
        });

        if (response.ok) {
            console.log('URL hit successfully!');
        } else {
            console.log('Failed to hit the URL:', response.statusText);
        }
    } catch (error) {
        console.log('Error hitting the URL:', error);
    }
});

// Server
const PORT = Number(process.env.PORT) || 8000;

app.listen(PORT, () => {
    console.log(`Server running at port ${PORT}`);
});
