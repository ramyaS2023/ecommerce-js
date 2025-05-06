const productContainer = document.querySelector(".product-list")
const isProductDetailpage = document.querySelector(".product-detail")
const isCartPage = document.querySelector(".cart")

if(productContainer){
    displayProducts();
}
else if(isProductDetailpage){
    displayProductDetail();
}
else if(isCartPage){
    displayCart();
}

function displayProducts(){
    products.forEach(product =>{
        const productCard = document.createElement("div")
        productCard.classList.add("product_card");
        productCard.innerHTML=`
        <div class="img_box">
            <img src="${product.colors[0].mainImage}">
        
        </div>

        <h2 class="title">${product.title}</h2>
        <span class="price">${product.price}</span>
        
        `;

        productContainer.appendChild(productCard);

        const imgBox = productCard.querySelector(".img_box");
        imgBox.addEventListener('click', ()=>{
            sessionStorage.setItem("selectedProduct", JSON.stringify(product));
            window.location.href="Productdetails.html";
        })

    })
}





function displayProductDetail() {
    const productData = JSON.parse(sessionStorage.getItem("selectedProduct"));

    if (!productData || !productData.colors || productData.colors.length === 0) {
        console.error("No product data or colors found in sessionStorage.");
        window.location.href = "Productspage.html"; 
        return;
    }

    const titleEl = document.querySelector(".title");
    const priceEl = document.querySelector(".price");
    const descriptionEl = document.querySelector(".description");
    const mainImageContainer = document.querySelector(".main_img");
    const thumbnailContainer = document.querySelector(".thumbnail_list");
    const colorContainer = document.querySelector(".color-options");
    const sizeContainer = document.querySelector(".size-options");
    const addToCartBtn = document.querySelector("#add-cart-btn");

    let selectedColor = productData.colors[0];
    let selectedSize = selectedColor.sizes[0];

    function updateProductDisplay(colorData) {
        if (!colorData.sizes.includes(selectedSize)) {
            selectedSize = colorData.sizes[0];
        }

        
        mainImageContainer.innerHTML = `<img src="${colorData.mainImage}">`;

        
        thumbnailContainer.innerHTML = "";
        const allThumbnails = [colorData.mainImage].concat(colorData.thumbnails.slice(0, 3));
        allThumbnails.forEach(thumb => {
            const img = document.createElement("img");
            img.src = thumb;
            thumbnailContainer.append(img);

            img.addEventListener('click', () => {
                mainImageContainer.innerHTML = `<img src="${thumb}">`;
            });
        });

        
        colorContainer.innerHTML = "";
        productData.colors.forEach(color => {
            const img = document.createElement("img");
            img.src = color.mainImage;
            if (color.name === colorData.name) img.classList.add("selected");

            colorContainer.appendChild(img);

            img.addEventListener('click', () => {
                selectedColor = color;
                updateProductDisplay(color);
            });
        });

        
        sizeContainer.innerHTML = "";
        colorData.sizes.forEach(size => {
            const btn = document.createElement("button");
            btn.textContent = size;
            if (size === selectedSize) btn.classList.add("selected");

            sizeContainer.appendChild(btn);

            btn.addEventListener('click', () => {
                document.querySelectorAll(".size-options button").forEach(el => el.classList.remove("selected"));
                btn.classList.add("selected");

                selectedSize = size;
            });
        });
    }

    titleEl.textContent = productData.title;
    priceEl.textContent = productData.price;
    descriptionEl.textContent = productData.description;

    updateProductDisplay(selectedColor);

    // Add to cart logic
    addToCartBtn.addEventListener('click', () => {
        addToCart(productData, selectedColor, selectedSize);
        // console.log("button clicked");
    });
}

function addToCart(productData, selectedColor, selectedSize) {
    const cart = JSON.parse(sessionStorage.getItem("cart")) || [];

    const cartItem = {
        title: productData.title,
        price: productData.price,
        image: selectedColor.mainImage,
        color: selectedColor.name,
        size: selectedSize,
        quantity: 1,
    };

    // Check if the item is already in the cart
    const existingItemIndex = cart.findIndex(item =>
        item.title === cartItem.title &&
        item.color === cartItem.color &&
        item.size === cartItem.size
    );

    if (existingItemIndex !== -1) {
        cart[existingItemIndex].quantity += 1;
    } else {
        cart.push(cartItem);
    }

    sessionStorage.setItem("cart", JSON.stringify(cart));
    alert("Item added to cart!");
}




function displayCart() {
    const cart = JSON.parse(sessionStorage.getItem("cart")) || [];
    const cartItemsContainer = document.querySelector(".cart-items");
    const subtotalEl = document.querySelector(".subtotal");
    const grandTotalEl = document.querySelector(".grand-total");

    cartItemsContainer.innerHTML = "";

    if (cart.length === 0) {
        cartItemsContainer.innerHTML = "<p>Your Cart is Empty.</p>";
        subtotalEl.textContent = "$0";
        grandTotalEl.textContent = "$0";
        return;
    }

    let subtotal = 0;

    cart.forEach((item, index) => {
        const itemTotal = parseFloat(item.price.replace("$", "")) * item.quantity;
        subtotal += itemTotal;

        const cartItem = document.createElement("div");
        cartItem.classList.add("cart-item");
        cartItem.innerHTML = `
            <div class="product">
                <img src="${item.image}" alt="">
                <div class="item-detail">
                    <p>${item.title}</p>
                    <div class="size-color-box">
                        <span class="size">${item.size}</span>
                        <span class="color">${item.color}</span>
                    </div>
                </div>
            </div>

            <span class="price">${item.price}</span>
            <div class="quantity">
                <input type="number" value="${item.quantity}" min="1" data-index="${index}">
            </div>
            <span class="total-price">$${itemTotal.toFixed(2)}</span>
            <button class="remove" data-index="${index}"><i class="fa-solid fa-xmark"></i></button>
        `;

        cartItemsContainer.appendChild(cartItem);

        // --- Handle Quantity Change ---
        const quantityInput = cartItem.querySelector("input[type='number']");
        quantityInput.addEventListener("change", (e) => {
            const newQuantity = parseInt(e.target.value);
            const itemIndex = e.target.getAttribute("data-index");

            if (newQuantity >= 1) {
                cart[itemIndex].quantity = newQuantity;
                sessionStorage.setItem("cart", JSON.stringify(cart));
                displayCart();
            }
        });

        // --- Handle Item Deletion ---
        const removeBtn = cartItem.querySelector(".remove");
        removeBtn.addEventListener("click", () => {
            const itemIndex = removeBtn.getAttribute("data-index");
            cart.splice(itemIndex, 1);
            sessionStorage.setItem("cart", JSON.stringify(cart));
            displayCart();
        });
    });

    subtotalEl.textContent = `$${subtotal.toFixed(2)}`;
    grandTotalEl.textContent = `$${subtotal.toFixed(2)}`;
}
