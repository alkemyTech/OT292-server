import sgMail from '@sendgrid/mail';

sgMail.setApiKey(process.env.SENDGRID_API_KEY!);

async function sendMail (to: string, subject: string, html: string) {
  const msg = {
    to,
    from: process.env.SENDGRID_EMAIL_SENDER!,
    subject,
    html
  };
  try {
    await sgMail.send(msg);
  } catch (error: unknown) {
    console.error(error);
  }
}

module.exports = {
  sendMail,
};
