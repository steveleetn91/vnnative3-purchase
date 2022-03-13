import Vnnative3PurchaseInterface from "./Vnnative3Purchase.interface";

export default class Vnnative3Purchase implements Vnnative3PurchaseInterface {
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
    hasProduct(getProdInfo: Function): Vnnative3Purchase {
        this.plugin.store = this.plugin.store.update((data: {
            title: number | string,
            state: string,
            description: string,
            price: string | number,
            id: string | number,
            canPurchase: string | number | boolean
        }) => {
            return getProdInfo(data);
        })
        return this;
    }
    approved(getProdInfo: Function): Vnnative3Purchase {
        this.plugin.store = this.plugin.store.approved((prod: any) => {
            getProdInfo(prod);
            return prod.finish();
        })
        return this;
    }
    cancelled(callback: Function): Vnnative3Purchase {
        this.plugin.store = this.plugin.store.cancelled((prod: any): Function => {
            return callback(prod);
        })
        return this;
    }
    order(product_id: string | number): Vnnative3Purchase {
        this.plugin.store.order(product_id);
        return this;
    }
    when(product_id: string | number): Vnnative3Purchase {
        this.plugin.store = this.plugin.store.when(product_id);
        return this;
    }
}