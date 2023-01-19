const Api = "../suits.JSON";

const searchElement = document.getElementById("sidebar__search");
const priceLabelElement = document.getElementById("price-value");

let products;

window.onload = () => {
  filterProducts();
};

async function getProducts(api, selectedBrand, maxPrice) {
  const res = await fetch(api);
  let allProducts = await res.json();

  if ((selectedBrand == "") && (maxPrice == "")){
    products = allProducts;
    showProducts(products)
  }
  else{
    products = allProducts.filter((item) => {
      const brand = item.brand.toLowerCase();
      const price = item.price;
      if ((brand == selectedBrand.toLowerCase() || selectedBrand == "All" || selectedBrand == "") && price <= maxPrice) {
        return item;
      }
    });
    showProducts(products);
  }
  
}

const showProducts = (products, count) => {
  const feauturedProductsElement = document.getElementById("products-list");
  feauturedProductsElement.innerHTML = "";
  let futuredItemElements = "";

  if (products.length > 0){

    feauturedProductsElement.style.display = "grid";

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
        <img src="../${item.image}" alt="Error!"/>

        <div class="item__info">
          <div class="item__name">
            <h3>${item.name}</h3>
            <p>${item.price}$</p>
          </div>

          <button class="item__buy" onclick="addToCard(${item.id}, 1)">
            <i class="fa-solid fa-cart-plus"></i>
          </button>
        </div>

      </div>`;
      if(count && iterator >= count){ break; }
    };

    feauturedProductsElement.innerHTML = futuredItemElements;
  }
  else{ 
    feauturedProductsElement.style.display = "flex";
    feauturedProductsElement.style.alignItems = "center";
    feauturedProductsElement.innerHTML = "<p class='empty'>At the moment we do not have suits according to your parameters.</p>"
  }
};

function filterProducts() {
  const maxPriceElement = ((document.getElementById("price")||"").value)||"";
  const selectedBrandElement = ((document.querySelector('input[name="brand"]:checked')||"").value)||"";
  getProducts(Api, selectedBrandElement, maxPriceElement);
};

searchElement.addEventListener("input", (e) => {
  const {value} = e.target;
  const arrayNames = products.filter((item) => {
    const itemName = item.name.toLowerCase();
    if (itemName.indexOf(value.toLowerCase()) !== -1) {
      return item;
    }
  });

  showProducts(arrayNames);
});

