document.addEventListener("DOMContentLoaded",async() =>{
    const allCharacters = document.getElementById("all_character");
    const speciesFilter = document.getElementById("species_list");
    const addForm = document.getElementById("add_form");

    try{
        let characterList = await fetchAllCharacters();
        const storeCharacters = fetchCharacterFromLocalStorage();
        characterList = [...characterList, ...storeCharacters];

        console.log("Fetched characters:", characterList)


        // Get all species and add to filter menu
        const allSpecies = new Set();
        for(const character of characterList){
            if(!character.speciesName){
                character.speciesName = character.species.length > 0
                    ? await fetchSpecies(character.species)
                    :"Unknown"
            }
            allSpecies.add(character.speciesName);
        }

        // Update filter-dropdown
        speciesFilter.innerHTML ='<option value ="all">All</option>';
        allSpecies.forEach(species => {
            const option = document.createElement("option");
            option.value =  species;
            option.textContent = species;
            speciesFilter.appendChild(option);
        });

        // after filter change
        speciesFilter.addEventListener("change",() =>{
            const selectedSpecies = speciesFilter.value;
            const filteredCharacters = selectedSpecies == "all" ? characterList
            : characterList.filter(char =>char.speciesName === selectedSpecies);
            renderCharacters(filteredCharacters,allCharacters);
        });


        renderCharacters(characterList, allCharacters);
        addForm.addEventListener("submit",(e)=>{
            e.preventDefault();
            const heroname = document.getElementById("name").value.trim();
            const yearOfBirth = document.getElementById("birth_year").value;
            const species = document.getElementById("species").value;

            if (!heroname || !yearOfBirth || !species){
                alert ("PLease Input all data");
                return;
            }
            if(isNaN(yearOfBirth)){
                alert("Birth Year must be number");
                return;
            }
            const newCharacter ={
                name : heroname,
                birth_year : yearOfBirth,
                speciesName : species,
                films :[]
            };

            storeCharacterToLocalStorage(newCharacter);
            characterList.push(newCharacter);
            renderCharacters(characterList,allCharacters);

            addForm.reset();
        })
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
function storeCharacterToLocalStorage(character){
    let storeCharacters = JSON.parse(localStorage.getItem("characters")) || [];
    storeCharacters.push(character);
    localStorage.setItem("characters", JSON.stringify(storeCharacters));
}

function fetchCharacterFromLocalStorage(){
    return JSON.parse(localStorage.getItem("characters")) || [];
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
    if(!speciesUrls || !Array.isArray(speciesUrls) || speciesUrls.length === 0){
        return "Unknown";
    }

    try{
        const speciesRsponse = await fetch (speciesUrls[0]);
        if (!speciesRsponse.ok){
            throw new Error(`Failed : ${speciesUrls[0]}`);
        }
        const speciesData = await speciesRsponse.json();
        return speciesData.name;
    }catch (error) {
        console.error("Error fetching species:",error);
        return "Unknown"
    }
    
}

// background Color based on Species
const setSpecicesColor ={
    "Unknown" : "#ffffff",
    "Human": "#FF5733",
    "Wookie":"#3357FF",
    "Droid":"#33FF57",
    "Twi'lek": "#2980B9"
};
function getRandomColor(){
    return `#${Math.floor(Math.random()*16777215).toString(16)}`;
}
function speciesBackgroundColor(species){
    if(!setSpecicesColor[species]){
        setSpecicesColor[species] = getRandomColor();
    }
    return setSpecicesColor[species];
}

//Render Character Cards
async function renderCharacters (characterList, container) {
    container.innerHTML ="";
    for(const character of characterList) {
        const characterDiv = document.createElement("div");
        characterDiv.classList.add("character_card");

        //Fetch addition details
        /* const[speciesName, filmTitle] = await Promise.all([
            fetchSpecies(character.species),
            fetchFilmTitles(character.films),

        ]); */

        const speciesName = character.speciesName || "Unknown";
        const filmTitle =character.films ? await fetchFilmTitles(character.films):["Unknown"];

        //Save species directly in the object for filtering later
       character.speciesName = speciesName;

        // create elements for character card details
    const characterName = document.createElement("h2");
    characterName.textContent = character.name;

    const characterSpecies = document.createElement("p");
    characterSpecies.innerHTML =`<strong> Species : <strong> ${speciesName}`;

    const characterBirthYear = document.createElement("p");
    characterBirthYear.innerHTML =`<strong> Birth Year : <strong> ${character.birth_year}`;

    const characterFilms = document.createElement("p");
    if (filmTitle.length > 0){
        characterFilms.innerHTML= `<strong> Films : <strong> ${filmTitle.join(",")}`;
    } else{
        characterFilms.style.display ="none"
    }


    // create edit button
    const editButton = document.createElement("button");
    editButton.innerHTML = `<i class="fa-solid fa-pen"></i>`;
    editButton.classList.add("edit-btn");
    editButton.addEventListener("click", () =>{
        const newName = prompt("Enter new name: ", character.name);
        const newBirthYear = prompt("Enter new birth year: ", character.birth_year);
        const newSpecies = prompt("Enter new species: ", speciesName);
        if (newName) characterName.innerHTML = newName;
        if(newBirthYear) characterBirthYear.innerHTML = `<strong> Birth Year : <strong> ${newBirthYear}`;
        if(newSpecies) characterSpecies.innerHTML = `<strong> Species : <strong> ${newSpecies}`;
    });


    //Create delete button

    const deleteButton = document.createElement("button");
    deleteButton.innerHTML = `<i class="fa-solid fa-trash"></i>`;
    deleteButton.classList.add("delete-btn");
    deleteButton.addEventListener("click",() => {
        characterDiv.remove();
    });

    // background Color
    characterDiv.style.backgroundColor = speciesBackgroundColor(speciesName);


    characterDiv.appendChild(characterName);
    characterDiv.appendChild(characterSpecies);
    characterDiv.appendChild(characterBirthYear);
    characterDiv.appendChild(characterFilms);
    container.appendChild(characterDiv);
    characterDiv.appendChild(editButton);
    characterDiv.appendChild(deleteButton);


    }

    
}
