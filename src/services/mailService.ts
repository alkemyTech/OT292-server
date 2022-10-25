import sgMail from '@sendgrid/mail';
import ejs from 'ejs';
import { join } from 'path';
import { readFileSync as read } from 'fs';

export async function sendContactEmail(to: string) {
  const body = ejs.compile(read(join(__dirname, '../views/plantillaContacto.ejs'), 'utf8'))();
  sgMail.setApiKey(process.env.SENDGRID_API_KEY!);
  const msg = {
    to,
    from: process.env.SENDGRID_EMAIL_SENDER!,
    subject: 'Contact',
    html: body,
  };
  try {
    await sgMail.send(msg);
  } catch (error: unknown) {
    console.error(error);
  }
}

async function sendMail(to: string, data: any, email: string, subject: string) {
  // ruta template
  sgMail.setApiKey(process.env.SENDGRID_API_KEY!);
  const str = read(join(__dirname, '../views/plantillaemail.ejs'), 'utf8');

  // body para el mail

  const body = ejs.compile(str)(data);
  const msg = {
    to,
    from: process.env.EMAIL_SENDER!,
    subject,
    html: body,

  };
  try {
    await sgMail.send(msg);
  } catch (error: unknown) {
    console.error(error);
  }
}

export default sendMail;
