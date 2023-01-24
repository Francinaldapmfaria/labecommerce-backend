import { TUser } from "./types"
import { TProduct } from "./types"
import { TPurchase } from "./types"


export const users: TUser [] =[
    {
        id:"10",
        name: "Mickey",
        email:"mickey@labenu.com",
        password:"111111",
        created_at: "DATETIME"
    },
    {
        id:"11",
        name:"Minnie",
        email: "minnie@labe.com",
        password:"22222",
        created_at:""
    }
]

export const products:TProduct [] = [
    {
        id:"1212",
        name:"boneca",
        price:50,
        description:"brinquedo"
        
    },

    {
        id:"1200",
        name:"oculos",
        price:60,
        description:"acessorios" 
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


export const  createUser = (id: string,name:string, email: string, password:string, created_at:string): string =>{

    const newUser: TUser = {
        id:id,
        name:name,
        email: email,
        password: password,
        created_at:created_at
    }
    users.push(newUser)
    return "Cadastro feito com sucesso"
}

export const getAllUsers = (): TUser[] =>{
    return users
}

export const createProduct= (id:string, name: string, price: number, description: string): string =>{
    const newProduct = {
        id: id,
        name: name,
        price: price,
        description: description
    }
    products.push(newProduct)
    return "Produto criado com sucesso"
}


export const getAllProducts = (): TProduct[]=> {
    return products
}

export const getProductById = (idToSearch: string) : TProduct[] | undefined =>{
    return  products.filter((product)=>{
        if(product.id.toLowerCase === idToSearch.toLowerCase){
            return product
        }
    })
}

export const queryProductsByName = (q: string) : TProduct[] | undefined =>{
    return  products.filter((product)=>{
        if(product.name.toLowerCase() === q.toLowerCase()){
            return product
        }
    })
}

//Purchase criando
export const createPurchase= (userId: string, productId: string,quantity: number, totalPrice: number): string =>{
    const newPurchase: TPurchase = {
        userId: userId,
        productId: productId,
        quantity: quantity,
        totalPrice: totalPrice
    }
    purchases.push(newPurchase)
    return "Produto criado com sucesso"
}

export const getAllPurchasesFromUserId = (userIdToSearch: string)  =>{
    return  purchases.filter((purchase)=>{
            return purchase.userId.toLowerCase().includes(userIdToSearch.toLowerCase())
        })
    }






