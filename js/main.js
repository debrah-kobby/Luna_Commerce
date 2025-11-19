//MAIN JAVASCRIPT FILE
//IMPORT
import { wishlistToast } from "./utils.js";
//========================================
// DOM ELEMENTS
//========================================
let loaderContainer = document.querySelector(".loader-container");
let firstbuttons = document.querySelector(".buttons_on_first_page");
let seeAllButton = document.querySelector(".see_all_items_button_on_main_page");
let firstLookBookButton = document.querySelector(".toplookbookconnection p");
const slidesContainer = document.querySelector(".slides-container");
const slides = document.querySelectorAll(".first-image-div-on-top-picks");
let index = 0;

console.log("script loaded");

//========================================
// PAGE LOAD & PRELOADER
//========================================
// Hide body content at the start
document.body.style.overflow = "hidden"; // prevents scrolling
document.querySelector(".first_page").style.display = "none";

window.addEventListener("load", () => {
  setTimeout(() => {
    loaderContainer.style.display = "none"; // Hide loader
    document.querySelector(".first_page").style.display = "block"; // Show main content
    document.body.style.overflow = "auto"; // allow scrolling again
    console.log("Loader-Hidden");
  }, 2000); // 5 seconds
});

//========================================
// NAVIGATION EVENT LISTENERS
//========================================
firstbuttons.addEventListener("click", (e) => {
  window.location = "shop.html";
});

seeAllButton.addEventListener("click", () => {
  window.location = "shop.html";
});

firstLookBookButton.addEventListener("click", (e) => {
  window.location = "shop.html";
});

firstLookBookButton.addEventListener("mouseover", (e) => {
  e.target.style.cursor = "pointer";
});

//========================================
// PRODUCT FUNCTIONS
//========================================
async function getProducts(limit = 6) {
  try {
    const res = await fetch("https://fakestoreapi.com/products");
    const data = await res.json();

    // only take the first 'limit' items
    const limitedProducts = data.slice(0, limit);

    displayProducts(limitedProducts);
  } catch (error) {
    console.error("Error fetching products:", error);
  }
}

function truncateTitle(title, maxLength = 20) {
  return title.length > maxLength ? title.slice(0, maxLength) + "..." : title;
}

function truncateCategory(category, maxLength) {
  return category.length > maxLength
    ? category.slice(0, maxLength) + "..."
    : category;
}

function displayProducts(products) {
  const container = document.querySelector(".all-item-cards-on-main-page");
  container.innerHTML = "";

  products.forEach((product) => {
    const truncatedTitle = truncateTitle(product.title, 22);
    const truncatedCategory = truncateCategory(product.category, 5);

    const productCard = document.createElement("div");
    productCard.classList.add("item-card-on-main-page");

    productCard.innerHTML = `
      <img src="${product.image}" width="270" height="220" />
      <div class="name-and-price-and-arrow-on-main-page-items">
        <div class="nameandpriceonmainpage">
          <div class="nameonmainpageitems">
            <p>${truncatedTitle}</p>
          </div>
          <div class="priceonmainpageitems">$${product.price}</div>
        </div>
        <div class="arrow-on-main-page">
          <i class="fa-solid fa-arrow-right"></i>
        </div>
      </div>
      <div class="category-and-wishlist">
        <div class="category-on-main-page-items">
          <p>${truncatedCategory}</p>
        </div>
        <div class="wishlist-icon-on-main-page-items">
          <i class="fa-regular fa-heart"></i>
        </div>
      </div>
    `;

    // Click on the product card (except wishlist)
    productCard.addEventListener("click", () => {
      localStorage.setItem("selectedProduct", JSON.stringify(product));
      window.location.href = "product.html";
    });

    // Wishlist icon click
    const wishlistIcon = productCard.querySelector(".fa-heart");
    wishlistIcon.addEventListener("click", (e) => {
      e.stopPropagation(); // prevents the card click
      wishlistIcon.classList.toggle("fa-solid");
      wishlistIcon.classList.toggle("fa-regular");
      wishlistToast();
    });

    container.appendChild(productCard);
  });
}

// Initialize products - show only 4 products
getProducts(4);

//========================================
// IMAGE SLIDER / CAROUSEL
//========================================
function autoSlide() {
  index++;
  if (index >= slides.length) {
    index = 0;
  }
  slidesContainer.style.transform = `translateX(-${index * 100}%)`;
}

let interval = setInterval(autoSlide, 3000);

slidesContainer.addEventListener("mouseover", () => clearInterval(interval));

slidesContainer.addEventListener("mouseout", () => {
  interval = setInterval(autoSlide, 4000);
});
