
const apiUrl ="https://crudapi.co.uk/api/v1/data";
const apiKey ="bYysHhKJrZDReR_LRwaIQ3hzXMiHeA3GNcqL-CGKd5cJIAkMOg";
export async function updateCharacter(uuid,updatetData){
    try{
        const response = await axios.put(`${apiUrl}/${uuid}`,updatetData,{
            headers:{
                Authorization : `Bearer ${apiKey}`,
                "Content-Type":"application/json"
            }
        });
        console.log("Update character :", response.data);
        return response.data;
    }catch(error){
        console.error("Failed to update character:", error);
        throw error;
    }
}