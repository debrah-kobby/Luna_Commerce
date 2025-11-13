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

// Helper to make product cards
function createProductCard(product) {
  const div = document.createElement("div");
  div.classList.add("itemcardonshoppage");
  div.innerHTML = `
    <img src="${product.image}" alt="${
    product.title
  }" class="featureditemsimage" width="200" height="140">
    <div class="itembackgroundonitemcardSh"></div>
    <div class="loveicononfeatureditems"><i class="fa-regular fa-heart"></i></div>
    <div class="nameandpricedivonitemcardSh">
      <p class="itemnameonitemcardSh">${product.title.slice(0, 20)}...</p>
      <p class="itempriceonitemcardsh">$${product.price.toFixed(2)}</p>
    </div>
    <p class="itemdescriptiononitemcardSh">${product.description.slice(
      0,
      60
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
  div.addEventListener("click", (event) => {
    // If the click came from the heart icon, don’t redirect
    if (event.target.classList.contains("fa-heart")) {
      event.stopPropagation();
      event.target.classList.toggle("fa-solid");
      event.target.classList.toggle("fa-regular");
      return;
    } else if (event.target.classList.contains("addtocardbuttononitemcardSh")) {
      event.stopPropagation();
      localStorage.setItem("selectedProduct", JSON.stringify(product));
      window.location.href = "cart.html";
    }

    // Otherwise, go to the product page
    localStorage.setItem("selectedProduct", JSON.stringify(product));
    window.location.href = "product.html";
  });
  return div;
}

// Fetch category and show limited number
async function fetchCategory(category, container, limit = 4) {
  try {
    const response = await fetch(
      `https://fakestoreapi.com/products/category/${category}`
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

// Random featured selection
async function fetchFeatured() {
  try {
    const response = await fetch("https://fakestoreapi.com/products");
    const data = await response.json();
    const random = data.sort(() => 0.5 - Math.random()).slice(0, 6);
    featuredContainer.innerHTML = "";
    random.forEach((product) =>
      featuredContainer.appendChild(createProductCard(product))
    );
  } catch (error) {
    console.error("Error fetching featured:", error);
  }
}

// Load all sections
fetchFeatured();
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
});
