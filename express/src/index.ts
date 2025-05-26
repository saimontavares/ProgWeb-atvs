import express from "express"
import dotenv from "dotenv"
import morgan from "morgan"

import validateEnv from "./utils/validateEnv"
import logger from "./middlewares/logger"

const app = express();
dotenv.config()

const PORT = process.env.PORT ?? 7782;

//app.use(morgan("combined"))
app.use(logger("complete"))

app.use((req, res, next) => {
    console.log("Informações sobre acesso")
    next()
})

app.get("/", (_req, res) => {
    res.send("Hello World!")
    // res.json({valor : 12})
})

app.get("/about", (_req, res) => {
    res.send("Página About!")
})

app.listen(PORT)