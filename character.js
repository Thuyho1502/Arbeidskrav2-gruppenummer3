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

//Render Character Cards
async function renderCharacters (characterList, container) {
    container.innerHTML ="";
    for(const character of characterList) {
        const characterDiv = document.createElement("div");
        characterDiv.classList.add("character_card");

        // create elements for character card details
    const characterName = document.createElement("h2");
    characterName.textContent = character.name;

    const characterSpecies = document.createElement("p");
    characterSpecies.innerHTML =`<strong> Species : <strong> ${character.speciesName}`;

    const characterBirthYear = document.createElement("p");
    characterBirthYear.innerHTML =`<strong> Birth Year : <strong> ${character.birth_year}`;

    const characterFilms = document.createElement("p");
    characterFilms.innerHTML= `<strong> Films : <strong> ${character.films}`;


    characterDiv.appendChild(characterName);
    characterDiv.appendChild(characterSpecies);
    characterDiv.appendChild(characterBirthYear);
    characterDiv.appendChild(characterFilms);
    container.appendChild(characterDiv);



    }

    
}
