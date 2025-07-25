import {cart} from './cart.js';
import { products } from './data/products.js';
import { formatMoney } from './styles/shared/util/money.js';
import { deliveryOptions } from './styles/shared/util/deliveryOptions.js';
import { renderOrderSummary } from './renderOrderSummary.js';


let itemTotal = 0;
cart.forEach((cartItem) => {
    let matchingProduct;
    const productId = cartItem.productId;
    products.forEach((product) => {
        if (product.id === productId) {
            matchingProduct = product;
        }
    });
    itemTotal += matchingProduct.priceCents * cartItem.quantity;
});
console.log("Item Total:", itemTotal);
document.querySelector('.payment-summary-money').innerText = formatMoney(itemTotal);