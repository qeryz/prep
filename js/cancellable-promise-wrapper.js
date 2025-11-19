/**
 * Function to wrap a standard Promise and make it cancellable using a simple flag.
 * * @param {Promise<T>} originalPromise The original Promise to be wrapped.
 * @returns {{promise: Promise<T>, cancel: function(): void}} An object containing the new cancellable Promise and a function to cancel it.
 */
function makeCancellable(originalPromise) {
  let hasCanceled = false;
  let rejectWrapper; // Reference to the wrapper's reject function

  // The wrapper Promise is the one the user interacts with.
  const cancellationPromise = new Promise((resolve, reject) => {
    // Store the reject function so the external 'cancel' function can trigger it.
    rejectWrapper = reject;

    // 1. Chain the original promise's success path
    originalPromise.then(
      (value) => {
        // IMPORTANT: Check the flag before resolving the wrapper promise.
        if (hasCanceled) {
          console.log(
            "\n[WRAPPER] Original Promise fulfilled, but cancellation flag is set. Rejecting wrapper."
          );
          // Reject the wrapper with a custom error to signal cancellation
          reject(new Error("Promise was intentionally canceled."));
        } else {
          console.log(
            "\n[WRAPPER] Original Promise fulfilled. Resolving wrapper."
          );
          // If not canceled, forward the original resolved value
          resolve(value);
        }
      },
      // 2. Chain the original promise's failure path
      (reason) => {
        // If the original promise rejects, we reject the wrapper immediately.
        // Cancellation doesn't matter here, as the task failed on its own.
        console.log("\n[WRAPPER] Original Promise failed. Rejecting wrapper.");
        reject(reason);
      }
    );
  });

  // The function exposed to the user to trigger cancellation
  const cancel = () => {
    if (!hasCanceled) {
      hasCanceled = true;
      // Immediately reject the wrapper promise if it's still pending.
      // This ensures that if the original promise resolves *later*, the wrapper is already rejected.
      if (rejectWrapper) {
        console.log(
          "[CANCEL] Cancellation function called. Setting flag and immediately rejecting wrapper promise."
        );
        rejectWrapper(new Error("Promise was intentionally canceled."));
      }
    }
  };

  return { promise: cancellationPromise, cancel };
}

// --- DEMONSTRATION ---

// 1. Setup the Original Promise (Provided in the interview question)
const originalPromise = new Promise((resolve, reject) => {
  console.log("--- Original Promise Executor STARTED ---");
  console.log("Original Promise is PENDING.");

  // Simulating an API call or long task
  setTimeout(() => {
    const successValue = "Data successfully fetched!";
    resolve(successValue);
    console.log("Original Promise RESOLVED after 1000ms.");
  }, 1000); // 1-second delay
});

// 2. Wrap the Original Promise
const { promise: cancellablePromise, cancel } =
  makeCancellable(originalPromise);

// 3. ATTACH THE HANDLERS IMMEDIATELY
cancellablePromise
  .then((data) => {
    // This runs if the original promise resolves AND there was no cancellation.
    console.log(`[USER] Wrapper resolved with: ${data}`);
  })
  .catch((error) => {
    // This runs if the wrapper is rejected, either by:
    // 1. The original promise failing, OR
    // 2. The cancellation function being called.

    // Check if the error is the expected cancellation error
    if (error.message === "Promise was intentionally canceled.") {
      console.log(`[USER] Task was canceled successfully: ${error.message}`);
    } else {
      // Handle actual rejection/error from the original task
      console.error(
        `[USER] Wrapper rejected with unexpected error: ${error.message}`
      );
    }
  });

setTimeout(cancel, 900);
