let homeOnWishlist = document.querySelector(".home-onwishlistprofile");
homeOnWishlist.addEventListener("click", () => {
  window.location.href = "index.html";
});

const overallWishlistDiv = document.querySelector(
  ".actual_wishlists_items_overall_div",
);
function truncateTitle(title, maxLength = 20) {
  return title.length > maxLength ? title.slice(0, maxLength) + "... " : title;
}

document.addEventListener("DOMContentLoaded", () => {
  renderWishlist();
});
function renderWishlist() {
  const storedWishlist =
    JSON.parse(localStorage.getItem("wishlistStorage")) || [];
  overallWishlistDiv.innerHTML = "";
  if (storedWishlist.length === 0) {
    document
      .querySelector(".emptywihslistdiv")
      .classList.add("emptywishlistshow");
    clearWishlistBtn.style.display = "none";
  }
  storedWishlist.forEach((item) => {
    const product = item.product;
    const addedAt = new Date(item.addedAt);
    const formattedDate = addedAt.toLocaleDateString();
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

      // Get current wishlist
      let storedWishlist =
        JSON.parse(localStorage.getItem("wishlistStorage")) || [];

      // Remove the product
      storedWishlist = storedWishlist.filter(
        (item) => item.product.id !== productID,
      );

      // Save updated wishlist
      localStorage.setItem("wishlistStorage", JSON.stringify(storedWishlist));

      // Re-render the UI
      renderWishlist();
    });
  });
}

const clearWishlistBtn = document.querySelector(".clear_wishlist_div");

clearWishlistBtn.addEventListener("click", () => {
  localStorage.removeItem("wishlistStorage");
  renderWishlist();
});

const deleteBtns = document.querySelectorAll(".delete_on_wishlist_item i");

const shoponWishlist = document.querySelector(
  ".shop_button_on_wishlist_profile",
);

shoponWishlist.addEventListener("click", () => {
  window.location.href = "shop.html";
});
const cartBadgeItemNumber = document.querySelector(".numberofcartbadgeitems");
export function updateCartBadge() {
  const cartItems = JSON.parse(localStorage.getItem("cart")) || [];
  cartBadgeItemNumber.textContent = cartItems.length;
}
updateCartBadge();
