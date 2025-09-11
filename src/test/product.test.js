console.log("Test");

const response = await fetch("../json/tents.json");
const tents = await response.json();
const template = document.getElementById("product_section");
const tentValue = localStorage.getItem("selectedTent");
console.log(tentValue);
tents.forEach((tent) => {
  if (tent.Id == tentValue) {
    const product = template.content.cloneNode(true);
    const brand = product.querySelector(".product__brand");
    const name = product.querySelector(".product__name");
    const photo = product.querySelector(".productImg");
    const lp = product.querySelector(".product-card__price");
    const button = product.querySelector("#addToCart");
    const color = product.querySelector(".product__color");
    const desc = product.querySelector(".product__description");

    button.setAttribute("data-id", tent.Id);
    desc.innerHTML = tent.DescriptionHtmlSimple;
    brand.textContent = tent.Brand.Name;
    name.textContent = tent.Name;
    photo.src = tent.Image;
    lp.textContent = `${tent.ListPrice}`;
    color.textContent = tent.Colors[0].ColorName;

    const productContainer = document.querySelector(".product-list");
    productContainer.appendChild(product);
  }
});
