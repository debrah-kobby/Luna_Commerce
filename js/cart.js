//CART PAGE JAVASCRIPT FILE

import { getFromStorage, saveToStorage } from "./utils.js";

//========================================
// DOM ELEMENTS
//========================================
const cartObjectCount = document.querySelector(".cartproductcount");
const clearCartBtn = document.querySelector(".leftcartboxclearcart");
const cartContainer = document.querySelector(".itemscontaineroncart");
const decrementoncart = document.querySelector(".decrementoncart");
const incrementoncart = document.querySelector(".incrementoncart");
const numberofquantityoncart = document.querySelector(
  ".numberofquantityoncart",
);
const cartBadge = document.querySelector(".cartbadgediv");
const cartBadgeItemNumber = document.querySelector(".numberofcartbadgeitems");
const totalCart = document.querySelector(".totalpriceofallcart");

//========================================
// HAMBURGER MENU
//========================================
document.addEventListener("DOMContentLoaded", () => {
  const secondNav = document.getElementById("cartSecondNav");
  const secondNavUl = document.getElementById("cartSecondNavUl");

  const hamburger = document.createElement("div");
  hamburger.className = "hamburger-menu";
  hamburger.innerHTML = `<span></span><span></span><span></span>`;
  secondNav.insertBefore(hamburger, secondNavUl);

  hamburger.addEventListener("click", function () {
    this.classList.toggle("active");
    secondNavUl.classList.toggle("active");
  });

  document.addEventListener("click", (e) => {
    if (!secondNav.contains(e.target)) {
      hamburger.classList.remove("active");
      secondNavUl.classList.remove("active");
    }
  });

  renderCart();
});

//========================================
// RENDER CART LOGIC
//========================================
function renderCart() {
  const cartItems = JSON.parse(localStorage.getItem("cart")) || [];

  cartContainer.innerHTML = "";

  if (cartItems.length === 0) {
    cartContainer.innerHTML = "<p>Your cart is empty.</p>";
    cartContainer.classList.add("cartemptytext");
    cartObjectCount.textContent = "(0 products)";
    cartBadgeItemNumber.textContent = "0";
    return;
  }

  cartItems.forEach((product) => {
    const cartItem = createCartItem(product);
    cartContainer.appendChild(cartItem);

    const decrementBtn = cartItem.querySelector(".decrementoncart");
    const incrementBtn = cartItem.querySelector(".incrementoncart");
    const quantityEl = cartItem.querySelector(".numberofquantityoncart");

    let count = product.qty || 1;

    decrementBtn.addEventListener("click", () => {
      if (count > 1) {
        count--;
        quantityEl.textContent = count;
        product.qty = count;
        localStorage.setItem("cart", JSON.stringify(cartItems));
        cartItem.querySelector(".priceofitemoncart").textContent = `$${(
          product.price * count
        ).toFixed(2)}`;
      }
      restorePromo();
    });

    incrementBtn.addEventListener("click", () => {
      count++;
      quantityEl.textContent = count;
      product.qty = count;
      localStorage.setItem("cart", JSON.stringify(cartItems));
      cartItem.querySelector(".priceofitemoncart").textContent = `$${(
        product.price * count
      ).toFixed(2)}`;
      getCartTotal();
    });
  });

  cartObjectCount.textContent = `( ${cartItems.length} products)`;
  cartBadgeItemNumber.textContent = `${cartItems.length}`;

  document.querySelectorAll(".removecartitembutton").forEach((button) => {
    button.addEventListener("click", (e) => {
      const productIdToRemove = e.currentTarget.dataset.id;
      const updatedCart = cartItems.filter(
        (item) => item.id !== parseInt(productIdToRemove),
      );
      localStorage.setItem("cart", JSON.stringify(updatedCart));
      renderCart();
    });
  });

  getCartTotal();
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
// CLEAR CART
//========================================
clearCartBtn.addEventListener("click", () => {
  localStorage.removeItem("cart");
  clearPromoInput();
  renderCart();
  getCartTotal();
});

//========================================
// CART TOTAL
//========================================
function getCartTotal(discountPercent = 0) {
  const cartItems = getFromStorage("cart");

  const rawtotal = cartItems
    .reduce((sum, item) => sum + item.price * (item.qty || 1), 0)
    .toFixed(2);

  const discountAmount = rawtotal * (discountPercent / 100);
  const finalTotal = (rawtotal - discountAmount).toFixed(2);
  totalCart.textContent = `$${finalTotal}`;
}

getCartTotal();

//========================================
// PROMO CODE
//========================================
const promoCodeInput = document.querySelector(".promocodeinput");
const promoResultText = document.querySelector(".promoResultText");
const promoCodeButton = document.querySelector(".applypormocodebutton");
const promoRemoveIcon = document.querySelector(".removepromocodeicon");
promoResultText.textContent = "";

function promoInput() {
  const value = promoCodeInput.value.trim();
  if (value === "BENE") {
    promoResultText.textContent = ` Promo Code Activated 10% Discount `;
    promoRemoveIcon.style.display = "flex";
    promoCodeInput.disabled = true;
    saveToStorage("savedDiscount", { code: value, discount: 10 });
    getCartTotal(10);
  } else {
    promoResultText.textContent = "Promo Code not valid";
    getCartTotal(0);
  }
}

promoCodeButton.addEventListener("click", () => promoInput());

promoRemoveIcon.addEventListener("click", () => {
  clearPromoInput();
  promoRemoveIcon.style.display = "none";
});

function clearPromoInput() {
  promoResultText.textContent = " ";
  promoCodeInput.value = "";
  promoCodeInput.disabled = false;
  promoCodeInput.placeholder = "Type here ....";
  promoRemoveIcon.style.display = "none";
  localStorage.removeItem("savedDiscount");
  getCartTotal(0);
}

function restorePromo() {
  const saved = getFromStorage("savedDiscount", null);
  if (saved) {
    promoCodeInput.value = saved.code;
    promoResultText.textContent = "Promo Code Activated — 10% Discount";
    promoRemoveIcon.style.display = "flex";
    promoCodeInput.disabled = true;
    getCartTotal(saved.discount);
  } else {
    getCartTotal(0);
  }
}

restorePromo();

//========================================
// CHECKOUT MODAL
//========================================
const checkoutBtn = document.getElementById("checkoutBtn");
const checkoutModal = document.getElementById("checkoutModal");
const closeCheckoutModal = document.getElementById("closeCheckoutModal");
const confirmOrderBtn = document.getElementById("confirmOrderBtn");
const orderConfirmed = document.getElementById("orderConfirmed");
const checkoutModalItems = document.getElementById("checkoutModalItems");
const modalSubtotal = document.getElementById("modalSubtotal");
const modalDiscount = document.getElementById("modalDiscount");
const modalDiscountRow = document.getElementById("modalDiscountRow");
const modalTotal = document.getElementById("modalTotal");

function openCheckoutModal() {
  const cartItems = JSON.parse(localStorage.getItem("cart")) || [];

  if (cartItems.length === 0) return;

  // Reset confirmed state
  orderConfirmed.classList.remove("visible");
  confirmOrderBtn.style.display = "block";
  checkoutModalItems.style.display = "flex";

  // Populate items
  checkoutModalItems.innerHTML = "";
  cartItems.forEach((item) => {
    const el = document.createElement("div");
    el.classList.add("checkout-modal-item");
    el.innerHTML = `
      <img src="${item.image}" alt="${item.title}" class="checkout-modal-item-img" />
      <div class="checkout-modal-item-info">
        <div class="checkout-modal-item-name">${item.title.slice(0, 28)}</div>
        <div class="checkout-modal-item-qty">Qty: ${item.qty || 1}</div>
      </div>
      <div class="checkout-modal-item-price">$${(item.price * (item.qty || 1)).toFixed(2)}</div>
    `;
    checkoutModalItems.appendChild(el);
  });

  // Totals
  const saved = getFromStorage("savedDiscount", null);
  const discountPercent = saved ? saved.discount : 0;

  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.price * (item.qty || 1),
    0,
  );
  const discountAmount = subtotal * (discountPercent / 100);
  const finalTotal = subtotal - discountAmount;

  modalSubtotal.textContent = `$${subtotal.toFixed(2)}`;
  modalDiscount.textContent = `-$${discountAmount.toFixed(2)}`;
  modalTotal.textContent = `$${finalTotal.toFixed(2)}`;

  // Show/hide discount row
  modalDiscountRow.style.display = discountPercent > 0 ? "flex" : "none";

  checkoutModal.classList.add("active");
  document.body.style.overflow = "hidden";
}

function closeModal() {
  checkoutModal.classList.remove("active");
  document.body.style.overflow = "";
}

checkoutBtn.addEventListener("click", openCheckoutModal);
closeCheckoutModal.addEventListener("click", closeModal);

// Close on overlay click
checkoutModal.addEventListener("click", (e) => {
  if (e.target === checkoutModal) closeModal();
});

// Confirm order
confirmOrderBtn.addEventListener("click", () => {
  confirmOrderBtn.style.display = "none";
  checkoutModalItems.style.display = "none";

  // Hide dividers and totals for clean confirmed view
  document.querySelectorAll(".checkout-modal-divider").forEach((d) => {
    d.style.display = "none";
  });
  document.querySelector(".checkout-modal-totals").style.display = "none";
  document.querySelector(".checkout-modal-note").style.display = "none";

  orderConfirmed.classList.add("visible");

  // Clear cart after confirm
  localStorage.removeItem("cart");
  localStorage.removeItem("savedDiscount");
  setTimeout(() => {
    closeModal();
    renderCart();
    clearPromoInput();
    // Restore hidden elements for next open
    document.querySelectorAll(".checkout-modal-divider").forEach((d) => {
      d.style.display = "";
    });
    document.querySelector(".checkout-modal-totals").style.display = "";
    document.querySelector(".checkout-modal-note").style.display = "";
  }, 2200);
});
