import path from 'path';
import exphbs from "express-handlebars";

const viewPath = path.resolve(__dirname, '..', 'views', 'emails');

export default {
  viewEngine: exphbs.create({
    layoutsDir: viewPath,
    partialsDir: path.resolve(viewPath, 'partials'),
    defaultLayout: 'default',
    extname: '.hbs',
  }),
  viewPath,
  extName: '.hbs',
}