const apiUrl = " https://crudcrud.com/api/0802a76acea244049d4ef93ae005c38b/data2";
 
export async function updateCharacter(uuid,updatetData){
    try{
        const response = await axios.put(`${apiUrl}/${uuid}`,updatetData,{
            headers:{
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