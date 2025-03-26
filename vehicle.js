import { getBalance } from "./Requests_Vehiecle/GET_B.js";
import { getOwnedVehicles } from "./Requests_Vehiecle/GET_V.js";
import { addOwnedVehicle } from "./Requests_Vehiecle/POST_V.js";
import { addBalance } from "./Requests_Vehiecle/POST_B.js";
import { updateBalance } from "./Requests_Vehiecle/PUT_B.js";
import {deleteOwnedVehicle} from "./Requests_Vehiecle/DELETE_V.js";
 
let currentPage =1 ;
const vehiclesPerPage =6;
let ownedVehicles = JSON.parse(localStorage.getItem("ownedVehicles")) || [];
let allVehicles =[];
 
async function  fetchAllVehicles() {
    let url ="https://swapi.dev/api/vehicles";
   
    try{
        while(url){
            const response = await fetch(url);
            const data = await response.json();
            allVehicles = allVehicles.concat(data.results);
            url = data.next;      
        }
        console.log(`Successfully fetched a total of ${allVehicles.length} vehicles.`);
        ShowAvailableVehiclesCard();
        ShowOwnedVehiclesCard();
   
    } catch(error){
        console.log("Can not load vehicles:", error);
    }    
}
 
function updateBalanceDisplay(){
    const balance = parseInt(localStorage.getItem("balance")) || 500000;
    document.getElementById("balance").innerText = balance;
}
function ShowAvailableVehiclesCard(){
    try{
        const vehicleList = document.getElementById("vehicle-list");
        vehicleList.innerHTML=``;
 
        const startPage =(currentPage -1) *vehiclesPerPage;
        const endPage = startPage + vehiclesPerPage;
        const vehiclesToShow = allVehicles.slice(startPage,endPage);
 
       for (const vehicle of vehiclesToShow){
 
            const vehicleCard = document.createElement("div");
            vehicleCard.classList.add("vehicle-card");
           
            const vehicleName = document.createElement("h2");
            vehicleName.innerHTML = vehicle.name;
 
            const vehicleModel = document.createElement("h3");
            vehicleModel.innerHTML = `Model: ${vehicle.model}`;
 
            const vehicleCargoCapacity = document.createElement("h3");
            vehicleCargoCapacity.innerHTML = `Cargo: ${vehicle.cargo_capacity}`;
 
            const vehicleCost = document.createElement("h3");
            vehicleCost.innerHTML =  `Cost: ${vehicle.cost_in_credits} credits`;
 
            const buyButton = document.createElement("button");
            buyButton.innerText = "Buy";
            buyButton.addEventListener("click",() => purchaseVehicle(vehicle));
 
            vehicleCard.append(vehicleName, vehicleModel, vehicleCargoCapacity, vehicleCost,buyButton);
            vehicleList.appendChild(vehicleCard);
            // updateBalance();
       }
       console.log("Successfully displayed: ",vehiclesToShow.length, "vehicles");
    }
   
    catch(error){
        console.log("Cannot display vehicles:", error)
    }
}
async function purchaseVehicle(vehicle) {
    try{
        const currentBalance = parseInt(localStorage.getItem("balance")) || 500000;
        const vehicleCost = parseInt(vehicle.cost_in_credits);
        if (isNaN(vehicleCost)) {
            alert("This vehicle has unknown price and cannot be purchased.");
            return;
        }
 
        if(ownedVehicles.some(v =>v.name === vehicle.name)){
            alert("You already own this vehicle !");
            return;
        }
 
        if (currentBalance < vehicleCost){
            alert("Not enough creadits to buy this vehicles!");
            return;
        }
        const newBalance = currentBalance - vehicleCost;
        localStorage.setItem("balance", newBalance);
        updateBalanceDisplay();
 
        await addOwnedVehicle(vehicle); // <-- POST API
       
        const balanceId = localStorage.getItem("balanceId");
        if(balanceId){
            await updateBalance(balanceId,newBalance);
        }
 
        //const updated= await getOwnedVehicles();
        ownedVehicles.push(vehicle);
        const updatedVehicles = await getOwnedVehicles();
        localStorage.setItem("ownedVehicles", JSON.stringify(ownedVehicles));
        ownedVehicles=updatedVehicles;
           
        ShowOwnedVehiclesCard();
        console.log(` Purchased ${vehicle.name} for ${vehicleCost} credits. New balance: ${newBalance}`);
    }catch{(error)
        console.log("Error purchasing vehicle:", error);
    }
   
}
 
function ShowOwnedVehiclesCard(){
    try{
        const ownedList = document.getElementById("owned-vehicles-list");
        ownedList.innerHTML =``;
        for(const vehicle of ownedVehicles){
 
            const ownedCard = document.createElement("div");
            ownedCard.classList.add("owned-card");
           
            const vehicleName = document.createElement("h2");
            vehicleName.innerHTML = vehicle.name;
 
            const vehicleModel = document.createElement("h3");
            vehicleModel.innerHTML = `Model: ${vehicle.model}`;
 
            const vehicleCargoCapacity = document.createElement("h3");
            vehicleCargoCapacity.innerHTML = `Cargo: ${vehicle.cargo_capacity}`;
 
            const vehicleCost = document.createElement("h3");
            vehicleCost.innerHTML =  `Cost: ${vehicle.cost_in_credits} credits`;
           
            const sellButton = document.createElement("button");
            sellButton.innerText ="Sell";
            sellButton.addEventListener("click",() => sellVehicle(vehicle));
 
            ownedCard.append(vehicleName,vehicleModel,vehicleCargoCapacity,vehicleCost,sellButton);
            ownedList.appendChild(ownedCard);
            getOwnedVehicles();
 
        }
        console.log(`Successfully displayed ${ownedVehicles.length} owned vehicles.`);
    }
    catch{
        console.log("Can not display owned vehicles:", error);
    }
}
 
async function sellVehicle(vehicle){
 
    /* try{
        const currentBalance = parseInt(localStorage.getItem("balance")) || 500000;
        const vehicleCost = parseInt(vehicle.cost_in_credits);
        const sellPrice = Math.floor(vehicleCost* 0.8);
       
        ownedVehicles = ownedVehicles.filter(v =>v.name !== vehicle.name);
        localStorage.setItem("ownedVehicles",JSON.stringify(ownedVehicles));
       
        localStorage.setItem("balance", newBalance);
        updateBalanceDisplay();
 
        const balanceId =localStorage.getItem("balanceId");
        if(balanceId){
            await updateBalance(balanceId,newBalance)
 
        }
 
        ShowOwnedVehiclesCard();
        ShowAvailableVehiclesCard();
 
        console.log(`Sold ${vehicle.name} for ${sellPrice} credits. New balance: ${newBalance}`);
    }
    catch(error)
    {
        console.log("Error selling vehicle", error);
    } */
 
    try {
        const currentBalance = parseInt(localStorage.getItem("balance")) || 500000;
        const vehicleCost = parseInt(vehicle.cost_in_credits);
        const sellPrice = Math.floor(vehicleCost * 0.8);
        const newBalance = currentBalance + sellPrice;
       
        const matchingVehicle = ownedVehicles.find(v => v.name === vehicle.name);
        if (matchingVehicle && matchingVehicle._uuid) {
            await deleteOwnedVehicle(matchingVehicle._uuid);
        }
        else{
            console.warn("can not reach _uuid to delete");
        }
       
        ownedVehicles = ownedVehicles.filter((v) => v.name !== vehicle.name);
        localStorage.setItem("ownedVehicles", JSON.stringify(ownedVehicles));
       
        localStorage.setItem("balance", newBalance);
        updateBalanceDisplay();
       
        const balanceId = localStorage.getItem("balanceId");
        if (balanceId) {
            await updateBalance(balanceId, newBalance);
        }
       
        ShowOwnedVehiclesCard();
        ShowAvailableVehiclesCard();
       
        console.log(`Sold ${vehicle.name} for ${sellPrice} credits. New balance: ${newBalance}`);
    } catch (error) {
        console.log(" Error selling vehicle:", error);
    }
   
}
   
   
 
   
 
function nextPage(){
    try{
        if(currentPage * vehiclesPerPage < allVehicles.length){
            currentPage ++;
            ShowAvailableVehiclesCard();
            console.log("Moved to page: ", currentPage);
        }
    }catch(error){
        console.log("Error navigating to next page: ", error);
    }
   
}
 
function prevPage(){
    try {
        if(currentPage > 1){
            currentPage --;
            ShowAvailableVehiclesCard();
            console.log("Moved to page: ", currentPage);
        }    
    } catch (error) {
        console.log("Error navigating to previous page: ", error);
       
    }
}
 
async function loadDataFromCrudAPI() {
    try {
        let balanceData = await getBalance();
        if(!balanceData){
            console.warn("No balance founf.Creating new one....");
            await addBalance();
            balanceData = await getBalance();
        }
       
        if (balanceData) {
            localStorage.setItem("balance", balanceData.value);
            localStorage.setItem("balanceId", balanceData._uuid);
            console.log("Loaded balance from API:", balanceData.value);
        }
 
        const ownedFromAPI = await getOwnedVehicles();
        if (ownedFromAPI.length > 0) {
            localStorage.setItem("ownedVehicles", JSON.stringify(ownedFromAPI));
            ownedVehicles = ownedFromAPI;
            console.log("Loaded owned vehicles from API:", ownedFromAPI.length);
        }
 
        updateBalanceDisplay();
        ShowOwnedVehiclesCard();
    } catch (error) {
      console.error("Error loading data from CRUD API:", error);
    }
}
 
 
document.getElementById("next-button").addEventListener("click", nextPage);
document.getElementById("prev-button").addEventListener("click",prevPage);
document.getElementById("easter-egg-button").addEventListener("click", easterEgg);
 
async function easterEgg() {
    const agree = confirm("Do you want to join a secret guessing game to win 10,000 credits?");
 
    if (!agree) {
        alert("You declined the game. Maybe next time!");
        return;
    }
 
    const secretNumber = Math.floor(Math.random() * 100) + 1;
    console.log(" Secret number is:", secretNumber);
    const guess = parseInt(prompt("Guess a number between 1 and 100:"));
 
    if (guess === secretNumber) {
        let balance = parseInt(localStorage.getItem("balance")) || 500000;
        balance += 10000;
        localStorage.setItem("balance", balance);
        updateBalanceDisplay();
 
        const balanceId = localStorage.getItem("balanceId");
        if (balanceId) {
            try {
                const response = await updateBalance(balanceId, balance);
                console.log(` PUT balance success (Easter Egg) – New balance: ${balance}`, response);
            } catch (error) {
                console.error(" Failed to update balance after Easter Egg win:", error);
            }
        }
 
        alert(` You guessed correctly! The secret number was ${secretNumber}. You won 10,000 credits!`);
        console.log(`New balance after winning Easter Egg: ${balance} credits`);
    } else {
        alert(`Sorry! The correct number was ${secretNumber}. Try again later.`);
    }
    document.getElementById("easter-egg-button").style.display = "none";
 
}
 
 
 
fetchAllVehicles();
loadDataFromCrudAPI().then(() => {
    const showEasterEgg = Math.random() < 0.3;
 
    if (showEasterEgg) {
        const eggButton = document.getElementById("easter-egg-button");
        eggButton.style.display = "block";
        console.log("Lucky you! The secret game has appeared!");
        alert("You're lucky! A secret game is available!");
    }
});
 