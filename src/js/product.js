import { setLocalStorage } from "./utils.mjs";
import ProductData from "./ProductData.mjs";
  const savedItems = localStorage.getItem("selectedItems")
  let selectedItems = savedItems===null ? [] : JSON.parse (savedItems)

const dataSource = new ProductData("tents");

function addProductToCart(product) {
  setLocalStorage("so-cart", product);
}
// add to cart button event handler
async function addToCartHandler(e) {
  const product = await dataSource.findProductById(e.target.dataset.id);
  addProductToCart(product);
  alert('a item has been added')
  selectedItems.push(product)
  let stringarray = JSON.stringify(selectedItems)
  localStorage.setItem('selectedItems', stringarray);
}

// add listener to Add to Cart button
document
  .getElementById("addToCart")
  .addEventListener("click", addToCartHandler);
