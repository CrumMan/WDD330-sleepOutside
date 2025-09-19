/*import { setLocalStorage } from "./utils.mjs";
const savedItems = new setLocalStorage("selectedItems");

let selectedItems = savedItems === null ? [] : JSON.parse(savedItems);

const dataSource = new ProductData("tents");

function addProductToCart(product) {
  const existingItem = selectedItems.find((item) => item.Id === product.Id);
  let productWithQuantity = product.quantity;
  if (!existingItem) {
    productWithQuantity = product.quantity = 1;
    product.productWithQuantity;
    selectedItems.push(product);
  } else {
    existingItem.quantity += 1;
  }
}

// add to cart button event handler
async function addToCartHandler(e) {
  const product = await dataSource.findProductById(e.target.dataset.id);
  addProductToCart(product);
  let stringarray = JSON.stringify(selectedItems);
  localStorage.setItem("selectedItems", stringarray);
}

// add listener to Add to Cart button
setTimeout(() => {
  document
    .getElementById("addToCart")
    .addEventListener("click", addToCartHandler);
}, 100);*/









//Test different code
import { setLocalStorage, getLocalStorage } from "./utils.mjs";

let selectedItems = getLocalStorage("selectedItems") ?? [];

const dataSource = new ProductData("tents");

function addProductToCart(product) {
  const existingItem = selectedItems.find((item) => item.Id === product.Id);
  if (!existingItem) {
    product.quantity = 1;
    selectedItems.push(product);
  } else {
    existingItem.quantity += 1;
  }
}

async function addToCartHandler(e) {
  const product = await dataSource.findProductById(e.target.dataset.id);
  addProductToCart(product);
  setLocalStorage("selectedItems", selectedItems);
}

setTimeout(() => {
  document
    .getElementById("addToCart")
    .addEventListener("click", addToCartHandler);
}, 100);

