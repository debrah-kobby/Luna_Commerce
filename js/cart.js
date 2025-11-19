//CART PAGE JAVASCRIPT FILE

//========================================
// DOM ELEMENTS
//========================================
const cartObjectCount = document.querySelector(".cartproductcount");
const clearCartBtn = document.querySelector(".leftcartboxclearcart");
const cartContainer = document.querySelector(".itemscontaineroncart");
const decrementoncart = document.querySelector(".decrementoncart");
const incrementoncart = document.querySelector(".incrementoncart");
const numberofquantityoncart = document.querySelector(
  ".numberofquantityoncart"
);

//========================================
// INITIALIZE CART ON PAGE LOAD
//========================================
document.addEventListener("DOMContentLoaded", () => {
  renderCart();
});

//========================================
// RENDER CART LOGIC
//========================================
function renderCart() {
  const cartItems = JSON.parse(localStorage.getItem("cart")) || [];

  cartContainer.innerHTML = "";

  // Empty Cart Check
  if (cartItems.length === 0) {
    cartContainer.innerHTML = "<p>Your cart is empty.</p>";
    cartContainer.classList.add("cartemptytext");
    cartObjectCount.textContent = "(0 products)";
    return;
  }

  // Create Cart Items
  cartItems.forEach((product) => {
    const cartItem = createCartItem(product);
    cartContainer.appendChild(cartItem);

    // Select buttons and quantity display inside this cart item
    const decrementBtn = cartItem.querySelector(".decrementoncart");
    const incrementBtn = cartItem.querySelector(".incrementoncart");
    const quantityEl = cartItem.querySelector(".numberofquantityoncart");

    // Initialize count
    let count = product.qty || 1;

    // Decrement Quantity
    decrementBtn.addEventListener("click", () => {
      if (count > 1) {
        count--;
        quantityEl.textContent = count;

        // Update cart item quantity in localStorage
        product.qty = count;
        localStorage.setItem("cart", JSON.stringify(cartItems));

        // Update price display
        cartItem.querySelector(".priceofitemoncart").textContent = `$${(
          product.price * count
        ).toFixed(2)}`;
      }
    });

    // Increment Quantity
    incrementBtn.addEventListener("click", () => {
      count++;
      quantityEl.textContent = count;

      // Update cart item quantity in localStorage
      product.qty = count;
      localStorage.setItem("cart", JSON.stringify(cartItems));

      // Update price display
      cartItem.querySelector(".priceofitemoncart").textContent = `$${(
        product.price * count
      ).toFixed(2)}`;
    });
  });

  // Update cart count display
  cartObjectCount.textContent = `( ${cartItems.length} products)`;

  // Remove Single Item Event Listeners
  document.querySelectorAll(".removecartitembutton").forEach((button) => {
    button.addEventListener("click", (e) => {
      const productIdToRemove = e.currentTarget.dataset.id;
      const updatedCart = cartItems.filter(
        (item) => item.id !== parseInt(productIdToRemove)
      );
      localStorage.setItem("cart", JSON.stringify(updatedCart));
      renderCart();
    });
  });
}

//========================================
// CREATE CART ITEM ELEMENT
//========================================
function createCartItem(product) {
  const div = document.createElement("div");
  div.classList.add("itemsdetailsitselfoncart");

  div.innerHTML = `
    <div class="itemitselfoncart">
      <div class="itemimageoncart">
        <img src="${product.image}" alt="${product.title}" width="90" />
      </div>
      <div class="itemnameandcategoryoncart">
        <div class="itemnameoncart">${product.title.slice(0, 20)}</div>
        <div class="itemcaegoryoncart">${product.category}</div>
      </div>
    </div>
    <div class="incrementordecrementofitemoncart">
      <div class="decrementoncart"><i class="fa-solid fa-minus"></i></div>
      <p class="numberofquantityoncart">${product.qty || 1}</p>
      <div class="incrementoncart"><i class="fa-solid fa-plus"></i></div>
    </div>
    <div class="priceofitemoncart">$${(
      product.price * (product.qty || 1)
    ).toFixed(2)}</div>
    <div class="removecartitembutton" data-id="${product.id}">
      <i class="fa-solid fa-xmark"></i>
    </div>
  `;

  return div;
}

//========================================
// CLEAR CART BUTTON
//========================================
clearCartBtn.addEventListener("click", () => {
  localStorage.removeItem("cart");
  renderCart();
});

//========================================
// UNUSED FUNCTION (CAN BE REMOVED)
//========================================
function increaseorDecrease() {
  let count = 0;

  decrementoncart.addEventListener("click", () => {
    if (count != 0) {
      count--;
    }
  });

  incrementoncart.addEventListener("click", () => {
    count++;
  });
  numberofquantityoncart.textContent = count;
}
