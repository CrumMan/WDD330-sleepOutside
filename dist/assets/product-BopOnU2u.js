import { s as n } from "./utils-DTA1AWa-.js";
const savedItems = localStorage.getItem("selectedItems");
let selectedItems = savedItems === null ? [] : JSON.parse(savedItems);
let stringarray = JSON.stringify(selectedItems);
function r(t) {
  if (t.ok) return t.json();
  throw new Error("Bad Response");
}
class e {
  constructor(o) {
    (this.category = o),
      (this.path = `CORRECT-PATH-HERE/${this.category}.json`);
  }
  getData() {
    return fetch(this.path)
      .then(r)
      .then((o) => o);
  }
  async findProductById(o) {
    return (await this.getData()).find((a) => a.Id === o);
  }
}
const c = new e("tents");
function d(t) {
  n("so-cart", t);
}
async function s(t) {
  const o = await c.findProductById(t.target.dataset.id);
  d(o);
  alert("a item has been added");
  selectedItems.push(o);
  stringarray = JSON.stringify(selectedItems);
  localStorage.setItem("selectedItems", stringarray);
}
document.getElementById("addToCart").addEventListener("click", s);
