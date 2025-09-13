import { setLocalStorage } from "./utils.mjs";

const dataSource = new setLocalStorage("selectedItems");

let selectedItems = savedItems === null ? [] : JSON.parse(savedItems);



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
}, 100);
