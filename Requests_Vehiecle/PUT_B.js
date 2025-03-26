const apiUrl = "https://crudapi.co.uk/api/v1/balance";
const apiKey = "zcCftxJWtOYhEsBu2bxVrYlaE5ak7lSeSYHGBBGHR-XxWhAO3Q";
export async function updateBalance(balanceId, newValue) {
  try {
        const response = await axios.put(`${apiUrl}/${balanceId}`,
            { value: newValue },
            {
                headers:{
                    Authorization:`Bearer ${apiKey}`,
                },
            }
        );
        console.log(` PUT balance success – New value: ${newValue}`);
        return response.data;
    } catch (error) {
        console.error(" Failed to update balance:", error.response || error);
    }
}
