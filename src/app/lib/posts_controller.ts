import { UserInput } from '@/models/models';
import supabase  from '../../config/database'; 



export const getPosts = async () => {
  const { data, error } = await supabase
    .from('posts') 
    .select('*'); 

    console.log(data)

  if (error) throw new Error(error.message);
  return data;
};


export const addPost = async ({title, slug, author_id}:UserInput) => {
  const { data, error } = await supabase
    .from('posts')
    .insert([
      {title, slug, author_id }
    ]);

  if (error) throw new Error(error.message);
  return data;
};


export const deletePost = async (id: string) => {
  const { data, error } = await supabase
    .from('posts')
    .delete()
    .eq('id', id);

  if (error) throw new Error(error.message);
  if (!data) {
    throw new Error("NO POST FOUND");
  }
  
  
  return data;
};


export const updatePost = async ({id, title, slug, author_id}:UserInput) => {
  const { data, error } = await supabase
    .from('posts')
    .update({ title, slug, author_id })
    .eq('id', id);

  if (error) throw new Error(error.message);
  if (!data) throw new Error("NO POST FOUND");
  return data;
};


export const getPostById = async (id: string) => {
  const { data, error } = await supabase
    .from('posts')
    .select('*')
    .eq('id', id)
    .single(); 

  if (error) throw new Error(error.message);
  if (!data) throw new Error("NO POST FOUND");
  return data;
};
