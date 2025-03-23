const apiUrl = "https://crudapi.co.uk/api/v1/characters";
const apiKey = "0fso-PX2mZB-vLPUftn1WMNK083OHqARZdLnmrGnoekWZKBChw";
export async function getCharacters(){
    try{
        const response = await axios.get(apiUrl,{
            headers:{
                Authorization:`Bearer ${apiKey}`,
            },
        });
        console.log("Get success:",response.status, response.statusText);
        const data = response.data;
        console.log("Data: ",data);
        return data;
    } catch (error){
        console.error("GET failed: ", error);
        return {items: []};
    }
}