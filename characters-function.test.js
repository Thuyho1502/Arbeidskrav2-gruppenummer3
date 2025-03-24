const {
  addCharacter,
  deleteCharacterById,
  updateCharacterById,
  filterCharactersBySpecies
} = require("./characters-function.js");
describe("addCharacter", () => {
  it("should add a character to the list", () => {
    const characters = [];
    const newCharacter = {
      name: "Luke Skywalker",
      birth_year: "19BBY",
      speciesName: ["Human"],
    };

    addCharacter(newCharacter, characters);

    expect(characters.length).toBe(1);
    expect(characters[0]).toEqual(newCharacter);
  });

  it("should not add character if name is missing", () => {
      const characters = [];
      const newCharacter = {
        name: "",
        birth_year: "19BBY",
        speciesName: ["Human"],
      };
 
      const result = addCharacter(newCharacter, characters);
 
      expect(result.error).toBe("Character info cannot be empty!");
      expect(characters.length).toBe(0);
  });
});

describe("deleteCharacterById", () => {
  it("should delete the character with the given ID", () => {
    const characters = [
      { name: "A", _uuid: "1" },
      { name: "B", _uuid: "2" },
    ];

    deleteCharacterById("1", characters);

    expect(characters.length).toBe(1);
    expect(characters[0]._uuid).toBe("2");
  });
});
describe("updateCharacterById", () => {
  it("should update character name and species", () => {
    const characters = [
      { name: "Leia", _uuid: "10", speciesName: ["Human"] },
    ];

    const updates = { name: "Leia Organa", speciesName: ["Droid"] };

    updateCharacterById("10", updates, characters);

    expect(characters[0].name).toBe("Leia Organa");
    expect(characters[0].speciesName).toEqual(["Droid"]);
 });
  it("should return error if character does not exist during update", () => {
      const characters = [
        { name: "Yoda", _uuid: "1", speciesName: ["Unknown"] },
      ];
      const result = updateCharacterById("999", { name: "Yoda Master" }, characters);
      expect(result.error).toBe("Character not found");
    });
    
});
describe("filterCharactersBySpecies", () => {
  it("should return only characters with matching species", () => {
    const characters = [
      { name: "A", speciesName: ["Human"] },
      { name: "B", speciesName: ["Droid"] },
    ];

    const result = filterCharactersBySpecies("Droid", characters);

    expect(result.length).toBe(1);
    expect(result[0].name).toBe("B");
  });
});
