import { cleanEnv, port, str, num } from "envalid";

function validateEnv(){
    cleanEnv(process.env, {
        NODE_ENV: str({ choices: ["production", "development"] }),
        PATH_LOGS: str(),
        PORT: port(),
        ROUNDS_BCRYPT: num({
            desc: "Número de rounds para o bcrypt, padrão é 10",
            default: 10
        }),
        DATABASE_URL: str({
            desc: "URL de conexão com o banco de dados, no formato postgres://user:password@localhost:5432/database"
        })
    })
}

export default validateEnv;