// middleware.ts
import { clerkMiddleware } from "@clerk/nextjs/server";

export default clerkMiddleware();

export const config = {
  matcher: [
    "/dashboard(.*)", // 🔐 Protect all /dashboard routes
    "/profile(.*)", // (Optional) protect /profile if needed
    "/settings(.*)", // (Optional) protect /settings
    "/(api|trpc)(.*)", // Always run for API routes
    "/((?!_next|.*\\..*).*)", // Default: protect everything except static files
  ],
};
