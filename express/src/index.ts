import express, { Response, Request } from "express"
import dotenv from "dotenv"
import morgan from "morgan"

import validateEnv from "./utils/validateEnv"
import logger from "./middlewares/logger"
import router from "./routers/router"


dotenv.config()
const PORT = process.env.PORT ?? 7782;
const publicPath = `${process.cwd()}/public`
console.log(`Public path: ${publicPath}`)

const app = express();

//app.use(morgan("combined"))
app.use(logger("complete"))

//app.use((req, res, next) => {
//    console.log("Informações sobre acesso")
//    next()
//})

app.use('/css', express.static(`${publicPath}/css`))
app.use('/js', express.static(`${publicPath}/js`))
app.use('/img', express.static(`${publicPath}/img`))

app.use(router);

app.listen(PORT, () => {
    console.log(`Express app iniciada na porta ${PORT}`);
});