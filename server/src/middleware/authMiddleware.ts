import express, { Request, Response, NextFunction } from 'express';
import { clerkMiddleware, requireAuth } from '@clerk/express';

const app = express();

// Use clerkMiddleware to authenticate requests
app.use(clerkMiddleware());

// Define a protected route using requireAuth
app.get('/protected', requireAuth(), (req: Request, res: Response) => {
  res.send('This is a protected route');
});

// Route to get the auth state
app.get('/auth-state', (req: Request, res: Response) => {
  const authState = req.auth; // Retrieve the auth state from the request
  return res.json(authState); // Return the auth state as JSON
});

// Example of handling a public route
app.get('/', (req: Request, res: Response) => {
  res.send('Welcome to the public route!');
});

// Error handling middleware
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error(err); // Log the error for debugging
  res.status(500).json({ error: err.message }); // Send error response
});

// Start your server
const port = process.env.PORT || 8000;
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
