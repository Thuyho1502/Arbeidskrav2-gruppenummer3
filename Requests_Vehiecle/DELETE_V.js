const apiUrl = "https://crudapi.co.uk/api/v1/ownedVehicles";

export async function deleteOwnedVehicle(uuid) {
  try {
    const response = await axios.delete(`${apiUrl}/${uuid}`, {
      headers: {
        Authorization: "Bearer B2xGE2ZKYzYahe7gievcflZ1YoVRwO6AW9dHDDjBve6SIcLnKQ", 
    },
    });

    console.log(`DELETE success – Vehicle deleted`);
    return response.data;
  } catch (error) {
    console.error("DELETE failed:", error.response || error);
  }
}
