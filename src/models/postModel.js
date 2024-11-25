import'dotenv/config';

// Importa a função para conectar ao banco de dados, configurada no arquivo dbConfig.js
// o vsc importa sem o .js por causa do front, então é necessario colocar.
import { ObjectId } from "mongodb";
import conectarAoBanco from "../config/dbConfig.js";

// Conecta ao banco de dados usando a string de conexão fornecida como variável de ambiente
const conexao = await conectarAoBanco(process.env.STRING_CONEXAO);

// Função assíncrona para obter todos os posts do banco de dados
export async function getTodosPosts() {
    // Obtém o banco de dados 'Imersao-instagrama' da conexão
    const db = conexao.db("Imersao-instagrama");
    // Obtém a coleção 'posts' do banco de dados
    const colecao = db.collection("posts");
    // Retorna um array com todos os documentos da coleção
    return colecao.find().toArray();
}

export async function criarPost(novoPost) {
    const db = conexao.db("Imersao-instagrama");
    const colecao = db.collection("posts");
    return colecao.insertOne(novoPost)

}

export async function atualizarPost(id, novoPost) {
    const db = conexao.db("Imersao-instagrama");
    const colecao = db.collection("posts");
    const objID = ObjectId.createFromHexString(id)
    return colecao.updateOne({_id: new ObjectId(objID)}, {$set:novoPost} )

}