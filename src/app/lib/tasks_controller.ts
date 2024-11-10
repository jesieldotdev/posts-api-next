import { TaskInput, UserInputProps } from '@/models/models';
import supabase  from '../../config/database'; 


export const getTasks = async () => {
  const { data, error } = await supabase
    .from('tasks') 
    .select('*');  

    console.log(data)

  if (error) throw new Error(error.message);
  return data;
};


export const addTask = async ({title, description, author_id}:TaskInput) => {
  const { data, error } = await supabase
    .from('tasks') 
    .insert([
      {title, description,  author_id, }
    ]);

  if (error) throw new Error(error.message);
  return data;
};


export const deleteTask = async (id: string) => {
  const { data, error } = await supabase
    .from('tasks')
    .delete()
    .eq('id', id);
  if (error) throw new Error(error.message);
  if (!data) {
    throw new Error("NO TASK FOUND");
  }
  
  
  return data;
};


export const updateTask = async (id:string | number, {title, description, author}:TaskInput) => {
  const { data, error } = await supabase
    .from('tasks')
    .update({ title, description, author })
    .eq('id', id);

  if (error) throw new Error(error.message);
  if (!data) throw new Error("NO TASK FOUND");
  return data;
};


export const getTaskById = async (id: string) => {
  
  console.log(id);
  const { data, error } = await supabase
    .from('tasks')
    .select('*')
    .eq('id', id)
    .single(); 
    

  if (error) throw new Error(error.message);
  if (!data) throw new Error("NO TASK FOUND");
  return data;
};
