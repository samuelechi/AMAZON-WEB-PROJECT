import { cart, addToCart, removeFromCart, updateDeliveryOption, loadCart } from '../cart.js';
import { products, loadProducts, loadProductsFetch } from '../data/products.js';
import { formatMoney } from '../styles/shared/util/money.js';
import { deliveryOptions } from './styles/shared/util/deliveryOptions.js';
import { renderOrderSummary } from './renderOrderSummary.js';
import { renderPaymentSummary } from './renderPaymentSummary.js';
import {Cart }from '../cart-oop.js';



async function loadPage() {
  try {
    // throw 'error1';

    await loadProductsFetch();

    const value = await new Promise((resolve, reject) => {
      // throw 'error2';
      loadCart(() => {
        // reject('error3');
        resolve('value3');
      });
    });

  } catch (error) {
    console.log('Unexpected error. Please try again later.');
  }

  renderOrderSummary();
  renderPaymentSummary();
}
loadPage();

//renderOrderSummary();
//renderPaymentSummary();






     









