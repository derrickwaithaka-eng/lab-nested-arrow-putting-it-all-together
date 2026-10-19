/**
 * Secure Login Tracker for E-Commerce Site
 * Demonstrates the use of closures, lexical scoping, and arrow functions.
 */

/**
 * Creates a login tracker instance with a specified attempt limit and correct password.
 * 
 * @param {number} maxAttempts - The maximum number of allowed failed login attempts.
 * @param {string} correctPassword - The valid password required for successful login.
 * @returns {function} An inner arrow function that processes individual login attempts.
 */
function createLoginTracker(maxAttempts = 3, correctPassword = "securePassword123") {
  // Private variables protected by closure scope
  let attemptCount = 0;
  let isLocked = false;

  // Inner arrow function handling each login attempt
  const loginAttempt = (enteredPassword) => {
    // 1. Check if the account is already locked
    if (isLocked) {
      return "Access denied: Account is locked due to too many failed attempts.";
    }

    // 2. Validate input type/presence
    if (!enteredPassword || typeof enteredPassword !== "string") {
      return "Invalid input: Password must be a valid string.";
    }

    // 3. Check if the password matches the correct password
    if (enteredPassword === correctPassword) {
      return "Login successful! Welcome back to the store.";
    } else {
      // Increment attempt count on incorrect password
      attemptCount++;

      // 4. Check if max attempts have been exhausted
      if (attemptCount >= maxAttempts) {
        isLocked = true;
        return `Incorrect password. Maximum attempts reached (${maxAttempts}/${maxAttempts}). Account is now locked.`;
      } else {
        const remainingAttempts = maxAttempts - attemptCount;
        return `Incorrect password. You have ${remainingAttempts} attempt(s) remaining.`;
      }
    }
  };

  return loginAttempt;
}

// Export the function if using modules, or use it directly in tests
// module.exports = createLoginTracker;
// Initialize tracker with a maximum of 3 attempts and password "StoreSecret2026"
const userLogin = createLoginTracker(3, "StoreSecret2026");

console.log(userLogin("wrongPassword1")); 
// Output: Incorrect password. You have 2 attempt(s) remaining.

console.log(userLogin("wrongPassword2")); 
// Output: Incorrect password. You have 1 attempt(s) remaining.

console.log(userLogin("StoreSecret2026")); 
// Output: Login successful! Welcome back to the store.
// (Or if the 3rd attempt was wrong, it would lock the account)


module.exports = {
  ...(typeof createLoginTracker !== 'undefined' && { createLoginTracker })
};