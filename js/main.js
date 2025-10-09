//MAIN JAVASCRIPT FILE
//DOM
let loaderContainer = document.querySelector(".loader-container");
console.log("script loaded");

// Hide body content at the start
/* document.body.style.overflow = "hidden"; // prevents scrolling */
document.querySelector(".first_page").style.display = "none";

window.addEventListener("load", () => {
  setTimeout(() => {
    loaderContainer.style.display = "none"; // Hide loader
    document.querySelector(".first_page").style.display = "block"; // Show main content
    /* document.body.style.overflow = "auto"; // allow scrolling again */
    console.log("Loader-Hidden");
  }, 1000); // 5 seconds
});
