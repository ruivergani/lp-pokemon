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