// Grab all section containers
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

document.addEventListener("DOMContentLoaded", () => {
  const productData = JSON.parse(localStorage.getItem("selectedProduct"));

  const details = document.querySelector(".detailsfordeliveryreturnsonPRP");
  const modal = document.querySelector(".modal_for_details_of_return_policy");
  const closeModal = document.querySelector(
    ".clost-button-for-return-policy-modal i"
  );
  const decrementonPRP = document.querySelector(".decrementonPRP");
  const incrememntonPRP = document.querySelector(".incrememntonPRP");
  const numberDisplay = document.querySelector(".increordecrenumber");
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
    console.log("Details Clicked");
  });
  closeModal.addEventListener("click", () => {
    modal.style.display = "none";
    console.log("Modal Closed");
  });
  modal.addEventListener("click", (e) => {
    if (e.target === modal) modal.style.display = "none";
  });

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
  /* document.querySelector(".itemdescriptiononitemcardSh").textContent =
    productData.description; */

  // Generate random rating count
  const ratingElement = document.querySelector(".starsonPRP p");
  ratingElement.textContent = `(${Math.floor(Math.random() * 400) + 50})`;

  // Clear storage after load (optional)
  // localStorage.removeItem("selectedProduct");
});

import { createProductCard, fetchFeatured, fetchCategory } from "./utils.js";
fetchFeatured(featuredContainer, 10);

document.addEventListener("click", (e) => {
  if (e.target.classList.contains("fa-heart")) {
    e.target.classList.toggle("fa-solid");
    e.target.classList.toggle("fa-regular");
  }
  if (e.target.classList.contains("addtocardbuttononitemcardSh")) {
    window.location.href = "/cart.html";
  }
  if (e.target.classList.contains("featureditemsimage")) {
    const productCard = e.target.closest(".itemcardonshoppage");
    const product = productCard.dataset.product;
    localStorage.setItem("selectedProduct", product);
    window.location.href = "/product.html";
  }
});
