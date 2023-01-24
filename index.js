

function initsquad(){
    let squad = document.querySelector(".test");

    squad.addEventListener('click', function(){
    //alert("Check alfa!");
    initNextSquad();
});
    
   
function initNextSquad(){
    let nextSquad = `<div class='test_next'></div>`;

    squad.innerHTML = nextSquad;
    console.log(squad)
}
}



document.addEventListener("DOMContentLoaded", function() {
    initsquad();
});