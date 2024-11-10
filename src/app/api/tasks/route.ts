import { getTasks, addTask, deleteTask } from "@/app/lib/tasks_controller"
import { NextResponse } from "next/server"

export const GET = async (req: Request) => {
    try {
        
        const tasks = await getTasks(); 
        
        return NextResponse.json({ message: 'OK', tasks }, { status: 200 });
    } catch (err) {
        if (err instanceof Error) {
            return NextResponse.json({ message: 'Error', err: err.message }, { status: 500 });
        } else {
            return NextResponse.json({ message: 'Unknown error' }, { status: 500 });
        }
    }
    
}

export const POST = async (req: Request) => {
    const { title, description, author_id } = await req.json();

    try {
        const task = { title, description, author_id };
        await addTask(task); 
        return NextResponse.json({ message: "Ok", task }, { status: 201 });
    } catch (err) {
        if (err instanceof Error) {
            return NextResponse.json({ message: 'Error', err: err.message }, { status: 500 });
        } else {
            return NextResponse.json({ message: 'Unknown error' }, { status: 500 });
        }
    }
    
}
