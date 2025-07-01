import express, { Response, Request } from "express"
import dotenv from "dotenv"
import morgan from "morgan"
import { engine } from "express-handlebars"

import validateEnv from "./utils/validateEnv"
import logger from "./middlewares/logger"
import router from "./routers/router"

dotenv.config()
validateEnv()
const PORT = process.env.PORT ?? 7782;
const publicPath = `${process.cwd()}/public`
console.log(`Public path: ${publicPath}`)

const app = express();

//app.engine('handlebars', engine());
app.use(express.urlencoded({ extended: false })); 
app.use(express.json());

app.engine("handlebars", engine({
    helpers: require(`${__dirname}/views/helpers/helpers`)
}));
app.set('view engine', 'handlebars');
app.set('views', `${process.cwd()}/src/views/main`);
//app.set('views', `${__dirname}/views`);

//app.use(morgan("combined"))
app.use(logger("complete"))

//app.use((req, res, next) => {
//    console.log("Informações sobre acesso")
//    next()
//})

app.use('/css', express.static(`${publicPath}/css/`))
app.use('/js', express.static(`${publicPath}/js/`))
app.use('/img', express.static(`${publicPath}/img/`))

app.use(router);

app.listen(PORT, () => {
    console.log(`Express app iniciada na porta ${PORT}, link: http://localhost:${PORT}`);
});