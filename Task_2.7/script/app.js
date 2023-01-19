const Api = "./suits.JSON";

let products;

window.onload = () => {
  getProducts(Api);
};

async function getProducts(api) {
  const res = await fetch(api);
  products = await res.json();

  showProducts(products, 3);
}

const showProducts = (products, count) => {
  const feauturedProductsElement = document.getElementById("feautured__products");
  feauturedProductsElement.innerHTML = "";
  let futuredItemElements = "";

  products.sort(function(obj1, obj2) {
    if (obj1.name.common < obj2.name.common) return -1;
    if (obj1.name.common > obj2.name.common) return 1;
    return 0;
  });
  
  let iterator = 0;
  for (const item of products){
    iterator++;
    futuredItemElements +=
    `<div class="item">
      <img src="./${item.image}" alt="Error!"/>

      <div class="item__info">
        <div class="item__name">
          <h3>${item.name}</h3>
          <p>${item.price}$</p>
        </div>

        <button class="item__buy" id="${item.id}" onClick="addToCard(this.id, 1)">
          <i class="fa-solid fa-cart-plus"></i>
        </button>
      </div>

    </div>`;
    if(count && iterator >= count){ break; }
  };

  feauturedProductsElement.innerHTML = futuredItemElements;
};

function filterByRegion(selectedRegion) {

  const arrayNames = products.filter((item) => {
    const countryName = item.name.common.toLowerCase();
    if (countryName == selectedRegion) {
      return item;
    }
  });

  showProducts(arrayNames);
};