import { cleanEnv, port, str } from "envalid";

function validateEnv(){
    cleanEnv(process.env, {
        PORT: port(),
        NODE_ENV: str({ choices: ["production", "development"] })
    })
}

export default validateEnv