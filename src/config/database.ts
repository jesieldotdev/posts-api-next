import { createClient } from '@supabase/supabase-js';

// Substitua pelos valores reais da sua instância Supabase
const SUPABASE_URL = process.env.SUPABASE_URL; // URL da sua instância do Supabase
const SUPABASE_ANON_KEY = process.env.SUPABASE_KEY; // Chave pública anônima (encontrada no painel do Supabase)

 const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
 export default supabase    
