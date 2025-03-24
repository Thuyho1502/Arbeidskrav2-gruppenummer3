const {
  addCharacter,
  deleteCharacterById
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
