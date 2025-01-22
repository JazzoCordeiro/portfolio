// Mapping the items that'll receive the code
let list = document.querySelectorAll('.car'); // Affects the divs with car class
let next1 = document.getElementById('next1'); // Affects the button with id next
let prev1 = document.getElementById('prev1'); // Affects the button with id prev

// Preparing the counting in order to change the content shown in the carousel
let count = list.length; // Stores the total number of slides retrieved 
let active = 0;

// Adding action to both buttons
next1.onclick = () => {
    let activeOld = document.querySelector('.active');
    activeOld.classList.remove('active'); // Remove the old active item
    active = (active + 1) % count; // Instructs how the change of the active class will work
    list[active].classList.add('active'); // Make the change of the class
}

prev1.onclick = () => {
    let activeOld = document.querySelector('.active');
    activeOld.classList.remove('active'); 
    active = (active - 1 + count) % count;
    list[active].classList.add('active'); 
}


// Second carousel
let list2 = document.querySelectorAll('.carro'); // Selects all the items in the second carousel
let next2 = document.getElementById('next2'); // Correct selection of next2 button using getElementById
let prev2 = document.getElementById('prev2'); // Correct selection of prev2 button using getElementById

let count2 = list2.length; // Number of items in the second carousel
let active2 = 0;

next2.onclick = () => {
    let activeOld2 = document.querySelector('.active2');
    activeOld2.classList.remove('active2'); // Remove the old active item
    active2 = (active2 + 1) % count2; // Instructs how the change of the active class will work
    list2[active2].classList.add('active2'); // Make the change of the class
}

prev2.onclick = () => {
    let activeOld2 = document.querySelector('.active2');
    activeOld2.classList.remove('active2'); 
    active2 = (active2 - 1 + count2) % count2;
    list2[active2].classList.add('active2'); 
}


//MODAL1

function open1(){
    let modal1 = document.querySelector("#modal1")

    modal1.style.display = 'block';

}

function close1(){
    let modal1 = document.querySelector("#modal1")

    modal1.style.display = 'none';

}

//MODAL2
function open2(){
    let modal2 = document.querySelector("#modal2")

    modal2.style.display = 'block';

}

function close2(){
    let modal2 = document.querySelector("#modal2")

    modal2.style.display = 'none';

}