function purchaseVehicle(vehicle, balance, ownedVehicles) {
  if (ownedVehicles.some((v) => v.name === vehicle.name)) {
    return { error: "You already own this vehicle!" };
  }

  const cost = parseInt(vehicle.cost_in_credits);
  if (balance < cost) {
    return { error: "Not enough credits!" };
  }

  ownedVehicles.push(vehicle);
  const newBalance = balance - cost;

  return { success: true, newBalance, ownedVehicles };
}

function sellVehicle(vehicle, balance, ownedVehicles) {
  const cost = parseInt(vehicle.cost_in_credits);
  const sellPrice = Math.floor(cost * 0.8);

  const updatedVehicles = ownedVehicles.filter((v) => v.name !== vehicle.name);
  const newBalance = balance + sellPrice;

  return { success: true, newBalance, ownedVehicles: updatedVehicles };
}


function validatePurchase(vehicle, ownedVehicles, currentBalance) {
  const vehicleCost = parseInt(vehicle.cost_in_credits);
  if (isNaN(vehicleCost)) {
    return { error: "This vehicle has unknown price and cannot be purchased." };
  }
 
  if (ownedVehicles.some((v) => v.name === vehicle.name)) {
    return { error: "You already own this vehicle !" };
  }
 
  if (currentBalance < vehicleCost) {
    return { error: "Not enough credits to buy this vehicle!" };
  }
 
  const newBalance = currentBalance - vehicleCost;
  return { success: true, newBalance, vehicleCost };
}
 
function calculateSellPrice(vehicle) {
  const vehicleCost = parseInt(vehicle.cost_in_credits);
  return Math.floor(vehicleCost * 0.8);
}



 

 
module.exports = {
  validatePurchase,
  calculateSellPrice,
  purchaseVehicle, sellVehicle
};
 


 