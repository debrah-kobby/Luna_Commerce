// PRODUCT PAGE JAVASCRIPT FILE
import { createProductCard, fetchFeatured, fetchCategory } from "./utils.js";

//========================================
// DOM ELEMENTS - SECTION CONTAINERS
//========================================
const featuredContainer = document.querySelector(
  ".overalldivforfeaturesitemcards"
);
const menContainer = document.querySelector(".overalldivformensitemscardsSh");
const womenContainer = document.querySelector(
  ".overalldivforwomenssitemscardsSh"
);
const accessoriesContainer = document.querySelector(
  ".overalldivforaccessoriessitemscardsSh"
);
const shoesContainer = document.querySelector(
  ".overalldivforshoesitemscardsSh"
);
const jacketsContainer = document.querySelector(
  ".overalldivforjacketsitemscardsSh"
);

//========================================
// DOM ELEMENTS - PRODUCT PAGE SPECIFIC
//========================================
const details = document.querySelector(".detailsfordeliveryreturnsonPRP");
const modal = document.querySelector(".modal_for_details_of_return_policy");
const closeModal = document.querySelector(
  ".clost-button-for-return-policy-modal i"
);
const decrementonPRP = document.querySelector(".decrementonPRP");
const incrememntonPRP = document.querySelector(".incrememntonPRP");
const numberDisplay = document.querySelector(".increordecrenumber");
const addToCartBtn = document.querySelector(".addtocartbuttononPRP");

//========================================
// QUANTITY COUNTER
//========================================
let count = 0;

function numberOfItems() {
  numberDisplay.textContent = count;
}

incrememntonPRP.addEventListener("click", () => {
  if (count < 12) count++;
  numberOfItems();
});

decrementonPRP.addEventListener("click", () => {
  if (count > 0) count--;
  numberOfItems();
});

//========================================
// MODAL HANDLERS
//========================================
details.addEventListener("click", () => {
  modal.style.display = "block";
});

closeModal.addEventListener("click", () => {
  modal.style.display = "none";
});

modal.addEventListener("click", (e) => {
  if (e.target === modal) modal.style.display = "none";
});

//========================================
// LOAD PRODUCT DATA
//========================================
document.addEventListener("DOMContentLoaded", () => {
  const productData = JSON.parse(localStorage.getItem("selectedProduct"));

  if (!productData) {
    document.body.innerHTML =
      "<h2 style='text-align:center;margin-top:50px;'>No product selected.</h2>";
    return;
  }

  // Fill in product details dynamically
  document.querySelector(".itemimageonPRP").src = productData.image;
  document.querySelector(".mainitemtitleforPRP").textContent =
    productData.title;
  document.querySelector(".supportingtitlesentenceonPRP").textContent =
    productData.category;
  document.querySelector(
    ".largeboldpricesonPRP"
  ).textContent = `$${productData.price}`;

  // Generate random rating count
  const ratingElement = document.querySelector(".starsonPRP p");
  ratingElement.textContent = `(${Math.floor(Math.random() * 400) + 50})`;
});

//========================================
// ADD TO CART FUNCTIONALITY
//========================================
addToCartBtn.addEventListener("click", () => {
  const productData = JSON.parse(localStorage.getItem("selectedProduct"));
  if (!productData) return;

  const cartItems = JSON.parse(localStorage.getItem("cart")) || [];

  const productToAdd = { ...productData, quantity: count || 1 };
  cartItems.push(productToAdd);
  localStorage.setItem("cart", JSON.stringify(cartItems));

  // Reset count
  count = 0;
  numberOfItems();

  window.location.href = "/cart.html";
});

//========================================
// LOAD FEATURED PRODUCTS
//========================================
fetchFeatured(featuredContainer, 10);

//========================================
// EVENT LISTENERS - WISHLIST, PRODUCT NAVIGATION
//========================================
document.addEventListener("click", (e) => {
  // Wishlist Toggle
  if (e.target.classList.contains("fa-heart")) {
    e.target.classList.toggle("fa-solid");
    e.target.classList.toggle("fa-regular");
  }

  // Navigate to Product Details
  if (e.target.classList.contains("featureditemsimage")) {
    const productCard = e.target.closest(".itemcardonshoppage");
    const product = productCard.dataset.product;
    localStorage.setItem("selectedProduct", product);
    window.location.href = "/product.html";
  }
});
