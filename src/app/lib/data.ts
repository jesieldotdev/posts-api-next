import Post from "../models/Post";

export const getPosts = async () => {
  return await Post.findAll();
};

export const addPost = async (post: { id: string; title: string; desc: string; date: Date }) => {
  await Post.create(post);
};

export const deletePost = async (id: string) => {
  const deleted = await Post.destroy({
    where: { id },
  });
  if (deleted === 0) throw new Error("NO POST FOUND");
};

export const updatePost = async (id: string, title: string, desc: string) => {
  const [updated] = await Post.update(
    { title, desc },
    {
      where: { id },
    }
  );
  if (updated === 0) throw new Error("NO POST FOUND");
};

export const getById = async (id: string) => {
  const post = await Post.findByPk(id);
  if (!post) throw new Error("NO POST FOUND");
  return post;
};