"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getProductById = exports.getAllProducts = exports.createProduct = exports.createUser = exports.purchases = exports.products = exports.users = void 0;
const types_1 = require("./types");
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
        name: "boneca",
        price: 50,
        category: types_1.CATEGORY.TOY,
    },
    {
        id: "1200",
        name: "oculos",
        price: 60,
        category: types_1.CATEGORY.ACESSORIES,
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
const createUser = (idUser, emailUser, passwordUser) => {
    let newUser = {
        id: idUser,
        email: emailUser,
        password: passwordUser
    };
    exports.users.push(newUser);
    return console.log("Cadastro feito com sucesso");
};
exports.createUser = createUser;
const createProduct = (id, name, price, category) => {
    const newProduct = {
        id: id,
        name: name,
        price: price,
        category: category
    };
    exports.products.push(newProduct);
    return ("Produto criado com sucesso");
};
exports.createProduct = createProduct;
const getAllProducts = () => {
    return exports.products;
};
exports.getAllProducts = getAllProducts;
const getProductById = (idToSearch) => {
    return exports.products.filter((product) => {
        if (product.id === idToSearch) {
            return product;
        }
    });
};
exports.getProductById = getProductById;
//# sourceMappingURL=database.js.map