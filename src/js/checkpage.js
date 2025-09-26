import { getLocalStorage, loadHeaderFooter,populate_totals} from "./utils.mjs";
import { packageItems} from "./CheckoutProcess.MJS";

const checkout_form = document.getElementById("checkout-form")

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
        
    }

function PopulatePostForm() {

}


}

function cartItemTemplate(item) {
    const newItem = `<li class='cart-card divider'>
  <a href='#' class='cart-card__image'>
    <img
      src='${item.Images.PrimaryMedium}'
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

populate_totals("selectedItems");
renderCartContents();
loadHeaderFooter();