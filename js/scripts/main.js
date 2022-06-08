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

// Configure dropdown button to open
const btnDropdownSelect = document.querySelector('.js-open-select-custom');
const dropdownArea = document.querySelector('.select-custom');

btnDropdownSelect.addEventListener('click', () => { // arrow function 
  dropdownArea.classList.toggle('active');
  // or could have done btnDropdownSelect.parentElement.classList.toggle('active);
})

// basically the API has different URL for listing or filtering or doing other activities with the pokemons, that is the reason you use the parameter URL in the listing of Pokemons

// Function to list all pokemons
function listingPokemons(urlApi){ // url from API
    // using axios (same as fetch)
    axios({
      method: 'GET', 
      url: urlApi
    })
    .then((response) => {
      console.log(response)
    })
}

// load page => load function
listingPokemons('https://pokeapi.co/api/v2/pokemon?limit=9&offset=0')




// API para listar pokemon: https://pokeapi.co/api/v2/pokemon?limit=100000&offset=0 (limit per page - offset is start from)