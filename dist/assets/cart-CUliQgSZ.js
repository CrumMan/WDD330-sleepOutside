import "./style-HlQJNEhF.js";
function r(a) {
  return JSON.parse(localStorage.getItem(a));
}
function c() {
  const t = r("selectedItems").map((e) => n(e));
  document.querySelector(".product-list").innerHTML = t.join("");
}
function n(a) {
  return `<li class='cart-card divider'>
  <a href='#' class='cart-card__image'>
    <img
      src='${a.Image}'
      alt='${a.Name}'
    />
  </a>
  <a href='#'>
    <h2 class='card__name'>${a.Name}</h2>
  </a>
  <p class="cart-card__color">${a.Colors[0].ColorName}</p>
  <p class="cart-card__quantity">Quantity: ${a.quantity} </p>
  <p class="cart-card__price">$${a.FinalPrice}</p>
</li>`;
}
c();
