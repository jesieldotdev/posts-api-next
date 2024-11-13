import { updateTaskStatus } from "@/app/lib/tasks_controller";
import { NextResponse } from "next/server";

export const PATCH = async (req: Request, { params }: { params: { id: string } }) => {
    try {
        const { id } = params; // Acessando o ID via params para maior clareza
        const { status } = await req.json();

        // Verificar se o status é válido
        if (!['incomplete', 'completed'].includes(status)) {
            return NextResponse.json({ message: 'Invalid status value' }, { status: 400 });
        }

        // Chamar a função para atualizar o status da tarefa
        const updatedTask = await updateTaskStatus(Number(id), status);

        return NextResponse.json({ message: "Task status updated successfully", task: updatedTask }, { status: 200 });
    } catch (err) {
        if (err instanceof Error) {
            console.error('Erro ao atualizar status da tarefa:', err); // Log de erro
            return NextResponse.json({ message: 'Internal server error', error: err.message }, { status: 500 });
        } else {
            console.error('Erro desconhecido:', err); // Log de erro
            return NextResponse.json({ message: 'Unknown error occurred' }, { status: 500 });
        }
    }
};
