const apiUrl = "https://crudapi.co.uk/api/v1/balance";

export async function addBalance(initialValue = 500000) {
    try {
        const response = await axios.post(
            apiUrl,
            [{ value: initialValue }],
            {
                headers: {
                    Authorization: "Bearer B2xGE2ZKYzYahe7gievcflZ1YoVRwO6AW9dHDDjBve6SIcLnKQ",
                },
            }
        );
        console.log(` Balance initialized to ${initialValue} credits.`);
        return response.data;
    } catch (error) {
        console.error("Failed to post initial balance:", error);
    }
}
