import { MongoClient } from 'mongodb';

// URL do seu MongoDB
const MONGODB_URI = process.env.MONGODB_URI; // Use o .env.local para armazenar suas credenciais
const MONGODB_DB = process.env.MONGODB_DB; // Nome do banco de dados

let clientPromise: Promise<MongoClient> | undefined;

if (process.env.NODE_ENV === 'development') {
  // Em desenvolvimento, usa uma instância do MongoClient para evitar múltiplas conexões
  if (!global._mongoClientPromise) {
    const client = new MongoClient(MONGODB_URI);
    global._mongoClientPromise = client.connect();
  }
  clientPromise = global._mongoClientPromise;
} else {
  // Em produção, cria uma conexão direta
  const client = new MongoClient(MONGODB_URI);
  clientPromise = client.connect();
}

export const client = clientPromise;
export const db = async () => {
  const clientConnection = await clientPromise;
  return clientConnection.db(MONGODB_DB);
};
