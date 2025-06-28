import { cleanEnv, port, str } from "envalid";

function validateEnv(){
    cleanEnv(process.env, {
        NODE_ENV: str({ choices: ["production", "development"] }),
        PATH_LOGS: str(),
        PORT: port(),
        DATABASE_URL: str({
            desc: "URL de conexão com o banco de dados, no formato postgres://user:password@localhost:5432/database"
        })
    })
}

export default validateEnv;