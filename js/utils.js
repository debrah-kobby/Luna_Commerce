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
    if (event.target.classList.contains("fa-heart")) {
      event.stopPropagation();
      event.target.classList.toggle("fa-solid");
      event.target.classList.toggle("fa-regular");
      console.log("loveiconclicked");
    }
  });
  return div;
}

// Fetch products for a category and append to a container
export async function fetchCategory(category, container, limit = 4) {
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

// Fetch random featured products
export async function fetchFeatured(container, limit = 6) {
  try {
    const response = await fetch("https://fakestoreapi.com/products");
    const data = await response.json();
    const random = data.sort(() => 0.5 - Math.random()).slice(0, limit);
    container.innerHTML = "";
    random.forEach((product) =>
      container.appendChild(createProductCard(product))
    );
  } catch (error) {
    console.error("Error fetching featured:", error);
  }
}
