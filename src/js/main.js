async function loadProduct() {
  const response = await fetch("./json/tents.json");
  const tents = await response.json();
  const template = document.getElementById("product-card");
  tents.forEach((tent) => {
    const clone = template.content.cloneNode(true);
    const brand = clone.querySelector(".card__brand");
    const name = clone.querySelector(".card__name");
    const photo = clone.querySelector(".productImg");
    const lp = clone.querySelector(".product-card__price");
    const hrefAndDetails = clone.querySelector("a#href");

    hrefAndDetails.href = tent.Href.replace("../", "");
    hrefAndDetails.setAttribute("data-id", tent.id);
    brand.textContent = tent.Brand.Name;
    name.textContent = tent.Name;
    photo.src = tent.Image.replace("../", "./");
    lp.textContent = tent.ListPrice;

    hrefAndDetails.addEventListener("click", function (event) {
      localStorage.setItem("selectedTent", tent.Id);
    });

    const productContainer = document.querySelector(".product-list");
    productContainer.appendChild(clone);
  });
}
loadProduct();

//Clear local storage on first open of the session
window.addEventListener('load', () => {
  //Check if we've already initialized this session
  if (!sessionStorage.getItem('sessionStarted')) {
    //First time this session — clear the cart
    localStorage.clear();

    //Set the flag so it doesn't run again
    sessionStorage.setItem('sessionStarted', 'true');
  }
});
