/**
 * 📋 Jugaad Form Validator - Indian Style!
 *
 * India mein form bharna ek art hai! College admission ka form validate
 * karna hai. Har field ke apne rules hain. Tujhe ek errors object return
 * karna hai jisme galat fields ke error messages hain. Agar sab sahi hai
 * toh empty errors object aur isValid = true.
 *
 * formData object:
 *   { name, email, phone, age, pincode, state, agreeTerms }
 *
 * Validation Rules:
 *   1. name: must be a non-empty trimmed string, min 2 chars, max 50 chars
 *      Error: "Name must be 2-50 characters"
 *
 *   2. email: must be a string containing exactly one "@" and at least one "."
 *      after the "@". Use indexOf(), lastIndexOf(), includes().
 *      Error: "Invalid email format"
 *
 *   3. phone: must be a string of exactly 10 digits, starting with 6, 7, 8, or 9
 *      (Indian mobile numbers). Check each char is a digit.
 *      Error: "Invalid Indian phone number"
 *
 *   4. age: must be a number between 16 and 100 inclusive, and an integer.
 *      JUGAAD: Agar string mein number diya hai (e.g., "22"), toh parseInt()
 *      se convert karo. Agar convert nahi ho paya (isNaN), toh error.
 *      Error: "Age must be an integer between 16 and 100"
 *
 *   5. pincode: must be a string of exactly 6 digits, NOT starting with "0"
 *      Error: "Invalid Indian pincode"
 *
 *   6. state: Use optional chaining (?.) and nullish coalescing (??) -
 *      if state is null/undefined, treat as "". Must be a non-empty string.
 *      Error: "State is required"
 *
 *   7. agreeTerms: must be truthy (Boolean(agreeTerms) === true).
 *      Falsy values: 0, "", null, undefined, NaN, false
 *      Error: "Must agree to terms"
 *
 * Return:
 *   { isValid: boolean, errors: { fieldName: "error message", ... } }
 *   - isValid is true ONLY when errors object has zero keys
 *
 * Hint: Use typeof, Boolean(), parseInt(), isNaN(), Number.isInteger(),
 *   ?. (optional chaining), ?? (nullish coalescing), Object.keys(),
 *   startsWith(), trim(), length
 *
 * @param {object} formData - Form fields to validate
 * @returns {{ isValid: boolean, errors: object }}
 *
 * @example
 *   validateForm({
 *     name: "Rahul Sharma", email: "rahul@gmail.com", phone: "9876543210",
 *     age: 20, pincode: "400001", state: "Maharashtra", agreeTerms: true
 *   })
 *   // => { isValid: true, errors: {} }
 *
 *   validateForm({
 *     name: "", email: "bad-email", phone: "12345", age: 10,
 *     pincode: "0123", state: null, agreeTerms: false
 *   })
 *   // => { isValid: false, errors: { name: "...", email: "...", ... } }
 */
export function validateForm(formData) {
  if (typeof formData !== "object" || formData === null) return null;

  const name = formData?.name;
  const nameError =
    typeof name !== "string" ||
    name !== name.trim() ||
    name.length < 2 ||
    name.length > 50;

  const email = formData?.email;
  const hasFullStop =
    typeof email === "string" &&
    email.slice(email.lastIndexOf("@")).includes(".");
  const hasMultpleHash =
    typeof email === "string" && email.split("@").length !== 2;

  const emailError = hasMultpleHash || !hasFullStop;

  const phoneNumber = formData?.phone;
  const startWithValidation =
    typeof phoneNumber === "string" &&
    (phoneNumber.startsWith("6") ||
      phoneNumber.startsWith("7") ||
      phoneNumber.startsWith("8") ||
      phoneNumber.startsWith("9"));

  let charValidation = true;
  for (const char of phoneNumber) {
    if (isNaN(parseInt(char))) {
      charValidation = false;
      break;
    }
  }

  const phoneError =
    !startWithValidation ||
    !charValidation ||
    phoneNumber.length > 10 ||
    phoneNumber.length < 10;

  const rawAge = formData?.age;
  const age = Number(rawAge);

  const ageError =
    rawAge === "" ||
    Number.isNaN(age) ||
    !Number.isInteger(age) ||
    age < 16 ||
    age > 100;

  const pinCode = formData?.pincode.trim();
  const pinCodeError =
    typeof pinCode !== "string" ||
    isNaN(Number(pinCode)) ||
    pinCode.length < 6 ||
    pinCode.length > 6 ||
    pinCode.startsWith("0");

  const state = formData?.state ?? "";
  let stateError = state === "";

  const agreeTermsError = !Boolean(formData?.agreeTerms);

  let isValid = true;

  if (
    nameError ||
    emailError ||
    phoneError ||
    ageError ||
    pinCodeError ||
    stateError ||
    agreeTermsError
  ) {
    isValid = false;
  }

  const errors = {
    name: nameError ? "Name must be 2-50 characters" : "",
    email: emailError ? "Invalid email format" : "",
    phone: phoneError ? "Invalid Indian phone number" : "",
    age: ageError ? "Age must be an integer between 16 and 100" : "",
    pincode: pinCodeError ? "Invalid Indian pincode" : "",
    state: stateError ? "State is required" : "",
    agreeTerms: agreeTermsError ? "Must agree to terms" : "",
  };

  if (isValid) {
    return { isValid: true, errors: {} };
  } else {
    return { isValid: false, errors };
  }
}
