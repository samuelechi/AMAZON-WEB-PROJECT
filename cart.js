export let cart = JSON.parse(localStorage.getItem("cart"));
if (!cart) {
    cart = [{
        productId: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
        quantity: 2
    },
{
        productId: "54e0eccd-8f36-462b-b68a-8182611d9add",
        quantity: 1
}];
}
   function saveToStorage(){
           console.log(localStorage.setItem("cart", JSON.stringify(cart)));
            
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
                        name: productId,
                        quantity: seclectValue
                    });
                }
                saveToStorage();

          }


       