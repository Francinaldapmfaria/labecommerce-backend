"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.purchases = exports.products = exports.users = void 0;
exports.users = [
    {
        id: "10",
        email: "mickey@labenu.com",
        password: "111111",
    },
    {
        id: "11",
        email: "minnie@labe.com",
        password: "22222",
    }
];
exports.products = [
    {
        id: "1212",
        name: "carrinho",
        price: 50,
        category: "brinquedo",
    },
    {
        id: "1200",
        name: "boneca",
        price: 60,
        category: "brinquedo",
    }
];
exports.purchases = [
    {
        userId: "10",
        productId: "1212",
        quantity: 2,
        totalPrice: 100
    },
    {
        userId: "11",
        productId: "1200",
        quantity: 3,
        totalPrice: 180
    }
];
//# sourceMappingURL=database.js.map