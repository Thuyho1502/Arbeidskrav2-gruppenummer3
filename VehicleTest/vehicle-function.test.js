const { purchaseVehicle, sellVehicle } = require("./vehicle-function.js");

describe("purchaseVehicle", () => {
  it("should add vehicle to ownedVehicles and deduct balance", () => {
    const vehicle = { name: "AT-ST", cost_in_credits: "100000" };
    let balance = 500000;
    let ownedVehicles = [];

    const result = purchaseVehicle(vehicle, balance, ownedVehicles);

    expect(result.success).toBe(true);
    expect(result.newBalance).toBe(400000);
    expect(result.ownedVehicles.length).toBe(1);
    expect(result.ownedVehicles[0].name).toBe("AT-ST");
  });

  it("should not allow buying a vehicle if already owned", () => {
    const vehicle = { name: "AT-ST", cost_in_credits: "100000" };
    let balance = 500000;
    let ownedVehicles = [vehicle];

    const result = purchaseVehicle(vehicle, balance, ownedVehicles);

    expect(result.error).toBe("You already own this vehicle!");
  });

  it("should not allow buying if balance is too low", () => {
    const vehicle = { name: "Speeder", cost_in_credits: "600000" };
    let balance = 500000;
    let ownedVehicles = [];

    const result = purchaseVehicle(vehicle, balance, ownedVehicles);

    expect(result.error).toBe("Not enough credits!");
  });
});

describe("sellVehicle", () => {
  it("should remove vehicle from ownedVehicles and return 80% of price", () => {
    const vehicle = { name: "AT-ST", cost_in_credits: "100000" };
    let balance = 300000;
    let ownedVehicles = [vehicle];

    const result = sellVehicle(vehicle, balance, ownedVehicles);

    expect(result.success).toBe(true);
    expect(result.newBalance).toBe(380000); // 300k + 80k
    expect(result.ownedVehicles.length).toBe(0);
  });
  it("should return correct new array after selling", () => {
    const vehicle1 = { name: "AT-ST", cost_in_credits: "100000" };
    const vehicle2 = { name: "Speeder", cost_in_credits: "150000" };
    let balance = 200000;
    let ownedVehicles = [vehicle1, vehicle2];

    const result = sellVehicle(vehicle2, balance, ownedVehicles);

    expect(result.newBalance).toBe(200000 + 120000); // 80% of 150k
    expect(result.ownedVehicles).toEqual([vehicle1]);
  });
});
