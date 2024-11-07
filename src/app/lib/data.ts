import { supabase } from '../../config/database'; // Importando o cliente Supabase

// Obter todos os posts
export const getPosts = async () => {
  const { data, error } = await supabase
    .from('posts') // Nome da tabela
    .select('*');  // Seleciona todos os campos

    console.log(data)

  if (error) throw new Error(error.message);
  return data;
};

// Adicionar um novo post
export const addPost = async (post: {  title: string;  }) => {
  const { data, error } = await supabase
    .from('posts') // Nome da tabela
    .insert([
      {title: post.title }
    ]);

  if (error) throw new Error(error.message);
  return data;
};

// Deletar um post pelo id
export const deletePost = async (id: string) => {
  const { data, error } = await supabase
    .from('posts')
    .delete()
    .eq('id', id); // A condição de deletar pelo id

  if (error) throw new Error(error.message);
  if (data.length === 0) throw new Error("NO POST FOUND");
  return data;
};

// Atualizar um post pelo id
export const updatePost = async (id: string, title: string, desc: string) => {
  const { data, error } = await supabase
    .from('posts')
    .update({ title, desc })
    .eq('id', id); // A condição de atualizar pelo id

  if (error) throw new Error(error.message);
  if (data.length === 0) throw new Error("NO POST FOUND");
  return data;
};

// Obter um post pelo id
export const getById = async (id: string) => {
  const { data, error } = await supabase
    .from('posts')
    .select('*')
    .eq('id', id)
    .single(); // Para pegar apenas um resultado (usamos .single() para retornar um único item)

  if (error) throw new Error(error.message);
  if (!data) throw new Error("NO POST FOUND");
  return data;
};
