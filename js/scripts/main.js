// script open modal (remember is a lot of cards where you can open modal)
const cardPokemon = document.querySelectorAll('.js-open-details-pokemon'); // all elements that have this class
const closeButton = document.querySelector('.js-close-modal-details-pokemon'); // get close button modal
// function to separate in the end of document 
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

function capitalizeFirstLetter(string) {
    return string[0].toUpperCase() + string.slice(1); // rui = R + ui
}

const areaPokemonsList = document.getElementById('js-list-pokemons'); // mapear area onde pokemons irao ficar para fazer o append

// Function to create card HTML to JS
function createCardPokemon(code, type, nome, imagePok) {
    // Card Element
    let card = document.createElement('button');
    card.classList = `card-pokemon js-open-details-pokemon ${type}`;
    areaPokemonsList.appendChild(card); // append all cards

    // Div Image
    let image = document.createElement('div'); // create any html element
    image.classList = 'image'; // add class image 
    card.appendChild(image); // put in the card (button element)

    let imageSrc = document.createElement('img');
    imageSrc.setAttribute('src', imagePok); // set attribute to imagePok (parameter)
    image.appendChild(imageSrc);

    // Div Info
    let info = document.createElement('div');
    info.classList = 'info';
    card.appendChild(info);

    // Div Text
    let text = document.createElement('div');
    text.classList = 'text';
    info.appendChild(text);

    let codeSpan = document.createElement('span');
    codeSpan.textContent = (code < 10) ? `#00${code}` : (code < 100) ? `#0${code}` : `#${code}`; // condition to show #001 or #010 or #100
    text.appendChild(codeSpan);

    let pokemonName = document.createElement('h3');
    pokemonName.innerText = `${capitalizeFirstLetter(nome)}`; // capital letter uppercase
    text.appendChild(pokemonName);

    // Div Icon
    let icon = document.createElement('div');
    icon.classList = 'icon';
    info.appendChild(icon);

    let typeImg = document.createElement('img');
    typeImg.setAttribute('src', `img/icon-types/${type}.svg`); // does not exist in the API so we create same image name as the types to run through our images
    icon.appendChild(typeImg);
}

// Function to list all pokemons
function listingPokemons(urlApi) { // url from API
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
            const { results, next, count } = response.data; // simple way of running through the OBJECT instead of using always response.data.results
            countPokemons.innerText = count; // innerText = count (all pokemons in the API)

            // Array of results (pokemons)
            results.forEach(pokemon => {
                let urlApiDetails = pokemon.url; // get URL from each pokemon
                axios({
                        method: 'GET',
                        url: `${urlApiDetails}` //string
                    })
                    .then((response) => {
                        const { name, id, sprites, types } = response.data;
                        // name = nome pokemon
                        // id = id pokemon
                        // sprites = image of pokemon
                        // types = tipo do pokemon

                        // Object to get only information I need
                        const infoCard = {
                            nome: name,
                            code: id,
                            image: sprites.other.dream_world.front_default, // path of the image
                            type: types[0].type.name // always first position
                        }
                        createCardPokemon(infoCard.code, infoCard.type, infoCard.nome, infoCard.image);
                        
                        // select all pokemons to open modal
                        const cardPokemon = document.querySelectorAll('.js-open-details-pokemon'); // class
                        cardPokemon.forEach(card => {
                            card.addEventListener('click', openDetailsPokemon);
                        })
                    })
            })
        })
}

// load page => load function
listingPokemons('https://pokeapi.co/api/v2/pokemon?limit=9&offset=0')

// API para listar pokemon: https://pokeapi.co/api/v2/pokemon?limit=100000&offset=0 (limit per page - offset is start from)

function openDetailsPokemon() {
    document.documentElement.classList.add('open-modal'); // add the class to the HTML document
}

function closeDetailsPokemon() {
    document.documentElement.classList.remove('open-modal'); // remove the class to the HTML document
}


// Left container - List all pokemons
const areaType = document.getElementById('js-type-area');
const areaTypeMobile = document.querySelector('.dropdown-select');

axios({
    method: 'GET', 
    url: 'https://pokeapi.co/api/v2/type' // get all types of pokemons (19 total)
})
.then((response) => {
    const {results} = response.data
    results.forEach((type, index) => {

        if(index < 18){ // avoid index 18
            // Create element left-container
            let itemType = document.createElement('li');
            areaType.appendChild(itemType);

            let itemBtn = document.createElement('button');
            itemBtn.classList = `type-filter ${type.name}`; //tipo do pokemon
            itemBtn.setAttribute('code-type', index + 1); // set this attribute so I can filter later the code type of each pokemon (position: 1)
            itemType.appendChild(itemBtn);

            let icon = document.createElement('icon');
            icon.classList = 'icon';
            itemBtn.appendChild(icon);

            let imgIcon = document.createElement('img');
            imgIcon.setAttribute('src', `img/icon-types/${type.name}.svg`);
            icon.appendChild(imgIcon);

            let spanText = document.createElement('span');
            spanText.textContent = `${capitalizeFirstLetter(type.name)}`; // same as innerText
            itemBtn.appendChild(spanText);

            // Create element for dropdown mobile
            let itemTypeMobile = document.createElement('li');
            areaTypeMobile.appendChild(itemTypeMobile);

            let itemBtnMobile = document.createElement('button');
            itemBtnMobile.classList = `type-filter ${type.name}`; //tipo do pokemon
            itemBtnMobile.setAttribute('code-type', index + 1);
            itemTypeMobile.appendChild(itemBtnMobile);

            let iconMobile = document.createElement('icon');
            iconMobile.classList = 'icon';
            itemBtnMobile.appendChild(iconMobile);

            let imgIconMobile = document.createElement('img');
            imgIconMobile.setAttribute('src', `img/icon-types/${type.name}.svg`);
            iconMobile.appendChild(imgIconMobile);

            let spanTextMobile = document.createElement('span');
            spanTextMobile.textContent = `${capitalizeFirstLetter(type.name)}`; // same as innerText
            itemBtnMobile.appendChild(spanTextMobile);

            // select all types from the ul list
            const allTypes = document.querySelectorAll('.type-filter');
            allTypes.forEach(btn => {
                btn.addEventListener('click', filterByTypes); // when click you need to filter the pokemons
            })
        }
        else{
            console.log('Item not created.')
        }
    })
})

// Load more button functionality
const btnLoadMore = document.getElementById('js-btn-load-more');
let countPagination = 10; // start from pokemon position 10 until - 

function showMorePokemon(){
    listingPokemons(`https://pokeapi.co/api/v2/pokemon?limit=9&offset=${countPagination}`); // basically you implement as load more (keep the existing ones)
    countPagination = countPagination + 9;
}
btnLoadMore.addEventListener('click', showMorePokemon);


// Function to filter all pokemons based on type
function filterByTypes(){
    // 1. Get ID from each type
    // 2. Get the correct API from type

    let idType = this.getAttribute('code-type'); //represents the index for each item on the list
    
    const areaPokemons = document.getElementById('js-list-pokemons');
    const btnLoadMore = document.getElementById('js-btn-load-more');
    const allTypes = document.querySelectorAll('.type-filter');
    const countPokemons = document.getElementById('js-count-pokemons');

    // clear all pokemons area when clicked
    areaPokemons.innerHTML = "";
    btnLoadMore.style.display = "none";

    allTypes.forEach(item => {
        item.classList.remove('active'); //remove all active from types (everytime you click it will be removed first)
    })
    this.classList.add('active');

    axios({
        method: 'GET',
        url: `https://pokeapi.co/api/v2/type/${idType}`
    })
    .then(response => {
        const {pokemon} = response.data; // take out structure of the object
        countPokemons.innerText = pokemon.length; // get the length of the pokemon API (size of it) = change number on top container
        
    })
}