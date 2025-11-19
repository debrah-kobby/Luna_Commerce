//SHOP PAGE JAVASCRIPT FILE
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
// LOAD ALL PRODUCT SECTIONS
//========================================
fetchFeatured(featuredContainer, 6);

fetchCategory("men's clothing", menContainer, 5);
fetchCategory("women's clothing", womenContainer, 5);
fetchCategory("jewelery", accessoriesContainer, 5);
fetchCategory("electronics", shoesContainer, 5);
fetchCategory("men's clothing", jacketsContainer, 5);

//========================================
// EVENT LISTENERS - WISHLIST, CART, PRODUCT DETAILS
//========================================
document.addEventListener("click", (e) => {
  // Wishlist Toggle
  if (e.target.classList.contains("fa-heart")) {
    e.target.classList.toggle("fa-solid");
    e.target.classList.toggle("fa-regular");
  }

  // Add to Cart
  if (e.target.classList.contains("addtocardbuttononitemcardSh")) {
    const cartproductCard = e.target.closest(".itemcardonshoppage");
    const cartproduct = JSON.parse(cartproductCard.dataset.product); //TO GET THE SINGLE ITEM CLICKED ON

    const cartItems = JSON.parse(localStorage.getItem("cart")) || [];//GET FOMR TEH LOCALSTORAGE THE CART 
    cartItems.push(cartproduct);
    localStorage.setItem("cart", JSON.stringify(cartItems));

    window.location.href = "/cart.html";
  }

  // Navigate to Product Details
  if (e.target.classList.contains("featureditemsimage")) {
    const productCard = e.target.closest(".itemcardonshoppage");
    const product = productCard.dataset.product;
    localStorage.setItem("selectedProduct", product);
    window.location.href = "/product.html";
  }
});
