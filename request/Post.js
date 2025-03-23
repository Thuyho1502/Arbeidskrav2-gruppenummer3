const apiUrl = "https://crudapi.co.uk/api/v1/characters";
const apiKey = "0fso-PX2mZB-vLPUftn1WMNK083OHqARZdLnmrGnoekWZKBChw";

export async function addCharacter(data){
    console.log(data);
    try {
        const response = await axios.post(apiUrl, data, {
            headers: {
                Authorization: `Bearer ${apiKey}`,

            }
        });
          console.log("New character has been added: ", response);
    } catch (error) {
        console.log("Failed to add new person: ", error);
    }
    
}