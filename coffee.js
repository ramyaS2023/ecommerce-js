let cartIcon=document.getElementById("cart-icon")
let cart=document.querySelector(".cart")
let cartClose=document.getElementById("cart-close")


cartIcon.addEventListener("click", ()=>{
    cart.classList.add("active")
})
        
cartClose.addEventListener("click", ()=>{
    cart.classList.remove("active")
})
    


const addCartButtons=document.querySelectorAll(".add-cart")
 addCartButtons.forEach(button =>{
     button.addEventListener("click", event =>{
         const productBox=event.target.closest(".product-box")
         addToCart(productBox)
     })
 })

 const cartContent=document.querySelector(".cart-content")
 const addToCart=productBox =>{
     const productImgSrc= productBox.querySelector("img").src;
     const productName=productBox.querySelector(".product-name").textContent;
     const productPrice=productBox.querySelector(".product-price").textContent;

    
     const cartItems = cartContent.querySelectorAll(".cart-box");
     for (let item of cartItems) {
         const cartProuctName = item.querySelector(".cart-product-name").textContent;
         const cartProuctPrice  = item.querySelector(".cart-product-price").textContent;
     
         if (cartProuctName === productName && cartProuctPrice === productPrice) {
             alert("This item is already in the cart.");
             return;
         }
     }

    const cartBox =document.createElement("div")
     cartBox.classList.add("cart-box")
     cartBox.innerHTML=`
     <img src="${productImgSrc}" alt="">

             <div class="cart-details">
                 <h2 class="cart-product-name">${productName}</h2>
                 <h2 class="cart-product-price">${productPrice}</h2>

                 <div class="cart-product-btns">
                     <button id="decrement">-</button>
                     <h5 class="number">1</h5>
                     <button id="increment">+</button>
                 </div>

             </div>
             <i class="fa-solid fa-trash cart-remove"></i>

     `
    cartContent.appendChild(cartBox)

// Remove items.........
    const cartRemove=cartBox.querySelector(".cart-remove")
    cartRemove.addEventListener("click", ()=>{
        cartBox.remove()

        updateTotalPrice();
    })

// Increment an decrement.........
    const cartProductIcon=cartBox.querySelector(".cart-product-btns")
    cartProductIcon.addEventListener("click", event=>{
    const number=cartBox.querySelector(".number")
    const incrementButton=cartBox.querySelector("#increment")
    const decrementButton=cartBox.querySelector("#decrement")

    let quantity = parseInt(number.textContent);

    if(event.target.id === "increment"){
        quantity++;
    }
    else if(event.target.id === "decrement" && quantity>1){
        quantity--;
    }

    number.textContent=quantity;
    updateTotalPrice();
})
// updateCartCount(1);

updateTotalPrice();

}


// Update total price.......
const updateTotalPrice = ()=>{
    const totalPriceElement=document.querySelector(".total-price")
    const cartBoxs=cartContent.querySelectorAll(".cart-box")

    let total=0;

    cartBoxs.forEach(cartBox =>{
        const priceElement = cartBox.querySelector(".cart-product-price"); 
        const quantityElement = cartBox.querySelector(".number");

        
        const price = parseFloat(priceElement.textContent.replace("$", ""));
        const quantity = parseInt(quantityElement.textContent);
        
        total += price * quantity;

    })
    totalPriceElement.textContent=`$${total}`

}

// BuyNow Button.....
const buyNowButtons = document.querySelectorAll(".btn-buy");

buyNowButtons.forEach(button => {
    button.addEventListener("click", () => {
        const cartBoxs = cartContent.querySelectorAll(".cart-box");
        if (cartBoxs.length === 0) {
            alert("Your cart is empty. Please add items before buying.");
            return;
        }

        // Remove all cart items
        cartBoxs.forEach(cartBox => cartBox.remove());

        updateTotalPrice();

        alert("Thank you for your purchase!");
    });
});


// var MainImg = document.getElementById("mainImg")
// var smallImg = document.getElementsByClassName("small-img")

// smallImg[0].onclick = function(){
//     MainImg.src = smallImg[0].src
// }
// smallImg[1].onclick = function(){
//     MainImg.src = smallImg[1].src
// }
// smallImg[2].onclick = function(){
//     MainImg.src = smallImg[2].src
// }
// smallImg[3].onclick = function(){
//     MainImg.src = smallImg[3].src
// }



// function search() {
//     const input = document.getElementById("search-item").value;
//     const products = document.querySelectorAll(".sea-products");

//     const cleanSearch = input.replace(/[^a-zA-Z0-9]/g, "").toUpperCase();
      
//     products.forEach((product) => {
//       const titleElement = product.querySelector("h2");
//       const titleText = titleElement.textContent || titleElement.innerText;
//       const cleanTitle = titleText.replace(/[^a-zA-Z0-9]/g, "").toUpperCase();

//       if (cleanTitle.indexOf(cleanSearch) > -1) {
//         product.style.display = "flex";
//       } else {
//         product.style.display = "none";
//       }
//     });
//   }

// onclick="window.location.href= 'sproduct.html';"   



// <!-- <section id="cart-bottom" class="container">
//     <div class="row">
//         <div class="coupon col-lg-6 col-md-6 col-12 mb-4">
//             <div>
//                 <h4>CUPPON</h4>
//                 <p>Enter Your couppon if you have one.</p>
//                 <input type="text" placeholder="Couppon Code">
//                 <button>APPLY COUPPON</button>
//             </div>
//         </div>

//         <div class="total col-lg-6 col-md-6 col-12 ">
//             <div>
//                 <h4>CART TOTAL</h4>
//                 <div class="d-flex justify-content-between">
//                     <h5>Subtotal</h5>
//                     <p>$215.00</p>
//                 </div>

//                 <div class="d-flex justify-content-between">
//                     <h5>Shipping</h5>
//                     <p>$215.00</p>
//                 </div>
//                 <hr class="second-hr">

//                 <div class="d-flex justify-content-between">
//                     <h5>Total</h5>
//                     <p>$215.00</p>
//                 </div>

//                 <button class="ml-auto">PROCEED TO CHECKOUT</button>
//             </div>
//         </div>


//     </div>
// </section> -->



//Search bar......
// function search() {
//     const input = document.getElementById("search-item").value;
//     const products = document.querySelectorAll(".sea-products");

//     const cleanSearch = input.replace(/[^a-zA-Z0-9]/g, "").toUpperCase();
     
//     products.forEach((product) => {
//       const titleElement = product.querySelector("h2");
//       const titleText = titleElement.textContent || titleElement.innerText;
//       const cleanTitle = titleText.replace(/[^a-zA-Z0-9]/g, "").toUpperCase();

//       if (cleanTitle.indexOf(cleanSearch) > -1) {
//         product.style.display = "flex";
//       } else {
//         product.style.display = "none";
//       }
//     });
//   }

