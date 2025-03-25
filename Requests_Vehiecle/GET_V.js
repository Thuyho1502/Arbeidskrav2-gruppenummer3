const apiUrl = "https://crudapi.co.uk/api/v1/ownedVehicles";

export async function getOwnedVehicles() {
  try {
        const response = await axios.get(apiUrl, {
            headers: {
                Authorization: "Bearer B2xGE2ZKYzYahe7gievcflZ1YoVRwO6AW9dHDDjBve6SIcLnKQ", // 👈 thay bằng API key của bạn
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
