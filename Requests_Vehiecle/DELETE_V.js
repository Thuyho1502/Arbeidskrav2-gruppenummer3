const apiUrl = "https://crudapi.co.uk/api/v1/ownedVehicles";
const apiKey = "zcCftxJWtOYhEsBu2bxVrYlaE5ak7lSeSYHGBBGHR-XxWhAO3Q";

export async function deleteOwnedVehicle(uuid) {
  try {
    const response = await axios.delete(`${apiUrl}/${uuid}`, {
        headers:{
            Authorization:`Bearer ${apiKey}`,
        },
    });
 
    console.log(`DELETE success – Vehicle deleted`);
    return response.data;
  } catch (error) {
    console.error("DELETE failed:", error.response || error);
  }
}