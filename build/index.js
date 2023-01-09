"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const database_1 = require("./database");
console.table((0, database_1.createUser)('Fran', 'fran@hjhjhj', '11111'));
console.log((0, database_1.getAllProducts)());
console.log((0, database_1.getProductById)('03'));
const cors_1 = __importDefault(require("cors"));
const express_1 = __importDefault(require("express"));
const app = (0, express_1.default)();
app.use(express_1.default.json);
app.use((0, cors_1.default)());
app.get('/ping', (req, res) => {
    res.send('pong');
});
//# sourceMappingURL=index.js.map