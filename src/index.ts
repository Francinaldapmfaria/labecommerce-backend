// import { users, products, purchases, getAllPurchasesFromUserId, queryProductsByName, getAllUsers, } from "./database";
// import { createUser, getAllProducts, getProductById } from "./database";
import cors from 'cors'
import express, { request, Request, response, Response } from "express";
import { TProduct, TPurchase, TUser } from "./types";
import { db } from "./database/knex";

// console.log("Usuários cadastrados")
// console.table(users)

// console.log("Produtos cadastrados")
// console.table(products)

// console.log("Compras")
// console.table(purchases)

// console.table(createUser('Fran', 'fran@hjhjhj', '11111'))
// console.log(getAllUsers())
// console.log(getAllProducts())
// console.log(getProductById('03'))
// console.log(getAllPurchasesFromUserId('03'))
// console.log(queryProductsByName)

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

//KNEX 1.1-VOU DEIXAR SÓ COM KNEX
app.get('/users', async (req: Request, res: Response) => {
    try {
        const getUsers = req.query.q as string | undefined

        if (getUsers === undefined) {
            const result = await db.raw(`SELECT * FROM users`)
            res.status(200).send(result)
        }


    } catch (error: any) {
        console.log(error)

        if (req.statusCode === 200) {
            res.status(500)
        }

        if (error instanceof Error) {
            res.send(error.message)
        } else {
            res.send("Erro inesperado")
        }
    }
})

//PRODUCTS=================================================================================



// app.get('/products', (req: Request, res: Response) => {
//     res.status(200).send(products)
// })

//não precisa de validação,basta refatorar para o uso do try/catch EXERCICIO 1.2

//KNEX 1.2============VOU DEIXAR ASSIM SÓ COM KNEX

app.get('/products', async (req: Request, res: Response) => {
    try {

        const getProducts = req.query.q as string | undefined

        if (getProducts === undefined) {
            const result = await db.raw(`SELECT * FROM products`)
            res.status(200).send(result)
        }


    } catch (error: any) {
        console.log(error)

        if (res.statusCode === 200) {
            res.status(500)
        }
        if (error instanceof Error) {
            res.send(error.message)

        } else {
            res.send(error.message)
        }
    }

})

//GET ALL PURCHASES
app.get('/purchases', async (req: Request, res: Response) => {
    try {

        const getPurchases = req.query.q as string | undefined

        if (getPurchases === undefined) {
            const result = await db.raw(`SELECT * FROM purchases`)
            res.status(200).send(result)
        }


    } catch (error: any) {
        console.log(error)

        if (res.statusCode === 200) {
            res.status(500)
        }
        if (error instanceof Error) {
            res.send(error.message)

        } else {
            res.send(error.message)
        }
    }

})


//Search Product by name

// app.get('/products/search', (req: Request, res: Response) => {
//     const q = req.query.q as string

//     const result = products.filter((product) => {
//         return product.name.toLowerCase().includes(q.toLowerCase())
//     })
//     res.status(200).send(result)
// })

//refatorado para o uso do try/catch EXERCICIO 1.3
//query params deve possuir pelo menos um caractere

//================KNEX 1.3 -vou deixar assim com knex=====================

//abaixo é um endpoint //VERIFICAR O ERRO
app.get('/products/search', async (req: Request, res: Response) => {
    try {
        // const q = req.query.q
        const name = req.query.name as string | undefined

        // const result = products.filter((product) => {
        //     return product.name === q
        // })

        const result: TProduct[] | undefined = await db.raw(`
        SELECT * FROM products
        WHERE name LIKE "%${name}%";       
         `)

        // if (name === undefined) {
        //     res.status(200).send(result)
        // }

        if (!result) {
            res.status(404)
            throw new Error("Produto inexistente")
        }
        if (name !== undefined) {
            if (name.length > 1) {
                res.status(200).send(result)

            } else {
                res.status(400)
                throw new Error("O 'nome' deve ter mais de 1 caracter")
            }

        }

    } catch (error: any) {
        console.log(error)

        if (res.statusCode === 200) {
            res.status(500)
        }
        if (error instanceof Error) {
            res.send(error.message)

        } else {
            res.send(error.message)
        }
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

//KNEX 2.1
//KNEX aprofundamento 1.1

app.post('/users', async (req: Request, res: Response) => {

    try {
        const { id, name, email, password } = req.body

        if (id !== undefined) {
            if (typeof id !== "string") {
                res.status(400)
                throw new Error("'id' deve ser uma string ")

            }

            const [userIdGet]: TUser[] | undefined[] = await db("users").where({ id: id })

            if (userIdGet) {
                res.status(400)
                throw new Error("Id já existe")
            }
        }

        if (name !== undefined) {
            if (typeof name !== "string") {
                res.status(400)
                throw new Error("'name' deve ser uma string ")
            }
        }

        if (email !== undefined) {
            if (typeof email !== "string") {
                res.status(400)
                throw new Error("'email' deve ser uma string ")
            }

            const [userEmailGet]: TUser[] | undefined[] = await db("users").where({ email: email })

            if (userEmailGet) {
                res.status(400)
                throw new Error("Email já existe")
            }
            if (!email.match(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g)) {
                throw new Error("Parâmetro 'email' inválido")
            }
        }
        if (typeof password !== 'string') {
            res.status(400)
            throw Error("O 'password' deve ser uma string")
        }

        // if(password !== undefined){
        //     if (typeof password !== "string") {
        //         res.status(400)
        //         throw new Error("'password' deve ser uma string ")
        //     }

        //     if (!password.match("^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[$*&@#])[0-9a-zA-Z$*&@#]{8,}$")) {
        //         throw new Error(`Parâmetro 'senha' inválido: Use Mínimo de oito caracteres,
        //          uma letra maiúscula, uma letra minúscula, um número e um caractere especial.`);
        //     }

        // }

        const newUser: TUser = {
            id: id,
            name: name,
            email: email,
            password: password
        }

        // const user = users.find((user) => user.id === id)
        // const userEmail = users.find((user) => user.email === email)

        // await db.raw(`
        //     INSERT INTO users (id, name, email, password)
        //     VALUES ("${id}", "${name}", ${email}, "${password}, "${ created_at});???
        // `) // colocamos as expressões entre ${}



        await db("users").insert(newUser)
        // users.push(newUser)
        res.status(201).send("Usuário Cadastrado")

    } catch (error: any) {
        console.log(error)

        if (req.statusCode === 200) {
            res.status(500)
        }

        if (error instanceof Error) {
            res.send(error.message)
        } else {
            res.send("Erro inesperado")
        }

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

app.post('/products', async (req: Request, res: Response) => {
    try {

        const { id, name, price, description, image_url } = req.body

        const productGet: TProduct[] | undefined[] = await db("products")

        if (id !== undefined) {
            if (typeof id !== "string") {
                res.status(400)
                throw new Error("'id' deve ser uma string ")
            }
            const [productIdGet]: TProduct[] | undefined[] = await db("products").where({ id: id })

            if (productIdGet) {
                res.status(400)
                throw new Error("Id já existe")
            }
        }

        if (name !== undefined) {
            if (typeof name !== "string") {
                res.status(400)
                throw new Error("'Nome' deve ser uma string")
            }
        }

        if (price !== undefined) {
            if (typeof price !== "number") {
                res.status(400)
                throw new Error("'Price' deve ser um number")
            }
        }

        if (price !== undefined) {
            if (typeof description !== "string") {
                res.status(400)
                throw new Error("'description' deve ser uma string")
            }

        }


        const newProduct: TProduct = {
            id,
            name,
            price,
            description,
            image_url
        }

        await db("products").insert(newProduct)
        res.status(201).send("Produto cadastrado")

        // const product = products.find((product) => product.id === id)

        //knex
        // await db.raw(`
        //     INSERT INTO products (id, price, description)
        //     VALUES ("${id}", "${price}", ${desciption});


        //knex query builder
        // if (product) {
        //     products.push(newProduct)
        //     res.status(201).send('Cadastro realizado com sucesso')

    } catch (error: any) {
        console.log(error)

        if (req.statusCode === 200) {
            res.status(500)
        }

        if (error instanceof Error) {
            res.send(error.message)
        } else {
            res.send("Erro inesperado")
        }


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

app.post('/purchases', async (req: Request, res: Response) => {
    try {
        const { id, buyer_id, total_price } = req.body
      

        //validação
        if (id !== undefined) {
            if (typeof id !== "string") {
                res.status(400)
                throw new Error("'id' deve ser uma string ")
            }

            const [purchaseBayer]: TPurchase[] | undefined[] = await db("purchases").where({ buyer_id: buyer_id })

            if (!purchaseBayer) {
                res.status(400)
                throw new Error("Compra impossibilitada realize um cadastro")
            }

            const [purchaseId]: TPurchase[] | undefined[] = await db("purchases").where({ id: id })
            if (purchaseId) {
                res.status(400)
                throw new Error("Id compra já existe")
            }
        }

        if (typeof buyer_id !== "string") {
            res.status(400)
            throw new Error("'Buyer' deve ser uma string")
        }

        if (typeof total_price !== "number") {
            res.status(400)
            throw new Error("'Preço total' deve ser um número")
        }

        const newPurchases: TPurchase = { id, buyer_id, total_price }


        // const userPurchase = users.find((user) => user.id === userId)
        // const product = products.find((product) => product.id === productId)


        // await db.raw(`
        //     INSERT INTO purchases (userId, productId, quantity, totalPrice)
        //     VALUES ("${id}", "${price}", ${desciption});

        // if (!userPurchase) {
        //     res.status(400)
        //     throw new Error('Compra impossibilitada, realize um cadastro')

        // } if (!product) {
        //     res.status(400)
        //     throw new Error('Produto inexistente, digite um id de produto válido')
        // }

        // if ((product.price * quantity) !== (totalPrice)) {
        //     throw new Error("Valor Incorreto")
        // }


        await db("purchases").insert(newPurchases)
        // purchases.push(newPurchases)

        // await db("purchases_products").insert(newPurchases)

        res.status(201).send({
            message:"Compra realizada com sucesso",
            purchases:newPurchases

        })


    } catch (error: any) {
        console.log(error)

        if (req.statusCode === 200) {
            res.status(500)
        }

        if (error instanceof Error) {
            res.send(error.message)
        } else {
            res.send("Erro inesperado")
        }
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
// validar que o produto existe ???????????????????????????????????????????? TO AQUI

app.get('/products/:id', async (req: Request, res: Response) => {
    try {

        const searchId = req.params.id as string | undefined

        if (searchId !== undefined) {
            const [result]: TProduct[] | undefined[] = await db("products").where({ id: searchId })
            res.status(200).send(result)


            // const result = products.find((product) => {
            //     return product.id === id
            // })
        } else {
            res.status(404)
            throw new Error("Produto inexistente")
        }
    } catch (error: any) {
        console.log(error)

        if (req.statusCode === 200) {
            res.status(500)
        }

        if (error instanceof Error) {
            res.send(error.message)
        } else {
            res.send("Erro inesperado")
        }
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

app.get('/users/:id/purchases', async (req: Request, res: Response) => {
    try {
        // const id = req.params.id

        // const result = purchases.find((purchase) => {
        //     return purchase.userId === id

        const searchIdPurchase = req.params.id as string | undefined

            const result:TPurchase[] | undefined[] = await db("purchases").where({ buyer_id: searchIdPurchase })
            

            if (!result) {
                res.status(404)
                throw new Error("Usuário não existe")

            } else {
                res.status(200).send(result)
            }
        

    } catch (error: any) {
        console.log(error)

        if (req.statusCode === 200) {
            res.status(500)
        }

        if (error instanceof Error) {
            res.send(error.message)
        } else {
            res.send("Erro inesperado")
        }
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

app.delete('/users/:id', async (req: Request, res: Response) => {
    try {

        const idToDelete = req.params.id

        const [userIdToDelete]: TUser[] | undefined[] = await db("users").where({id: idToDelete })

        if (!userIdToDelete) {
            res.status(404)
            throw new Error("'id' não encontrado")
        }

        await db("users").del().where({ id: idToDelete })
        res.status(200).send({ message: "Usuario deletado com sucesso" })

        // //findIndex usado para objetos
        // const userIndex = users.findIndex((user) => {
        //     return user.id === id
        // })
        // console.log("index:", userIndex)

        // if (userIndex >= 0) {
        //     users.splice(userIndex, 1) //1 ta indicando q vai excluir 1
        //     res.status(200).send("Usuário apagado com sucesso")
        // } else {
        //     res.status(404).send("usuário não encontrado")
        // }

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

app.delete('/products/:id', async (req: Request, res: Response) => {
    try {
        const idToDelete = req.params.id

        const [productIdToDelete]: TUser[] | undefined[] = await db("products").where({ id: idToDelete })

        if (!productIdToDelete) {
            res.status(404)
            throw new Error("'id' não encontrado")
        }

        await db("products").del().where({ id: idToDelete })
        res.status(200).send({ message: "Produto deletado com sucesso" })

        // const productIndex = products.findIndex((product) => {
        //     return product.id === id
        // })
        // console.log("index:", productIndex)

        // if (productIndex >= 0) {
        //     products.splice(productIndex, 1)
        //     res.status(200).send("Produto apagado com sucesso")
        // } else {
        //     res.status(404).send("Produto não encontrado")
        // }


    } catch (error: any) {
        console.log(error)

        if (req.statusCode === 200) {
            res.status(500)
        }

        if (error instanceof Error) {
            res.send(error.message)
        } else {
            res.send("Erro inesperado")
        }
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

app.put('/users/:id', async (req: Request, res: Response) => {
    try {

        const { id, name, email, password } = req.body
        const idToEdit = req.params.id


        if (id !== undefined) {
            if (typeof id !== "string") {
                res.status(400)
                throw new Error("'id' deve ser uma string")
            }
        }

        if (name !== undefined) {
            if (typeof name !== "string") {
                res.status(400)
                throw new Error("'name' deve ser uma string")
            }
        }

        if (email !== undefined) {
            if (typeof email !== "string") {
                res.status(400)
                throw new Error("'email' deve ser uma string")
            }
        }
        if (password !== undefined) {
            if (typeof password !== "string") {
                res.status(400)
                throw new Error("'password' deve ser uma string")
            }
        }


        // const result = users.find((user) => {
        //     return user.id === response ///response é o id 
        // })

        const [result]: TUser[] | undefined[] = await db("users").where({ id: idToEdit })

        if (!result) {
            res.status(404)
            throw new Error("'id' não encontrado")
        }

        const userUpdate: TUser = {
            id: id || result.id,
            name: name || result.name,
            email: email || result.email,
            password: password || result.password
        }


        //if para não apagar os que não foram atualizados
        // if (result) {
        //     result.id = req.body.id || result.id
        //     result.email = req.body.email || result.email
        //     result.password = req.body.password || result.password
        //     res.status(200).send("Cadastro atualizado com sucesso")

        await db("users").update(userUpdate).where({ id: idToEdit })
        res.status(200).send({ message: "Usuário Editado com sucesso", users: userUpdate })

    } catch (error: any) {
        console.log(error)

        if (req.statusCode === 200) {
            res.status(500)
        }

        if (error instanceof Error) {
            res.send(error.message)
        } else {
            res.send("Erro inesperado")
        }
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
app.put('/products/:id', async (req: Request, res: Response) => {
    try {
        const { id, name, price, description, image_url } = req.body
        const idToEdit = req.params.id

        if (id !== undefined) {
            if (typeof id !== "string") {
                res.status(400)
                throw new Error("'id' deve ser uma string")
            }
        }

        if (name !== undefined) {
            if (typeof name !== "string") {
                res.status(400)
                throw new Error("'name' deve ser uma string")
            }
        }
        if (price !== undefined) {
            if (typeof price !== "number") {
                res.status(400)
                throw new Error("'price' deve ser uma number")
            }
        }

        if (description !== undefined) {
            if (typeof description !== "string") {
                res.status(400)
                throw new Error("'description' deve ser uma string")
            }
        }

        if (image_url !== undefined) {
            if (typeof image_url !== "string") {
                res.status(400)
                throw new Error("'image_url' deve ser uma string")
            }
        }

        // const result = products.find((product) => {
        //     return product.id === response
        // })
        //if para não apagar os que não foram atualizados

        const [result]: TProduct[] | undefined[] = await db("products").where({ id: idToEdit })

        if (!result) {
            res.status(404)
            throw new Error("'id' não econtrado")
        }

        const productUpdate: TProduct = {
            id: id || result.id,
            name: name || result.name,
            price: price || result.price,
            description: description || result.description,
            image_url: image_url || result.image_url
        }


        // if (result) {
        //     result.id = req.body.id || result.id
        //     result.name = req.body.name || result.name
        //     result.price = req.body.price || result.price
        //     result.description = req.body.category || result.description
        //     res.status(200).send("Cadastro atualizado com sucesso")
        // } else {
        //     res.status(404).send("Produto não encontrado")
        // }

        await db("products").update(productUpdate).where({ id: idToEdit })
        res.status(200).send({ message: "Produto Editado com sucesso", users: productUpdate })


    } catch (error) {
        console.log(error)

        if (req.statusCode === 200) {
            res.status(500)
        }

        if (error instanceof Error) {
            res.send(error.message)
        } else {
            res.send("Erro inesperado")
        }
    }
})


app.delete('/products/:id', async (req: Request, res: Response) => {
    try {
        const idToDelete = req.params.id

        const [productIdToDelete]: TUser[] | undefined[] = await db("products").where({ id: idToDelete })

        if (!productIdToDelete) {
            res.status(404)
            throw new Error("'id' não encontrado")
        }

        await db("products").del().where({ id: idToDelete })
        res.status(200).send({ message: "Produto deletado com sucesso" })

        // const productIndex = products.findIndex((product) => {
        //     return product.id === id
        // })
        // console.log("index:", productIndex)

        // if (productIndex >= 0) {
        //     products.splice(productIndex, 1)
        //     res.status(200).send("Produto apagado com sucesso")
        // } else {
        //     res.status(404).send("Produto não encontrado")
        // }


    } catch (error: any) {
        console.log(error)

        if (req.statusCode === 200) {
            res.status(500)
        }

        if (error instanceof Error) {
            res.send(error.message)
        } else {
            res.send("Erro inesperado")
        }
    }
})

//Delete purchase by id

app.delete('/purchases/:id', async (req: Request, res: Response) => {
    try {
        const idToDelete = req.params.id

        const [purchaseIdToDelete]: TPurchase[] | undefined[] = await db("purchases").where({ id: idToDelete })

        if (!purchaseIdToDelete) {
            res.status(404)
            throw new Error("'id' não encontrado")
        }

        await db("purchases").del().where({ id: idToDelete })
        res.status(200).send({ message: "Compra deletada com sucesso" })

        // const productIndex = products.findIndex((product) => {
        //     return product.id === id
        // })
        // console.log("index:", productIndex)

        // if (productIndex >= 0) {
        //     products.splice(productIndex, 1)
        //     res.status(200).send("Produto apagado com sucesso")
        // } else {
        //     res.status(404).send("Produto não encontrado")
        // }


    } catch (error: any) {
        console.log(error)

        if (req.statusCode === 200) {
            res.status(500)
        }

        if (error instanceof Error) {
            res.send(error.message)
        } else {
            res.send("Erro inesperado")
        }
    }
})

