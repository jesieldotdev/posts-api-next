import { deleteTask, getTaskById, updateTask } from "@/app/lib/tasks_controller";
import { TaskInput } from "@/@types/models";
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

export const PATCH = async (req: Request) => {
  try {
    const { title, description, author_id, status } = await req.json();
    const id = req.url.split("tasks/")[1];

    // Atualiza apenas os campos que foram passados na requisição
    const updatedData: Partial<TaskInput> = {};

    if (title) updatedData.title = title;
    if (description) updatedData.description = description;
    if (author_id) updatedData.author_id = author_id;
    if (status) updatedData.status = status;  // Se o status for passado, ele também será atualizado.

    // Chama a função para atualizar a task no banco de dados
    await updateTask(id, updatedData);

    return NextResponse.json({ message: "OK" }, { status: 200 });
  } catch (err) {
    return NextResponse.json({ message: 'Error', error: err.message }, { status: 500 });
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
