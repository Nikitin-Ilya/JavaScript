const dishes = [
  {
     title:'Buttermilk pancakes',
     price:'$19.50',
     img: 'img/img01.png',
     description: 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Minus, veniam.',
     category: 'breakfast',
  },
  {
     title:'Quaramtine Buddy',
     price:'$16.99',
     img: 'img/img08.png',
     description: 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Minus, veniam.',
     category: 'shake',
  },
  {
     title:'Diner Double',
     price:'$13.99',
     img: 'img/img04.png',
     description: 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Minus, veniam.',
     category: 'lunch',
  },
  {
     title:'Country Delight',
     price:'$20.29',
     img: 'img/img02.png',
     description: 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Minus, veniam.',
     category: 'breakfast',
  },
  {
     title:'Bacon Overflow',
     price:'$8.90',
     img: 'img/img03.png',
     description: 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Minus, veniam.',
     category: 'breakfast',
  },
  {
     title:'American Classic',
     price:'$12.99',
     img: 'img/img05.png',
     description: 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Minus, veniam.',
     category: 'lunch',
  },
  {
     title:'Egg Attack',
     price:'$22.99',
     img: 'img/img06.png',
     description: 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Minus, veniam.',
     category: 'lunch',
  },
  {
     title:'Godgilla Milkshake',
     price:'$6.99',
     img: 'img/img07.png',
     description: 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Minus, veniam.',
     category: 'shake',
  },
  {
     title:'Oreo Dream',
     price:'$18.99',
     img: 'img/oreoDream.jpeg',
     description: 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Minus, veniam.',
     category: 'shake',
  },
  {
     title:'Steak Dinner',
     price:'$30.99',
     img: 'img/steakDinner.jpeg',
     description: 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Minus, veniam.',
     category: 'dinner',
  },
]

function outputItems (items){
  let item = ' ';
  items.forEach((el)=>{
    item+='<div class="item ' + el.category + '">';
    item+='<img class="item__img" src="' + el.img + '">';
    item+='<div><div class="item__info">';
    item+='<h2 class="item__title">' + el.title + '</h2>';
    item+='<span class="item__price">' + el.price + '</span></div>';
    item+='<p class="item__description">' + el.description + '</p></div></div>';
  });
  document.getElementsByClassName('main')[0].innerHTML = item;
}

outputItems(dishes)

function filter(category){
  if (category == "all") {
    outputItems(dishes)
  }
  else{
    let filteredDishes = dishes.filter(function(item){
      return item.category == category;
    });
    outputItems(filteredDishes)
  }
}