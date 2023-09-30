import { deletePost, getById, updatePost } from "@/app/lib/data";
import { NextResponse } from "next/server";

export const GET = async (req: Request) => {
  try {
    const id = req.url.split("blog/")[1];
    const post = getById(id);
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
    const { title, desc } = await req.json();
    const id = req.url.split("blog/")[1];
    updatePost(id, title, desc);
    return NextResponse.json({ message: "OK" }, { status: 200 });
  } catch (err) {
    return NextResponse.json({message: 'Error'}, {status: 500})
  }
};

export const DELETE = async (req: Request) => {
  try {
    const id = req.url.split("blog/")[1];

    const post = getById(id);

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
