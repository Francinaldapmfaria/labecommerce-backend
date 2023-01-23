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

//getAllusers


// app.get('/users', (req: Request, res: Response) => {
//     res.status(200).send(users)

// })

//não precisa de validação,basta refatorar para o uso do try/catch EXERCICIO 1.1
app.get('/users', (req: Request, res: Response) => {
    try {
        res.status(200).send(users)


    } catch (error: any) {
        console.log(error)

        if (res.statusCode === 200) {
            res.status(500)
        }
        res.send(error.message)
    }


})
//==============================================================================================
//add createusers

//Create User
// app.post('/users', (req: Request, res: Response) => {
//     const { id, email, password } = req.body as TUser

//     const newuser = {
//         id,
//         email,
//         password
//     }

//     users.push(newuser)
//     res.status(201).send("Usuario registrado")
// })


//EXERCICIO 1.4
// validar o body
// extra:
// não deve ser possível criar mais de uma conta com a mesma id
// não deve ser possível criar mais de uma conta com o mesmo e-mail

app.post('/users', (req: Request, res: Response) => {

    try {
        const { id, email, password } = req.body

        if (typeof id !== "string") {
            res.status(400)
            throw new Error("'id' deve ser uma string ")
        }
        if (typeof email !== "string") {
            res.status(400)
            throw new Error("'email' deve ser uma string ")
        }
        if (typeof password !== "string") {
            res.status(400)
            throw new Error("'password' deve ser uma string ")
        }

        const newUser = { id, email, password }

        const user = users.find((user) => user.id === id)
        const userEmail = users.find((user) => user.email === email)

        if (user) {
            res.status(400)
            throw new Error("Id já existe")
        }
        if (userEmail) {
            res.status(400)
            throw new Error("Email já existe")
        }
        if (!email.match(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g)) {
            throw new Error("Parâmetro 'email' inválido")
        } else {
            users.push(newUser)
            res.status(201).send("Usuário Cadastrado")
        }


    } catch (error: any) {
        console.log(error)
        if (response.statusCode == 200) {
            res.status(500)
        }
        res.send(error.message)

    }

})



//PRODUCTS=================================================================================



// app.get('/products', (req: Request, res: Response) => {
//     res.status(200).send(products)
// })

//não precisa de validação,basta refatorar para o uso do try/catch EXERCICIO 1.2

app.get('/products', (req: Request, res: Response) => {
    try {
        res.status(200).send(products)

    } catch (error: any) {
        console.log(error)

        if (res.statusCode === 200) {
            res.status(500)
        }
        res.send(error.message)
    }

})
//add products

//EXERCICIO 1.5
//CREATE PRODUCT 
//validar o body
//extra:
//não deve ser possível criar mais de um produto com a mesma id

// app.post('/products', (req: Request, res: Response) => {  
//     const { id, name, price, category } = req.body as TProduct
//     const newProduct = {
//         id,
//         name,
//         price,
//         category
//     }
//     products.push(newProduct)
//     res.status(201).send("Produto registrado")
// })

app.post('/products', (req: Request, res: Response) => {
    try {

        const { id, name, price, category } = req.body

        if (typeof id !== "string") {
            res.status(400)
            throw new Error("'id' deve ser uma string ")
        }
        if (typeof name !== "string") {
            res.status(400)
            throw new Error("'Nome' deve ser uma string")
        }
        if (typeof price !== "number") {
            res.status(400)
            throw new Error("'Price' deve ser um number")
        }
        if (typeof category !== "string") {
            res.status(400)
            throw new Error("'Category' deve ser uma string")
        }

        const newProduct = { id, name, price, category }

        const product = products.find((product) => product.id === id)

        if (!product) {
            products.push(newProduct)
            res.status(201).send('Cadastro realizado com sucesso')
        } else {
            res.status(400)
            throw new Error("Produto já existe")
        }

    } catch (error: any) {
        console.log(error)
        if (res.statusCode === (200)) {
            res.status(500)
        }
        res.send(error.message)


    }
})


//procurar produtos por nome

// app.get('/products/search', (req: Request, res: Response) => {
//     const q = req.query.q as string

//     const result = products.filter((product) => {
//         return product.name.toLowerCase().includes(q.toLowerCase())
//     })
//     res.status(200).send(result)
// })

//refatorado para o uso do try/catch EXERCICIO 1.3
//query params deve possuir pelo menos um caractere

app.get('/products/search', (req: Request, res: Response) => {
    try {
        const q = req.query.q

        const result = products.filter((product) => {
            return product.name === q
        })

        if (q !== undefined) {
            if (q.length > 1) {
                res.status(200).send(result)

            } else {
                res.status(400)
                throw new Error("O 'q' deve termais de 1 caracter")
            }

        }


    } catch (error: any) {
        console.log(error)
        if (res.statusCode === 200) {
            res.status(500)
        }
        res.send(error.message)
    }
})


//==================================================================================================

//params
//Get Products by id

// app.get('/products/:id', (req: Request, res: Response) => {
//     const id = req.params.id

//     const result = products.find((product) => {
//         return product.id === id
//     })
//     res.status(200).send(result)
// })

//EXERCÍCIO 2.1 aula 6
// Get Products by id
// validar que o produto existe

app.get('/products/:id', (req: Request, res: Response) => {
    try {

        const id = req.params.id

        const result = products.find((product) => {
            return product.id === id
        })

 
    if(result) {
        res.status(200).send(result)
    }else {
        res.status(404)
        throw new Error("Produto inexistente")
       
    }
}catch (error: any) {
        console.log(error)

        if (res.statusCode === 200) {
            res.status(500)
        }
        res.send(error.message)
    }
})

//PURCHASS===========================================================================
//add purchases

// app.post('/purchases', (req: Request, res: Response) => {
//     const { userId, productId, quantity, totalPrice } = req.body as TPurchase

//     const newpurchases = {
//         userId,
//         productId,
//         quantity,
//         totalPrice
//     }

//     purchases.push(newpurchases)
//     res.status(201).send(" registrado")
// })


//=================================================================================

//EXERCÍCIO 1.6
// CREATE PURCHASE
// validar o body
// extra:
// id do usuário que fez a compra deve existir no array de usuários cadastrados-logica feira
// id do produto que foi comprado deve existir no array de produtos cadastrados-logica feita
// a quantidade e o total da compra devem estar com o cálculo correto- FALTA FAZER A LOGICA

app.post('/purchases', (req: Request, res: Response) => {
    try {
        const { userId, productId, quantity, totalPrice } = req.body

        if (typeof userId !== "string") {
            res.status(400)
            throw new Error("'userId' deve ser uma string ")
        }
        if (typeof productId !== "string") {
            res.status(400)
            throw new Error("'productId' deve ser uma string")
        }
        if (typeof quantity !== "number") {
            res.status(400)
            throw new Error("'quantity' deve ser um number")
        }
        if (typeof totalPrice !== "number") {
            res.status(400)
            throw new Error("'totalPrice' deve ser um number")
        }
        const newPurchases = { userId, productId, quantity, totalPrice }

        const userPurchase = users.find((user) => user.id === userId)
        const product = products.find((product) => product.id === productId)

        if (!userPurchase) {
            res.status(400)
            throw new Error('Compra impossibilitada, realize um cadastro')

        } if (!product) {
            res.status(400)
            throw new Error('Produto inexistente, digite um id de produto válido')
        }

        if ((product.price * quantity) !== (totalPrice)) {
            throw new Error("Valor Incorreto")
        }

        else {
            purchases.push(newPurchases)
            res.status(201).send("Compra registrada")
        }

    } catch (error: any) {
        console.log(error)
        if (res.statusCode === 200) {
            res.status(500)
        }
        res.send(error.message)
    }

})


//============================================================================================

//falta fazer com params

//Get User Purchases by User id
//method HTTP (GET)
//path ("/users/:id/purchases")
//response
//status 200
//array de compras do user procurado

// app.get('/users/:id/purchases', (req: Request, res: Response) => {
//     const id = req.params.id

//     const result = purchases.filter((purchase) => {
//         return purchase.userId === id
//     })
//     res.status(200).send(result)
// })


//EXERCÍCIO 2.2 

// Get User Purchases by User id
// validar que o usuário existe

app.get('/users/:id/purchases', (req: Request, res: Response) => {
    try {
        const id = req.params.id

        const result = purchases.find((purchase) => {
            return purchase.userId === id}
            )

        if (!result) {
            res.status(404)
            throw new Error("Usuário não existe")
        }else{
        res.status(200).send(result)}

    } catch (error: any) {
        console.log(error)
        if (res.statusCode === 200) {
            res.status(500)
        }
        res.send(error.message)
    }

})

//=================================================================================================
//Delete User by id
//method HTTP (DELETE)
// path ("/users/:id")
// response
// status 200
// "User apagado com sucesso"

//EXERCÍCIO 2.3

// Delete User by id
// validar que o usuário existe

// app.delete('/users/:id', (req: Request, res: Response) => {
// const id = req.params.id

// const userIndex = users.findIndex((user) => {
//     return user.id === id
// })
// console.log("index:", userIndex)

// if (userIndex >= 0) {
//     users.splice(userIndex, 1)
//     res.status(200).send("Usuário apagado com sucesso")
// } else {
//     res.status(404).send("usuário não encontrado")
// }

app.delete('/users/:id', (req: Request, res: Response) => {
    try {

      

        const id = req.params.id

        //findIndex usado para objetos
        const userIndex = users.findIndex((user) => {
            return user.id === id
        })
        console.log("index:", userIndex)

        if (userIndex >= 0) {
            users.splice(userIndex, 1) //1 ta indicando q vai excluir 1
            res.status(200).send("Usuário apagado com sucesso")
        } else {
            res.status(404).send("usuário não encontrado")
        }

    } catch (error: any) {
        console.log(error)
        if (res.statusCode === 200) {
            res.status(500)
        }
        res.send(error.message)

    }
})

///=================================================================================================
//Delete Product by id

//  method HTTP (DELETE)
// path ("/products/:id")
// response
// status 200
// "Produto apagado com sucesso"

// app.delete('/products/:id', (req: Request, res: Response) => {
//     const id = req.params.id as string

//     const productIndex = products.findIndex((product) => {
//         return product.id === id
//     })
//     console.log("index:", productIndex)

//     if (productIndex >= 0) {
//         users.splice(productIndex, 1)
//         res.status(200).send("Produto apagado com sucesso")
//     } else {
//         res.status(404).send("Produto não encontrado")
//     }
// })

//EXERCICIO 2.4

// Delete Product by id
// validar que o produto existe  

app.delete('/products/:id', (req: Request, res: Response) => {
    try {
        const id = req.params.id as string

        const productIndex = products.findIndex((product) => {
            return product.id === id
        })
        console.log("index:", productIndex)

        if (productIndex >= 0) {
            products.splice(productIndex, 1)
            res.status(200).send("Produto apagado com sucesso")
        } else {
            res.status(404).send("Produto não encontrado")
        }


    } catch (error: any) {
        console.log(error)
        if (res.statusCode === 200) {
            res.status(500)
        }
        res.send(error.message)
    }
})



//================================================================================================
//Edit User by id
// method HTTP (PUT)
// path ("/users/:id")
// body
// email (parâmetro opcional)
// password (parâmetro opcional)
// response
// status 200
// "Cadastro atualizado com sucesso"

// app.put('/users/:id', (req: Request, res: Response) => {
//     //para que usuario consiga editar id(só parao dev), nome, tipo....

//     //desestruturado
//     const { id, email, password } = req.body as TUser | undefined
//     const response = req.params.id
//     const result = users.find((user) => {
//         return user.id === response
//     })
//     //if para não apagar os que não foram atualizados
//     if (result) {
//         result.id = req.body.id || result.id
//         result.email = req.body.email || result.email
//         result.password = req.body.password || result.password
//         res.status(200).send("Cadastro atualizado com sucesso")
//     } else {
//         res.status(404).send("Não encontrado")
//     }

// })

//EXERCICIO 2.5
// Edit User by id
// validar que o usuário existe
// validar o body

app.put('/users/:id', (req: Request, res: Response) => {
    try {

        const { id, email, password } = req.body
        const response = req.params.id


        if(id !== undefined){
            if (typeof id !== "string"){
                res.status(400)
                throw new Error("'id' deve ser uma string")
            }
        }
        
        if(email !== undefined){
            if (typeof email !== "string"){
                res.status(400)
                throw new Error("'email' deve ser uma string")
            }
        }
        if(password !== undefined){
            if (typeof password !== "string"){
                res.status(400)
                throw new Error("'password' deve ser uma string")
            }
        }
        
        const result = users.find((user) => {
            return user.id === response ///response é o id 
        })

      
        //if para não apagar os que não foram atualizados
        if (result) {
            result.id = req.body.id || result.id
            result.email = req.body.email || result.email
            result.password = req.body.password || result.password
            res.status(200).send("Cadastro atualizado com sucesso")
        
        } else {
            res.status(404)
            throw new Error ("Usuário não existe")
        }

    } catch (error: any) {
        console.log(error)
        if (res.statusCode === 200) {
            res.status(500)
        }
        res.send(error.message)
    }
})


//================================================================================================

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


    //para que usuario consiga editar id(só parao dev), nome, tipo....

    // desestruturado
//     const { id, name, price, category } = req.body as TProduct | undefined
//     const response = req.params.id
//     const result = products.find((product) => {
//         return product.id === response
//     })
//     //if para não apagar os que não foram atualizados
//     if (result) {
//         result.id = req.body.id || result.id
//         result.name = req.body.name || result.name
//         result.price = req.body.price || result.price
//         result.category = req.body.category || result.category
//         res.status(200).send("Cadastro atualizado com sucesso")
//     } else {
//         res.status(404).send("Não encontrado")
//     }

// })

//EXERCICIO 2.5
// Edit Product by id
// validar que o produto existe
// validar o body
app.put('/products/:id', (req: Request, res: Response) => {
try {
    const { id, name, price, category } = req.body
    const response = req.params.id
    
    if(id !== undefined){
        if (typeof id !== "string"){
            res.status(400)
            throw new Error("'id' deve ser uma string")
        }
    }
    
    if(name !== undefined){
        if (typeof name !== "string"){
            res.status(400)
            throw new Error("'email' deve ser uma string")
        }
    }
    if(price !== undefined){
        if (typeof price !== "number"){
            res.status(400)
            throw new Error("'password' deve ser uma number")
        }
    }

    if(category !== undefined){
        if (typeof category !== "string"){
            res.status(400)
            throw new Error("'password' deve ser uma string")
        }
    }

    
    const result = products.find((product) => {
        return product.id === response
    })
    //if para não apagar os que não foram atualizados
    if (result) {
        result.id = req.body.id || result.id
        result.name = req.body.name || result.name
        result.price = req.body.price || result.price
        result.category = req.body.category || result.category
        res.status(200).send("Cadastro atualizado com sucesso")
    } else {
        res.status(404).send("Produto não encontrado")
    }

} catch (error) {
    console.log(error)
    if (res.statusCode === 200) {
        res.status(500)
    }
    res.send(error.message)
}
})