export class Inventory {
    id: number;
    quantity: number;
    location: string;
    productId: number;

    constructor(id: number, quantity: number, location: string, productId: number = 1) {
        this.id = id;
        this.quantity = quantity;
        this.location = location;
        this.productId = productId;
    }
}