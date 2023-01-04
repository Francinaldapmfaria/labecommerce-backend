import { TUser } from "./types"
import { TProduct } from "./types"
import { TPurchase } from "./types"

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
        name:"carrinho",
        price:50,
        category:"brinquedo",
    },

    {
        id:"1200",
        name:"boneca",
        price:60,
        category:"brinquedo", 
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