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
    // 1 - Get all pokemons from the API (0 - 9)
    // 2 - Pass results, next, count as parameter
    // 3 - Go through the each pokemon API (array) to get the details from each pokemon
  
    axios({
      method: 'GET', 
      url: urlApi
    })
    .then((response) => { // succeed response will do the below config: 
      // all variables:
      const countPokemons = document.getElementById('js-count-pokemons');
      // results = all pokemons
      // count = sum of all pokemons
      // next = next pagination of pokemons (0 - 9)
      const {results, next, count} = response.data; // simple way of running through the OBJECT instead of using always response.data.results
      countPokemons.innerText = count; // innerText = count (all pokemons in the API)

      // Array of results (pokemons)
      results.forEach(pokemon => {
        let urlApiDetails = pokemon.url; // get URL from each pokemon
        axios({
          method: 'GET', 
          url: `${urlApiDetails}` //string
        })
        .then((response) => {
          const {name, id, sprites, types} = response.data; 
          // name = nome pokemon
          // id = id pokemon
          // sprites = image of pokemon
          // types = tipo do pokemon
        })
      })
    })
}

// load page => load function
listingPokemons('https://pokeapi.co/api/v2/pokemon?limit=9&offset=0')




// API para listar pokemon: https://pokeapi.co/api/v2/pokemon?limit=100000&offset=0 (limit per page - offset is start from)