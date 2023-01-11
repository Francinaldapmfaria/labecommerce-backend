import { users, products, purchases, getAllPurchasesFromUserId, queryProductsByName, getAllUsers, } from "./database";
import { createUser, getAllProducts, getProductById } from "./database";
import cors from 'cors'
import express, { request, Request, response, Response } from "express";
import { TProduct, TPurchase, TUser } from "./types";

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



const app = express()

app.use(express.json())
app.use(cors())

app.listen(3003, () => {
    console.log("Servidor rodando na porta 3003")
})

//teste

app.get('/ping', (req: Request, res: Response) => {

    res.send('pong')
})

//USERS====================================================================================

//Allusers

app.get('/users', (req: Request, res: Response) => {
    res.status(200).send(users)

})

//add users

app.post('/users', (req: Request, res: Response) => {
    const { id, email, password } = req.body as TUser

    const newuser = {
        id,
        email,
        password
    }

    users.push(newuser)
    res.status(201).send("Usuario registrado")
})


//PRODUCTS=================================================================================

app.get('/products', (req: Request, res: Response) => {
    res.status(200).send(products)
})

//add products

app.post('/products', (req: Request, res: Response) => {
    const { id, name, price, category } = req.body as TProduct

    const newProduct = {
        id,
        name,
        price,
        category
    }

    products.push(newProduct)
    res.status(201).send("Produto registrado")
})


//procurar produtos por nome

app.get('/products/search', (req: Request, res: Response) => {
    const q = req.query.q as string

    const result = products.filter((product) => {
        return product.name.toLowerCase().includes(q.toLowerCase())
    })
    res.status(200).send(result)
})

//params
//Get Products by id

app.get('/products/:id', (req: Request, res: Response) => {
    const id = req.params.id

    const result = products.find((product) => {
        return product.id === id
    })
    res.status(200).send(result)
})

//PURCHASS===========================================================================
//add purchases

app.post('/purchases', (req: Request, res: Response) => {
    const { userId, productId, quantity, totalPrice } = req.body as TPurchase

    const newpurchases = {
        userId,
        productId,
        quantity,
        totalPrice
    }

    purchases.push(newpurchases)
    res.status(201).send(" registrado")
})
//falta fazer com params

//Get User Purchases by User id
//method HTTP (GET)
//path ("/users/:id/purchases")
//response
//status 200
//array de compras do user procurado

app.get('/users/:id/purchases', (req: Request, res: Response) => {
    const id = req.params.id

    const result = purchases.filter((purchase) => {
        return purchase.userId === id
    })
    res.status(200).send(result)
})


    //Delete User by id
    //method HTTP (DELETE)
    // path ("/users/:id")
    // response
    // status 200
    // "User apagado com sucesso"

    app.delete('/users/:id', (req: Request, res: Response)=>{
        const id= req.params.id as string

        const userIndex= users.findIndex((user)=>{
            return user.id ===id
        })
        console.log("index:", userIndex)

        if(userIndex >= 0){
            users.splice(userIndex,1)
            res.status(200).send("Usuário apagado com sucesso")
        }else{
            res.status(404).send("usuário não encontrado")
        }
    })

    //Delete Product by id

    //  method HTTP (DELETE)
    // path ("/products/:id")
    // response
    // status 200
    // "Produto apagado com sucesso"

    app.delete('/products/:id', (req: Request, res: Response)=>{
        const id= req.params.id as string

        const productIndex= products.findIndex((product)=>{
            return product.id ===id
        })
        console.log("index:", productIndex)

        if(productIndex >= 0){
            users.splice(productIndex,1)
            res.status(200).send("Produto apagado com sucesso")
        }else{
            res.status(404).send("Produto não encontrado")
        }
    })

    //Edit User by id
    // method HTTP (PUT)
    // path ("/users/:id")
    // body
    // email (parâmetro opcional)
    // password (parâmetro opcional)
    // response
    // status 200
    // "Cadastro atualizado com sucesso"

    app.put('/users/:id', (req: Request, res: Response)=>{
        //para que usuario consiga editar id(só parao dev), nome, tipo....

        //desestruturado
        const {id, email, password}= req.body as TUser | undefined
         const response = req.params.id
         const result = users.find((user)=>{
            return user.id === response
         })
         //if para não apagar os que não foram atualizados
         if(result){
            result.id = req.body.id || result.id
            result.email = req.body.email || result.email
            result.password = req.body.password || result.password
            res.status(200).send("Cadastro atualizado com sucesso")
         }else {
            res.status(404).send("Não encontrado")
         }

    } )

    //Edit Product by id
    //  method HTTP (PUT)
    // path ("/products/:id")
    // body
    // name (parâmetro opcional)
    // price (parâmetro opcional)
    // category (parâmetro opcional)
    // response
    // status 200
    // "Produto atualizado com sucesso"

    app.put('/products/:id', (req: Request, res: Response)=>{
        //para que usuario consiga editar id(só parao dev), nome, tipo....

        //desestruturado
        const {id, name, price, category}= req.body as TProduct | undefined
         const response = req.params.id
         const result = products.find((product)=>{
            return product.id === response
         })
         //if para não apagar os que não foram atualizados
         if(result){
            result.id = req.body.id || result.id
            result.name = req.body.name || result.name
            result.price = req.body.price || result.price
            result.category = req.body.category || result.category
            res.status(200).send("Cadastro atualizado com sucesso")
         }else {
            res.status(404).send("Não encontrado")
         }

    } )