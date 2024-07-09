import { clerkMiddleware } from '@clerk/nextjs/server';

export default clerkMiddleware();

export const config = {
  // The following matcher runs middleware on all routes
  // except static assets, /api/webhook, and /api/uploadthing.
  matcher: [
    '/((?!api/webhook|api/uploadthing).*)', // Exclude specific API routes
    '/((?!public).*)', // Exclude public routes
    '/((?!.*\\..*|_next).*)', // Exclude static assets
    // '/', // Include root path
  ],
};
