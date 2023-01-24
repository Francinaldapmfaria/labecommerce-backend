export type TUser = {
    id: string;
    email: string;
    password:string;
    name: string;
    created_at:string;
}

export type TProduct= {
    id: string;
    name: string;
    price: number;
    description: string;
   
}
export type TPurchase = {
    userId: string;
    productId: string;
    quantity: number;
    totalPrice: number;
}


//vc pode usar UPPER_CASE OU Pascall_Case
export enum CATEGORY {
    ACESSORIES= "acessorio",
    TOY=  "brinquedo",
    SHOES= "Calçado"
}