const apiUrl = "https://crudcrud.com/api/0802a76acea244049d4ef93ae005c38b/balance";
export async function updateBalance(balanceId, newValue) {
  try {
        const response = await axios.put(`${apiUrl}/${balanceId}`,{ value: newValue });
        console.log(` PUT balance success – New value: ${newValue}`);
        return response.data;
    } catch (error) {
        console.error(" Failed to update balance:", error.response || error);
    }
}