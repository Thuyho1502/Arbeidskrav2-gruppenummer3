const apiUrl = "https://crudapi.co.uk/api/v1/ownedVehicles";
const apiKey = "zcCftxJWtOYhEsBu2bxVrYlaE5ak7lSeSYHGBBGHR-XxWhAO3Q";

export async function getOwnedVehicles() {
  try {
        const response = await axios.get(apiUrl, {
            headers:{
                Authorization:`Bearer ${apiKey}`,
            },
        });
        const vehicles = response.data.items;
        console.log(`GET owned vehicle success -${vehicles.length} vehicles found`);
        return vehicles;
        
    } catch (error) {
        console.error("Error fetching owned vehicles:", error);
        return [];
    }
}
