import {
  setLocalStorage,
  getLocalStorage,
  loadHeaderFooter,
} from "./utils.mjs";
import ProductData from "/js/ProductData.mjs";

let selectedItemsRaw = localStorage.getItem("selectedItems");
let selectedItems = [];

if (selectedItemsRaw && selectedItemsRaw !== "undefined") {
  try {
    selectedItems = JSON.parse(selectedItemsRaw);
  } catch (e) {
    console.error("Error parsing selectedItems:", e);
  }
} else {
  console.warn(
    "selectedItems was undefined or missing. Resetting to empty array.",
  );
  selectedItems = [];
  localStorage.setItem("selectedItems", JSON.stringify(selectedItems)); // optional reset
}

const dataSource = new ProductData("tents");

function addProductToCart(product) {
  const existingItem = selectedItems.find((item) => item.Id === product.Id);
  if (!existingItem) {
    product.quantity = 1;
    selectedItems.push(product);
  } else {
    existingItem.quantity += 1;
  }
  //reruns loadheaderfooter to update cart count
  loadHeaderFooter();
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
}, 500);

loadHeaderFooter();
