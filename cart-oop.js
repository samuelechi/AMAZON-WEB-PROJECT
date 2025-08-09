
export function Cart(localStorageKey){
    const cart = {
        cartItems:undefined,


        loadCartFromStorage() {
this.cartItems = JSON.parse(localStorage.getItem(localStorageKey));
if (!this.cartItems) {
    this.cartItems = [{
        productId: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
        quantity: 2,
        deliveryOptionId: '1'
    },
{
        productId: "54e0eccd-8f36-462b-b68a-8182611d9add",
        quantity: 1,
        deliveryOptionId: '2'
}];
}
},
        saveToStorage(){
           localStorage.setItem(localStorageKey, JSON.stringify(this.cartItems));
            
          },

          addToCart(productId, selectValue) {
   
        
        
    let matchedProduct;
    this.cartItems.forEach((item) => {
        if (item.id === productId) {
            matchedProduct = item;
        }
    });

    if (matchedProduct) {
        matchedProduct.quantity += selectValue;
    } else {
        this.cartItems.push({
            productId: productId,
            quantity: selectValue,
            deliveryOptionId: 1,
        });
 
    }
}
,

          removeFromCart(productId){
            let newCart = [];
            this.cartItems.forEach((cartItem) => {
                if(cartItem.productId !== productId){
                    newCart.push(cartItem);
                    
                }
                
            });
            this.cartItems = newCart;
            saveToStorage();
                
          },
          updateDeliveryOption(productId, deliveryOptionId){
    let matchingProduct;
    this.cartItems.forEach((cartItem) => {
        if (cartItem.productId === productId) {
            matchingProduct = cartItem;
        }
    });
    if (matchingProduct) {
        matchingProduct.deliveryOptionId = deliveryOptionId;
    } else {
        console.error("Product not found in cart");
    }
    saveToStorage();

},
        updateCartCheckout(productId, dropdown) {
  const selectedValue = Number(dropdown.value);

  let matchedProduct = this.cartItems.find(item => item.productId === productId);

  if (matchedProduct) {
    matchedProduct.quantity = selectedValue; // Use = not += to **set**, not add more
  } else {
    this.cartItems.push({
      productId: productId,
      quantity: selectedValue,
      deliveryOptionId: 1
    });
  }

  this.saveToStorage();
}


    };
        return cart;
}
const button = document.querySelector('.js-cart-button');
const cart = Cart('cart-oop');
cart.loadCartFromStorage();
cart.addToCart("15b6fc6f-327a-4ec4-896f-486349e85a3d", 2);
cart.saveToStorage();
console.log(cart.cartItems)







           