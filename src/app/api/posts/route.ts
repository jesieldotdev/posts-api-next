import { getPosts, addPost, deletePost } from "@/app/lib/posts_controller"
import { NextResponse } from "next/server"

export const GET = async (req: Request) => {
    try {
       
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
    const { title, slug, author_id } = await req.json();

    try {
        const post = { title, slug, author_id };
        await addPost(post); 
        return NextResponse.json({ message: "Ok", post }, { status: 201 });
    } catch (err) {
        if (err instanceof Error) {
            return NextResponse.json({ message: 'Error', err: err.message }, { status: 500 });
        } else {
            return NextResponse.json({ message: 'Unknown error' }, { status: 500 });
        }
    }
    
}
