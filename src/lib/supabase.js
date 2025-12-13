//Importamos a biblioteca do Supabase
import {createClient} from '@supabase/supabase-js';

// As variáveis
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

console.log("Minha URL é:", supabaseUrl);
//Inicializamos o cliente do Supabase
export const supabase = createClient(supabaseUrl, supabaseAnonKey);
