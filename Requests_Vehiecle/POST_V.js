const apiUrl = "https://crudcrud.com/api/0802a76acea244049d4ef93ae005c38b/ownedVehicles";
 
export async function addOwnedVehicle(vehicle) {
    try {
        const cleanedVehicle = {
            name: vehicle.name,
            model: vehicle.model,
            cargo_capacity: parseInt(vehicle.cargo_capacity) || 0,
            cost_in_credits: parseInt(vehicle.cost_in_credits) || 0,
        };
 
        console.log(" Sending cleaned vehicle to API:", cleanedVehicle);
 
        const response = await axios.post(apiUrl, cleanedVehicle);
 
        console.log("POST success:", response.status, response.data);
        return response.data;
    } catch (error) {
        console.error("POST failed:", error.response || error);
    }
}