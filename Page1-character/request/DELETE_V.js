const apiUrl = "https://crudapi.co.uk/api/v1/vehicles";
const token = " Bearer lmyhCcBSSnx3AuPuaTE29LG4ZqVld26PE9KBTHUsYFGjtHL89A";

export async function deleteVehicleFromAPI(id) {
  try {
        const response = await axios.delete(`${apiUrl}/${id}`, {
        headers: { Authorization: token }
    });
    console.log("DELETE Vehicle success:", response.status);
    }catch (error) {
    console.error("DELETE Vehicle failed:", error);
  }
}
