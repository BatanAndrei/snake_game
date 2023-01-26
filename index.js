
//отрисовка поля, ячеек и присвоение координат ячейкам

let field = document.createElement('div');  //создали поле
document.body.appendChild(field);
field.classList.add('field');

 for( let i = 1; i < 101; i++){

   let cell = document.createElement('div');   //создали ячейки
   field.appendChild(cell);
   cell.classList.add('cell');
 }

let cell = document.getElementsByClassName('cell');
let x = 1;
let y = 10; 

for (let i = 0; i < cell.length; i++){                //присвоили систему координат ячейкам
    
    if( x > 10 ){
      x = 1;
      y--;
    }
    cell[i].setAttribute('posX', x);       //присвоили систему координат ячейкам
    cell[i].setAttribute('posY', y);      //присвоили систему координат ячейкам
    x++;
   
}

// отрисовка змеи тела, её головы и присвоение змее координат (координаты появляются рэндомно)

function generateSnake() {                                  //создали рэндомное появление X и Y (ячейки)
    let posX = Math.round(Math.random() * (10 - 3) + 3);   //минимальное значение устанавливае 3, что бы не было возврата 
    let posY = Math.round(Math.random() * (10 - 1) + 1);   //числа 0, -1 и тд
    return [posX, posY];
}

let coordinates = generateSnake();
let snakeBody = [document.querySelector('[posX = "' + coordinates[0] + '"][posY = "' + coordinates[1] + '"]'),document.querySelector('[posX = "' + (coordinates[0]-1) + '"][posY = "' + coordinates[1] + '"]'),document.querySelector('[posX = "' + (coordinates[0]-2) + '"][posY = "' + coordinates[1] + '"]')];  //присвоили рэндомные координаты змее и + 2 ячейки рядом(тело)

for ( let i = 0; i < snakeBody.length; i++){  //добавляем всему телу змеи class отрисовки тела
    snakeBody[i].classList.add('snakeBody');
}
snakeBody[0].classList.add('snakeHead')  //добавляем первому элементу тела змеи class отрисовки её головы


//отрисовка яблока, рэндомное появление яблока на поле и яблоко не накладывается на тело змеи 

let apple;

function createApple() {
  function generateApple() {                                  //создали рэндомное появление яблока (ячейки)
    let posX = Math.round(Math.random() * (10 - 1) + 1);   
    let posY = Math.round(Math.random() * (10 - 1) + 1);
    return [posX, posY];
};

let appleCoordinates = generateApple();
apple = document.querySelector('[posX = "' + appleCoordinates[0] + '"][posY = "' + appleCoordinates[1] + '"]');
apple.classList.add('apple');   //присваиваем координаты яблоку и class отрисовки

while (apple.classList.contains('snakeBody')){  //цикл - пока яблоко находиться по вверх змеи, выполняем тело цикла 
    let appleCoordinates = generateApple();  //(заново рэндомим появленеи яблока)
    apple = document.querySelector('[posX = "' + appleCoordinates[0] + '"][posY = "' + appleCoordinates[1] + '"]');  
}
}
createApple();


//создание переменных для напрвления движения, шага змеи и создание поля для счёта очков

let direction = 'right';
let steps = false; //один шаг змеи (пока шаг не сделан step === false)
let input = document.createElement('input');
document.body.appendChild(input);
input.classList.add('score');

let score = 0;
input.value = `Ваш счёт: ${score}`;


// движение змеи по прямой и изменение напрвления движения змеи

function move() { // движение змеи

    let snakeCoordinates = [snakeBody[0].getAttribute('posX'), snakeBody[0].getAttribute('posY')]; //в переменную получаем координаты головы
    snakeBody[0].classList.remove('snakeHead'); // у головы удаляем class головы
    snakeBody[snakeBody.length - 1].classList.remove('snakeBody');  //удаляем class у хвоста
    snakeBody.pop(); // удаляем последний элемент из массива

if (direction == 'right') { // движение и проход через границу поля 
    if (snakeCoordinates[0] < 10){ //условие что бы змейка находилась по оси в поле
        snakeBody.unshift(document.querySelector('[posX = "' + (+snakeCoordinates[0] + 1) + '"][posY = "' + snakeCoordinates[1] + '"]'));  //добавляем ячейку X,Y и в неё class snakeHead
    }else {
        snakeBody.unshift(document.querySelector('[posX = "1"][posY = "' + snakeCoordinates[1] + '"]'));  //добавляем ячейку X,Y в начале поля в неё class snakeHead
    }
  
}else if (direction == 'left') { // движение и проход через границу поля 
    if (snakeCoordinates[0] > 1){  //условие что бы змейка находилась по оси в поле
        snakeBody.unshift(document.querySelector('[posX = "' + (+snakeCoordinates[0] - 1) + '"][posY = "' + snakeCoordinates[1] + '"]'));  //добавляем ячейку X,Y и в неё class snakeHead
    }else {
        snakeBody.unshift(document.querySelector('[posX = "10"][posY = "' + snakeCoordinates[1] + '"]'));  //добавляем ячейку X,Y в конце поля в неё class snakeHead
    }
  
}else if (direction == 'up') {  // движение и проход через границу поля 
    if (snakeCoordinates[1] < 10){  //условие что бы змейка находилась по оси в поле
        snakeBody.unshift(document.querySelector('[posX = "' + snakeCoordinates[0] + '"][posY = "' + (+snakeCoordinates[1]+1) + '"]'));  //добавляем ячейку X,Y и в неё class snakeHead
    }else {
        snakeBody.unshift(document.querySelector('[posX = "' + snakeCoordinates[0] + '"][posY = "1"]'));  //добавляем ячейку X,Y в конце поля в неё class snakeHead
    }
  
}else if (direction == 'down') {   // движение и проход через границу поля 
    if (snakeCoordinates[1] > 1){ //условие что бы змейка находилась по оси в поле
        snakeBody.unshift(document.querySelector('[posX = "' + snakeCoordinates[0] + '"][posY = "' + (+snakeCoordinates[1]-1) + '"]'));  //добавляем ячейку X,Y и в неё class snakeHead
    }else {
        snakeBody.unshift(document.querySelector('[posX = "' + snakeCoordinates[0] + '"][posY = "10"]')); //добавляем ячейку X,Y в конце поля в неё class snakeHead
    }
  
}


// змея ест яблоко, яблоко появляется в другом месте, змея увеличивается в длине и увеличивается счёт игры.

if (snakeBody[0].getAttribute('posX') == apple.getAttribute('posX') && snakeBody[0].getAttribute('posY') == apple. getAttribute('posY')) {     //проверяем соовпадение координат головы и яблока
    apple.classList.remove('apple'); //удаляем яблоко
    createApple(); // снова появляется яблоко

    let a = snakeBody[snakeBody.length - 1].getAttribute('posX');//в переменные толкаем X (хвост)
    let b = snakeBody[snakeBody.length - 1].getAttribute('posY');//в переменные толкаем Y (хвост)
    snakeBody.push(document.querySelector('[posX = "' + a + '"][posY ="' + b +'"]')); //пушим и увеличиваем змею

    score++;
    input.value = `Ваш счёт: ${score}`;
}  


// змея сталкивается с собой. Условие окончания игры

if(snakeBody[0].classList.contains('snakeBody')){ //проверка на содержание class (врезаемся в себя)
    setTimeout(() => {   //timer оповещения
        alert('Игра окончена');
    },200)
    clearInterval(interval); //останавливаем змею
    snakeBody[0].classList.add('dead');
}


snakeBody[0].classList.add('snakeHead'); // возвращаем глову при движении (строки 85 - 120)
for ( let i = 0; i < snakeBody.length; i++){  
    snakeBody[i].classList.add('snakeBody'); //возвращаем тело при движении (строки 85 - 120)
}  

    steps = true;
}

let interval = setInterval(move, 300); //повторяем функцию move() каждые 300 ms, так двигается змея


// вешаем обработчик на кнопки-стрелки ипроверяем условие что бы змея не смогла разварачиваться на 180 гр

window.addEventListener('keydown', function(e){ //вешаем обработчик на кнопки
if(steps == true){
    if(e.keyCode == 37 && direction != 'right') {      //37 код стрелки влево //.... если движ не в право, то можно влево
        direction = 'left';
        steps = false; 
    }
    else if(e.keyCode == 38 && direction != 'down') {    //38 код стрелки вверх //....
        direction = 'up';  
        steps = false; 
    }
    else if(e.keyCode == 39 && direction != 'left') {    //39 код стрелки в право //....
        direction = 'right';
        steps = false;
    }
    else if(e.keyCode == 40 && direction != 'up') {    //40 код стрелки вниз //.....
        direction = 'down';
        steps = false;
    }
}
    
});