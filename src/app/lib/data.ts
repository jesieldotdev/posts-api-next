import file from "../api/posts.json" assert { type: "json" };
const fs = require("fs");
const customer = 
  {
    name: "d Co.",
    order_count: 0,
    address: "Po Box City",
  }

function saveJson(data:any){
    const jsonString = JSON.stringify(data);
fs.writeFile("./src/app/api/posts.json", jsonString, (err) => {
  if (err) {
    console.log("Error writing file", err);
  } else {
    console.log("Successfully wrote file");
  }
});
}



type Post = {
  id: string;
  title: string;
  desc: string;
  date: Date;
};

let posts: Post[] = file;

export const getPosts = () => posts;
export const addPost = (post: Post) => {
  posts.push(post);
  saveJson(posts)
};
export const deletePost = (id: string) => {
  posts = posts.filter((post) => post.id !== id);
  saveJson(posts)
};
export const updatePost = (id: string, title: string, desc: string) => {
  const post = posts.find((post) => post.id === id);
  

  if (post) {
    post.title = title;
    post.desc = desc;
    saveJson(posts)
  } else {
    throw new Error("NO POST FOUND");
  }
};

export const getById = (id: string) => {
  return posts.find((post) => post.id === id);
};
