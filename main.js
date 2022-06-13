let dataN = []
fetch('https://fakestoreapi.com/products')
.then((response) => response.json())
.then((data) => {
    console.log(data)
    dataN = data
    for (let i = 0; i < dataN.length; i++) {
       document.getElementById('productBox').innerHTML +=`
       <div class ="vector">
                  <img src="${dataN[i].image}" alt="" class = "product-img">
                  <br>
                  <span class = "price"> Price:$${dataN[i].price}</span>
                  <h5 class = "product-title">Title: ${dataN[i].title}</h5>
                  <button><i class="bx bx-shopping-bag add-cart" ></i></button>          
        </div>
           `
    } 
})
 


let cartIcon = document.querySelector("#cart-icon");
let cart = document.querySelector(".cart");
let closeCart = document.querySelector("#close-cart");

cartIcon.onclick = () => {
    cart.classList.add("active");
};

closeCart.onclick = () => {
    cart.classList.remove("active");
};

 if (document.readyState == "loading") {
    document.addEventListener("DOMContentLoaded", ready);
 } else {
    ready();
}

 function ready(){
     var removeCartButtons = document.getElementsByClassName('cart-remove'); 
    //  console.log(removeCartButtons);

 for (var i = 0; i < removeCartButtons.length; i++){
     var button = removeCartButtons[i];
     button.addEventListener("click", removeCartItem);
 }

 //Quantity Changes
 var quantityInputs = document.getElementsByClassName("cart-quantity");
 for (var i = 0; i < quantityInputs.length; i++) {
     var input = quantityInputs[i];
     input.addEventListener("change", quantityChanged);
   }
    
   var addCart = document.getElementsByClassName('add-cart');
   for (var i = 0; i < addCart.length; i++){
       var button = addCart[i];
       button.addEventListener("click", addCartClicked);
   }
 }



 function removeCartItem(event) {
     var buttonClicked = event.target;
     buttonClicked.parentElement.remove();
     updatetotal();
     }

     // Quantity Changes
     function quantityChanged(event) {
         var input = event.target
         if (isNaN(input.value) || input.value <= 0) {
             input.value = 0;
         }
         updatetotal(); 
     }
     // Add To cart
     function addCartClicked(event){
         var button = event.target;
         var shopProducts = button.parentElement;
         var title = shopProducts.getElementsByClassName("product-title").innerText;
         console.log(title);
         var price = shopProducts.getElementsByClassName("price")[0].innerText;
         var productImg = shopProducts.getElementsByClassName("product-img")[0].src;
         addProductToCart(title, price, productImg);
            console.log(title, price, productImg);
            updatetotal();
     }
     function addProductToCart(title, price, productImg){
         var cartShopBox = document.createElement("div");  
         cartShopBox.classList.add("cart-box")
         var cartItems = document.getElementsByClassName("cart-content")[0]
         var cartItemsNames = cartItems.getElementsByClassName("cart-product-title")
         for (var i = 0; i < cartItemsNames.length; i++){
             alert("You have already add this item to cart");
         }
     }

     

     // Update Total
     function updatetotal(){
         var cartContect = document.getElementsByClassName("cart-content")[0];
         var cartBoxes = cartContect.getElementsByClassName("cart-box"); 
         var total = 0;
         for (var i = 0; i < cartBoxes.length; i++) {
             var cartBox = cartBoxes[i];
             var priceElement = cartBox.getElementsByClassName("cart-price")[0];
             var quantityElement = cartBox.getElementsByClassName("cart-quantity")[0];
             var price = parseFloat(priceElement.innerText.replace("$",""));
             var quantity = quantityElement.value;
             total = total + (price * quantity);
              total = Math.round(total * 100) / 100;
             document.getElementsByClassName("total-price")[0].innerText = "$" + total;
         }
     }
