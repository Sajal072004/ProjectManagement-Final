// src/express.d.ts

import { Request } from 'express';

// Extend the Request interface to include the auth property
declare global {
  namespace Express {
    interface Request {
      auth?: {
        userId: string; // Assuming userId is a string, adjust based on your requirements
        // Add any other properties from auth state you expect to use
      };
    }
  }
}
