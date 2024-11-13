import { TaskInput, UserInputProps } from '@/models/models';
import supabase  from '../../config/database'; 


export const getTasks = async () => {
  const { data, error } = await supabase
    .from('tasks') 
    .select('*');  



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


export const updateTask = async (id: string | number, updatedData: Partial<TaskInput>) => {
    console.log('Updating task with ID: ', id);
  
    // Confirme se a tarefa existe antes de tentar atualizar
    const { data: task, error: taskError } = await supabase
      .from('tasks')
      .select('*')
      .eq('id', id)
      .single();
  
    if (taskError) throw new Error(`Error fetching task: ${taskError.message}`);
    if (!task) throw new Error(`No task found with the given id: ${id}`);
  
    // Atualiza apenas os campos passados na requisição
    const { data, error } = await supabase
      .from('tasks')
      .update(updatedData)
      .eq('id', Number(id)); // Garantir que o id seja numérico
  
    if (error) throw new Error(`Error updating task: ${error.message}`);
  
    console.log('Updated task: ', data); // Verifique a resposta
  
    return data;
  };
  
  


export const getTaskById = async (id: string) => {


  const { data, error } = await supabase
    .from('tasks')
    .select('*')
    .eq('id', id)
    .single(); 
    

  if (error) throw new Error(error.message);
  if (!data) throw new Error("NO TASK FOUND");
  return data;
};
