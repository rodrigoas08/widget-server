import express from "express";
import { routes } from "./routes";

// GET = Buscar informações
// POST = Cadastrar informações
// PUT = Atualizar informações  de uma entidade
// PATCH = Atualizar uma informação única de uma entidade

const app = express();

app.use(express.json());
app.use(routes);

app.listen(3333, () => {
	console.log("HTTP server runing!");
});
