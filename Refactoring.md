# Refactoring

You've been asked to refactor the function `deterministicPartitionKey` in [`dpk.js`](dpk.js) to make it easier to read and understand without changing its functionality. For this task, you should:

1. Write unit tests to cover the existing functionality and ensure that your refactor doesn't break it. We typically use `jest`, but if you have another library you prefer, feel free to use it.
2. Refactor the function to be as "clean" and "readable" as possible. There are many valid ways to define those words - use your own personal definitions, but be prepared to defend them. Note that we do like to use the latest JS language features when applicable.
3. Write up a brief (~1 paragraph) explanation of why you made the choices you did and why specifically your version is more "readable" than the original.

You will be graded on the exhaustiveness and quality of your unit tests, the depth of your refactor, and the level of insight into your thought process provided by the written explanation.

## Your Explanation Here

- I created a new function called `calculateDigest` for creating a digest (i.e., `crypto.createHash("sha3-512").update(data).digest("hex")`) since it was being used more than once in the code. I create `ENCODING`, `HASH_ALGORITHM` constants for `calculateDigest` function.
- I simplified the code by removing unecessary if-else blocks:
    - If `event` parameter is undefined, `candidate` vairable will also have some undefined. Hence the 2nd if block is unecessary and can be merged with the 1st if block.
    - If `event` is undefined, the function will always return `TRIVIAL_PARTITION_KEY`. So instead of assigning `TRIVIAL_PARTITION_KEY` to `candidate` variable, we can just return `TRIVIAL_PARTITION_KEY`.
    - Finally, I moved the if condition to check `candidate`'s length to a ternery return statement.
- I moved `TRIVIAL_PARTITION_KEY` & `MAX_PARTITION_KEY_LENGTH` outside of `deterministicPartitionKey` function. I needed to export `MAX_PARTITION_KEY_LENGTH` to use it in unit tests. `TRIVIAL_PARTITION_KEY` was being used only once in the refactored code but I didn't want to substitute it with it's value `'0'` since it lost it's meaning.