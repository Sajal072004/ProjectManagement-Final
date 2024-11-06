import { clerkMiddleware } from "@clerk/nextjs/server";

// Apply Clerk middleware to all request paths
export default clerkMiddleware();

// Match all request paths except for:
// - Static assets like favicon and _next
// - Sign-in and sign-up pages
export const config = {
  matcher: [
    "/((?!_next|favicon.ico|sign-in|sign-up).*)", // Match all paths except for the specified routes
  ],
};
