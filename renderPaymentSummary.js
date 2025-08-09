import {cart} from './cart.js';
import { products } from './data/products.js';
import { formatMoney } from './styles/shared/util/money.js';
import { deliveryOptions } from './styles/shared/util/deliveryOptions.js';
import { renderOrderSummary } from './renderOrderSummary.js';
import {addOrder} from './orders.js';


export function renderPaymentSummary() {
    let itemTotal = 0;
    let shippingTotal = 0;
    let beforeTaxTotal = 0;
    const taxRate = 0.1; // 10% tax rate
    let taxTotal = 0;
    let orderTotal = 0;
    let cartQuantity = 0;

    cart.forEach((cartItem) => {
        let matchingProduct;
        let deliveryOption;

        const productId = cartItem.productId;
        products.forEach((product) => {
            if (product.id === productId) {
                matchingProduct = product;
            }
        });
        itemTotal += matchingProduct.priceCents * cartItem.quantity;
        cartQuantity += cartItem.quantity;

        deliveryOptions.forEach((option) => {
            if (option.id === cartItem.deliveryOptionId) {
                deliveryOption = option;
            }
        });
        if (!deliveryOption) {
  console.warn('No matching delivery option found for:', cartItem.deliveryOptionId);
  return;
}

        shippingTotal += deliveryOption.price * cartItem.quantity;
    });
        beforeTaxTotal += itemTotal + shippingTotal;
        taxTotal = beforeTaxTotal * taxRate;
        orderTotal = beforeTaxTotal + taxTotal;
    
const paymentSummaryHtml =
        ` 
          <div class="payment-summary-title">
            Order Summary
          </div>

          <div class="payment-summary-row">
            <div>Items (${cartQuantity}):</div>
            <div class="payment-summary-money">$${formatMoney(itemTotal)}</div>
          </div>

          <div class="payment-summary-row">
            <div>Shipping &amp; handling:</div>
            <div class="payment-summary-money">$${formatMoney(shippingTotal)}</div>
          </div>

          <div class="payment-summary-row subtotal-row">
            <div>Total before tax:</div>
            <div class="payment-summary-money">$${formatMoney(beforeTaxTotal)}</div>
          </div>

          <div class="payment-summary-row">
            <div>Estimated tax (10%):</div>
            <div class="payment-summary-money">$${formatMoney(taxTotal)}</div>
          </div>

          <div class="payment-summary-row total-row">
            <div>Order total:</div>
            <div class="payment-summary-money">$${formatMoney(orderTotal)}</div>
          </div>

          <button class="place-order-button button-primary js-place-order">
            Place your order
          </button>`;
    
    document.querySelector(".js-payment-summary").innerHTML = paymentSummaryHtml;


  document.querySelector('.js-place-order')
    .addEventListener('click', async () => {
      try {
        const response = await fetch('https://supersimplebackend.dev/orders', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            cart: cart
          })
        });

        const order = await response.json();
        addOrder(order);

      } catch (error) {
        console.log('Unexpected error. Try again later.');
      }

      window.location.href = 'orders.html';
    });
    
}



