import { getLocalStorage } from "./utils.mjs";
function renderCartContents() {
  const items = getLocalStorage("selectedItems");
  const htmlItems = items.map((item) => cartItemTemplate(item));
  const cart_footer = document.querySelector(".cart-footer");
  const cart_total = document.getElementById("cart-total");

  document.querySelector(".product-list").innerHTML = htmlItems.join("");

  //Check to see if there are any items in the cart
  if (items.length > 0) {
    //if there are items in the cart make the cart-footer div visible
    cart_footer.style.visibility = "visible";

    //get the total cost of items in the cart
    let total = 0;
    for (let item of items) {
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
  <p class="cart-card__color">${item.Colors[0].ColorName}</p>
  <p class="cart-card__quantity">Quantity: ${item.quantity} </p>
  <p class="cart-card__price">$${item.FinalPrice}</p>
</li>`;

  return newItem;
}

renderCartContents();
