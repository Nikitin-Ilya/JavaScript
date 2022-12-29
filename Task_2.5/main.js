const editButton = document.querySelector(".header__button");
const input = document.querySelector(".header__input");
const todoListElement = document.querySelector(".item-list");
const clearItems = document.querySelector(".footer__clear-items");
let todoList = [];

window.onload = () => {
  let cookies = getCookie();
  if (cookies != null) {
    let parsedCookies = JSON.parse(cookies);
    todoList = parsedCookies;
    displayTodoList();
  }
};

editButton.addEventListener("click", () => {
  let toDoItem = {
    name: input.value,
    isChecked: false,
  }
  todoList.push(toDoItem)
  createCookie(JSON.stringify(todoList));
  displayTodoList();
  input.value = "";
})

function displayTodoList(){
  let template = ``;

  todoList.forEach((element, index) => {
    template += `
    <div class="item-list__item">
      <span class="text" id="item_${index}">${element.name}</span>
      <div class="icons">
        <input type="checkbox" class="item_done" id="item_${index}" name="item_${index}" ${element.isChecked ? "checked" : ""}/>
        <label for="item_${index}" class="item_done_label"></label>
        <span class="trash_icon" id="trash_${index}">&#10060;</span>
      </div>
    </div>`;
  });

  todoListElement.innerHTML = template;
}

todoListElement.addEventListener("click", (event) => {
  let deleteItemIcon = event.target;
  if (
    deleteItemIcon.tagName == "SPAN" &&
    deleteItemIcon.classList.contains("trash_icon") // checking whether clicked target is trash icon
  ) {
    todoList.forEach((item, index) => {
      if (
        item.name ===
        deleteItemIcon.parentElement.nextSibling.parentElement.firstElementChild.innerHTML
      ) {
        todoList.splice(index, 1);
        let cookieItem = JSON.stringify(todoList);
        createCookie(cookieItem);
        displayTodoList();
      }
    });
  }
});

clearItems.addEventListener("click", () => {
  todoList = [];
  displayTodoList();
});

todoListElement.addEventListener("change", (event) => {
  let todoText = todoListElement.querySelector(
    `#${event.target.getAttribute("id")}`
  ).innerHTML;
  todoList.forEach((item) => {
    if (item.name === todoText) {
      item.isChecked = !item.isChecked;
      let cookieItem = JSON.stringify(todoList);
      createCookie(cookieItem);
    }
  });
});

// cookie
function createCookie(value) {
  let date = new Date(Date.now() + 86400); //86400 seconds = 1 day
  date = date.toUTCString();
  document.cookie = `todo=${value};expires=${date};path=/`;
};

function getCookie(){
  const data = document.cookie.split(`; todo=`).pop();
  return data;
};