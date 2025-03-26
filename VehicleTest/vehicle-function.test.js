const { purchaseVehicle, sellVehicle,validatePurchase,
  calculateSellPrice } = require("./vehicle-function.js");

describe("purchaseVehicle", () => {
  test("should add vehicle to ownedVehicles and deduct balance", () => {
    const vehicle = { name: "AT-ST", cost_in_credits: "100000" };
    let balance = 500000;
    let ownedVehicles = [];

    const result = purchaseVehicle(vehicle, balance, ownedVehicles);

    expect(result.success).toBe(true);
    expect(result.newBalance).toBe(400000);
    expect(result.ownedVehicles.length).toBe(1);
    expect(result.ownedVehicles[0].name).toBe("AT-ST");
  });

  test("should not allow buying a vehicle if already owned", () => {
    const vehicle = { name: "AT-ST", cost_in_credits: "100000" };
    let balance = 500000;
    let ownedVehicles = [vehicle];

    const result = purchaseVehicle(vehicle, balance, ownedVehicles);

    expect(result.error).toBe("You already own this vehicle!");
  });

  test("should not allow buying if balance is too low", () => {
    const vehicle = { name: "Speeder", cost_in_credits: "600000" };
    let balance = 500000;
    let ownedVehicles = [];

    const result = purchaseVehicle(vehicle, balance, ownedVehicles);

    expect(result.error).toBe("Not enough credits!");
  });
});

describe("sellVehicle", () => {
  test("should remove vehicle from ownedVehicles and return 80% of price", () => {
    const vehicle = { name: "AT-ST", cost_in_credits: "100000" };
    let balance = 300000;
    let ownedVehicles = [vehicle];

    const result = sellVehicle(vehicle, balance, ownedVehicles);

    expect(result.success).toBe(true);
    expect(result.newBalance).toBe(380000); // 300k + 80k
    expect(result.ownedVehicles.length).toBe(0);
  });
  test("should return correct new array after selling", () => {
    const vehicle1 = { name: "AT-ST", cost_in_credits: "100000" };
    const vehicle2 = { name: "Speeder", cost_in_credits: "150000" };
    let balance = 200000;
    let ownedVehicles = [vehicle1, vehicle2];

    const result = sellVehicle(vehicle2, balance, ownedVehicles);

    expect(result.newBalance).toBe(200000 + 120000); // 80% of 150k
    expect(result.ownedVehicles).toEqual([vehicle1]);
  });
});

describe('validatePurchase', () => {
  const vehicle = {
    name: 'X-Wing',
    cost_in_credits: '10000',
  };
 
  test('should return error if vehicle has unknown price', () => {
    const result = validatePurchase({ ...vehicle, cost_in_credits: 'unknown' }, [], 500000);
    expect(result.error).toBe('This vehicle has unknown price and cannot be purchased.');
  });
 
  test('should return error if vehicle already owned', () => {
    const result = validatePurchase(vehicle, [vehicle], 500000);
    expect(result.error).toBe('You already own this vehicle !');
  });
 
  test('should return error if not enough balance', () => {
    const result = validatePurchase(vehicle, [], 100);
    expect(result.error).toBe('Not enough credits to buy this vehicle!');
  });
 
  test('should return success if everything is valid', () => {
    const result = validatePurchase(vehicle, [], 500000);
    expect(result.success).toBe(true);
    expect(result.newBalance).toBe(490000);
    expect(result.vehicleCost).toBe(10000);
  });
});
 
describe('calculateSellPrice', () => {
  test('should return 80% of vehicle cost', () => {
    const vehicle = { cost_in_credits: '10000' };
    const price = calculateSellPrice(vehicle);
    expect(price).toBe(8000);
  });
});
 

 