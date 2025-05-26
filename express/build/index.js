"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const app = (0, express_1.default)();
dotenv_1.default.config();
const PORT = process.env.PORT || 7782;
app.get("/", (_req, res) => {
    res.send("Hello World!");
});
app.get("/about", (_req, res) => {
    res.send("Página About!");
});
app.listen(PORT);
