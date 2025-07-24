export let cart = JSON.parse(localStorage.getItem("cart"));
if (!cart) {
    cart = [{
        productId: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
        quantity: 2,
        deliveryOptionId: 1
    },
{
        productId: "54e0eccd-8f36-462b-b68a-8182611d9add",
        quantity: 1,
        deliveryOptionId: 2
}];
}
   export function saveToStorage(){
           localStorage.setItem('cart', JSON.stringify(cart));
            
          }
export function addtocart(productId, button) {
                const parentCon = button.closest(".product-container");
                const dropDown = parentCon.querySelector(".drop-down");
                const seclectValue = Number(dropDown.value);
                let matchedProduct;
                cart.forEach((item) => {
                    if (item.id === productId) {
                        matchedProduct = item;
                    }
                });
                if(matchedProduct){
                    matchedProduct.quantity += seclectValue;
                }
                else{
                    cart.push({
                        productId: productId,
                        quantity: seclectValue,
                        deliveryOptionId: 1
                    });
                    saveToStorage();
                }
                
          }
         
          export function removeFromCart(productId){
            let newCart = [];
            cart.forEach((cartItem) => {
                if(cartItem.productId !== productId){
                    newCart.push(cartItem);
                    
                }
                
            });
            cart = newCart;
            saveToStorage();
                
          }

       