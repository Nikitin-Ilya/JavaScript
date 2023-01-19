const cartItemsElement = document.querySelector(".cart__items")

const api = "./suits.JSON";
let cartItemList;
let suits;

function openCart(){
  const cartElement = document.querySelector(".cart");

  if (cartElement.classList.contains("hide")){
    cartElement.classList.remove("hide");
    
    loadCartData();
  }
  else{
    cartElement.classList.add("hide");
  }
}

function loadCartData(){
  const totalPriceElement = document.querySelector('.cart__total-price');

  let cartData = getCartData();
  if (cartData != null) {
    cartItemList = cartData;
  }
  
  let totalPrice = 0;

  for (let id in cartData) {
    totalPrice += cartData[id].count * cartData[id].price;
  }
  totalPriceElement.innerHTML = `<p>Total: <span>$${totalPrice}</span></p>`;
  displayCartItemList();
}

async function addToCard(_id, addCount){ //function for add item to card and edit count item
  console.log("add to cart");
  const res = await fetch(Api);
  const suits = await res.json();
  const cartData = getCartData() || {};

  if (cartData[_id] === undefined) {
    suits.forEach((suit) => {
      if (_id == suit.id){
        cartData[_id] = {
          id: suit.id,
          image: suit.image,
          name: suit.name,
          brand: suit.brand,
          count: addCount,
          price: suit.price,
        };
      }
    });
  }
  else {
    if (addCount == -1 && cartData[_id].count == 1){
      delete cartData[_id];
    }
    else{
      cartData[_id].count = cartData[_id].count + addCount;
    }
  }

  setCartData(cartData);
  loadCartData();
}

const displayCartItemList = () => {
  let template = ``;
  let imagePath;

  if (typeof cartItemList != "undefined"){
    for (const itemID in cartItemList){
      if(window.location.pathname == '/index.html') {
        imagePath = `./${cartItemList[itemID].image}`;
      }
      else{
        imagePath = `../${cartItemList[itemID].image}`;
      }
          template += `
            <div class="cart-item">
              <img src="${imagePath}" alt="Error!"/>

              <div class="cart-item__info">
                <div class="cart-item__name">
                  <h3>${cartItemList[itemID].name}</h3>
                  <h3>${cartItemList[itemID].brand}</h3>
                  <p>${cartItemList[itemID].price}$</p>
                </div>

                <div class="cart-item__controls">
                  <div class="cart-item__count">
                    <button class="plus cart-button" data-id="${cartItemList[itemID].id}" onclick="addToCard(${itemID}, 1)">
                      <i class="fa-solid fa-caret-up"></i>
                    </button>
                    <div class="amount" data-id="${cartItemList[itemID].count}">${cartItemList[itemID].count}</div>
                    <button class="minus cart-button" data-id="${itemID.id}" onclick="addToCard(${itemID}, -1)">
                      <i class="fa-solid fa-caret-down"></i>
                    </button>
                  </div>

                  <button class="cart-item__remove" onclick="deleteCartItem(${itemID})">
                    <i class="fa-solid fa-trash-can"></i>
                  </button>
                </div>
              </div>

            </div>`;
    };
  }
  cartItemsElement.innerHTML = template;
}

function deleteCartItem(itemID){
  let cartData = getCartData();
  if (cartData != null) {
    delete cartData[itemID];
    cartItemList = cartData;
  }

  setCartData(cartData);
  loadCartData();
}

// localStorage

function setCartData(cartData){
  localStorage.setItem('cartItems', JSON.stringify(cartData));
}

function getCartData(){
  return JSON.parse(localStorage.getItem('cartItems'));
}