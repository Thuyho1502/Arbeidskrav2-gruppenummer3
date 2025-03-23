//const apiUrl = "https://crudapi.co.uk/api/v1/characters/";
const apiKey = "0fso-PX2mZB-vLPUftn1WMNK083OHqARZdLnmrGnoekWZKBChw";

export async function deleteCharacter(id){
    try{
        const response = await axios.delete(
            `https://crudapi.co.uk/api/v1/characters/${id}`,
            {
            headers:{
                Authorization:`Bearer ${apiKey}`,

                },
            }
        );
    console.log("Character delete:", response.data);
    return response.data;

    }catch(error){
    
        console.log("Delete failed: ", error);
    }
}
