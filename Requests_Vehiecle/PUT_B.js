const apiUrl = "https://crudapi.co.uk/api/v1/balance";

export async function updateBalance(balanceId, newValue) {
  try {
        const response = await axios.put(`${apiUrl}/${balanceId}`,
            { value: newValue },
            {
                headers: {
                Authorization: "Bearer B2xGE2ZKYzYahe7gievcflZ1YoVRwO6AW9dHDDjBve6SIcLnKQ",
                },
            }
        );
        console.log(` PUT balance success – New value: ${newValue}`);
        return response.data;
    } catch (error) {
        console.error(" Failed to update balance:", error.response || error);
    }
}
