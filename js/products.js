import {
  createProductCard,
  fetchFeatured,
  fetchCategory,
  saveToStorage,
  updateCartBadge,
} from "./utils.js";

const featuredContainer = document.querySelector(
  ".overalldivforfeaturesitemcards",
);
const menContainer = document.querySelector(".overalldivformensitemscardsSh");
const womenContainer = document.querySelector(
  ".overalldivforwomenssitemscardsSh",
);
const accessoriesContainer = document.querySelector(
  ".overalldivforaccessoriessitemscardsSh",
);
const shoesContainer = document.querySelector(
  ".overalldivforshoesitemscardsSh",
);
const jacketsContainer = document.querySelector(
  ".overalldivforjacketsitemscardsSh",
);

fetchFeatured(featuredContainer, 6);
fetchCategory("men's clothing", menContainer, 5);
fetchCategory("women's clothing", womenContainer, 5);
fetchCategory("jewelery", accessoriesContainer, 5);
fetchCategory("electronics", shoesContainer, 5);
fetchCategory("men's clothing", jacketsContainer, 5);

// ── Hamburger menu ──────────────────────────────────────────
document.addEventListener("DOMContentLoaded", () => {
  const secondNav = document.getElementById("shopSecondNav");
  const secondNavUl = document.getElementById("shopSecondNavUl");

  // Create and inject hamburger button
  const hamburger = document.createElement("div");
  hamburger.className = "shop-hamburger";
  hamburger.innerHTML = `<span></span><span></span><span></span>`;
  secondNav.insertBefore(hamburger, secondNavUl);

  hamburger.addEventListener("click", function () {
    this.classList.toggle("active");
    secondNavUl.classList.toggle("active");
  });

  // Close when clicking outside
  document.addEventListener("click", (e) => {
    if (!secondNav.contains(e.target)) {
      hamburger.classList.remove("active");
      secondNavUl.classList.remove("active");
    }
  });
});

// ── Banner auto-rotate ──────────────────────────────────────
const changingBanners = document.querySelectorAll(".bannerschange");
let counter = 0;

setInterval(() => {
  changingBanners[counter].classList.remove("activebanner");
  counter = (counter + 1) % changingBanners.length;
  changingBanners[counter].classList.add("activebanner");
}, 5000);

// ── Navigate to product page on image click ─────────────────
document.addEventListener("click", (e) => {
  if (e.target.classList.contains("featureditemsimage")) {
    const productCard = e.target.closest(".itemcardonshoppage");
    saveToStorage("selectedProduct", JSON.parse(productCard.dataset.product));
    window.location.href = "/product.html";
  }
});

updateCartBadge();
