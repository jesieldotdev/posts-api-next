import { deleteUser, getUserById, updateUser } from "@/app/lib/users_controller";
import { NextResponse } from "next/server";

export const GET = async (req: Request) => {
  try {
    const id = req.url.split("users/")[1]
    const user = await getUserById(id)
    
    
    if (!user) {
      return NextResponse.json({ message: "Error" }, { status: 404 });
    }
  

    return NextResponse.json({ message: "OK", user}, { status: 200 });
  } catch (err) {
    NextResponse.json({ message: "Error", err }, { status: 500 });
  }
};

export const PUT = async (req: Request) => {
  try {
    const { username, password, email, is_admin } = await req.json();
    const id = req.url.split("users/")[1];
    updateUser(id, username, password, is_admin);
    return NextResponse.json({ message: "OK" }, { status: 200 });
  } catch (err) {
    return NextResponse.json({message: 'Error'}, {status: 500})
  }
};

export const DELETE = async (req: Request) => {
  try {
    const id = req.url.split("users/")[1];

    const user = getUserById(id);

    if (!post) {
      return NextResponse.json({ message: "Error" }, { status: 404 });
    }
    deleteUser(id);

    return NextResponse.json({ message: "OK" }, { status: 200 });
  } catch (err) {
    NextResponse.json({ message: "Error", err }, { status: 500 });
  }
};

export const POST = async (req: Request) => {
  console.log("GET");
};
