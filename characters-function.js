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
function updateCharacterById(uuid, updatedData, characterArray) {
  const index = characterArray.findIndex((c) => c._uuid === uuid);
  if (index !== -1) {
    characterArray[index] = {
      ...characterArray[index],
      ...updatedData,
    };
    return { success: true };
  }
  return { error: "Character not found" };
}

function filterCharactersBySpecies(species, characterArray) {
  return characterArray.filter((char) => {
    const speciesName = char.speciesName?.[0] || "Unknown";
    return speciesName === species;
  });
}


module.exports = {
  addCharacter,
  deleteCharacterById,
  updateCharacterById,
  filterCharactersBySpecies,
}