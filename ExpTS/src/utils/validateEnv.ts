import { cleanEnv, port, str } from "envalid";

function validateEnv(){
    cleanEnv(process.env, {
        PORT: port(),
        NODE_ENV: str({ choices: ["production", "development"] }),
        PATH_LOGS: str({
            default: "./logs",
            desc: "Caminho para o diretório de logs"
        }),
    })
}

export default validateEnv