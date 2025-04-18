const apiUrl = "https://crudcrud.com/api/0802a76acea244049d4ef93ae005c38b/ownedVehicles";
 
 
export async function deleteOwnedVehicle(id) {
  try {
    const response = await axios.delete(`${apiUrl}/${id}`);
 
    console.log(`DELETE success – Vehicle deleted`);
    return response.data;
  } catch (error) {
    console.error("DELETE failed:", error.response || error);
  }
}
 