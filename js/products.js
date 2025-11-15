import { createProductCard, fetchFeatured, fetchCategory } from "./utils.js";
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

// Load all sections
fetchFeatured(featuredContainer, 6);

fetchCategory("men's clothing", menContainer, 5);
fetchCategory("women's clothing", womenContainer, 5);
fetchCategory("jewelery", accessoriesContainer, 5);
fetchCategory("electronics", shoesContainer, 5);
fetchCategory("men's clothing", jacketsContainer, 5);

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
