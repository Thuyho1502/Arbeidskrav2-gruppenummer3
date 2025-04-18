const apiUrl = "https://crudcrud.com/api/0802a76acea244049d4ef93ae005c38b/balance1";
 
export async function addBalance(initialValue = 500000) {
  try {
    const response = await axios.post(apiUrl, {
      value: initialValue,
    });
 
    console.log(`Balance initialized to ${initialValue} credits.`);
    return response.data;
  } catch (error) {
    console.error("Failed to post initial balance:", error);
  }
}
 