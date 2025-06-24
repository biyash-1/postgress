import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/app/lib/prisma";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";

const JWT_SECRET = process.env.JWT_SECRET;

export async function PATCH(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { isCompleted } = await req.json();
    const taskId = Number(params.id);

    if (!isCompleted && isCompleted !== false) {
      return NextResponse.json(
        { message: "isCompleted field is required" },
        { status: 400 }
      );
    }

    const cookieStore = await cookies();
    const token = cookieStore.get("token")?.value;

    if (!token) {
      return NextResponse.json(
        { message: "Authentication required" },
        { status: 401 }
      );
    }

    const decoded = jwt.verify(token, JWT_SECRET!) as { id: number };

    const task = await prisma.tasks.findFirst({
      where: { id: taskId, userId: decoded.id },
    });

    if (!task) {
      return NextResponse.json(
        { message: "Task not found or unauthorized" },
        { status: 404 }
      );
    }

    const updatedTask = await prisma.tasks.update({
      where: { id: taskId },
      data: { isCompleted },
    });

    return NextResponse.json({
      message: "Task updated successfully",
      task: updatedTask,
    });
  } catch (error: any) {
    console.error("PATCH Error:", error);
    return NextResponse.json(
      { message: error.message || "Server error" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("token")?.value;

    if (!token) {
      return NextResponse.json(
        { message: "Authentication required" },
        { status: 401 }
      );
    }

    const decoded = jwt.verify(token, JWT_SECRET!) as { id: number };
    const taskId = Number(params.id); // Check if the task exists and belongs to the user

    const task = await prisma.tasks.findFirst({
      where: { id: taskId, userId: decoded.id },
    });

    if (!task) {
      return NextResponse.json(
        { message: "Task not found or unauthorized" },
        { status: 404 }
      );
    } // Delete the task

    await prisma.tasks.delete({
      where: { id: taskId },
    });

    return NextResponse.json({ message: "Task deleted successfully" });
  } catch (error: any) {
    console.error("DELETE Error:", error);
    return NextResponse.json(
      { message: error.message || "Server error" },
      { status: 500 }
    );
  }
}
