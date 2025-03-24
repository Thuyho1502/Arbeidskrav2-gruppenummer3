const balance = document.getElementById("balance").innerText;
let currentPage =1 ;
const vehiclesPerPage =6;
let ownedVehicles = JSON.parse(localStorage.getItem("ownedVehicles")) || [];
let allVehicles =[];

async function  fetchAllVehicles() {
    let url ="https://swapi.dev/api/vehicles";
    let vehicles =[];
    try{
         while(url){
        const response = await fetch(url);
        const data = await response.json();
        vehicles = vehicles.concat(data.results);
        url = data.next;       
    }
        allVehicles = vehicles;
        ShowAvailableVehiclesCard();
    } catch(error){
        console.log("Can not load vehicles:", error);
    }    
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
       }
    }
    
    catch(error){
        console.log("Cannot display vehicles:", error)
    }
}
function purchaseVehicle(vehicle) {
    const currentBalance = parseInt(localStorage.getItem("balance")) || 500000;
    const vehicleCost = parseInt(vehicle.cost_in_credits);

    if(ownedVehicles.some(v =>v.name === vehicle.name)){
        alert("You already own this vehicle !");
        return;
    }

    if (currentBalance < vehicleCost){
        alert("Not enough creadits to buy this vehicles!");
        return;
    }
    const newBalance = currentBalance -vehicleCost;
    localStorage.setItem("balance", newBalance);
    document.getElementById("balance").innerText = newBalance;

    ownedVehicles.push(vehicle);
    localStorage.setItem("ownedVehicles", JSON.stringify(ownedVehicles));

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
            
            ownedCard.append(vehicleName,vehicleModel,vehicleCargoCapacity,vehicleCost);
            ownedList.appendChild(ownedCard);

        }

    }
    catch{
        console.log("Can not display owned vehicles:", error);
    }
}


function nextPage(){
    if(currentPage * vehiclesPerPage < allVehicles.length){
        currentPage ++;
        ShowAvailableVehiclesCard();
    }
}

function prevPage(){
    if(currentPage > 1){
        currentPage --;
        ShowAvailableVehiclesCard();
    }
}

document.getElementById("next-button").addEventListener("click", nextPage);
document.getElementById("prev-button").addEventListener("click",prevPage);

fetchAllVehicles();
ShowOwnedVehiclesCard();