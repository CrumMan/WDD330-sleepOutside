import { getLocalStorage, loadHeaderFooter, get_total_cart_items } from "./utils.mjs";
function renderCartContents() {
  const cartItems = getLocalStorage("selectedItems") || [];
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


    const removeCarts = document.querySelectorAll(".cart-card__remove");
    removeCarts.forEach(link => {
      link.addEventListener("click", (e) => {
        e.preventDefault();
        const id = link.dataset.set;
        removeFromCart(id);
      });
    });
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
  <p class='cart-card__quantity' id='${item.Id}'>qty:${item.quantity}</p>
  <a class= 'cart-card__remove' href = '#' data-set= '${item.Id}'>remove</a>
  <p class='cart-card__price'>$${item.FinalPrice}</p>

</li>`;
  return newItem;
}
function removeFromCart(id){
  let cartItems = getLocalStorage("selectedItems")
  console.log('Raw id parameter:', id, 'Type:', typeof id); // ← Add this
console.log('ding1');
  cartItems = cartItems.map(item =>{
    console.log('ding2');
     console.log('Raw item.Id:', item.Id, 'Type:', typeof item.Id); // ← Add this
    console.log('Comparing:', Number(item.Id), 'vs', id)
    const CurrentQuantity = Number(item.quantity)
    if (item.Id === id){
      if (CurrentQuantity > 1){
        console.log('changed');
        return { ...item, quantity: CurrentQuantity - 1 };
      }
      console.log('erasing');
      return null
    }
    return item;
  }).filter(item => item !== null)  
  console.log('setting items');
  localStorage.setItem("selectedItems",JSON.stringify(cartItems))
  renderCartContents();
}

renderCartContents();
loadHeaderFooter();
