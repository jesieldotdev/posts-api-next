import supabase from "../config/database"; // Caminho para o seu cliente Supabase

interface Post {
  id: string;
  title: string;
  desc: string;
  date: string; // O Supabase geralmente lida com datas como strings em formato ISO
}

class PostModel {
  // Função para obter todos os posts
  static async getAllPosts(): Promise<Post[]> {
    const { data, error } = await supabase
      .from("posts")
      .select("*");

    if (error) {
      throw new Error(error.message);
    }

    return data as Post[];
  }

  // Função para criar um novo post
  static async createPost(title: string, desc: string): Promise<Post> {
    const { data, error } = await supabase
      .from("posts")
      .insert([{ title, desc, date: new Date().toISOString() }])
      .single();

    if (error) {
      throw new Error(error.message);
    }

    return data as Post;
  }

  // Função para obter um post por ID
  static async getPostById(postId: string): Promise<Post | null> {
    const { data, error } = await supabase
      .from("posts")
      .select("*")
      .eq("id", postId)
      .single();

    if (error) {
      throw new Error(error.message);
    }

    return data as Post | null;
  }

  // Função para atualizar um post
  static async updatePost(postId: string, title: string, desc: string): Promise<Post> {
    const { data, error } = await supabase
      .from("posts")
      .update({ title, desc })
      .eq("id", postId)
      .single();

    if (error) {
      throw new Error(error.message);
    }

    return data as Post;
  }

  // Função para deletar um post
  static async deletePost(postId: string): Promise<void> {
    const { error } = await supabase
      .from("posts")
      .delete()
      .eq("id", postId);

    if (error) {
      throw new Error(error.message);
    }
  }
}

export default PostModel;
