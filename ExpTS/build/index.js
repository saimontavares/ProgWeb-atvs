"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const express_handlebars_1 = require("express-handlebars");
const validateEnv_1 = __importDefault(require("./utils/validateEnv"));
const logger_1 = __importDefault(require("./middlewares/logger"));
const router_1 = __importDefault(require("./routers/router"));
dotenv_1.default.config();
(0, validateEnv_1.default)();
const PORT = process.env.PORT ?? 7782;
const publicPath = `${process.cwd()}/public`;
console.log(`Public path: ${publicPath}`);
const app = (0, express_1.default)();
//app.engine('handlebars', engine());
app.use(express_1.default.urlencoded({ extended: false }));
app.use(express_1.default.json());
app.engine("handlebars", (0, express_handlebars_1.engine)({
    helpers: require(`${__dirname}/views/helpers/helpers`)
}));
app.set('view engine', 'handlebars');
app.set('views', `${process.cwd()}/src/views/main`);
//app.set('views', `${__dirname}/views`);
//app.use(morgan("combined"))
app.use((0, logger_1.default)("complete"));
//app.use((req, res, next) => {
//    console.log("Informações sobre acesso")
//    next()
//})
app.use('/css', express_1.default.static(`${publicPath}/css`));
app.use('/js', express_1.default.static(`${publicPath}/js`));
app.use('/img', express_1.default.static(`${publicPath}/img`));
app.use(router_1.default);
app.listen(PORT, () => {
    console.log(`Express app iniciada na porta ${PORT}, link: http://localhost:${PORT}`);
});
