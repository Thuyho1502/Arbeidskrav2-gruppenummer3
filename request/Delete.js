const apiUrl = "https://crudapi.co.uk/api/v1/data";
const apiKey = "bYysHhKJrZDReR_LRwaIQ3hzXMiHeA3GNcqL-CGKd5cJIAkMOg";
export async function deleteCharacter(id){
    try{
        const response = await axios.delete(
            `https://crudapi.co.uk/api/v1/data/${id}`,
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
