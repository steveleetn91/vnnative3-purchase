export interface Vnnative3PurchaseWhenInterface {
    hasProduct(getProdInfo: Function) : Vnnative3PurchaseWhenInterface
    approved(getProdInfo: Function) : Vnnative3PurchaseWhenInterface
    cancelled(callback : Function) : Vnnative3PurchaseWhenInterface 
}
export interface Vnnative3PurchaseHasProdOptionInterface {
    title: number | string,
    state: string,
    description: string,
    price: string | number,
    id: string | number,
    canPurchase: string | number | boolean
}
export interface Vnnative3PurchaseInterface {
    plugin : any;
    checkPluginConnect(success : Function,error: Function) : Function
    register(options: {
        id: string,
        type: string | number
    } | Array<{
        id: string,
        type: string | number
    }>) : Vnnative3PurchaseInterface 
    error(callback : Function) : void
    order(product_id: string | number) : Vnnative3PurchaseInterface 
    when(product_id : string | number,callback: Function) : Vnnative3PurchaseWhenInterface 
}