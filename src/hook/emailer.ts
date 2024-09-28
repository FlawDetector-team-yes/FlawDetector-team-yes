import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  host: process.env.EMAILER_EMAIL,
  port: 2525,
  secure: false,
  auth: {
    user: process.env.EMAILER_NAME,
    pass: process.env.EMAILER_PASSWORD,
  },
});
export type ContactType = {
  email: string;
  name: string;
  content: string;
};

type MailOptionType = {
  to: string;
  from: string;
  subject: string;
  html: string;
};

export function sendEmail({ email, name, content }: ContactType) {
  const mailOptions: MailOptionType = {
    to: "69a7a22b1a-7849fa@inbox.mailtrap.io",
    from: email,
    subject: `[서비스문의]: ${name}`,
    html: `
    		<h1>이름:${name}</h1>
    		<div>message:${content}</div>
    		</br>
    		<p>보낸사람 : ${email}</p>
    		`,
  };
  return transporter.sendMail(mailOptions);
}
