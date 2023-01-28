
import cors from 'cors'
import express, { request, Request, response, Response } from "express";
import { TProduct, TPurchase, TUser } from "./types";
import { db } from "./database/knex";


const app = express()

app.use(express.json())
app.use(cors())

app.listen(3003, () => {
    console.log("Servidor rodando na porta 3003")
})

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

app.get('/purchases', async (req: Request, res: Response) => {
    try {

        const getPurchase = req.query.q as string | undefined

        if (getPurchase === undefined) {
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
 
        const newUser: TUser = {
            id: id,
            name: name,
            email: email,
            password: password
        }

        await db("users").insert(newUser)
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

app.post('/purchases', async (req: Request, res: Response) => {
    try {
        const { id, buyer_id, total_price } = req.body
      
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

        await db("purchases").insert(newPurchases)
        
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


app.get('/products/:id', async (req: Request, res: Response) => {
    try {

        const searchId = req.params.id as string | undefined

        if (searchId !== undefined) {
            const [result]: TProduct[] | undefined[] = await db("products").where({ id: searchId })
            res.status(200).send(result)

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

app.get('/purchases/:id', async (req: Request, res: Response) => {
    try {

        const searchId = req.params.id as string | undefined

        if (searchId !== undefined) {
            const [result]: TProduct[] | undefined[] = await db("purchases").where({ id: searchId })
            res.status(200).send(result)

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

app.get('/users/:id/purchases', async (req: Request, res: Response) => {
    try {
       
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

    } catch (error: any) {
        console.log(error)
        if (res.statusCode === 200) {
            res.status(500)
        }
        res.send(error.message)

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



