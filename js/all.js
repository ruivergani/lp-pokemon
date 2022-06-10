"use strict";var cardPokemon=document.querySelectorAll(".js-open-details-pokemon"),closeButton=document.querySelector(".js-close-modal-details-pokemon");cardPokemon.forEach(function(e){e.addEventListener("click",openDetailsPokemon)}),closeButton.addEventListener("click",closeDetailsPokemon);var slide_hero=new Swiper(".slide-hero",{effect:"fade",pagination:{el:".s-area-slide-hero .slide-hero .swiper-slide .main-area .area-explore .swiper-pagination"}}),btnDropdownSelect=document.querySelector(".js-open-select-custom"),dropdownArea=document.querySelector(".select-custom");function capitalizeFirstLetter(e){return e[0].toUpperCase()+e.slice(1)}btnDropdownSelect.addEventListener("click",function(){dropdownArea.classList.toggle("active")});var areaPokemonsList=document.getElementById("js-list-pokemons");function createCardPokemon(e,t,n,o){var a=document.createElement("button");a.classList="card-pokemon js-open-details-pokemon ".concat(t),areaPokemonsList.appendChild(a);var c=document.createElement("div");c.classList="image",a.appendChild(c);var i=document.createElement("img");i.setAttribute("src",o),c.appendChild(i);c=document.createElement("div");c.classList="info",a.appendChild(c);i=document.createElement("div");i.classList="text",c.appendChild(i);a=document.createElement("span");a.textContent=(e<10?"#00":e<100?"#0":"#").concat(e),i.appendChild(a);a=document.createElement("h3");a.innerText="".concat(capitalizeFirstLetter(n)),i.appendChild(a);a=document.createElement("div");a.classList="icon",c.appendChild(a);c=document.createElement("img");c.setAttribute("src","img/icon-types/".concat(t,".svg")),a.appendChild(c)}function listingPokemons(e){axios({method:"GET",url:e}).then(function(e){var t=document.getElementById("js-count-pokemons"),n=e.data,e=n.results,n=(n.next,n.count);t.innerText=n,e.forEach(function(e){e=e.url;axios({method:"GET",url:"".concat(e)}).then(function(e){var t=e.data,n=t.name,o=t.id,e=t.sprites,t=t.types,t={nome:n,code:o,image:e.other.dream_world.front_default,type:t[0].type.name};createCardPokemon(t.code,t.type,t.nome,t.image),document.querySelectorAll(".js-open-details-pokemon").forEach(function(e){e.addEventListener("click",openDetailsPokemon)})})})})}function openDetailsPokemon(){document.documentElement.classList.add("open-modal")}function closeDetailsPokemon(){document.documentElement.classList.remove("open-modal")}listingPokemons("https://pokeapi.co/api/v2/pokemon?limit=9&offset=0");var areaType=document.getElementById("js-type-area"),areaTypeMobile=document.querySelector(".dropdown-select");axios({method:"GET",url:"https://pokeapi.co/api/v2/type"}).then(function(e){e.data.results.forEach(function(e,t){var n,o,a;t<18?(o=document.createElement("li"),areaType.appendChild(o),(a=document.createElement("button")).classList="type-filter ".concat(e.name),a.setAttribute("code-type",t+1),o.appendChild(a),(n=document.createElement("icon")).classList="icon",a.appendChild(n),(o=document.createElement("img")).setAttribute("src","img/icon-types/".concat(e.name,".svg")),n.appendChild(o),(o=document.createElement("span")).textContent="".concat(capitalizeFirstLetter(e.name)),a.appendChild(o),a=document.createElement("li"),areaTypeMobile.appendChild(a),(o=document.createElement("button")).classList="type-filter ".concat(e.name),o.setAttribute("code-type",t+1),a.appendChild(o),(t=document.createElement("icon")).classList="icon",o.appendChild(t),(a=document.createElement("img")).setAttribute("src","img/icon-types/".concat(e.name,".svg")),t.appendChild(a),(a=document.createElement("span")).textContent="".concat(capitalizeFirstLetter(e.name)),o.appendChild(a),document.querySelectorAll(".type-filter").forEach(function(e){e.addEventListener("click",filterByTypes)})):console.log("Item not created.")})});var btnLoadMore=document.getElementById("js-btn-load-more"),countPagination=10;function showMorePokemon(){listingPokemons("https://pokeapi.co/api/v2/pokemon?limit=9&offset=".concat(countPagination)),countPagination+=9}function filterByTypes(){var e=this.getAttribute("code-type"),t=document.getElementById("js-list-pokemons"),n=document.getElementById("js-btn-load-more"),o=document.querySelectorAll(".type-filter"),a=document.getElementById("js-count-pokemons");t.innerHTML="",n.style.display="none";var c=document.querySelector(".s-all-info-pokemons").offsetTop;window.scrollTo({top:c+288,behavior:"smooth"}),o.forEach(function(e){e.classList.remove("active")}),this.classList.add("active"),e?axios({method:"GET",url:"https://pokeapi.co/api/v2/type/".concat(e)}).then(function(e){e=e.data.pokemon;a.innerText=e.length,e.forEach(function(e){e=e.pokemon.url;axios({method:"GET",url:"".concat(e)}).then(function(e){var t=e.data,n=t.name,o=t.id,e=t.sprites,t=t.types,t={nome:n,code:o,image:e.other.dream_world.front_default,type:t[0].type.name};t.image&&createCardPokemon(t.code,t.type,t.nome,t.image),document.querySelectorAll(".js-open-details-pokemon").forEach(function(e){e.addEventListener("click",openDetailsPokemon)})})})}):(t.innerHTML="",listingPokemons("https://pokeapi.co/api/v2/pokemon?limit=9&offset=0"),n.style.display="block")}btnLoadMore.addEventListener("click",showMorePokemon);var inputSearch=document.getElementById("js-input-search"),btnSearch=document.getElementById("js-btn-search");function searchPokemon(){var e=inputSearch.value.toLowerCase(),a=document.getElementById("js-count-pokemons");axios({method:"GET",url:"https://pokeapi.co/api/v2/pokemon/".concat(e)}).then(function(e){areaPokemonsList.innerHTML="",btnLoadMore.style.display="none",a.textContent=1;var t=e.data,n=t.name,o=t.id,e=t.sprites,t=t.types,t={nome:n,code:o,image:e.other.dream_world.front_default,type:t[0].type.name};t.image&&createCardPokemon(t.code,t.type,t.nome,t.image),document.querySelectorAll(".js-open-details-pokemon").forEach(function(e){e.addEventListener("click",openDetailsPokemon)})}).catch(function(e){e.response&&(areaPokemonsList.innerHTML="",btnLoadMore.style.display="none",a.textContent=0,alert("Not found any result from this search."))})}btnSearch.addEventListener("click",searchPokemon),inputSearch.addEventListener("keyup",function(e){"Enter"===e.code&&searchPokemon()});