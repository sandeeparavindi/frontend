import {Inventory} from './Inventory';

export class Product {
    id: number;
    name: string;
    description: string;
    price: number;
    inventories: Inventory[];

    constructor(id: number, name: string, description: string, price: number, inventories: Inventory[]) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.price = price;
        this.inventories = inventories;
    }
}
