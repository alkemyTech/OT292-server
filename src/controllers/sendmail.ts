import db from '../models/index';

import sendMail from '../services/mailService';

async function sendWelcomeEmail(mailto: string) {
  const organizations: any = await db.Organization.findOne({
    attributes: {
      exclude: ['id', 'createdAt', 'updatedAt', 'deletedAt', 'aboutUsText'],
    },
    order: [['id', 'DESC']],
  });

  const data = {
    text: organizations.welcomeText,
    img: organizations.image,
    subject: `Welcome to ${organizations.name}`,
    ongContact: [
      {
        type: 'Phone',
        value: organizations.phone,
      },
      {
        type: 'Email',
        value: organizations.email,
      },
    ],
  };
  await sendMail(mailto, data, organizations.email, data.subject);
}

export default sendWelcomeEmail;
