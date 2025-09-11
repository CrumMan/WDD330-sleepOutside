import "./style-HlQJNEhF.js";
async function l() {
  const c = await (await fetch("./json/tents.json")).json(),
    r = document.getElementById("product-card");
  c.forEach((e) => {
    const t = r.content.cloneNode(!0),
      n = t.querySelector(".card__brand"),
      a = t.querySelector(".card__name"),
      d = t.querySelector(".productImg"),
      s = t.querySelector(".product-card__price"),
      o = t.querySelector("a#href");
    (o.href = e.Href.replace("../", "")),
      o.setAttribute("data-id", e.id),
      (n.textContent = e.Brand.Name),
      (a.textContent = e.Name),
      (d.src = e.Image.replace("../", "./")),
      (s.textContent = e.ListPrice),
      o.addEventListener("click", function (p) {
        localStorage.setItem("selectedTent", e.Id);
      }),
      document.querySelector(".product-list").appendChild(t);
  });
}
l();
