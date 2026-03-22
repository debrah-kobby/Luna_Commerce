import {
  truncateTitle,
  updateCartBadge,
  getFromStorage,
  saveToStorage,
  hideLoader,
  showLoader,
  createCustomFetch,
  addtoCart,
  initWishlistIcon,
  toggleWishlist,
} from "./utils.js";

console.log(
  "%c⚡ Prince Debrah Bessah Sam - Luna Commerce JS Loaded ⚡",
  "color: white; background: purple; font-size: 16px; font-weight: bold; padding: 4px; border-radius: 4px;",
);

window.AppInfo = {
  developer: "Prince Debrah Bessah Sam",
  version: "1.0.0",
  date: "2025-12-16",
};

console.log(
  "%cApp loaded by %c%s %c(v%s)",
  "font-weight:bold;",
  "color: purple;",
  window.AppInfo.developer,
  "color: grey;",
  window.AppInfo.version,
);

// hide hero until page fully loads
document.addEventListener("DOMContentLoaded", () => {
  showLoader();

  // hamburger menu
  const secondNavItems = document.querySelector(".second_nav_items");
  const secondNavUl = secondNavItems.querySelector("ul");

  const hamburger = document.createElement("div");
  hamburger.className = "hamburger-menu";
  hamburger.innerHTML = `<span></span><span></span><span></span>`;
  secondNavItems.insertBefore(hamburger, secondNavUl);

  hamburger.addEventListener("click", function () {
    this.classList.toggle("active");
    secondNavUl.classList.toggle("active");
  });

  document.addEventListener("click", (event) => {
    if (!secondNavItems.contains(event.target)) {
      hamburger.classList.remove("active");
      secondNavUl.classList.remove("active");
    }
  });
});

window.addEventListener("load", () => {
  document.querySelector(".first_page").style.display = "block";
  hideLoader();
});

// show loader on internal page navigation
document.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    if (link.origin === location.origin) showLoader();
  });
});

const customFetch = createCustomFetch();

// navigation
const firstbuttons = document.querySelector(".buttons_on_first_page");
const seeAllButton = document.querySelector(
  ".see_all_items_button_on_main_page",
);
const firstLookBookButton = document.querySelector(".toplookbookconnection p");

firstbuttons.addEventListener("click", () => {
  window.location = "shop.html";
});

seeAllButton.addEventListener("click", () => {
  window.location = "shop.html";
});

firstLookBookButton.addEventListener("click", () => {
  window.location = "shop.html";
});

firstLookBookButton.addEventListener("mouseover", (e) => {
  e.target.style.cursor = "pointer";
});

// fetch and display products
async function getProducts(limit = 6) {
  try {
    const res = await customFetch("https://fakestoreapi.com/products");
    const data = await res.json();
    displayProducts(data.slice(0, limit));
  } catch (error) {
    console.error("Error fetching products:", error);
  }
}

function displayProducts(products) {
  const container = document.querySelector(".all-item-cards-on-main-page");
  container.innerHTML = "";

  products.forEach((product) => {
    const truncatedTitle = truncateTitle(product.title, 22);

    const productCard = document.createElement("div");
    productCard.classList.add("item-card-on-main-page");
    productCard.dataset.product = JSON.stringify(product);
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
        <div class="wishlist-icon-on-main-page-items">
          <i class="fa-regular fa-heart wishlist_incon_on_MP"></i>
        </div>
      </div>
      <div class="add-to-cart-on-main-page">
        <button class="add-to-cart-on-main-page-button">Add to Cart</button>
      </div>
    `;

    productCard.addEventListener("click", () => {
      saveToStorage("selectedProduct", product);
      window.location.href = "product.html";
    });

    const wishlistIcon = productCard.querySelector(".fa-heart");
    initWishlistIcon(product, wishlistIcon);

    wishlistIcon.addEventListener("click", (e) => {
      e.stopPropagation();
      toggleWishlist(product, wishlistIcon);
    });

    const addToCartBtn = productCard.querySelector(
      ".add-to-cart-on-main-page-button",
    );
    addToCartBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      addtoCart(JSON.parse(productCard.dataset.product));
    });

    container.appendChild(productCard);
  });
}

getProducts(4);

// top picks carousel
let index = 0;
const slidesContainer = document.querySelector(".slides-container");
const slides = document.querySelectorAll(".first-image-div-on-top-picks");

function autoSlide() {
  index = (index + 1) % slides.length;
  slidesContainer.style.transform = `translateX(-${index * 100}%)`;
}

let interval = setInterval(autoSlide, 3000);
slidesContainer.addEventListener("mouseover", () => clearInterval(interval));
slidesContainer.addEventListener("mouseout", () => {
  interval = setInterval(autoSlide, 4000);
});

// moving pictures section
const movingPictures = document.querySelectorAll(
  ".image-on-moving-pics-section",
);
let counter = 0;

setInterval(() => {
  movingPictures[counter].classList.remove(
    "moving_pictures_picture_div_active",
  );
  counter = (counter + 1) % movingPictures.length;
  movingPictures[counter].classList.add("moving_pictures_picture_div_active");
}, 3000);

updateCartBadge();
