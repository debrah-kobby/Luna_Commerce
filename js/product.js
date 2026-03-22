import {
  fetchFeatured,
  getFromStorage,
  saveToStorage,
  addtoCart,
  updateCartBadge,
} from "./utils.js";

const featuredContainer = document.querySelector(
  ".overalldivforfeaturesitemcards",
);

const details = document.querySelector(".detailsfordeliveryreturnsonPRP");
const modal = document.querySelector(".modal_for_details_of_return_policy");
const closeModal = document.querySelector(
  ".clost-button-for-return-policy-modal i",
);
const decrementonPRP = document.querySelector(".decrementonPRP");
const incrememntonPRP = document.querySelector(".incrememntonPRP");
const numberDisplay = document.querySelector(".increordecrenumber");
const addToCartBtn = document.querySelector(".addtocartbuttononPRP");

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

details.addEventListener("click", () => {
  modal.style.display = "block";
});

closeModal.addEventListener("click", () => {
  modal.style.display = "none";
});

modal.addEventListener("click", (e) => {
  if (e.target === modal) modal.style.display = "none";
});

document.addEventListener("DOMContentLoaded", () => {
  // ── Hamburger menu ──────────────────────────────────────
  const secondNav = document.getElementById("productSecondNav");
  const secondNavUl = document.getElementById("productSecondNavUl");

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
  // ────────────────────────────────────────────────────────

  const productData = getFromStorage("selectedProduct", null);
  if (!productData) {
    document.body.innerHTML =
      "<h2 style='text-align:center;margin-top:50px;'>No product selected.</h2>";
    return;
  }

  document.querySelector(".itemimageonPRP").src = productData.image;
  document.querySelector(".mainitemtitleforPRP").textContent =
    productData.title;
  document.querySelector(".supportingtitlesentenceonPRP").textContent =
    productData.category;
  document.querySelector(".largeboldpricesonPRP").textContent =
    `$${productData.price}`;
  document.querySelector(".starsonPRP p").textContent =
    `(${Math.floor(Math.random() * 400) + 50})`;
});

addToCartBtn.addEventListener("click", () => {
  const productData = getFromStorage("selectedProduct", null);
  if (!productData) return;

  addtoCart({ ...productData, qty: count || 1 });
  count = 0;
  numberOfItems();
});

fetchFeatured(featuredContainer, 10);

document.addEventListener("click", (e) => {
  if (e.target.classList.contains("featureditemsimage")) {
    const productCard = e.target.closest(".itemcardonshoppage");
    saveToStorage("selectedProduct", JSON.parse(productCard.dataset.product));
    window.location.href = "/product.html";
  }
});

updateCartBadge();
