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

        const newuser = { id, email, password }

        if (id !== newuser.id) {
            res.status(201).send('Cadastro realizado com sucesso')
            users.push(newuser)
        } else {
            res.status(400)
            throw new Error("Usuário ja existente")
        }

    } catch (error) {
        console.log(error)

        if (response.statusCode == 200) {
            res.status(500)
        }

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

    } catch (error) {
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

        if (id !== newProduct.id) {
            res.status(201).send("Produto registrado")
            products.push(newProduct)
        } else {
            res.status(400)
            throw new Error("Produto ja existente")
        }

    } catch (error) {
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
app.get('/products/search', (req: Request, res: Response) => {
    try {
        const q = req.query.q as string

        const result = products.filter((product) => {
            return product.name.toLowerCase().includes(q.toLowerCase())
        })
        if (q.length <= 0) {
            res.status(400)
            throw new Error('o query precisa de um parâmetro')
        }
        res.status(200).send(result)

    } catch (error) {
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
// validar que o produto existe??? NÃO FIZ

app.get('/products/:id', (req: Request, res: Response) => {
    try {


        //VERIFICAR SE A VALIDAÇÃO ESTA CERTA???
        const id = req.params.id

        const result = products.find((product) => {
            return product.id === id
        })
        if (id !== result.id) {
            res.status(400)
            throw new Error("Produto não existe")
        }
        res.status(200).send(result)


    }
    catch (error) {
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

//=================================================NÃO FIZ A LÓGICA================================
//EXERCÍCIO 1.6
// CREATE PURCHASE
// validar o body
// extra:
// id do usuário que fez a compra deve existir no array de usuários cadastrados
// id do produto que foi comprado deve existir no array de produtos cadastrados
// a quantidade e o total da compra devem estar com o cálculo correto

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
            throw new Error("'quantity' deve ser um namber")
        }
        if (typeof totalPrice !== "number") {
            throw new Error("'totalPrice' deve ser um number")
        }

        const newpurchases = { userId, productId, quantity, totalPrice }

        // if(userId === users.id)

        purchases.push(newpurchases)
        res.status(201).send(" registrado")
    } catch (error) {
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


//EXERCÍCIO 2.2 =========================NÃO FIZ A LOGICA

// Get User Purchases by User id
// validar que o usuário existe

app.get('/users/:id/purchases', (req: Request, res: Response) => {
    try {
        const id = req.params.id

        ///VERIFICAR SE TA CERTO

        if (id !== undefined) {
            // if(id !== purchases.userId )
            // res.status(400)
            throw new Error("Usuario não existe")
        }
        const result = purchases.filter((purchase) => {
            return purchase.userId === id
        })
        res.status(200).send(result)

    } catch (error) {
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

//exercício 2.3

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

        //FAZER A LÓGICA

        const id = req.params.id

        const userIndex = users.findIndex((user) => {
            return user.id === id
        })
        console.log("index:", userIndex)

        if (userIndex >= 0) {
            users.splice(userIndex, 1)
            res.status(200).send("Usuário apagado com sucesso")
        } else {
            res.status(404).send("usuário não encontrado")
        }

    } catch (error) {
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
// validar que o produto existe         ====  FAZER A LÓGICA====

app.delete('/products/:id', (req: Request, res: Response) => {
    try {
        const id = req.params.id as string

        const productIndex = products.findIndex((product) => {
            return product.id === id
        })
        console.log("index:", productIndex)

        if (productIndex >= 0) {
            users.splice(productIndex, 1)
            res.status(200).send("Produto apagado com sucesso")
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

        const { id, email, password } = req.body as TUser | undefined
        const response = req.params.id


        
        const result = users.find((user) => {
            return user.id === response
        })
        //if para não apagar os que não foram atualizados
        if (result) {
            result.id = req.body.id || result.id
            result.email = req.body.email || result.email
            result.password = req.body.password || result.password
            res.status(200).send("Cadastro atualizado com sucesso")
        } else {
            res.status(404).send("Não encontrado")
        }
    } catch (error) {

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

app.put('/products/:id', (req: Request, res: Response) => {
    //para que usuario consiga editar id(só parao dev), nome, tipo....

    //desestruturado
    const { id, name, price, category } = req.body as TProduct | undefined
    const response = req.params.id
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
        res.status(404).send("Não encontrado")
    }

})