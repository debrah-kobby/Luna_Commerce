document.addEventListener("DOMContentLoaded", () => {
  const productData = JSON.parse(localStorage.getItem("selectedProduct"));

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
  document.querySelector(".itemdescriptiononitemcardSh").textContent =
    productData.description;

  // Generate random rating count
  const ratingElement = document.querySelector(".starsonPRP p");
  ratingElement.textContent = `(${Math.floor(Math.random() * 400) + 50})`;

  // Clear storage after load (optional)
  // localStorage.removeItem("selectedProduct");
});
