import { getLocalStorage, loadHeaderFooter } from "./utils.mjs";
function renderCartContents() {
  const cartItems = getLocalStorage("selectedItems");
  const productList = document.querySelector(".product-list");
  const cart_total_container = document.querySelector(".cart-total-container");
  const cart_total = document.getElementById("cart-total");
  //check to see if there are items in the cart
  if (!cartItems.length) {
    productList.innerHTML = "<p> Your cart is empty </p>";
  }
  else {
    const htmlItems = cartItems.map(cartItemTemplate);
    productList.innerHTML = htmlItems.join("");
    // if there are items in the cart make the total visible and get the total cost of the items in the cart
    cart_total_container.style.visibility = "visible";
    let total = 0;
    for (let item of cartItems) {
      total = total + (item.FinalPrice * item.quantity);
    }
    //display total cost
    cart_total.textContent = "Total: $" + total;
  }




}

function cartItemTemplate(item) {
  const newItem = `<li class='cart-card divider'>
  <a href='#' class='cart-card__image'>
    <img
      src='${item.Image}'
      alt='${item.Name}'
    />
  </a>
  <a href='#'>
    <h2 class='card__name'>${item.Name}</h2>
  </a>
  <p class='cart-card__color'>${item.Colors[0].ColorName}</p>
  <p class='cart-card__quantity'>qty:${item.quantity}</p>
  <p class='cart-card__price'>$${item.FinalPrice}</p>

</li>`;

  return newItem;
}

renderCartContents();
loadHeaderFooter();
