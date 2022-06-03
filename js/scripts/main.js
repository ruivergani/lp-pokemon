// script open modal (remember is a lot of cards where you can open modal)

const cardPokemon = document.querySelectorAll('.js-open-details-pokemon'); // all elements that have this class
const closeButton = document.querySelector('.js-close-modal-details-pokemon'); // get close button modal

// function to separate
function openDetailsPokemon(){
  document.documentElement.classList.add('open-modal'); // add the class to the HTML document
}
function closeDetailsPokemon(){
  document.documentElement.classList.remove('open-modal'); // remove the class to the HTML document
}

cardPokemon.forEach(card => { // each card that you click
   card.addEventListener('click', openDetailsPokemon);
});

closeButton.addEventListener('click', closeDetailsPokemon);


// Configuration for the swiper slide to work
var slide_hero = new Swiper(".slide-hero", {
  effect: 'fade',
  pagination: {
    // set the path to the swiper pagination div in the html
    el: ".s-area-slide-hero .slide-hero .swiper-slide .main-area .area-explore .swiper-pagination",
  },
});