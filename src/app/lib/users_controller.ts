import { UserInputProps } from '@/@types/models';
import supabase  from '../../config/database'; 


export const getUsers = async () => {
  const { data, error } = await supabase
    .from('users') 
    .select('*');  

    console.log(data)

  if (error) throw new Error(error.message);
  return data;
};


export const addUser = async ({username, password, is_admin, email}:UserInputProps) => {
  const { data, error } = await supabase
    .from('users') 
    .insert([
      {username, password, is_admin, email}
    ]);

  if (error) throw new Error(error.message);
  return data;
};


export const deleteUser = async (id: string) => {
  const { data, error } = await supabase
    .from('users')
    .delete()
    .eq('id', id);
  if (error) throw new Error(error.message);
  if (!data) {
    throw new Error("NO USER FOUND");
  }
  
  
  return data;
};


export const updateUser = async ({username, password, is_admin, email, id}:UserInputProps) => {
  const { data, error } = await supabase
    .from('users')
    .update({ username, email, password, is_admin })
    .eq('id', id);

  if (error) throw new Error(error.message);
  if (!data) throw new Error("NO USER FOUND");
  return data;
};


export const getUserById = async (id: string) => {
  
  console.log(id);
  const { data, error } = await supabase
    .from('users')
    .select('*')
    .eq('id', id)
    .single(); 
    

  if (error) throw new Error(error.message);
  if (!data) throw new Error("NO USER FOUND");
  return data;
};
