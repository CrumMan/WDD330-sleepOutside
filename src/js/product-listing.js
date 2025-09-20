async function loadTents (jsonFile) {
  const response = await fetch(jsonFile);
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
    photo.src = tent.Image;
    lp.textContent = tent.ListPrice;

    hrefAndDetails.addEventListener("click", function (event) {
      localStorage.setItem("selectedTent", tent.Id);
    });

    const productContainer = document.querySelector(".product-list");
    productContainer.appendChild(clone);
  });
}
async function loadProducts(productType) {
      const response = await fetch(productType);
    let data = await response.json();
    let products = data['Result'];
    const template = document.getElementById("product-card");
     products.forEach((product) => {
    const clone = template.content.cloneNode(true);
    const brand = clone.querySelector(".card__brand");
    const name = clone.querySelector(".card__name");
    const photo = clone.querySelector(".productImg");
    const lp = clone.querySelector(".product-card__price");
    const hrefAndDetails = clone.querySelector("a#href");
    
    const productId = product.Id;
    const productName = product.Name
    const productBrand = product.Brand.Name
    const productPhoto = product.Images?.PrimaryMedium || product.Image;
    const finalPrice = product.finalPrice

    hrefAndDetails.setAttribute("data-id", productId);
    photo.src = productPhoto;
    brand.textContent = productBrand;
    name.textContent = productName;
    lp.textContent = finalPrice;

    const productContainer = document.querySelector(".product-list");
    productContainer.appendChild(clone);
  });
}


document.getElementById("tents").addEventListener("click", ()=> {window.location.href = "product-listing.html?category=tents"})
document.getElementById("backpacks").addEventListener("click", ()=> {window.location.href = "product-listing.html?category=backpacks"})
document.getElementById("sleepingbags").addEventListener("click", ()=> {window.location.href = "product-listing.html?category=sleeping-bags"})
document.getElementById("hammocks").addEventListener("click", ()=> {window.location.href = "product-listing.html?category=hammocks"})
const urlParams = new URLSearchParams(window.location.search);
const category = urlParams.get('category')
if(category === "tents"){
    loadTents(`json/${category}.json`)
}
else if (category === 'backpacks' || 'sleeping-bags') {
 loadProducts(`json/${category}.json`)
}