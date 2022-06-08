"use strict";var cardPokemon=document.querySelectorAll(".js-open-details-pokemon"),closeButton=document.querySelector(".js-close-modal-details-pokemon");cardPokemon.forEach(function(e){e.addEventListener("click",openDetailsPokemon)}),closeButton.addEventListener("click",closeDetailsPokemon);var slide_hero=new Swiper(".slide-hero",{effect:"fade",pagination:{el:".s-area-slide-hero .slide-hero .swiper-slide .main-area .area-explore .swiper-pagination"}}),btnDropdownSelect=document.querySelector(".js-open-select-custom"),dropdownArea=document.querySelector(".select-custom");function capitalizeFirstLetter(e){return e[0].toUpperCase()+e.slice(1)}btnDropdownSelect.addEventListener("click",function(){dropdownArea.classList.toggle("active")});var areaPokemonsList=document.getElementById("js-list-pokemons");function createCardPokemon(e,t,o,n){var a=document.createElement("button");a.classList="card-pokemon js-open-details-pokemon ".concat(t),areaPokemonsList.appendChild(a);var c=document.createElement("div");c.classList="image",a.appendChild(c);var i=document.createElement("img");i.setAttribute("src",n),c.appendChild(i);c=document.createElement("div");c.classList="info",a.appendChild(c);i=document.createElement("div");i.classList="text",c.appendChild(i);a=document.createElement("span");a.textContent=(e<10?"#00":e<100?"#0":"#").concat(e),i.appendChild(a);a=document.createElement("h3");a.innerText="".concat(capitalizeFirstLetter(o)),i.appendChild(a);a=document.createElement("div");a.classList="icon",c.appendChild(a);c=document.createElement("img");c.setAttribute("src","img/icon-types/".concat(t,".svg")),a.appendChild(c)}function listingPokemons(e){axios({method:"GET",url:e}).then(function(e){var t=document.getElementById("js-count-pokemons"),o=e.data,e=o.results,o=(o.next,o.count);t.innerText=o,e.forEach(function(e){e=e.url;axios({method:"GET",url:"".concat(e)}).then(function(e){var t=e.data,o=t.name,n=t.id,e=t.sprites,t=t.types,t={nome:o,code:n,image:e.other.dream_world.front_default,type:t[0].type.name};createCardPokemon(t.code,t.type,t.nome,t.image),document.querySelectorAll(".js-open-details-pokemon").forEach(function(e){e.addEventListener("click",openDetailsPokemon)})})})})}function openDetailsPokemon(){document.documentElement.classList.add("open-modal")}function closeDetailsPokemon(){document.documentElement.classList.remove("open-modal")}listingPokemons("https://pokeapi.co/api/v2/pokemon?limit=9&offset=0");