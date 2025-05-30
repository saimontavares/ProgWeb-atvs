import { cleanEnv, port, str } from "envalid";

function validateEnv(){
    cleanEnv(process.env, {
        NODE_ENV: str({ choices: ["production", "development"] }),
        PATH_LOGS: str(),
        PORT: port(),
    })
}

export default validateEnv;