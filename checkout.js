import { cart, addtocart } from '../cart.js';
import { products } from '../data/products.js';
let checkoutHtml = "";


cart.forEach((cartItem) => {
    let matchedProduct;
    const product = cartItem.productId;
    
    products.forEach((product) =>{
        if(product === product.id){
            matchedProduct = product;
        }

    })
});
