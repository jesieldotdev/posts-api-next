import supabase  from '../../config/database'; // Importando o cliente Supabase

interface UserInputProps{
  id?:number
  username: string
  email: string
  password: string
  is_admin: boolean
}
// Obter todos os posts
export const getUsers = async () => {
  const { data, error } = await supabase
    .from('users') // Nome da tabela
    .select('*');  // Seleciona todos os campos

    console.log(data)

  if (error) throw new Error(error.message);
  return data;
};

// Adicionar um novo post
export const addUser = async ({username, password, is_admin, email}:UserInputProps) => {
  const { data, error } = await supabase
    .from('users') // Nome da tabela
    .insert([
      {username, password, is_admin, email}
    ]);

  if (error) throw new Error(error.message);
  return data;
};

// Deletar um post pelo id
export const deleteUser = async (id: string) => {
  const { data, error } = await supabase
    .from('users')
    .delete()
    .eq('id', id); // A condição de deletar pelo id

  if (error) throw new Error(error.message);
  if (!data) {
    throw new Error("NO USER FOUND");
  }
  
  
  return data;
};

// Atualizar um post pelo id
export const updateUser = async ({username, password, is_admin, email}:UserInputProps) => {
  const { data, error } = await supabase
    .from('users')
    .update({ username, email, password, is_admin })
    .eq('id', id); // A condição de atualizar pelo id

  if (error) throw new Error(error.message);
  if (!data) throw new Error("NO USER FOUND");
  return data;
};

// Obter um post pelo id
export const getUserById = async (id: string) => {
  
  console.log(id);
  const { data, error } = await supabase
    .from('users')
    .select('*')
    .eq('id', id)
    .single(); // Para pegar apenas um resultado (usamos .single() para retornar um único item)
    

  if (error) throw new Error(error.message);
  if (!data) throw new Error("NO USER FOUND");
  return data;
};
