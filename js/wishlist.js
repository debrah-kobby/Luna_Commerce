import {
  truncateTitle,
  getFromStorage,
  saveToStorage,
  updateCartBadge,
} from "./utils.js";

const overallWishlistDiv = document.querySelector(
  ".actual_wishlists_items_overall_div",
);
const clearWishlistBtn = document.querySelector(".clear_wishlist_div");

document.addEventListener("DOMContentLoaded", () => {
  // ── Hamburger menu ──────────────────────────────────────
  const secondNav = document.getElementById("wishlistSecondNav");
  const secondNavUl = document.getElementById("wishlistSecondNavUl");

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

  renderWishlist();
});

function renderWishlist() {
  const storedWishlist = getFromStorage("wishlistStorage");
  overallWishlistDiv.innerHTML = "";

  if (storedWishlist.length === 0) {
    document
      .querySelector(".emptywihslistdiv")
      .classList.add("emptywishlistshow");
    clearWishlistBtn.style.display = "none";
    return;
  }

  storedWishlist.forEach((item) => {
    const product = item.product;
    const formattedDate = new Date(item.addedAt).toLocaleDateString();
    const truncatedTitle = truncateTitle(product.title);

    const div = document.createElement("div");
    div.classList.add("individual_wishlist_cards");
    div.innerHTML = `
      <div class="container_for_wishlist_item_image">
        <img src="${product.image}" alt="" width="70" height="70" />
      </div>
      <div class="name_and_date_on_wishlist_items font-exo">
        <p class="name_on_wishlist_item">${truncatedTitle}</p>
        <p class="date_on_wishlist_item">${formattedDate}</p>
      </div>
      <div class="price_and_heart_icon_on_wishlist_icon_on_wishlist_item">
        <div class="price_on_wishlist_item font-exo">$ ${product.price}</div>
        <div class="wish_and_delete_on_wishlist_item">
          <div class="wish_on_wishlist_item">
            <i class="fa-solid fa-heart"></i>
          </div>
          <div class="delete_on_wishlist_item">
            <i class="fa-solid fa-trash"></i>
          </div>
        </div>
      </div>
    `;

    overallWishlistDiv.appendChild(div);

    const deleteBtn = div.querySelector(".delete_on_wishlist_item i");
    deleteBtn.dataset.id = product.id;

    deleteBtn.addEventListener("click", (e) => {
      const productID = parseInt(e.currentTarget.dataset.id);
      const updated = getFromStorage("wishlistStorage").filter(
        (item) => item.product.id !== productID,
      );
      saveToStorage("wishlistStorage", updated);
      renderWishlist();
    });
  });
}

clearWishlistBtn.addEventListener("click", () => {
  localStorage.removeItem("wishlistStorage");
  renderWishlist();
});

document
  .querySelector(".home-onwishlistprofile")
  .addEventListener("click", () => {
    window.location.href = "index.html";
  });

document
  .querySelector(".shop_button_on_wishlist_profile")
  .addEventListener("click", () => {
    window.location.href = "shop.html";
  });

updateCartBadge();
