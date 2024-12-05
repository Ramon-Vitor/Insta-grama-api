// Importa o framework Express para construir a aplicação web
import express from "express";

// Importa o middleware Multer para lidar com uploads de arquivos
import multer from "multer";

// Importa funções do arquivo postsController.js para lidar com posts
import { atualizarNovoPost, listarPosts, postarNovoPost, uploadImagem } from "../controllers/postsController.js";

import cors from "cors";

const corsOptions ={
  origin: "https://insta-grama.netlify.app",
  optionsSuccessStatus: 200
}

// Configura o armazenamento para uploads com Multer
const storage = multer.diskStorage({
  // Define a pasta de destino para arquivos enviados ('uploads/')
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  // Define o nome do arquivo como o nome original fornecido pelo usuário
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  }
});

// Cria uma instância do Multer com a configuração de armazenamento
const upload = multer({ dest: "./uploads" , storage });
// para windowns e mac

// Função para definir rotas na aplicação Express
const routes = (app) => {
  // Permite que o Express entenda dados JSON enviados no corpo da requisição
  app.use(express.json());
  app.use(cors(corsOptions))

  // Rota GET para listar todos os posts (Chama a função listarPosts)
  app.get("/posts", listarPosts);

  // Rota POST para criar um novo post (Chama a função postarNovoPost)
  app.post("/posts", postarNovoPost);

  // Rota POST para upload de imagem (Usa middleware upload.single("imagem") e chama a função uploadImagem)
  app.post("/upload", upload.single("imagem"), uploadImagem);

  app.put("/upload/:id", atualizarNovoPost)
};

// Exporta a função routes como padrão
export default routes;
