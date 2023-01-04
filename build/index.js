"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const database_1 = require("./database");
console.log("Usuários cadastrados");
console.table(database_1.users);
console.log("Produtos cadastrados");
console.table(database_1.products);
console.log("Compras");
console.table(database_1.purchases);
//# sourceMappingURL=index.js.map