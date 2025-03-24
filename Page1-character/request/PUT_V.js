const apiUrl = "https://crudapi.co.uk/api/v1/vehicles";
const token = " Bearer lmyhCcBSSnx3AuPuaTE29LG4ZqVld26PE9KBTHUsYFGjtHL89A";

export async function updateBalanceOnAPI(id, newAmount) {
    try {
        const getRes = await axios.get(`${apiUrl}/${id}`, {
            headers: { Authorization: token }
        });
  
        let existing = getRes.data.items ? getRes.data.items[0] : getRes.data;
  
        existing.value = newAmount;
  
      // ✅ Đảm bảo có type: "balance"
        if (!existing.type) {
            existing.type = "balance";
        }
  
        console.log("🟡 PUT payload:", existing);
  
        const putRes = await axios.put(`${apiUrl}/${id}`, [existing], {
            headers: { Authorization: token }
        });
  
        console.log("✅ PUT Balance success:", putRes.status);
    } catch (error) {
      console.error("❌ PUT Balance failed:", error);
    }
  }
  
  