import { cart, addToCart, removeFromCart, updateDeliveryOption, saveToStorage, updateCartCheckout} from '../cart.js';
import { products } from '../data/products.js';
import { formatMoney } from '../styles/shared/util/money.js';
import { deliveryOptions } from './styles/shared/util/deliveryOptions.js';
import {renderPaymentSummary} from './renderPaymentSummary.js';

export function renderOrderSummary(){

let checkoutHtml = "";


cart.forEach((cartItem) => {

  let matchingProduct;
  const productId = cartItem.productId;

  products.forEach((product) => {
    if (product.id === productId) {

      matchingProduct = product;
    }
  });


const deliveryOptionId = cartItem.deliveryOptionId;
let deliveryOption = deliveryOptions.find(option => option.id === deliveryOptionId);

// Fallback if not found
if (!deliveryOption) {
  deliveryOption = deliveryOptions[0]; // default first delivery option
  cartItem.deliveryOptionId = deliveryOption.id; // optionally fix cartItem
}

  const today = dayjs();
  const deliverDate = today.add(deliveryOption.date, 'days');
  const dateString = deliverDate.format('dddd, MMMM D');
  const priceCents = deliveryOption.price === 0 ? "FREE" : `$${formatMoney(deliveryOption.price)}`;


  checkoutHtml +=
    `<div class="cart-item-container js-cart-item-container-${matchingProduct.id}">
            <div class="delivery-date">
              Delivery date: ${dateString} 
            </div>

            <div class="cart-item-details-grid">
              <img class="product-image"
                src="${matchingProduct.image}">

              <div class="cart-item-details">
                <div class="product-name">
                    ${matchingProduct.name}
                </div>
                <div class="product-price">
                
                  $${formatMoney(matchingProduct.priceCents)}
                </div>
                <div class="product-quantity">
                  <span>
                    Quantity: <span class="quantity-label">${cartItem.quantity}</span>
                  </span>
                  <span class="update-quantity-link link-primary js-update-links" data-product-id="${matchingProduct.id}">
                         <select class="drop-down js-update-dropdown" data-product-id="${matchingProduct.id}">

              <option selected value="0">Update</option>
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
              <option value="6">6</option>
              <option value="7">7</option>
              <option value="8">8</option>
              <option value="9">9</option>
              <option value="10">10</option>
            </select>
                  </span>
                  <span class="delete-quantity-link link-primary js-delete-links" data-product-id="${matchingProduct.id}">
                    Delete
                  </span>
                </div>
              </div>

              <div class="delivery-options js-delivery-option">
                <div class="delivery-options-title">
                  Choose a delivery option:
                </div>
                  ${deliveryOptionHtml(matchingProduct, cartItem)}
              </div>
            </div>
          </div>`;




});

document.querySelector(".order-summary  ").innerHTML = checkoutHtml;

document.querySelectorAll('.js-delete-links').forEach((link) => {
  link.addEventListener("click", () => {
    console.log('clicked');
    const productId = link.dataset.productId;

    removeFromCart(productId);


    // Remove the cart item container from the DOM
    const container = document.querySelector(`.js-cart-item-container-${productId}`);
    container.remove();
    renderPaymentSummary(); // Update payment summary after removal



    console.log(cart);
  });
});

function deliveryOptionHtml(matchingProduct, cartItem) {

  let deliveryOptionHtml = "";


  deliveryOptions.forEach((options) => {
    const today = dayjs();
    const deliverDate = today.add(options.date, 'days');
    const dateString = deliverDate.format('dddd, MMMM D');
    const priceCents = options.price === 0 ? "FREE" : `$${formatMoney(options.price)}`;
    const isChecked = options.id === cartItem.deliveryOptionId;

    deliveryOptionHtml += `<div class="delivery-option js-checked-option"  >
                  <input type="radio" ${isChecked ? 'checked' : ''}
                    class="delivery-option-input js-delivery-option-input"
                    name="delivery-option-${matchingProduct.id}"
                      data-product-id="${matchingProduct.id}"
    data-delivery-option-id="${options.id}">
                  <div>
                    <div class="delivery-option-date">
                      ${dateString}
                    </div>
                    <div class="delivery-option-price">
                      ${priceCents} Shipping
                    </div>
                  </div>
                </div>`
  });

  return deliveryOptionHtml;

}


document.querySelectorAll('.js-delivery-option-input').forEach((element) => {
  element.addEventListener("click", () => {
     const { productId, deliveryOptionId } = element.dataset;
    updateDeliveryOption(productId, deliveryOptionId);
    renderOrderSummary(); // Re-render to update the summary with new delivery option
    renderPaymentSummary(); // Update payment summary after delivery option change
   

  });
});

document.querySelectorAll('.js-update-dropdown').forEach((dropdown) => {
  dropdown.addEventListener("change", () => {
    const productId = dropdown.dataset.productId;
    updateCartCheckout(productId, dropdown);
    renderOrderSummary();
    renderPaymentSummary(); // Update payment summary after quantity change
   
    
  });
}); 
}

 



            
                

         



