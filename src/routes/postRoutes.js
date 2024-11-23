// Importa as dependências necessárias para o projeto:
// - express: Framework para criar aplicações web
// - multer: Middleware para lidar com uploads de arquivos
// - postController: Módulo contendo funções para manipular posts
import express from "express";
import multer from "multer";
import cors from "cors";
import { listarPosts,  postarNovoPost, uploadImagem, atualizarNovoPost } from "../controllers/postController.js";

const corsOptions = {
    origin: "http://localhost:8000",
    optionsSuccessStatus: 200
}

// Configura o armazenamento de arquivos enviados
// Define o diretório de destino para os arquivos enviados
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/'); // Define a pasta "uploads/" como destino
    },
    // Define como os arquivos serão nomeados
    filename: function (req, file, cb) {
        cb(null, file.originalname); // Utiliza o nome original do arquivo
    }
})

// Cria uma instância do Multer com a configuração de armazenamento
const upload = multer({ dest: "./uploads" , storage})

const routes = (app) => {
    // Habilita o middleware para analisar o corpo das requisições JSON
    app.use(express.json());
    app.use(cors(corsOptions));
    // Rota para buscar todos os posts
    app.get("/posts", listarPosts);
    // Rota para criar um post
    app.post("/posts", postarNovoPost);
    // Rota para fazer upload de uma imagem
    app.post("/upload", upload.single("imagem"), uploadImagem);
    app.put("/upload/:id", atualizarNovoPost);
};

export default routes;