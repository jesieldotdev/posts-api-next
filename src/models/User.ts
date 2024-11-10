import supabase from "../config/database"; // Caminho para o seu cliente Supabase

interface User {
  id: string;
  username: string;
  password: string;
  createsAt: Date;
  is_admin: boolean;
}

interface UserInputProps {
  username: string;
  password: string;
  is_admin: boolean;
}

class UserModel {
  // Função para obter todos os usuários
  static async getAllUsers(): Promise<User[]> {
    const { data, error } = await supabase
      .from("users")
      .select("*");

    if (error) {
      throw new Error(error.message);
    }

    return data as User[];
  }

  // Função para criar um novo usuário
  static async createUser({ username, password, is_admin }: UserInputProps): Promise<User> {
    const { data, error } = await supabase
      .from("users")
      .insert([{ username, password, is_admin }])
      .single();

    if (error) {
      throw new Error(error.message);
    }

    return data as User;
  }

  // Função para obter um usuário por ID
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

  // Função para atualizar um usuário
  static async updateUser(userId: string, { username, password, is_admin }: UserInputProps): Promise<User> {
    const { data, error } = await supabase
      .from("users")
      .update({ username, password, is_admin })
      .eq("id", userId)
      .single();

    if (error) {
      throw new Error(error.message);
    }

    return data as User;
  }

  // Função para deletar um usuário
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
