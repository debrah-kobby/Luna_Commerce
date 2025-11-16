// DOM Elements
const cartObjectCount = document.querySelector(".cartproductcount");
const clearCartBtn = document.querySelector(".leftcartboxclearcart");
const cartContainer = document.querySelector(".itemscontaineroncart");
const decrementoncart = document.querySelector(".decrementoncart");
const incrementoncart = document.querySelector(".incrementoncart");
const numberofquantityoncart = document.querySelector(
  ".numberofquantityoncart"
);

// Render cart on load
document.addEventListener("DOMContentLoaded", () => {
  renderCart();
});

// Render Cart Logic
function renderCart() {
  const cartItems = JSON.parse(localStorage.getItem("cart")) || [];

  cartContainer.innerHTML = "";

  if (cartItems.length === 0) {
    cartContainer.innerHTML = "<p>Your cart is empty.</p>";
    cartObjectCount.textContent = "(0 products)";
    return;
  }

  cartItems.forEach((product) => {
    const cartItem = createCartItem(product);
    cartContainer.appendChild(cartItem);

    // Select buttons and quantity display inside this cart item
    const decrementBtn = cartItem.querySelector(".decrementoncart");
    const incrementBtn = cartItem.querySelector(".incrementoncart");
    const quantityEl = cartItem.querySelector(".numberofquantityoncart");

    // Initialize count
    let count = product.qty || 1;

    // Decrement
    decrementBtn.addEventListener("click", () => {
      if (count > 1) {
        count--;
        quantityEl.textContent = count;

        // Update cart item quantity in localStorage
        product.qty = count;
        localStorage.setItem("cart", JSON.stringify(cartItems));

        // Optionally update price display
        cartItem.querySelector(".priceofitemoncart").textContent = `$${(
          product.price * count
        ).toFixed(2)}`;
      }
    });

    // Increment
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

  cartObjectCount.textContent = `( ${cartItems.length} products)`;

  // Button: Remove Single Item
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

// Create Cart Item Element
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

// Clear Cart Logic
clearCartBtn.addEventListener("click", () => {
  localStorage.removeItem("cart");
  renderCart();
});

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
