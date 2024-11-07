import { getPosts, addPost, deletePost } from "@/app/lib/data"
import { NextResponse } from "next/server"

export const GET = async (req: Request) => {
    try {
        // Aguarda a resolução da promessa
        const posts = await getPosts(); 
        
        return NextResponse.json({ message: 'OK', posts }, { status: 200 });
    } catch (err) {
        if (err instanceof Error) {
            return NextResponse.json({ message: 'Error', err: err.message }, { status: 500 });
        } else {
            return NextResponse.json({ message: 'Unknown error' }, { status: 500 });
        }
    }
    
}

export const POST = async (req: Request) => {
    const { title } = await req.json();

    try {
        const post = { title };
        await addPost(post); // Garantir que a função addPost aguarde a inserção do post
        return NextResponse.json({ message: "Ok", post }, { status: 201 });
    } catch (err) {
        if (err instanceof Error) {
            return NextResponse.json({ message: 'Error', err: err.message }, { status: 500 });
        } else {
            return NextResponse.json({ message: 'Unknown error' }, { status: 500 });
        }
    }
    
}
