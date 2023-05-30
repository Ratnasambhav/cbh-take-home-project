const crypto = require("crypto");

const TRIVIAL_PARTITION_KEY = "0";
const MAX_PARTITION_KEY_LENGTH = 256;

const calculateDigest = (data) => {
  const ENCODING = "hex";
  const HASH_ALGORITHM = "sha3-512";

  return crypto.createHash(HASH_ALGORITHM).update(data).digest(ENCODING);
};

const deterministicPartitionKey = (event) => {
  if (event) {
    let candidate = event.partitionKey || calculateDigest(JSON.stringify(event));

    if (typeof candidate !== "string") {
      candidate = JSON.stringify(event.partitionKey);
    }

    return candidate.length > MAX_PARTITION_KEY_LENGTH ? calculateDigest(candidate) : candidate;
  }

  return TRIVIAL_PARTITION_KEY;
};

module.exports = { deterministicPartitionKey, MAX_PARTITION_KEY_LENGTH };
