import { createCharacter } from './Scripts/character'; // Adjust the import as needed

describe('createCharacter', () => {
  let addBtn;

  beforeEach(() => {
    // Set up a mock button element
    addBtn = document.createElement('button');
    addBtn.id = 'add-btn'; // Set the ID as it is in your code
    document.body.appendChild(addBtn); // Append it to the body

    // Mock the addEventListener method to prevent errors
    jest.spyOn(addBtn, 'addEventListener').mockImplementation(() => {});
  });

  afterEach(() => {
    // Clean up the DOM after each test
    document.body.innerHTML = '';
  });

  test('should add event listener to add-btn', () => {
    // Call your function that attaches the event listener
    createCharacter();

    // Check if the event listener was added to the button
    expect(addBtn.addEventListener).toHaveBeenCalledWith('click', createCharacter);
  });

  // Other tests for createCharacter...
});
