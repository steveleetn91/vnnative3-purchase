export default interface Vnnative3PurchaseInterface {
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
    hasProduct(getProdInfo: Function) : Vnnative3PurchaseInterface
    approved(getProdInfo: Function) : Vnnative3PurchaseInterface
    cancelled(callback : Function) : Vnnative3PurchaseInterface 
    order(product_id: string | number) : Vnnative3PurchaseInterface 
    when(product_id : string | number,callback: Function) : Vnnative3PurchaseInterface 
}