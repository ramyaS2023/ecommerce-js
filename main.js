 // Toggle product list (if any)
 const inputBox = document.querySelector(".input-box");
 const product_list = document.getElementById("product-list");

 if (inputBox && product_list) {
   inputBox.addEventListener("click", () => {
     product_list.classList.toggle("active");
   });
 }

 window.onscroll = ()=>{
   product_list.classList.remove('active');
   
}




//Search bar......
function search() {
    const input = document.getElementById("search-item").value;
    const products = document.querySelectorAll(".sea-products");

    const cleanSearch = input.replace(/[^a-zA-Z0-9]/g, "").toUpperCase();
     
    products.forEach((product) => {
      const titleElement = product.querySelector("h2");
      const titleText = titleElement.textContent || titleElement.innerText;
      const cleanTitle = titleText.replace(/[^a-zA-Z0-9]/g, "").toUpperCase();

      if (cleanTitle.indexOf(cleanSearch) > -1) {
        product.style.display = "flex";
      } else {
        product.style.display = "none";
      }
    });
  }





// document.addEventListener('DOMContentLoaded', function () {
//   const buyButtons = document.querySelectorAll('.buy-btn');

//   buyButtons.forEach(button => {
//     button.addEventListener('click', (e) => {
//       const product = e.target.closest('.product');
//       if (!product) return;

//       const id = product.getAttribute('data-id');
//       const image = product.querySelector('img')?.src || '';
//       const name = product.querySelector('.p-name')?.textContent?.trim() || '';
//       const price = product.querySelector('.p-price')?.textContent?.trim() || '';

//       if (!id || !image || !name || !price) {
//         alert("Product information is incomplete.");
//         return;
//       }

//       const productData = {
//         id,  // Use ID for unique product identification
//         image,
//         name,
//         price,
//         quantity: 1
//       };

//       let cart = JSON.parse(localStorage.getItem('cart')) || [];

//       // Check by ID instead of name
//       const existing = cart.find(item => item.id === id);
//       if (existing) {
//         existing.quantity += 1;
//       } else {
//         cart.push(productData);
//       }

//       localStorage.setItem('cart', JSON.stringify(cart));
//       alert("Product added to cart!");

//       setTimeout(() => {
//         window.location.href = 'cart.html';
//       }, 500);
//     });
//   });

//   // CART RENDERING
//   const tbody = document.querySelector('#cart-container tbody');
//   if (tbody) {
//     const cartItems = JSON.parse(localStorage.getItem('cart')) || [];
//     tbody.innerHTML = '';

//     cartItems.forEach((item, index) => {
//       const row = document.createElement('tr');
//       row.innerHTML = `
//         <td><a href="#" class="remove-item" data-index="${index}"><i class="fas fa-trash-alt"></i></a></td>
//         <td><img src="${item.image}" width="70"></td>
//         <td><h4>${item.name}</h4></td>
//         <td><h4>${item.price}</h4></td>
//         <td><input type="number" class="w-25 pl-1 quantity" data-index="${index}" value="${item.quantity}" min="1"></td>
//         <td><h4>$${(parseFloat(item.price.replace('$', '')) * item.quantity).toFixed(2)}</h4></td>
//       `;
//       tbody.appendChild(row);
//     });

//     document.querySelectorAll('.remove-item').forEach(btn => {
//       btn.addEventListener('click', function (e) {
//         e.preventDefault();
//         const index = this.dataset.index;
//         cartItems.splice(index, 1);
//         localStorage.setItem('cart', JSON.stringify(cartItems));
//         location.reload();
//       });
//     });

//     document.querySelectorAll('.quantity').forEach(input => {
//       input.addEventListener('change', function () {
//         const index = this.dataset.index;
//         const newQty = parseInt(this.value);
//         if (newQty < 1) return;
//         cartItems[index].quantity = newQty;
//         localStorage.setItem('cart', JSON.stringify(cartItems));
//         location.reload();
//       });
//     });
//   }
// });





