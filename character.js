// these import bring in functions for handling CRUD operations
import { addCharacter } from "./request/Post.js";
import {getCharacters} from "./request/GET.js";
import { updateCharacter } from "./request/PUT.js";
import { deleteCharacter } from "./request/Delete.js";
 
// These variables elements in HTML file
const speciesType = document.getElementById("species-type");
const charactersList = document.getElementById("characters-list");
const speciesSelect = document.getElementById("species");
 

async function cleanupDuplicateCharacters() {
    try {
        const characters = await getCharacters();
        const seen = new Map();
        const toDelete = [];
 
        characters.forEach((character) => {       
            const key = `${character.name?.trim().toLowerCase()}|${character.birth_year}`;
            if (seen.has(key)) {
                toDelete.push(character._id);
            } else {
                seen.set(key, character._id);
            }
        });
 
        for (const id of toDelete) {
            try {
                await deleteCharacter(id);
                console.log(" Deleted character with duplicate id:", id);
            } catch (error) {
                console.error("Can't delete character:", id, error.message);
            }
        }
 
        console.log(`Deleted ${toDelete.length} duplicate character`);
 
    } catch (error) {
        console.error("Error when cleaning up:", error.message);
    }
}
 
 
// Retrieves all Star Wars character from the SWAP API
async function fetchAllCharacter(){
   
    let url="https://swapi.info/api/people";
    let characters=[];
   
    while (url) {
        try {
            const response = await fetch(url);
            const data = await response.json();
 
            if (Array.isArray(data)) {
                characters = characters.concat(data);
                break;
            } else if (Array.isArray(data.results)) {
                characters = characters.concat(data.results);
                url = data.next;
            } else {
                console.warn("No usable data:", data);
                break;
            }
        } catch (err) {
            console.error("Failed to fetch:", url, err);
            break;
        }

    }
    try {
        const crudData = await getCharacters();
 
        for (const character of characters) {
            const exists = crudData.some(
                (c) =>
                    c.name?.trim().toLowerCase() === character.name?.trim().toLowerCase() &&
                    c.birth_year === character.birth_year
            );
                       
 
            if (!exists) {
                const species = await fetchSpecies(character.species);
                const films = await fetchFilm(character.films);
                
                const toAdd = {
                    name: character.name,
                    birth_year: character.birth_year,
                    speciesName: [species],
                    films: films,
                         
                };
                await addCharacter(toAdd);
                console.log("Submitted to CRUD:", character.name);
            }
        }
    } catch (e) {
        console.error("Unable to sync SWAPI → CRUD:", e);
    }
 
    return characters;
}
 
// fetches user-created character from a separate CRUD API
async function fetchCRUDCharacters() {
    try {
        const data = await getCharacters();
        return data;
    } catch (error) {
        console.error("Failed to fetch from CrudCrud: ", error);
        return [];
    }
}
 
 
//Merges character from SWAP API and CRUD API
async function fetchCharacters() {
    const swapi = await fetchAllCharacter();
    const crud = await fetchCRUDCharacters();
    const uniqueCharactersMap = new Map();
 
    [...swapi, ...crud].forEach((char) => {
        const key = char.name?.trim().toLowerCase();
        if (!uniqueCharactersMap.has(key)) {
            uniqueCharactersMap.set(key, char);
        }
    });
 
    return Array.from(uniqueCharactersMap.values());
}
 
 
// Retrives a character's species name by using their species URL
async function fetchSpecies(speciesUrls) {
    if (!Array.isArray(speciesUrls) || speciesUrls.length === 0) {
        return "Unknown";
    }
 
    const url = speciesUrls[0];
    try {
        const response = await fetch(url);
        const data = await response.json();
        return data.name || "Unknown";
    } catch (error) {
        console.error("Error fetching species:", error);
        return "Unknown";
    }
}
 
// fetches and returns a characters's film appearances
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
 
// default color to each species
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
 
// if a species doesn't have a predefine color, a random color is assigned
function getColorForSpecies(species){
    if(!setSpeciesColor[species]){
        setSpeciesColor[species]=getRandomColor();
    }
    return setSpeciesColor[species];  
};
 
async function showCharacters(typesSpecies = null){
    try {
        charactersList.innerHTML ="";
 
        const apiCharacters = await fetchCharacters();
        const characters=apiCharacters;
        console.log("Fetched characters from SWAPI:", characters);
 
   
        for (const character of characters){
 
            if (!character || typeof character !== "object") {
                console.warn("Character is invalid:", character);
                continue;
            }
            let speciesName = "Unknown";
 
            if (character && Array.isArray(character.species) && character.species.length > 0) {
                speciesName = await fetchSpecies(character.species);
            } else if (character && Array.isArray(character.speciesName) && character.speciesName.length > 0) {
                speciesName = character.speciesName[0];
            }
 
            if (typesSpecies && speciesName !== typesSpecies){
                continue;
            }    

            let titles = [];
            if (character && Array.isArray(character.films) && character.films.length > 0) {
                titles = await fetchFilm(character.films);
            }
 
            // create a card with the corresponding background color
            const card = document.createElement("div");
            card.classList.add("character-card");
            card.style.backgroundColor = getColorForSpecies(speciesName);
 
            // adds character details to the card
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
 
            // create delete button, removes character when click
            const deleteBtn = document.createElement("button");
            deleteBtn.innerHTML=`<i class="fa-solid fa-trash"></i>`;
            deleteBtn.classList.add("delete-btn");
            deleteBtn.addEventListener("click", function(){
                deleteCharacters(character._id);
            });
 
            // create edit button
             const editBtn = document.createElement("button");
            editBtn.innerHTML=`<i class="fa-solid fa-pen"></i>`;
            editBtn.classList.add("edit-btn");
           
            // Add a click event listener to enable editing and creat a form for editing
            editBtn.addEventListener("click", async function() {
                const form = document.createElement("form");
                form.classList.add("edit-form");
               
                //Create an input field
                const nameInput =document.createElement("input");
                nameInput.type="text";
                nameInput.value=character.name;
 
                // populates a dropdown with available species
                const speciesDropdown = document.createElement("select");
                Array.from(speciesSelect.options).forEach((opt)=>{
                    if(opt.value !== "" && opt.value !=="all"){
                        const option = document.createElement("option");
                        option.value=opt.value;
                        option.text =opt.value;
                        if(opt.value ===speciesName) option.selected=true;
                        speciesDropdown.appendChild(option);
                    }
                });
 
                //Create save buttonfro updating
                const saveBtn =document.createElement("button");
                saveBtn.textContent="Save";
                saveBtn.type="submit";
 
                form.appendChild(nameInput);
                form.appendChild(speciesDropdown);
                form.appendChild(saveBtn);
 
                //replaces the character card with the edit form
                card.innerHTML="";
                card.appendChild(form);
 
                // Prevent the default form submission behavior
                form.addEventListener("submit",async(e) =>{
                    e.preventDefault();
                    const newName=nameInput.value.trim();
                    const newSpecies=speciesDropdown.value;
                   
                    // Ensure valid input before updating
                    if(!newName || !newSpecies){
                        alert ("Invalid input");
                        return;
                    }
 
                    //update character name and species in localStorage
                    character.name=newName;
                    character.speciesName=[newSpecies];
 
                    let storedCharacters=JSON.parse(localStorage.getItem("characters")) || [];
                    // Find the character's position
                    const index = storedCharacters.findIndex((c)=> c._uuid === character._uuid);
 
                    // if the character exists, update it
                    if(index !== -1){
                        storedCharacters[index].name =newName;
                        storedCharacters[index].speciesName=[newSpecies];
                    }else{
                        // if the Character does not exist, add it
                        storedCharacters.push({
                            ...character,
                            name:newName,
                            speciesName:[newSpecies],
                        });
                    }
                    // save the Update data to LocalStorage
                    localStorage.setItem("characters",JSON.stringify(storedCharacters));
                    console.log("Updated LocalStorage: ", JSON.parse(localStorage.getItem("characters")));
 
                    // Call updateCharacter() to sync changes with the CRUD API
                    if(character._id){
                        try{
                            await updateCharacter(character._id, {
                                name: newName,
                                birth_year : character.birth_year,
                                speciesName: [newSpecies],

                            });
                            console.log("Update in CRUD Api and LocaclStorage");
                        }catch(error){
                            console.error("Failed to update character", error);
                        }
                    }
                    // Re-render the character list
                    showCharacters();
                });
                   
            });
 
            //adds all elements in to the card and appends it to the list
            card.append(characterName, characterBirthYear, characterSpecies,characterFilms,deleteBtn,editBtn);
            charactersList.appendChild(card);
        }
        console.log(" Character Cards : ", charactersList.children.length);
    }catch (error){
        console.log("Can not loaded character",error)
    }
}
 
// delete character from both the CRUD API and local storage
async function deleteCharacters(id) {
    await deleteCharacter(id);  

    let storedCharacters = JSON.parse(localStorage.getItem("characters")) || [];
    storedCharacters = storedCharacters.filter(
        character => character._id !== id && character._uuid !== id
    );
    localStorage.removeItem("characters", JSON.stringify(storedCharacters));
 
    showCharacters();
}
 
 
// creates filter buttons for species
async function addSpeciesBtn(){
    const characters = await fetchCharacters();
    const speciesGroup = new Set();
 
    //Loop Through Each Character to Get Species
    for (const character of characters){
        if (!character) continue;
        let speciesName = "Unknown";
 
        if (Array.isArray(character.species) && character.species.length > 0) {
            speciesName = await fetchSpecies(character.species);
        } else if (Array.isArray(character.speciesName) && character.speciesName.length > 0) {
            speciesName = character.speciesName[0];
        }
 
        speciesGroup.add(speciesName);
       
      /*   let titles = [];
        if (character && Array.isArray(character.films) && character.films.length > 0) {
            titles = await fetchFilm(character.films);
        }
  */
 
 
    }
 
    //Create Buttons for Each Unique Species
 
    speciesGroup.forEach(species => {
        const buttonBtn = document.createElement("button");
        buttonBtn.innerText = species;
        buttonBtn.addEventListener("click", function () {
            showCharacters(species);
        });
 
        speciesType.appendChild(buttonBtn);
 
        const option = document.createElement("option");
        option.value = species;
        option.innerText = species;
        speciesSelect.appendChild(option);
    });
 
    // Create a Button to Reset the Filter
    const restartBtn = document.createElement("button");
    restartBtn.innerText = "All";
    restartBtn.addEventListener("click", function () {
        showCharacters(); 
    });
    speciesType.appendChild(restartBtn);
 
}
 
// Creat character function
const addBtn = document.getElementById("add-btn");
addBtn.addEventListener("click",createCharacter);
const characterList = [];
function createCharacter(){
    try{
        const inputCharacterName = document.getElementById("name").value.trim();
        const inputYearOfBirth = document.getElementById("birth_year").value;
        const inputspecies = speciesSelect.value;
        if (!inputCharacterName || !inputYearOfBirth || !inputspecies || inputspecies === "all"){
            alert ("PLease Input all data");
            return;
        }  
        const newCharacterObject = {
            name: inputCharacterName,
            birth_year: inputYearOfBirth,
            speciesName: [inputspecies],
            _uuid: crypto.randomUUID() 
        };
       
        const existingCharacters = JSON.parse(localStorage.getItem("characters")) || [];
        existingCharacters.push(newCharacterObject);
        localStorage.setItem("characters", JSON.stringify(existingCharacters));
 
        console.log("New character:", newCharacterObject);
        addCharacter(newCharacterObject);  
       
        showCharacters();
    } catch (error) {
        console.log("Can not create new character:", error);
    }
       
}
 
addSpeciesBtn();
showCharacters();
cleanupDuplicateCharacters();
