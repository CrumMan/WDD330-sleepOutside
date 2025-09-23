import ProductData from "./ProductData.mjs";
const savedItems = localStorage.getItem("selectedItems");
let selectedItems = savedItems === null ? [] : JSON.parse(savedItems);


const urlParams = new URLSearchParams(window.location.search);
const category = urlParams.get('category');
const dataSource = new ProductData(category);

function addProductToCart(product) {
  const existingItem = selectedItems.find((item) => item.Id === product.Id);
  if (!existingItem) {
    const productWithQuantity = { ...product, quantity: 1 };
    selectedItems.push(productWithQuantity);
  } else {
    existingItem.quantity += 1;
  }
}

// add to cart button event handler
async function addToCartHandler(e) {
  const product = await dataSource.findProductById(e.target.dataset.id);
  console.log('Found Product:', product);
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
