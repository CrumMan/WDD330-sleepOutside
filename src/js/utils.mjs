// wrapper for querySelector...returns matching element
export function qs(selector, parent = document) {
  return parent.querySelector(selector);
}
// or a more concise version if you are into that sort of thing:
// export const qs = (selector, parent = document) => parent.querySelector(selector);

// retrieve data from localstorage
export function getLocalStorage(key) {
  return JSON.parse(localStorage.getItem(key));
}
// save data to local storage
export function setLocalStorage(key, data) {
  localStorage.setItem(key, JSON.stringify(data));
}
// set a listener for both touchend and click
export function setClick(selector, callback) {
  qs(selector).addEventListener("touchend", (event) => {
    event.preventDefault();
    callback();
  });
  qs(selector).addEventListener("click", callback);
}


export function renderListWithTemplate(
  templateFn,
  parentElement,
  list,
  position = "afterbegin",
  clear = false,
) {
  const htmlStrings = list.map(productCardTemplate);
  this.listElement.insertAdjacentHTML("afterbegin", htmlStrings.join(""));
}


export function renderWithTemplate(
  template,
  parentElement,
  data,
  callback
) {
  parentElement.innerHTML = template;
  if (callback) {
    callback(data);
  }
}


export async function loadTemplate(path) {
  const file_response = await fetch(path);
  const file_path = file_response.text();
  return file_path;
}

//Calculate number of items in cart for Cart Superscript in header. 
export function get_total_cart_items() {
  const cart_items = getLocalStorage("selectedItems");
  let cart_items_amount = 0;
  for (let item of cart_items) {
    cart_items_amount += item.quantity;
  }
  return cart_items_amount;
}

export async function loadHeaderFooter() {
  const header_template = await loadTemplate("../partials/header.html");
  const footer_template = await loadTemplate("../partials/footer.html");

  const header_element = document.getElementById("header");
  const footer_element = document.getElementById("footer");

  renderWithTemplate(header_template, header_element);
  renderWithTemplate(footer_template, footer_element);

  //get the new element cart-sup and sets the HTML to the cart amount
  document.getElementById("cart-sup").innerHTML = get_total_cart_items() ?? 0;
}