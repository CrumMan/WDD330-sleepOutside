
    const response = await fetch('./json/tents.json')
    const tents = await response.json();
    const template = document.getElementById('product-card');
    tents.forEach((tent) => {
        const clone = template.content.cloneNode(true);
        //const section = clone.querySelector('.product-detail')
        const brand = clone.querySelector('.card__brand');
        const name = clone.querySelector('.card__name');
        const photo = clone.querySelector('.productImg');
        const lp = clone.querySelector('.product-card__price');
        const href = clone.querySelector('a#href');

        //section.setAttribute('data-id') =  tent.id;
        href.href = tent.Href.replace('../','');
        brand.textContent = tent.Brand.Name;
        name.textContent = tent.Name;
        photo.src = tent.Image.replace('../','./');
        lp.textContent = tent.ListPrice;
        const productContainer = document.querySelector('.product-list');
        productContainer.appendChild(clone);
    });

// ../product_pages/marmot-ajax-3.html