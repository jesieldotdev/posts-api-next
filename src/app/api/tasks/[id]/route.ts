import { deleteTask, getTaskById, updateTask } from "@/app/lib/tasks_controller";
import { NextResponse } from "next/server";

export const GET = async (req: Request) => {
  try {
    const id = req.url.split("tasks/")[1]
    const task = await getTaskById(id)
    
    
    if (!task) {
      return NextResponse.json({ message: "Error" }, { status: 404 });
    }
  

    return NextResponse.json({ message: "OK", task}, { status: 200 });
  } catch (err) {
    NextResponse.json({ message: "Error", err }, { status: 500 });
  }
};

export const PUT = async (req: Request) => {
  try {
    const { title, description, author_id } = await req.json();
    const id = req.url.split("tasks/")[1];
    updateTask(id, {title, description, author_id});
    return NextResponse.json({ message: "OK" }, { status: 200 });
  } catch (err) {
    return NextResponse.json({message: 'Error'}, {status: 500})
  }
};

export const DELETE = async (req: Request) => {
  try {
    const id = req.url.split("tasks/")[1];

    const task = getTaskById(id);

    if (!task) {
      return NextResponse.json({ message: "Error" }, { status: 404 });
    }
    deleteTask(id);

    return NextResponse.json({ message: "OK" }, { status: 200 });
  } catch (err) {
    NextResponse.json({ message: "Error", err }, { status: 500 });
  }
};

export const POST = async (req: Request) => {
  console.log("GET");
};
