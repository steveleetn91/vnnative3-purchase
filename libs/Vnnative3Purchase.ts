import {Vnnative3PurchaseHasProdOptionInterface, Vnnative3PurchaseInterface, Vnnative3PurchaseWhenInterface} from "./Vnnative3Purchase.interface";
class Vnnative3PurchaseWhen implements Vnnative3PurchaseWhenInterface {
    private mode : any;
    constructor(mode : any){
        this.mode = mode;
    }
    hasProduct(getProdInfo: Function): Vnnative3PurchaseWhenInterface {
        this.mode.update((production : Vnnative3PurchaseHasProdOptionInterface) => {
            return getProdInfo(production);
        })
        return this;
    }
    approved(getProdInfo: Function): Vnnative3PurchaseWhenInterface {
        this.mode.approved((prod: any): Function => {
            getProdInfo(prod);
            return prod.finish();
        })
        return this;
    }
    cancelled(callback: Function): Vnnative3PurchaseWhenInterface {
        this.mode.cancelled((prod: any): Function => {
            return callback(prod);
        })
        return this;
    }
}
export class Vnnative3Purchase implements Vnnative3PurchaseInterface {
    plugin: any = window;
    checkPluginConnect(success: Function, error: Function): Function {
        if (this.plugin.store) {
            return success(true);
        }
        return error({ message: "Please install plugin, or reinstall if it's not working" });
    }
    register(options: {
        id: string,
        type: string | number
    } | Array<{
        id: string,
        type: string | number
    }>): Vnnative3Purchase {
        this.plugin.store.register(options);
        return this;
    }
    error(callback: Function): void {
        this.plugin.store.error((error: {
            code: string | number,
            message: string
        }) => {
            callback(error)
        });
    }
    order(product_id: string | number): Vnnative3Purchase {
        this.plugin.store.order(product_id);
        return this;
    }
    when(product_id: string | number): Vnnative3PurchaseWhen {
        return new Vnnative3PurchaseWhen(this.plugin.store.when(product_id));
    }
}