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
<<<<<<< HEAD
console.log(getAllPurchasesFromUserId('03'))
console.log(queryProductsByName)
=======

import cors from 'cors'
import express, {request, Request, response, Response} from "express";
import { TProduct, TPurchase, TUser } from "./types";

const app = express()

app.use(express.json())
app.use(cors())

app.listen(3003, () => {
    console.log("Servidor rodando na porta 3003")
})

//teste

app.get('/ping' ,(req: Request, res: Response)=>{

    res.send('pong')
    })

    //USERS====================================================================================

    //Allusers

    app.get('/users', (req: Request, res: Response)=>{
        res.status(200).send(users)

    })

    //add users

    app.post('/users', (req: Request, res: Response) =>{
        const {id, email, password}= req.body as TUser

        const newuser ={
            id,
            email,
            password
        }

        users.push(newuser)
        res.status(201).send("Usuario registrado")
    })


    //PRODUCTS=================================================================================

    app.get('/products', (req: Request, res:Response) =>{
        res.status(200).send(products)
    })

    //add products

      app.post('/products', (req: Request, res: Response) =>{
        const {id, name, price, category}= req.body as TProduct

        const newProduct ={
            id,
            name,
            price,
            category
        }

        products.push(newProduct)
        res.status(201).send("Produto registrado")
    })


    //procurar produtos por nome

    app.get('/products/search', (req: Request, res:Response) =>{
        const q = req.query.q as string

        const result = products.filter((product)=>{
            return product.name.toLowerCase().includes(q.toLowerCase())
        })
        res.status(200).send(result)
    })

    
  
    //PURCHASS===========================================================================

     //add purchases

    app.post('/purchases', (req: Request, res: Response) =>{
        const {userId,productId,quantity,totalPrice}= req.body as TPurchase

        const newpurchases ={
            userId,
            productId,
            quantity,
            totalPrice
        }

        purchases.push(newpurchases)
        res.status(201).send(" registrado")
    })
>>>>>>> main
