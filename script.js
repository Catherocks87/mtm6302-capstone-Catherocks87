const pokemonList = document.querySelector(".pokemonList");
const URL = "https://pokeapi.co/api/v2/pokemon/";
let pokemonData = []; // Declare pokemonData globally

// Function to fetch a single Pokemon
async function fetchPokemon(url) {
    const response = await fetch(url);
    return response.json();
}

// Function to fetch and display Pokemon in sequential order
async function fetchAndDisplayPokemon(start, end) {
    const promises = [];
    for (let i = start; i <= end; i++) {
        const url = `${URL}${i}`;
        promises.push(fetchPokemon(url));
    }

    pokemonData = await Promise.all(promises); // Assign fetched data to pokemonData
    pokemonData.forEach(poke => showPokemon(poke));
}

// Function to display Pokemon
function showPokemon(poke) {
    const div = document.createElement("div");
    div.classList.add("col-sm-6", "mb-3", "col-md-3");
    div.innerHTML =
        `<div class="card-0001">
        <div class="0001-style">
            <a class="bulb-style">
                <img src="${poke.sprites.other['official-artwork'].front_default}" class="img-fluid" alt="${poke.name}">
            </a>
        </div>
        <div class="title-style">
            <h1 class="card-title">${poke.id.toString().padStart(3, '0')}</h1>
        </div>
        <h2 class="card-text text-lg">${poke.name.toUpperCase()}</h2>
        <div class="info-style">
            ${poke.types.map((type) => `<p>${type.type.name}</p>`).join('')}
        </div>
        <div class="catch-green">
            <a href="#" class="btn">
                <img src="images/pokeball_1.png" alt="Catch Icon" class="btn-icon"> Catch
            </a>
        </div>
    </div>`;
    pokemonList.appendChild(div);

    const catchButton = div.querySelector('.catch-green a.btn'); // Moved this line here
    
    updateCatchButton(poke.id, catchButton);

    catchButton.addEventListener('click', (event) => {
        event.preventDefault();
        event.stopPropagation();
        
        if (catchButton.textContent === 'Catch') {
            catchPokemon(poke.id);
        } else {
            releasePokemon(poke.id);
        }
        
        updateCatchButton(poke.id, catchButton);
    });

    const pokemonCards = document.querySelectorAll('.card-0001');
    const currentCard = pokemonCards[pokemonCards.length - 1];

    const bulbImg = currentCard.querySelector('.bulb-style img');
    bulbImg.addEventListener('click', (event) => {
        event.stopPropagation();
        fetch(`${URL}${poke.id}`)
            .then((response) => response.json())
            .then((data) => displayModal(data));
    });
}

// Display the first 20 Pokemon sequentially
fetchAndDisplayPokemon(1, 20);

// Load additional 20 Pokemon when "more" button is clicked
const loadMoreBtn = document.querySelector('.button-load a');
let offset = 20;

loadMoreBtn.addEventListener('click', () => {
    const newURL = `${URL}?offset=${offset}&limit=20`;

    fetch(newURL)
        .then(response => response.json())
        .then(data => {
            const results = data.results;
            const nextBatch = results.slice(0, 20);
            offset += 20;

            const promises = nextBatch.map(result => fetchPokemon(result.url));
            return Promise.all(promises);
        })
        .then(pokemonData => {
            pokemonData.forEach(poke => showPokemon(poke));
        })
        .catch(error => {
            console.error('Error fetching additional Pokemon:', error);
        });
});

// Add event listeners to dropdown items
const dropdownItems = document.querySelectorAll('.dropdown-item');

dropdownItems.forEach(item => {
    item.addEventListener('click', (event) => {
        const caughtPokemon = JSON.parse(localStorage.getItem('caughtList')) || [];

        // Clear existing Pokémon cards before displaying filtered ones
        pokemonList.innerHTML = '';

        if (event.target.textContent === 'Caught') {
            // Filter and display caught Pokémon
            const caught = pokemonData.filter(poke => caughtPokemon.includes(poke.id));
            caught.forEach(poke => showPokemon(poke));
        } else if (event.target.textContent === 'Uncaught') {
            // Filter and display uncaught Pokémon
            const uncaught = pokemonData.filter(poke => !caughtPokemon.includes(poke.id));
            uncaught.forEach(poke => showPokemon(poke));
        }
    });
});

// Function to display modal with weight and height
function displayModal(poke) {
    const modal = document.getElementById("pokemon-modal");
    const modalImg = modal.querySelector(".modal-img");
    const modalTitle = modal.querySelector(".modal-title");
    const modalInfo = modal.querySelector(".modal-info");

    modal.style.display = "block";
    modalImg.src = poke.sprites.other['official-artwork'].front_default;
    modalImg.alt = poke.name;
    modalTitle.textContent = poke.name.toUpperCase();
    
    // Display weight and height
    modalInfo.innerHTML = `
        <p>Weight: ${poke.weight / 10} kg</p>
        <p>Height: ${poke.height / 10} m</p>
    `;
}


// Close modal when the close button is clicked
const closeModal = document.querySelector('.close');
closeModal.addEventListener('click', () => {
    const modal = document.getElementById("pokemon-modal");
    modal.style.display = "none";
});

// Function to handle catching Pokemon
function catchPokemon(pokemonId) {
    // Logic to catch a Pokemon
    let caughtList = JSON.parse(localStorage.getItem('caughtList')) || [];
    
    if (!caughtList.includes(pokemonId)) {
        caughtList.push(pokemonId);
        localStorage.setItem('caughtList', JSON.stringify(caughtList));
    }
}

// Function to handle releasing Pokemon
function releasePokemon(pokemonId) {
    // Logic to release a Pokemon
    let caughtList = JSON.parse(localStorage.getItem('caughtList')) || [];
    
    if (caughtList.includes(pokemonId)) {
        caughtList = caughtList.filter(id => id !== pokemonId);
        localStorage.setItem('caughtList', JSON.stringify(caughtList));
    }
}

// Function to update the catch button appearance based on caught status
function updateCatchButton(pokemonId, catchButton) {
    // Logic to update the catch button
    let caughtList = JSON.parse(localStorage.getItem('caughtList')) || [];
    
    if (caughtList.includes(pokemonId)) {
        catchButton.textContent = 'Release';
        catchButton.classList.add('released');
    } else {
        catchButton.textContent = 'Catch';
        catchButton.classList.remove('released');
    }
}


// Allows to search the first 20 pokemon
const searchInput = document.querySelector('.form-control');

searchInput.addEventListener('input', (event) => {
    const searchTerm = event.target.value.toLowerCase();

    // Filter Pokemon based on search term
    const filteredPokemon = pokemonData.filter(poke => {
        const pokemonName = poke.name.toLowerCase();
        return pokemonName.includes(searchTerm);
    });

    // Clear existing Pokémon cards before displaying filtered ones
    pokemonList.innerHTML = '';
    filteredPokemon.forEach(poke => showPokemon(poke));
});
