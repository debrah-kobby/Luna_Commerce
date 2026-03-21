//UTILS.JS - REUSABLE FUNCTIONS

//========================================
// CREATE PRODUCT CARD
//========================================
export function createProductCard(product) {
  const div = document.createElement("div");
  div.classList.add("itemcardonshoppage");
  div.dataset.product = JSON.stringify(product);

  div.innerHTML = `
    <img src="${product.image}" alt="${
      product.title
    }" class="featureditemsimage" width="200" height="140">
    <div class="itembackgroundonitemcardSh"></div>
    <div class="loveicononfeatureditems"><i class="fa-regular fa-heart"></i></div>
    <div class="nameandpricedivonitemcardSh">
      <p class="itemnameonitemcardSh">${product.title.slice(0, 18)}...</p>
      <p class="itempriceonitemcardsh">$${product.price.toFixed(2)}</p>
    </div>
    <p class="itemdescriptiononitemcardSh">${product.description.slice(
      0,
      60,
    )}...</p>
    <div class="staricononitemcardSh">
      <i class="fa-solid fa-star"></i>
      <i class="fa-solid fa-star"></i>
      <i class="fa-solid fa-star"></i>
      <i class="fa-solid fa-star"></i>
      <i class="fa-solid fa-star"></i>
      <p>(${Math.floor(Math.random() * 400) + 50})</p>
    </div>
    <button class="addtocardbuttononitemcardSh">Add to Cart</button>
  `;

  // Wishlist Toggle Event
  div.addEventListener("click", (event) => {
    if (event.target.classList.contains("fa-heart")) {
      event.stopPropagation();
      event.target.classList.toggle("fa-solid");
      event.target.classList.toggle("fa-regular");
      console.log("loveiconclicked");
    }
  });

  return div;
}

//========================================
// FETCH PRODUCTS BY CATEGORY
//========================================
export async function fetchCategory(category, container, limit = 4) {
  try {
    const response = await fetch(
      `https://fakestoreapi.com/products/category/${category}`,
    );
    const data = await response.json();

    container.innerHTML = "";

    data
      .slice(0, limit)
      .forEach((product) => container.appendChild(createProductCard(product)));
  } catch (error) {
    console.error(`Error fetching ${category}:`, error);
  }
}

//========================================
// FETCH RANDOM FEATURED PRODUCTS
//========================================
export async function fetchFeatured(container, limit = 6) {
  try {
    const response = await fetch("https://fakestoreapi.com/products");
    const data = await response.json();

    const random = data.sort(() => 0.5 - Math.random()).slice(0, limit);

    container.innerHTML = "";

    random.forEach((product) =>
      container.appendChild(createProductCard(product)),
    );
  } catch (error) {
    console.error("Error fetching featured:", error);
  }
}

export function wishlistToast() {
  const wishlistsToast = document.querySelector(".toastforwishlist1");
  if (!wishlistsToast) return;
  wishlistsToast.style.display = "flex";

  // Hide after 3 seconds
  setTimeout(() => {
    wishlistsToast.style.display = "none";
  }, 3000); // 3000ms = 3 seconds
}
export function addtoCartToast() {
  const addtoCartToast = document.querySelector(".toastforaddtocart");
  if (!addtoCartToast) return;
  addtoCartToast.style.display = "flex";

  // Hide after 3 seconds
  setTimeout(() => {
    addtoCartToast.style.display = "none";
  }, 3000); // 3000ms = 3 seconds
}

export function truncateTitle(title, maxLength = 20) {
  return title.length > maxLength ? title.slice(0, maxLength) + "..." : title;
}

export function truncateCategory(category, maxLength) {
  return category.length > maxLength
    ? category.slice(0, maxLength) + "..."
    : category;
}

export function updateCartBadge() {
  const cartBadgeItemNumber = document.querySelector(".numberofcartbadgeitems");
  if (!cartBadgeItemNumber) return;
  const cartItems = getFromStorage("cart");

  cartBadgeItemNumber.textContent = cartItems.length;
}

export function getFromStorage(key, fallback = []) {
  const item = localStorage.getItem(key);
  return item ? JSON.parse(item) : fallback;
}

export function saveToStorage(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}

export function showLoader() {
  const loaderContainer = document.querySelector(".loader-container");
  document.body.style.overflow = "hidden";
  loaderContainer.classList.remove("loader-container-hidden");
}

export function hideLoader() {
  const loaderContainer = document.querySelector(".loader-container");
  document.body.style.overflow = "auto";
  loaderContainer.classList.add("loader-container-hidden");
}

// utils.js

export function createCustomFetch() {
  let requestedFetches = 0;

  return async function customFetch(url, options = {}) {
    requestedFetches++;
    showLoader();

    try {
      const response = await fetch(url, options);
      return response;
    } catch (error) {
      console.error("Fetch failed:", error);
      throw error;
    } finally {
      requestedFetches--;
      if (requestedFetches === 0) {
        hideLoader();
      }
    }
  };
}

export function addtoCart(cartProduct) {
  const cartItems = getFromStorage("cart");

  const exists = cartItems.find((item) => item.id === cartProduct.id);

  if (exists) {
    // CHECK IF TOAST ALREADY EXISTS
    let existingToast = document.getElementById("cart-toast");

    if (!existingToast) {
      const div = document.createElement("div");
      div.id = "cart-toast";
      div.classList.add("divAfterexists");

      div.innerHTML = `
      <p class="paragraph_for_view_carts_after_eists">
        Item Already in Cart - &nbsp
        <span class="view_cart_link_after_exists">View Cart</span>
      </p>
    `;

      document.body.appendChild(div);

      existingToast = div;

      setTimeout(() => {
        existingToast.remove();
      }, 2000);

      let viewInCart = document.querySelector(".view_cart_link_after_exists");
      viewInCart.addEventListener("click", () => {
        window.location.href = "cart.html";
        console.log("View in Chart Clicked");
      });
    }

    return; // stop execution so item doesn't get added again
  }

  if (!exists) {
    cartItems.push(cartProduct);
    saveToStorage("cart", cartItems);

    /* cartBadgeItemNumber.textContent = `${cartItems.length}`; */
    updateCartBadge();
    addtoCartToast();
  }
}
export function removeWishlistToast() {
  const removeToast = document.querySelector(".toastforwishlistremove");
  if (!removeToast) return;
  removeToast.style.display = "flex";
  setTimeout(() => {
    removeToast.style.display = "none";
  }, 3000);
}
export function toggleWishlist(product, wishlistIcon) {
  const storedWishlist = getFromStorage("wishlistStorage");
  const existingIndex = storedWishlist.findIndex(
    (item) => item.product.id === product.id,
  );

  if (existingIndex !== -1) {
    // Already in wishlist — remove it
    storedWishlist.splice(existingIndex, 1);
    saveToStorage("wishlistStorage", storedWishlist);
    wishlistIcon.classList.remove("fa-solid");
    wishlistIcon.classList.add("fa-regular");
    removeWishlistToast();
  } else {
    // Not in wishlist — add it
    storedWishlist.push({
      product: product,
      addedAt: new Date().toISOString(),
    });
    saveToStorage("wishlistStorage", storedWishlist);
    wishlistIcon.classList.remove("fa-regular");
    wishlistIcon.classList.add("fa-solid");
    wishlistToast();
  }
}

export function initWishlistIcon(product, wishlistIcon) {
  // Set initial icon state based on whether product is already in wishlist
  const storedWishlist = getFromStorage("wishlistStorage");
  const alreadyInWishlist = storedWishlist.some(
    (item) => item.product.id === product.id,
  );
  if (alreadyInWishlist) {
    wishlistIcon.classList.remove("fa-regular");
    wishlistIcon.classList.add("fa-solid");
  }
}
