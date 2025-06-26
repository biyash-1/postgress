"use server"
import { prisma } from "@/app/lib/prisma"
import { auth, currentUser } from "@clerk/nextjs/server"

export async function syncUser() {
  try {
    const authData = await auth();          // auth() returns { userId, sessionId, ... }
    const userId =  authData.userId; 
    console.log("userid is",userId)  // extract userId string
    if (!userId) return;

    const user = await currentUser(); // get full Clerk user object
    if (!user) return;

    // Check if user already exists in your Prisma DB
    const existingUser = await prisma.user.findUnique({
      where: { clerkId: userId }
    });

    if (existingUser) {
      return existingUser; // user already synced
    }

    // Create new user record in DB
    const dbUser = await prisma.user.create({
      data: {
        clerkId: userId,
        email: user.emailAddresses[0]?.emailAddress ?? "", // safest first email
        username: user.username ?? null,
        password: "",  // you can leave empty or null if Clerk manages auth
      },
    });

    return dbUser;
  } catch (error) {
    console.error("Error syncing user:", error);
    throw error;
  }
}
