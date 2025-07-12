import express, { Response, Request } from "express"
import dotenv from "dotenv"
import { engine } from "express-handlebars"
import cookieParser from 'cookie-parser';

declare module "express-session" {
    interface SessionData {
        user?: {
            id: string;
            name: string;
            email: string;
            majorId: string;
        };
        logado: boolean;
    }
}

import validateEnv from "./utils/validateEnv"
import logger from "./middlewares/logger"
import router from "./router/router"
import session from "express-session";
import { randomUUID } from "crypto";

// dotenv.config()
// validateEnv()
const PORT = process.env.PORT ?? 7782;
const publicPath = `${process.cwd()}/public`
console.log(`Public path: ${publicPath}`)

const app = express();

app.engine('handlebars', engine());
app.use(express.urlencoded({ extended: false })); 
app.use(express.json());

app.engine("handlebars", engine({
    helpers: require(`${__dirname}/views/helpers/helpers`)
}));
app.set('view engine', 'handlebars');
app.set('views', `${process.cwd()}/src/views/main`);
app.set('views', `${__dirname}/views`);

//app.use(morgan("combined"))
// app.use(logger("complete"))

app.use(
    session({
        genid: () => randomUUID(),
        secret: 'my-secret',
        resave: true,
        saveUninitialized: true,
    })
);

app.use(cookieParser());

//app.use((req, res, next) => {
//    console.log("Informações sobre acesso")
//    next()
//})

app.use('/css', express.static(`${publicPath}/css/`))
app.use('/js', express.static(`${publicPath}/js/`))
app.use('/img', express.static(`${publicPath}/img/`))
// use game
app.use('/game', express.static(`${publicPath}/game/`))

app.use(router);


app.listen(PORT, () => {
    console.log(`Express app iniciada na porta ${PORT}, link: http://localhost:${PORT}`);
});