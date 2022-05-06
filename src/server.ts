import express from "express";
import nodemailer from "nodemailer";
import { prisma } from "./prisma";

const app = express();

// GET = Buscar informações
// POST = Cadastrar informações
// PUT = Atualizar informações  de uma entidade
// PATCH = Atualizar uma informação única de uma entidade

app.use(express.json());

const transport = nodemailer.createTransport({
	host: "smtp.mailtrap.io",
	port: 2525,
	auth: {
		user: "80f20efd135138",
		pass: "acd651622f94ea",
	},
});

app.post("/feedbacks", async (req, res) => {
	const { type, comment, screenshot } = req.body;
	const feedback = await prisma.feedback.create({
		data: { type, comment, screenshot },
	});
	await transport.sendMail({
		from: "Equipe Feedget<oi@feedget.com>",
		to: "Rodrigo <sobral_rodrigo@yahoo.com.br>",
		subject: "Novo feedback",
		html: [
			`<div style="font-family: sans-serif; font-size: 16px; color: #444;">`,
			`<p>Tipo do feedback: ${type}</p>`,
			`</br>`,
			`<p>Comentário: ${comment}</p>`,
			`</div>`,
		].join("\n"),
	});
	return res.status(201).json({ data: feedback });
});

app.listen(3333, () => {
	console.log("HTTP server runing!");
});
