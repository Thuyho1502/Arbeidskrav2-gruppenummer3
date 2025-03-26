const apiUrl = "https://crudapi.co.uk/api/v1/ownedVehicles";
const apiKey = "zcCftxJWtOYhEsBu2bxVrYlaE5ak7lSeSYHGBBGHR-XxWhAO3Q";

export async function addOwnedVehicle(vehicle) {
    try {
        const cleanedVehicle = {
            name: vehicle.name,
            model: vehicle.model,
            cargo_capacity: parseInt(vehicle.cargo_capacity) || 0,
            cost_in_credits: parseInt(vehicle.cost_in_credits) || 0,
        };
 
        console.log(" Sending cleaned vehicle to API:", cleanedVehicle);
        const response = await axios.post(apiUrl, [vehicle], {
            headers:{
                Authorization:`Bearer ${apiKey}`,
            },
        });

        console.log("POST success:", response.status, response.data);
        return response.data;
    } catch (error) {
        console.error("POST failed:", error);
    }
}
