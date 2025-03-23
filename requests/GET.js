const apiUrl = "https://crudapi.co.uk/api/v1/data";
const apiKey = "Vb5NuRWVtPQ9DYY99d04KmjteVc6GjdNcrCow_5makx66TEHdQ";
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