import { renderListWithTemplate } from "./utils.mjs";

function productCardTemplate(product) {
  const image = product.Images?.PrimaryMedium || "images/placeholder.png";
  const brand = product.Brand?.Name || "Unknown Brand";
  return `
    <li class="product-card">
      <a href="/product_pages/?product=${product.Id}">
        <img src="${image}" alt="Image of ${product.Name}">
        <h3>${brand}</h3>
        <p>${product.NameWithoutBrand || product.Name}</p>
        <p class="product-card__price">$${product.FinalPrice?.toFixed(2) || "N/A"}</p>
      </a>
    </li>
  `;
}

export default class ProductList {
  constructor(category, dataSource, listElement) {
    this.category = category;
    this.dataSource = dataSource;
    this.listElement = listElement;
    this.products = []; 
  }

  async init() {
    this.products = await this.dataSource.getData(this.category);
    this.renderList(this.products);

    document.querySelector(".title").textContent = this.category;

    
    const sortSelect = document.getElementById("sort");
    if (sortSelect) {
      sortSelect.addEventListener("change", (e) => {
        this.sortAndRender(e.target.value);
      });
    }
  }

  renderList(list) {
    renderListWithTemplate(productCardTemplate, this.listElement, list);
  }

  sortAndRender(criteria) {
    let sorted = [...this.products]; 

    switch (criteria) {
      case "name":
        sorted.sort((a, b) => a.Name.localeCompare(b.Name));
        break;
      case "priceLowHigh":
        sorted.sort((a, b) => a.FinalPrice - b.FinalPrice);
        break;
      case "priceHighLow":
        sorted.sort((a, b) => b.FinalPrice - a.FinalPrice);
        break;
      default:
        
        sorted = this.products;
    }

    this.renderList(sorted);
  }
}
