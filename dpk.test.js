const crypto = require("crypto");

const { deterministicPartitionKey, MAX_PARTITION_KEY_LENGTH } = require("./dpk");

describe("deterministicPartitionKey", () => {
  it("Returns the literal '0' when given no input", () => {
    const trivialKey = deterministicPartitionKey();
    expect(trivialKey).toBe("0");
  });

  it(`Returns event.partitionKey if event.partitionKey is less than ${MAX_PARTITION_KEY_LENGTH} in length`, () => {
    const event = { partitionKey: "some partition key" };
    const trivialKey = deterministicPartitionKey(event);
    expect(trivialKey).toBe(event.partitionKey);
  });
  
  
  it(`Returns JSON stringified event.partitionKey if event.partitionKey is not a string and it's length is less than ${MAX_PARTITION_KEY_LENGTH} in length`, () => {
    const event = { partitionKey: 255 };
    const trivialKey = deterministicPartitionKey(event);
    expect(trivialKey).toBe(JSON.stringify(event.partitionKey));
  });

  it(`Returns digest of event object if event.partitionKey is undefined`, () => {
    const event = { notPartitionKey: "not some partition key" };
    const trivialKey = deterministicPartitionKey(event);
    expect(trivialKey).toBe(
      crypto.createHash("sha3-512").update(JSON.stringify(event)).digest("hex")
    );
  });

  it(`Returned literal is never greated then ${MAX_PARTITION_KEY_LENGTH}`, () => {
    const event = {
      partitionKey: "const crypto = require(\"crypto\");exports.deterministicPartitionKey = (event) => {const TRIVIAL_PARTITION_KEY = \"0\";const MAX_PARTITION_KEY_LENGTH = 256;let candidate;if (event) {if (event.partitionKey) {candidate = event.partitionKey;} else {const data = JSON.stringify(event);"
    };
    const trivialKey = deterministicPartitionKey(event);
    expect(trivialKey.length).toBeLessThan(MAX_PARTITION_KEY_LENGTH);
  })
});
