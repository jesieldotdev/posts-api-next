import { deletePost, getPostById, updatePost } from "@/app/lib/posts_controller";
import { NextResponse } from "next/server";

export const GET = async (req: Request) => {
  try {
    const id = req.url.split("posts/")[1];
    const post = await getPostById(id);
    console.log(post);
    if (!post) {
      return NextResponse.json({ message: "Error" }, { status: 404 });
    }

    return NextResponse.json({ message: "OK", post }, { status: 200 });
  } catch (err) {
    NextResponse.json({ message: "Error", err }, { status: 500 });
  }
};

export const PUT = async (req: Request) => {
  try {
    const { title, slug, author_id} = await req.json();
    const id = req.url.split("posts/")[1];
    updatePost({id, title, slug, author_id});
    return NextResponse.json({ message: "OK" }, { status: 200 });
  } catch (err) {
    return NextResponse.json({message: 'Error'}, {status: 500})
  }
};

export const DELETE = async (req: Request) => {
  try {
    const id = req.url.split("posts/")[1];

    const post = getPostById(id);

    if (!post) {
      return NextResponse.json({ message: "Error" }, { status: 404 });
    }
    deletePost(id);

    return NextResponse.json({ message: "OK" }, { status: 200 });
  } catch (err) {
    NextResponse.json({ message: "Error", err }, { status: 500 });
  }
};

export const POST = async (req: Request) => {
  console.log("GET");
};
