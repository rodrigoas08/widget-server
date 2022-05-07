import { SubmitFeedbackUseCase } from "./submit-feedback-use-case";

//spies = espiões

const creatFeedbackSpy = jest.fn();
const sendMailSpy = jest.fn();

const submitFeedback = new SubmitFeedbackUseCase(
	{ create: creatFeedbackSpy },
	{ sendMail: sendMailSpy }
);

describe("Submit feedback", () => {
	it("should be able to submit a feedback", async () => {
		await expect(
			submitFeedback.execute({
				type: "BUG",
				comment: "example comment",
				screenshot: "data:image/png;base64",
			})
		).resolves.not.toThrow();

		expect(creatFeedbackSpy).toHaveBeenCalled();
		expect(sendMailSpy).toHaveBeenCalled();
	});

	it("should not be able to submit a feedback without a type", async () => {
		await expect(
			submitFeedback.execute({
				type: "",
				comment: "example comment",
				screenshot: "data:image/png;base64",
			})
		).rejects.toThrow();
	});

	it("should not be able to submit a feedback without a comment", async () => {
		await expect(
			submitFeedback.execute({
				type: "BUG",
				comment: "",
				screenshot: "data:image/png;base64",
			})
		).rejects.toThrow();
	});

	it("should not be able to submit a feedback with an screenshot invalid", async () => {
		await expect(
			submitFeedback.execute({
				type: "BUG",
				comment: "example comment",
				screenshot: "teste.jpg",
			})
		).rejects.toThrow();
	});
});
