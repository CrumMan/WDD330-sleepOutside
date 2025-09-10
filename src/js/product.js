import { setLocalStorage } from "./utils.mjs";
import ProductData from "./ProductData.mjs";
const savedItems = localStorage.getItem("selectedItems");
let selectedItems = savedItems === null ? [] : JSON.parse(savedItems);

const dataSource = new ProductData("tents");

function addProductToCart(product) {
  const existingItem = selectedItems.find(item => item.Id === product.Id)
  let productWithQuantity = product.quantity;
  if (!existingItem) {
    productWithQuantity = product.quantity = 1;
    product.productWithQuantity;
    selectedItems.push(product);
  }
  else {

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

async function currentProduct(e){
  const product = await dataSource.findProductById(e.target.dataset.id);
  localStorage.setItem(product)

}

// add listener to Add to Cart button
document
  .getElementById("addToCart")
  .addEventListener("click", addToCartHandler);

  document.querySelector(".product-details")
  .addEventListener("click", addToCartHandler);
