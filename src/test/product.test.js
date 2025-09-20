import { setLocalStorage } from "../js/utils.mjs";
import ProductData from "../js/ProductData.mjs";
const savedItems = localStorage.getItem("selectedItems");
let selectedItems = savedItems === null ? [] : JSON.parse(savedItems);

function addProductToCart(product) {
  const existingItem = selectedItems.find((item) => item.Id === product.Id);
  if (!existingItem) {
    const productWithQuantity = { ...product, quantity: 1 };
    selectedItems.push(productWithQuantity);
  } else {
    existingItem.quantity += 1;
  }
}

const urlParams = new URLSearchParams(window.location.search);
const category = urlParams.get('category');
//If the tent json will use this


if (category === "tents"){
const jsonString = `json/${category}.json`;
const response = await fetch(jsonString);
const products = await response.json();
const template = document.getElementById("product_section");
const ItemValue = urlParams.get('Id');
console.log(ItemValue);
products.forEach((product) => {
  if (product.Id == ItemValue) {
    const productElement = template.content.cloneNode(true);
    const brand = productElement.querySelector(".product__brand");
    const name = productElement.querySelector(".product__name");
    const photo = productElement.querySelector(".productImg");
    const lp = productElement.querySelector(".product-card__price");
    const button = productElement.querySelector("#addToCart");
    const color = productElement.querySelector(".product__color");
    const desc = productElement.querySelector(".product__description");

    button.setAttribute("data-id", product.Id);
    button.addEventListener("click", function() {
      addProductToCart(product);
      let stringarray = JSON.stringify(selectedItems);
      localStorage.setItem("selectedItems", stringarray);
      console.log("Added to cart:", product.Name);
      });
    desc.innerHTML = product.DescriptionHtmlSimple;
    brand.textContent = product.Brand.Name;
    name.textContent = product.Name;
    photo.src = product.Image;
    lp.textContent = `${product.ListPrice}`;
    color.textContent = product.Colors[0].ColorName;

    const productContainer = document.querySelector(".product-list");
    productContainer.appendChild(productElement);
  }
});
}
//else if the other Json type will use this
else if(category === "backpacks"|| category === "sleeping-bags"){
  const jsonString = `json/${category}.json`;
const response = await fetch(jsonString);
let data = await response.json();
    let products = data['Result'];
const template = document.getElementById("product_section");
const ItemValue = urlParams.get('Id');;
console.log(ItemValue);
products.forEach((product) => {
  if (product.Id == ItemValue) {
    const productElement = template.content.cloneNode(true);
    const brand = productElement.querySelector(".product__brand");
    const name = productElement.querySelector(".product__name");
    const photo = productElement.querySelector(".productImg");
    const lp = productElement.querySelector(".product-card__price");
    const button = productElement.querySelector("#addToCart");
    const color = productElement.querySelector(".product__color");
    const desc = productElement.querySelector(".product__description");

    button.setAttribute("data-id", product.Id);
    button.addEventListener("click", function() {
      addProductToCart(product);
      let stringarray = JSON.stringify(selectedItems);
      localStorage.setItem("selectedItems", stringarray);
      console.log("Added to cart:", product.Name);
      });
    desc.innerHTML = product.DescriptionHtmlSimple;
    brand.textContent = product.Brand.Name;
    name.textContent = product.Name;
    photo.src = product.Images.PrimaryLarge;
    lp.textContent = `${product.ListPrice}`;
    color.textContent = product.Colors[0].ColorName;

    const productContainer = document.querySelector(".product-list");
    productContainer.appendChild(productElement);
  }
});
}
