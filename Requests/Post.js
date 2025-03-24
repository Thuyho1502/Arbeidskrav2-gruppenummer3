const apiUrl ="https://crudapi.co.uk/api/v1/vehicles";
const apiKey ="4XnZFtdSjg-PgILT7UZRT39S1VNjvbHxHFFRzR0gKXJjkHBCYw";

export async function buyVehicle(data) {
    console.log(data);
    try{
        const response = await axios.post(apiUrl, data, {
            headers: {
                Authorization: `Bearer ${apiKey}`,

            }
        });
        console.log("")

    }
    
}