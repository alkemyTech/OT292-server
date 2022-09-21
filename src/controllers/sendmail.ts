
import Organization from "../models/organization";
import  sendMail  from "../services/mailService"

async function sendWelcomeEmail(mailto:string){
    console.log('ingreso a sendwelcome email')
    const contact = {

    }
    const data = {
        text: "Bienvenido a la ong",
        img: "https://upload.wikimedia.org/wikipedia/commons/6/63/Code_Icon.PNG?20141006223220",
        subject: "Welcome to ong",
        ongContact: [{
            type: 'Phone',
            value: "00000"
        },
        {
            type: 'Email',
            value: "fredyalberbaron@hotmail.com"
        }
    ],
    }
    await sendMail(mailto , data , "fredyalberbaron@hotmail.com", data.subject)
}

export default sendWelcomeEmail;