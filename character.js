// these import bring in functions for handling CRUD operations
import { addCharacter } from "./request/Post.js";
import{getCharacters} from "./request/GET.js";
import { updateCharacter } from "./request/PUT.js";
import { deleteCharacter } from "./request/Delete.js";
 
// These variables elements in HTML file
const speciesType = document.getElementById("species-type");
const charactersList = document.getElementById("characters-list");
const speciesSelect = document.getElementById("species");
 
// Retrieves all Star Wars character from the SWAP API
async function fetchAllCharacter(){
   
    let url="https://swapi.dev/api/people/";
    let characters=[];
    while(url){
       
        const response =await fetch(url);
        const data = await response.json();
        characters=characters.concat(data.results);
        url=data.next;
    }
    return characters;
}
 
// fetches user-created character from a separate CRUD API
async function fetchCRUDCharacters(){
    try{
        const data = await getCharacters();
        return data.items || [];
    }catch (error){
        console.error("Failed to fetch CRUD data : ", error);
        return [];
    }
}
 
//Merges character from SWAP API and CRUD API
async function fetchCharacters(){
    const swapi = await fetchAllCharacter();
    const crud = await fetchCRUDCharacters();
    return swapi.concat(crud);
}
 
// Retrives a character's species name by using their species URL
async function fetchSpecies(speciesUrl){
    if(!Array.isArray(speciesUrl) || speciesUrl.length === 0){
        return "Unknown";
    }
   
    const url = speciesUrl[0];
    if (typeof url === "string" && !url.startsWith("https://swapi.dev/api/species")){
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
    //Retrives all character from both SWAP API and CRUD API
    try {
        charactersList.innerHTML ="";
 
        const apiCharacters = await fetchCharacters();
        const characters=apiCharacters;
   
        for (const character of characters){
 
            // Retrives the species name and filters character if a species is selected
            const speciesName = (character.species&&Array.isArray(character.species)&&character.species.length > 0)
            ? await fetchSpecies(character.species)
            :character.speciesName?.[0] || "Unknown";
 
            if (typesSpecies && speciesName !== typesSpecies){
                continue;
            }  
 
            // Retrievies film appearances
            const titles = character.films
            ? await fetchFilm(character.films)
            : [] ;
 
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
            deleteCharacters(character._uuid);
            //card.remove();
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
                    if(character._uuid){
                        try{
                            await updateCharacter(character._uuid,{
                                name:newName,
                                speciesName:[newSpecies],
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
 
    storedCharacters = storedCharacters.filter(character => character._uuid !== id);
    localStorage.removeItem("characters", JSON.stringify(storedCharacters));
    showCharacters();
   
}
 
// creates filter buttons for species
async function addSpeciesBtn(){
    const characters = await fetchCharacters();
    const speciesGroup = new Set();
 
    //Loop Through Each Character to Get Species
    for (const character of characters){
        const speciesName = (character.species && character.species.length > 0)
        ? await fetchSpecies (character.species)
        : character.speciesName?.[0] || "Unknown";
        speciesGroup.add(speciesName);
    }
 
    //Create Buttons for Each Unique Species
 
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
 
    // Create a Button to Reset the Filter
    const restartBtn = document.createElement("button");
    restartBtn.innerText = "All";
    restartBtn.addEventListener("click", function(){
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
        const newCharacterObject  = {
            name : inputCharacterName,
            birth_year : inputYearOfBirth,
            speciesName : [inputspecies]
        };
       
        console.log("New character:", newCharacterObject);
        characterList.push(newCharacterObject);
        localStorage.setItem("characters",JSON.stringify(characterList));
        showCharacters();    
        addCharacter([newCharacterObject]);  
 
    }catch(error)
        {
            console.log("Can not create new character:", error);
        }
       
}
 
addSpeciesBtn();
showCharacters();
 