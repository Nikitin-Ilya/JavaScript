function changeColor(){
  let backgroundElement = document.querySelector(".wrapper"); // get element for which background will change
  let codeColor = document.querySelector(".code-color"); // get element with color code
  let r = Math.floor(Math.random() * (256)); 
  let g = Math.floor(Math.random() * (256));
  let b = Math.floor(Math.random() * (256));
  let color = "rgb("+r+","+g+","+b+")";
  backgroundElement.style.background = color;
  codeColor.innerText = color;
  codeColor.style.color = color
}