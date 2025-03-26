const apiUrl = "https://crudapi.co.uk/api/v1/balance";
const apiKey = "zcCftxJWtOYhEsBu2bxVrYlaE5ak7lSeSYHGBBGHR-XxWhAO3Q";

export async function addBalance(initialValue = 500000) {
    try {
        const response = await axios.post(
            apiUrl,
            [{ value: initialValue }],
            {
                headers:{
                    Authorization:`Bearer ${apiKey}`,
                },
            }
        );
        console.log(` Balance initialized to ${initialValue} credits.`);
        return response.data;
    } catch (error) {
        console.error("Failed to post initial balance:", error);
    }
}
