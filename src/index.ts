import { users,products, purchases, getAllPurchasesFromUserId, queryProductsByName, getAllUsers, } from "./database";
import { createUser, getAllProducts,getProductById } from "./database";

// console.log("Usuários cadastrados")
// console.table(users)

// console.log("Produtos cadastrados")
// console.table(products)

// console.log("Compras")
// console.table(purchases)

console.table(createUser('Fran', 'fran@hjhjhj', '11111'))
console.log(getAllUsers())
console.log(getAllProducts())
console.log(getProductById('03'))
console.log(getAllPurchasesFromUserId('03'))
console.log(queryProductsByName)