"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllPurchasesFromUserId = exports.createPurchase = exports.queryProductsByName = exports.getProductById = exports.getAllProducts = exports.createProduct = exports.getAllUsers = exports.createUser = exports.purchases = exports.products = exports.users = void 0;
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
const createUser = (id, email, password) => {
    const newUser = {
        id: id,
        email: email,
        password: password
    };
    exports.users.push(newUser);
    return "Cadastro feito com sucesso";
};
exports.createUser = createUser;
const getAllUsers = () => {
    return exports.users;
};
exports.getAllUsers = getAllUsers;
const createProduct = (id, name, price, category) => {
    const newProduct = {
        id: id,
        name: name,
        price: price,
        category: category
    };
    exports.products.push(newProduct);
    return "Produto criado com sucesso";
};
exports.createProduct = createProduct;
const getAllProducts = () => {
    return exports.products;
};
exports.getAllProducts = getAllProducts;
const getProductById = (idToSearch) => {
    return exports.products.filter((product) => {
        if (product.id.toLowerCase === idToSearch.toLowerCase) {
            return product;
        }
    });
};
exports.getProductById = getProductById;
const queryProductsByName = (q) => {
    return exports.products.filter((product) => {
        if (product.name.toLowerCase() === q.toLowerCase()) {
            return product;
        }
    });
};
exports.queryProductsByName = queryProductsByName;
const createPurchase = (userId, productId, quantity, totalPrice) => {
    const newPurchase = {
        userId: userId,
        productId: productId,
        quantity: quantity,
        totalPrice: totalPrice
    };
    exports.purchases.push(newPurchase);
    return "Produto criado com sucesso";
};
exports.createPurchase = createPurchase;
const getAllPurchasesFromUserId = (userIdToSearch) => {
    return exports.purchases.filter((purchase) => {
        return purchase.userId.toLowerCase().includes(userIdToSearch.toLowerCase());
    });
};
exports.getAllPurchasesFromUserId = getAllPurchasesFromUserId;
//# sourceMappingURL=database.js.map