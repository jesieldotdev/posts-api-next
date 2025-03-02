import { getTasks, addTask } from "@/app/lib/tasks_controller";
import { FlattenKeys } from "@/@types/models";
import { NextResponse } from "next/server";



export const GET = async (req: Request) => {
  try {
    // Obtendo as tarefas da API do controller
    const tasks = await getTasks();

    // Estrutura do retorno de acordo com o tipo `TaskState`
    const data = {
      filter: [], // Filtro vazio
      meta: {
        total: tasks.length // Número total de tarefas
      },
      data: tasks
    };

    return NextResponse.json({ data }, { status: 200 });
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

    // Adicionando a tarefa na API do controller
    await addTask(task);

    // Retorna a tarefa criada com a estrutura de `TaskState`
    // const taskState: TaskState = {
    //   items: [
    //     {
    //       title: task.title,
    //       description: task.description,
    //       start_date: null,
    //       end_date: null,
    //       status: "incomplete",
    //       id: new Date().getTime(), // ID gerado com base no timestamp
    //       created_at: new Date().toISOString(),
    //       tags: [], // Tags podem ser uma lista vazia por enquanto
    //       author_id: task.author_id
    //     }
    //   ],
    //   selectedItemIndex: 0,
    //   searchText: "",
    //   filter: {
    //     task: {
    //       filter: [],
    //       data: {
    //         meta: {
    //           total: 1
    //         },
    //         data: [taskState.items[0]]
    //       }
    //     }
    //   },
    //   taskModalTable: false
    // };

    // const tasks = await getTasks()

    return NextResponse.json({ message: "Ok", data: task }, { status: 201 });
  } catch (err) {
    if (err instanceof Error) {
      return NextResponse.json({ message: 'Error', err: err.message }, { status: 500 });
    } else {
      return NextResponse.json({ message: 'Unknown error' }, { status: 500 });
    }
  }
}
