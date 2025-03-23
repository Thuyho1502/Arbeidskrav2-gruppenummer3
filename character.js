

const speciesType = document.getElementById("species-type");
const charactersList = document.getElementById("characters-list");

const nameEnter=document.getElementById("name-enter");
const birthyearEnter=document.getElementById("birthyear-enter");
const speciesSelect=document.getElementById("species-select");
const addCharacterBtn=document.getElementById("add-btn");

const customCharacters =[];


async function fetchAllCharacters(){
    let characters=[];
    let url="https://swapi.dev/api/people/";
    while(url){
        const response = await fetch(url);
        const data = await response.json();
        characters = characters.concat(data.results);
        url=data.next;
    }
    return characters;
}


async function fetchSpecies(speciesUrl){
    if(!Array.isArray(speciesUrl) || speciesUrl.length === 0){
        return "Unknown";
    }
    
    const url = speciesUrl[0];
    if (typeof url === "string" && !url.startsWith("https://swapi.dev")){
        return url;
    }
    try{
        const response = await fetch(url);
        if(!response.ok) throw new Error(`Failed to fetch: ${url}`);
        const data = await response.json();
        return data.name || "Unknown";
    }catch (error){
        console.error("Error fetching species:",error);
        return "Unknown"
    }
}

async function fetchFilm(filmUrls){
    const filmstitle = await Promise.all(
        filmUrls.map(async (url)=>{
            const response = await fetch (url);
            const data = await response.json();
            return data.title;
        })
    );
    return filmstitle;
}

const setSpeciesColor ={
        "Human":"green",
        "Droid":"purple",
        "Wookiee":"red",
        "Rodian":"pink",
        "Hutt":"blue",
        "Unknown":"white"
};

function getRandomColor(){
    return `#${Math.floor(Math.random()*16777215).toString(16)}`;
}

function getColorForSpecies(species){
    if(!setSpeciesColor[species]){
        setSpeciesColor[species]=getRandomColor();
    }
    return setSpeciesColor[species];
    
}

async function showCharacters(typesSpecies = null){
    charactersList.innerHTML ="";
    //
    const apiCharacters = await fetchAllCharacters();
    const characters=apiCharacters.concat(customCharacters);
    //<const characters = await fetchCharacters();

    for (const character of characters){
        const speciesName = character.species.length > 0
        ? await fetchSpecies(character.species)
        :"Unknown";

        if (typesSpecies && speciesName !== typesSpecies){
            continue;
        }

        const titles = character.films.length > 0
        ? await fetchFilm(character.films)
        : [] ; 

        const card = document.createElement("div");
        card.classList.add("character-card");
        card.style.backgroundColor = getColorForSpecies(speciesName);

        const characterName = document.createElement("h2");
        characterName.innerText =character.name;

        const characterBirthYear = document.createElement("p");
        characterBirthYear.innerText ="BirthYear:" + character.birth_year;

        const characterSpecies = document.createElement("p");
        characterSpecies.innerText ="Species:" + speciesName;

        const characterFilms = document.createElement("p");
        characterFilms.innerText = titles.length > 0
            ? "Filmer:" + titles.join(",")
            : "Filmer : Unknown";

        const deleteBtn = document.createElement("button");
        deleteBtn.innerHTML =`<i class="fa-solid fa-trash"></i>`;
        deleteBtn.classList.add("delete-btn");
        deleteBtn.addEventListener("click", function(){
            card.remove();
        });

        const editBtn = document.createElement("button");
        editBtn.innerHTML=`<i class="fa-solid fa-pen"></i>`;
        editBtn.classList.add("edit-btn");

        editBtn.addEventListener("click", function() {
            const newName = prompt("Enter New Name:", character.name);
            const newBirthYear = prompt ("Enter New Birth Year:", character.birth_year);
            const newSpecies = prompt ("Enter New Species",speciesName);

            if(newName)characterName .innerText=newName;
            if(newBirthYear)characterBirthYear.innerText="BirthYear:" + newBirthYear;
            if(newSpecies){
                characterSpecies.innerText="Species:" + newSpecies;
                card.style.backgroundColor=getColorForSpecies(newSpecies)
            }
        })
        card.append(characterName, characterBirthYear, characterSpecies,characterFilms,deleteBtn,editBtn);
        charactersList.appendChild(card);
    }
    console.log(" Character Cards : ", charactersList.children.length);
}

async function addSpeciesBtn(){
    const characters = await fetchAllCharacters();
    const speciesGroup = new Set();

    for (const character of characters){
        const speciesName = character.species.length > 0
        ? await fetchSpecies (character.species)
        :"Unknown";
        speciesGroup.add(speciesName);
    }

    speciesGroup.forEach(species => {
        const buttonBtn = document.createElement("button");
        buttonBtn.innerText = species;
        buttonBtn.addEventListener("click", function(){
            showCharacters(species);
        });

        speciesType.appendChild(buttonBtn);

        // dropdown
        const option =document.createElement("option");
        option.value =species;
        option.innerText=species;
        speciesSelect.appendChild(option);
    });

    const restartBtn = document.createElement("button");
    restartBtn.innerText = "All";
    restartBtn.addEventListener("click", function(){
        showCharacters();
    });
    speciesType.appendChild(restartBtn);

}
addCharacterBtn.addEventListener("click", function(){
    const name = nameEnter.value.trim();
    const birthYear=birthyearEnter.value.trim();
    const species =speciesSelect.value;

    if (!name || !birthYear || !species){
        alert("Pls Enter all information.");
        return
    }
    const newCharacter={
        name : name,
        birth_year : birthYear,
        species : [species],
        films : [],
        custom : true
    };
    customCharacters.push(newCharacter);
    showCharacters();

    nameEnter.value="",
    birthyearEnter.value ="",
    speciesSelect.value=0;
});

addSpeciesBtn();
showCharacters();







