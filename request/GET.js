const apiUrl = "https://crudcrud.com/api/0802a76acea244049d4ef93ae005c38b/data2";
 
export async function getCharacters() {
    try {
        const response = await axios.get(apiUrl);
        return response.data;
    } catch (error) {
        console.error("GET failed: ", error);
        throw error;
    }
}
 