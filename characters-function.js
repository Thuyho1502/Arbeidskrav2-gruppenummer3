function addCharacter(character, characterArray) {
    if (!character.name || !character.birth_year || !character.speciesName) {
      return { error: "Character info cannot be empty!" };
    }
    characterArray.push(character);
    return { success: true };
}
 
function deleteCharacterById(uuid, characterArray) {
    const index = characterArray.findIndex((c) => c._uuid === uuid);
    if (index !== -1) {
      characterArray.splice(index, 1);
    }
}
module.exports = {
    addCharacter,
    deleteCharacterById}