import nodemailer from 'nodemailer';
import mail from '../config/mail';
import nodemailerhbs from "nodemailer-express-handlebars";
import path from 'path';
import hbsConfig from '../config/hbs'

class Mail {
    constructor(){
        const {host, port, secure, auth, from} = mail;

        this.transporter = nodemailer.createTransport({
            host, port, secure, auth
        });

        this.configureTemplate();
    }

    configureTemplate() {
        this.transporter.use(
          'compile',
          nodemailerhbs(hbsConfig)
        );
      }

    sendMail(data){
        this.transporter.sendMail(data);
    }
}

export default new Mail();