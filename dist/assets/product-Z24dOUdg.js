function d(t) {
  if (t.ok) return t.json();
  throw new Error("Bad Response");
}
class r {
  constructor(e) {
    (this.category = e), (this.path = `../json/${this.category}.json`);
  }
  getData() {
    return fetch(this.path)
      .then(d)
      .then((e) => e);
  }
  async findProductById(e) {
    return (await this.getData()).find((o) => o.Id === e);
  }
}
const s = localStorage.getItem("selectedItems");
let a = s === null ? [] : JSON.parse(s);
const c = new r("tents");
function i(t) {
  const e = a.find((n) => n.Id === t.Id);
  t.quantity,
    e
      ? (e.quantity += 1)
      : ((t.quantity = 1), t.productWithQuantity, a.push(t));
}
async function u(t) {
  const e = await c.findProductById(t.target.dataset.id);
  i(e);
  let n = JSON.stringify(a);
  localStorage.setItem("selectedItems", n);
}
setTimeout(() => {
  document.getElementById("addToCart").addEventListener("click", u);
}, 100);
