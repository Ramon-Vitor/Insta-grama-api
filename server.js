import express from "express";
import routes from "./src/routes/postsRoutes.js";

// Array de objetos representando posts, utilizado como dados de exemplo
// **Nota:** Em um aplicativo real, esses dados seriam obtidos do banco de dados
const posts = [
    // ... (dados dos posts)
];

// Cria uma instância do Express, que será o núcleo da nossa aplicação
const app = express();
app.use(express.static("uploads"))
routes(app)

// Inicia o servidor na porta 3000 e exibe uma mensagem no console
app.listen(3000, () => {
    console.log("Servidor escutando...");
});
