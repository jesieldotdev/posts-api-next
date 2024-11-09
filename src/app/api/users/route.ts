import { getUsers, addUser, deleteUser } from "@/app/lib/users_controller"
import { NextResponse } from "next/server"

export const GET = async (req: Request) => {
    try {
        // Aguarda a resolução da promessa
        const users = await getUsers(); 
        
        return NextResponse.json({ message: 'OK', users }, { status: 200 });
    } catch (err) {
        if (err instanceof Error) {
            return NextResponse.json({ message: 'Error', err: err.message }, { status: 500 });
        } else {
            return NextResponse.json({ message: 'Unknown error' }, { status: 500 });
        }
    }
    
}

export const POST = async (req: Request) => {
    const { username, email, password, is_admin } = await req.json();

    try {
        const user = { username, email, password, is_admin };
        await addUser(user); // Garantir que a função addPost aguarde a inserção do post
        return NextResponse.json({ message: "Ok", user }, { status: 201 });
    } catch (err) {
        if (err instanceof Error) {
            return NextResponse.json({ message: 'Error', err: err.message }, { status: 500 });
        } else {
            return NextResponse.json({ message: 'Unknown error' }, { status: 500 });
        }
    }
    
}
