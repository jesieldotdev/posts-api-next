import supabase from "../config/database"; // Caminho para o seu cliente Supabase

interface User {
  id: string;
  username: string;
  password: string;
  createsAt: Date
  is_admin: boolean; // O Supabase geralmente lida com datas como strings em formato ISO
}

interface UserInputProps{
  username: string
  password: string
  is_admin: boolean
}

class UserModel {
  // Função para obter todos os posts
  static async getAllUsers(): Promise<User[]> {
    const { data, error } = await supabase
      .from("users")
      .select("*");

    if (error) {
      throw new Error(error.message);
    }

    return data as User[];
  }

  // Função para criar um novo post
  static async createUser(UserInputProps): Promise<User> {
    const { data, error } = await supabase
      .from("users")
      .insert([{ username, password, is_admin }])
      .single();

    if (error) {
      throw new Error(error.message);
    }

    return data as User;
  }

  // Função para obter um post por ID
  static async getUserById(userId: string): Promise<User | null> {
    const { data, error } = await supabase
      .from("users")
      .select("*")
      .eq("id", userId)
      .single();

    if (error) {
      throw new Error(error.message);
    }

    return data as User | null;
  }

  // Função para atualizar um post
  static async updateUser(UserInputProps): Promise<User> {
    const { data, error } = await supabase
      .from("users")
      .update({ username, password, is_admin})
      .eq("id", userId)
      .single();

    if (error) {
      throw new Error(error.message);
    }

    return data as User;
  }

  // Função para deletar um post
  static async deleteUser(userId: string): Promise<void> {
    const { error } = await supabase
      .from("users")
      .delete()
      .eq("id", userId);

    if (error) {
      throw new Error(error.message);
    }
  }
}

export default UserModel;
