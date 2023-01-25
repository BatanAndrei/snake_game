
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

function generateSnake() {                                  //создали рэндомное появление змеи (ячейки)
    let posX = Math.round(Math.random() * (10 - 3) + 3);   //минимальное значение устанавливае 3, что бы не было возврата 
    let posY = Math.round(Math.random() * (10 - 1) + 1);   //числа 0, -1 и тд
    return [posX, posY];
}

let coordinates = generateSnake();
let snakeBody = [document.querySelector('[posX = "' + coordinates[0] + '"][posY = "' + coordinates[1] + '"]'),document.querySelector('[posX = "' + (coordinates[0]-1) + '"][posY = "' + coordinates[1] + '"]'),document.querySelector('[posX = "' + (coordinates[0]-2) + '"][posY = "' + coordinates[1] + '"]')];  //присвоили рэндомное координаты змее и + 2 ячейки рядом(тело)

for ( let i = 0; i < snakeBody.length; i++){  //добавляем всему телу змеи class отрисовки её
    snakeBody[i].classList.add('snakeBody');
}
snakeBody[0].classList.add('snakeHead')  //добавляем всему телу змеи class отрисовки её головы


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

let direction = 'right';
let steps = false; //один шаг змеи (пока шаг не сделан step === false)
let input = document.createElement('input');
document.body.appendChild(input);
input.classList.add('score');

let score = 0;
input.value = `Ваш счёт: ${score}`;

function move() { // движение змеи

    let snakeCoordinates = [snakeBody[0].getAttribute('posX'), snakeBody[0].getAttribute('posY')]; //в переменную получаем координаты головы
    snakeBody[0].classList.remove('snakeHead'); // у головы удаляем class головы
    snakeBody[snakeBody.length - 1].classList.remove('snakeBody');  //удаляем class у хвоста
    snakeBody.pop(); // удаляем последний элемент из массива

if (direction == 'right') { 
    if (snakeCoordinates[0] < 10){ //условие что бы змейка проходила на сквозь
        snakeBody.unshift(document.querySelector('[posX = "' + (+snakeCoordinates[0] + 1) + '"][posY = "' + snakeCoordinates[1] + '"]'));  //добавляем ячейку и в неё class snakeHead
    }else {
        snakeBody.unshift(document.querySelector('[posX = "1"][posY = "' + snakeCoordinates[1] + '"]'));  //добавляем ячейку и в неё class snakeHead
    }
  
}else if (direction == 'left') { 
    if (snakeCoordinates[0] > 1){ //условие что бы змейка проходила на сквозь
        snakeBody.unshift(document.querySelector('[posX = "' + (+snakeCoordinates[0] - 1) + '"][posY = "' + snakeCoordinates[1] + '"]'));  //добавляем ячейку и в неё class snakeHead
    }else {
        snakeBody.unshift(document.querySelector('[posX = "10"][posY = "' + snakeCoordinates[1] + '"]'));  //добавляем ячейку и в неё class snakeHead
    }
  
}else if (direction == 'up') { 
    if (snakeCoordinates[1] < 10){ //условие что бы змейка проходила на сквозь
        snakeBody.unshift(document.querySelector('[posX = "' + snakeCoordinates[0] + '"][posY = "' + (+snakeCoordinates[1]+1) + '"]'));  //добавляем ячейку и в неё class snakeHead
    }else {
        snakeBody.unshift(document.querySelector('[posX = "' + snakeCoordinates[0] + '"][posY = "1"]'));  //добавляем ячейку и в неё class snakeHead
    }
  
}else if (direction == 'down') { 
    if (snakeCoordinates[1] > 1){ //условие что бы змейка проходила на сквозь
        snakeBody.unshift(document.querySelector('[posX = "' + snakeCoordinates[0] + '"][posY = "' + (+snakeCoordinates[1]-1) + '"]'));  //добавляем ячейку и в неё class snakeHead
    }else {
        snakeBody.unshift(document.querySelector('[posX = "' + snakeCoordinates[0] + '"][posY = "10"]'));  //добавляем ячейку и в неё class snakeHead
    }
  
}

if (snakeBody[0].getAttribute('posX') == apple.getAttribute('posX') && snakeBody[0].getAttribute('posY') == apple. getAttribute('posY')) {     //проверяем соовпадение координат головы и яблока
    apple.classList.remove('apple');
    let a = snakeBody[snakeBody.length - 1].getAttribute('posX');//в переменные толкаем X (хвост)
    let b = snakeBody[snakeBody.length - 1].getAttribute('posY');//в переменные толкаем Y (хвост)
    snakeBody.push(document.querySelector('[posX = "' + a + '"][posY ="' + b +'"]')); //пушим и увеличиваем змею
    createApple();
    score++;
    input.value = `Ваш счёт: ${score}`;
}  

if(snakeBody[0].classList.contains('snakeBody')){ //проверка на содержание class (врезаемся в себя)
    setTimeout(() => {   //timer оповещения
        alert('Игра окончена');
    },200)
    clearInterval(interval); //останавливаем змею
    snakeBody[0].classList.add('dead');
}

    snakeBody[0].classList.add('snakeHead'); //добавляем голову
    for ( let i = 0; i < snakeBody.length; i++){  //добавляем всему телу змеи class отрисовки её
        snakeBody[i].classList.add('snakeBody'); 
    }
    steps = true;
}

let interval = setInterval(move, 300);

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