const apiUrl = "https://crudapi.co.uk/api/v1/ownedVehicles";

export async function addOwnedVehicle(vehicle) {
    try {
        const response = await axios.post(apiUrl, [vehicle], {
            headers: {
                Authorization: "Bearer B2xGE2ZKYzYahe7gievcflZ1YoVRwO6AW9dHDDjBve6SIcLnKQ", 
            },
        });

        console.log("POST success:", response.status, response.data);
        return response.data;
    } catch (error) {
        console.error("POST failed:", error);
    }
}
