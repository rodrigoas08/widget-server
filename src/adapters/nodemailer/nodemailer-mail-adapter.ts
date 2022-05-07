import { MailAdapter, SendMailData } from "../mail-adapter";
import nodemailer from "nodemailer";

const transport = nodemailer.createTransport({
	host: "smtp.mailtrap.io",
	port: 2525,
	auth: {
		user: "80f20efd135138",
		pass: "acd651622f94ea",
	},
});

export class NodemailerMailAdapter implements MailAdapter {
	async sendMail({ subject, body }: SendMailData) {
		await transport.sendMail({
			from: "Equipe Feedget<oi@feedget.com>",
			to: "Rodrigo <sobral_rodrigo@yahoo.com.br>",
			subject,
			html: body,
		});
	}
}
