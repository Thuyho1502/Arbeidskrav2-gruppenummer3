document.addEventListener("DOMContentLoaded",async() =>{
    const allCharacters = document.getElementById("all_character");


    try{
        const characterList = await fetchAllCharacters();

        renderCharacters(characterList, allCharacters);
    }catch(error){
        console.error("Error fetching Start Wars character:", error);
    }
    
});

// Fetch all character follow API: https://swapi.dev/ 

async function fetchAllCharacters() {
    let characterList =[];
    let netxCharacterUrl = "https://swapi.dev/api/people"; 
    while(netxCharacterUrl){
        const characterResponse = await fetch (netxCharacterUrl);
        const characterData = await characterResponse.json();
        characterList = characterList.concat(characterData.results);
        netxCharacterUrl = characterData.next;  // get next page Url
    }
    return characterList;
    
}

//Fetch Film Title
async function fetchFilmTitles(filmUrls) {
    
    const filmTitle = await Promise.all(
        filmUrls.map(async(filmUrl) =>{
            const filmResponse = await fetch(filmUrl);
            const filmData = await filmResponse.json();
            return filmData.title;
        })
        
    );
    return filmTitle;
    
}
async function fetchSpecies(speciesUrls) {
    if(speciesUrls.length ===0) return "Unknown";
    const speciesResponse = await fetch(speciesUrls[0]);
    const speciesData = await speciesResponse.json();
    return speciesData.name;
    
}

//Render Character Cards
async function renderCharacters (characterList, container) {
    container.innerHTML ="";
    for(const character of characterList) {
        const characterDiv = document.createElement("div");
        characterDiv.classList.add("character_card");

        //Fetch addition details
        const[speciesName, filmTitle] = await Promise.all([
            fetchSpecies(character.species),
            fetchFilmTitles(character.films),

        ]);

        // create elements for character card details
    const characterName = document.createElement("h2");
    characterName.textContent = character.name;

    const characterSpecies = document.createElement("p");
    characterSpecies.innerHTML =`<strong> Species : <strong> ${speciesName}`;

    const characterBirthYear = document.createElement("p");
    characterBirthYear.innerHTML =`<strong> Birth Year : <strong> ${character.birth_year}`;

    const characterFilms = document.createElement("p");
    characterFilms.innerHTML= `<strong> Films : <strong> ${filmTitle.join(",")}`;


    characterDiv.appendChild(characterName);
    characterDiv.appendChild(characterSpecies);
    characterDiv.appendChild(characterBirthYear);
    characterDiv.appendChild(characterFilms);
    container.appendChild(characterDiv);



    }

    
}
