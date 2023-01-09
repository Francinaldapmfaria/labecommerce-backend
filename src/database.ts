import { TUser } from "./types"
import { TProduct } from "./types"
import { TPurchase } from "./types"
import { CATEGORY } from "./types"

export const users: TUser [] =[
    {
        id:"10",
        email:"mickey@labenu.com",
        password:"111111",
    },
    {
        id:"11",
        email: "minnie@labe.com",
        password:"22222",
    }
]

export const products:TProduct [] = [
    {
        id:"1212",
        name:"boneca",
        price:50,
        category:CATEGORY.TOY,
    },

    {
        id:"1200",
        name:"oculos",
        price:60,
        category:CATEGORY.ACESSORIES, 
    }
]

export const purchases: TPurchase []=[
    {
        userId:"10",
        productId:"1212",
        quantity:2,
        totalPrice:100
    },

    {
        userId:"11",
        productId:"1200",
        quantity:3,
        totalPrice:180
    }
]


export const  createUser = (idUser: string, emailUser: string, passwordUser:string) =>{

    let newUser = {
        id:idUser,
        email: emailUser,
        password: passwordUser
    }
    users.push(newUser)
    return console.log("Cadastro feito com sucesso")
}

export const createProduct= (id:string, name: string, price: number, category: string): string =>{
    const newProduct = {
        id: id,
        name: name,
        price: price,
        category: category
    }
    products.push(newProduct)
    return("Produto criado com sucesso")
}


export const getAllProducts = (): TProduct[ ]=> {
    return products
}

export const getProductById = (idToSearch: string) : TProduct[] | undefined =>{
    return  products.filter((product)=>{
        if(product.id === idToSearch){
            return product
        }
    })
}


