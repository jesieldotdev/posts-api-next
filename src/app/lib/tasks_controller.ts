import { TaskInput, TaskItem, UserInputProps } from '@/@types/models';
import supabase  from '../../config/database'; 
import { db } from '@/config/mongo';


export const getTasks = async () => {
  try {
    const database = await db();  
    const tasksCollection = database.collection('tasks'); 
    const tasks = await tasksCollection.find({}).toArray(); 

    return tasks; 
  } catch (error) {
    throw new Error(error.message); 
  }
};


export const addTask = async ({ title, description, author_id }: TaskInput) => {
  try {
    const database = await db();  
    const tasksCollection = database.collection('tasks'); 

    
    const result = await tasksCollection.insertOne({
      title,
      description,
      author_id,
      createdAt: new Date(), 
    });

    return result; 
  } catch (error) {
    throw new Error(error.message); 
  }
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

  
  const { data: task, error: taskError } = await supabase
    .from('tasks')
    .select('*')
    .eq('id', id)
    .single();

  if (taskError) throw new Error(`Error fetching task: ${taskError.message}`);
  if (!task) throw new Error(`No task found with the given id: ${id}`);

  
  const { data, error } = await supabase
    .from('tasks')
    .update(updatedData)
    .eq('id', Number(id)); 

  if (error) throw new Error(`Error updating task: ${error.message}`);

  console.log('Updated task: ', data); 

  return data;
};

export const updateTaskStatus = async (id: string | number, status: 'incomplete' | 'completed') => {
  console.log('Updating status for task with ID: ', id);

  
  if (!['incomplete', 'completed'].includes(status)) {
    throw new Error('Invalid status value');
  }

  
  const { data, error } = await supabase
    .from('tasks')
    .update({ status })
    .eq('id', id);

  
  if (error) {
    console.error('Error updating task status: ', error.message);
    throw new Error(`Error updating task status: ${error.message}`);
  }

  
  const { data: updatedData, error: fetchError } = await supabase
    .from('tasks')
    .select('*')
    .eq('id', id)
    .single();  

  
  if (fetchError) {
    console.error('Error fetching updated task: ', fetchError.message);
    throw new Error(`Error fetching updated task: ${fetchError.message}`);
  }

  console.log('Updated task status: ', updatedData); 

  
  return updatedData;
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
