const apiUrl = "https://crudapi.co.uk/api/v1/data";
const apiKey = "bYysHhKJrZDReR_LRwaIQ3hzXMiHeA3GNcqL-CGKd5cJIAkMOg";

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