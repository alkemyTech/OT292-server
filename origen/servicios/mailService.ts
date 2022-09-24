import sgMail from '@sendgrid/mail';
const ejs = require('ejs');
const read = require('fs').readFileSync;
const join = require('path').join;


async function sendMail (to: string, data: any, email:string, subject:string) {
          // ruta template
          sgMail.setApiKey(process.env.SENDGRID_API_KEY!);
      
          const str = read(join(__dirname, '../views/plantillaemail.ejs'), 'utf8');

          // body para el mail
        
          const body = ejs.compile(str)(data);
          const msg = {
    to,
    from: email,
    subject,
    html: body
    
  };
  try {
    await sgMail.send(msg);
  } catch (error: unknown) {
    console.error(error);
  }
}

export default sendMail
