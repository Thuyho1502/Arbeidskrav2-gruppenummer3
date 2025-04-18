const apiUrl = "https://crudcrud.com/api/0802a76acea244049d4ef93ae005c38b/ownedVehicles";
 
export async function getOwnedVehicles() {
  try {
        const response = await axios.get(apiUrl);
        console.log("🔍 API raw response:", response.data);
        return response.data;
        /* console.log(`GET owned vehicle success -${vehicles.length} vehicles found`);
        return vehicles; */
       
    } catch (error) {
        console.error("Error fetching owned vehicles:", error);
        return [];
    }
}