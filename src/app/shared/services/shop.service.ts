import { EventEmitter } from "@angular/core";
import { CartProduct } from "../models/cartProduct";
import { Product } from "../models/product";

export class ShopService {
    constructor() { }

    categories = [
        {
            id: 1,
            name: 'Living Room'
        },
        {
            id: 2,
            name: 'Bedroom'
        },
        {
            id: 3,
            name: 'Kitchen'
        },
        {
            id: 4,
            name: 'Bathroom'
        }
    ];

    products: Product[] = [
        new Product(1, 1, 'Armchair', 9000, '../../assets/chair1.jpg', 0, "Beautiful shape and smooth lines. This Dining table ad five chairs where designed to mix contemporary design with classic comfort while looking incredibly modern and stylish. The beautiful natural wood is blended with the modern home style, so you can feel the warmth and comfort of home when you et home."),
        new Product(2, 1, 'Sofa', 31450, '../../assets/livingRoomFurniture.jpg', 32000, "Beautiful shape and smooth lines. This Dining table ad five chairs where designed to mix contemporary design with classic comfort while looking incredibly modern and stylish. The beautiful natural wood is blended with the modern home style, so you can feel the warmth and comfort of home when you et home."),
        new Product(3, 1, 'Pilow', 1125, '../../assets/pilow.jpg', 1500, "Beautiful shape and smooth lines. This Dining table ad five chairs where designed to mix contemporary design with classic comfort while looking incredibly modern and stylish. The beautiful natural wood is blended with the modern home style, so you can feel the warmth and comfort of home when you et home."),
        new Product(4, 1, 'Cosy Couch', 35000, '../../assets/krevet.jpg', 0, "Beautiful shape and smooth lines. This Dining table ad five chairs where designed to mix contemporary design with classic comfort while looking incredibly modern and stylish. The beautiful natural wood is blended with the modern home style, so you can feel the warmth and comfort of home when you et home."),
        new Product(5, 1, 'Chair', 5000, '../../assets/stolica_sto.jpg', 0, "Beautiful shape and smooth lines. This Dining table ad five chairs where designed to mix contemporary design with classic comfort while looking incredibly modern and stylish. The beautiful natural wood is blended with the modern home style, so you can feel the warmth and comfort of home when you et home."),
        new Product(6, 3, 'Kitchen table', 50000, '../../assets/kitchenTable.png', 0, "Beautiful shape and smooth lines. This Dining table ad five chairs where designed to mix contemporary design with classic comfort while looking incredibly modern and stylish. The beautiful natural wood is blended with the modern home style, so you can feel the warmth and comfort of home when you et home."),
        new Product(7, 3, 'Bar Stool', 3000, '../../assets/BarStools.jpg', 0, "Beautiful shape and smooth lines. This Dining table ad five chairs where designed to mix contemporary design with classic comfort while looking incredibly modern and stylish. The beautiful natural wood is blended with the modern home style, so you can feel the warmth and comfort of home when you et home."),
        new Product(8, 3, 'Kitchen', 189000, '../../assets/kitchen.jpg', 0, "Beautiful shape and smooth lines. This Dining table ad five chairs where designed to mix contemporary design with classic comfort while looking incredibly modern and stylish. The beautiful natural wood is blended with the modern home style, so you can feel the warmth and comfort of home when you et home.")
    ];

    cart: CartProduct[] = [];
    cartChange: EventEmitter<any> = new EventEmitter();
    cartNumber: number = 0;

    getProductsByCategoryId(categoryId: number) {
        return this.products.filter(
            p => p.categoryId == categoryId
        );
    }

    getProductsByProductId(productID: number) {
        return this.products.find(
            p => p.id == productID
        )
    }

    getPrevNextProducts(productID: number): number[] {
        var currentIndex = this.products.findIndex(x => x.id == productID);
        var prevIndex = currentIndex - 1;
        var nextIndex = currentIndex + 1;

        var prevId = 0;
        var nextId = 0;

        if (prevIndex >= 0 && prevIndex < this.products.length) {
            prevId = this.products[prevIndex].id;
        }
        if (nextIndex >= 0 && nextIndex < this.products.length) {
            nextId = this.products[nextIndex].id
        }

        return [prevId, nextId];
    }

    addToCart(product: Product, quantity: number) {
        var cartProduct = new CartProduct(product.id, product.name, product.price, product.imgSrc, parseInt(quantity.toString()));
        var x = this.cart.filter(
            p => p.id == product.id
        );
        if (x.length) {
            var index = this.cart.findIndex(x => x.id === product.id);
            this.cart[index].quantity = parseInt(this.cart[index].quantity.toString()) + parseInt(quantity.toString());
        }
        else {
            this.cart.push(cartProduct);
        }
    }

    removeFromCart(productID: number) {
        var productIndex = this.cart.findIndex(x => x.id == productID);
        this.cart.splice(productIndex, 1);
        this.emitCartNumberChangeEvent('-');
        return this.cart;
    }

    getCartProducts() {
        return this.cart;
    }

    emitCartNumberChangeEvent(operator: string) {
        if (operator == '+') {
            this.cartNumber++;
        }
        else {
            this.cartNumber--;
        }
        this.cartChange.emit(this.cartNumber);
    }

    getCartNumberChangeEmitter() {
        return this.cartChange;
    }

}