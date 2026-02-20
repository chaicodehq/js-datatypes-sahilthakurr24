/**
 * 🎬 Bollywood Movie Title Fixer
 *
 * Pappu ne ek movie database banaya hai lekin usne saare titles galat type
 * kar diye - kuch ALL CAPS mein, kuch all lowercase mein, kuch mein extra
 * spaces hain. Tu fix kar de titles ko proper Title Case mein!
 *
 * Rules:
 *   - Extra spaces hatao: leading, trailing, aur beech ke multiple spaces ko
 *     single space banao
 *   - Har word ka pehla letter uppercase, baaki lowercase (Title Case)
 *   - EXCEPTION: Chhote words jo Title Case mein lowercase rehte hain:
 *     "ka", "ki", "ke", "se", "aur", "ya", "the", "of", "in", "a", "an"
 *     LEKIN agar word title ka PEHLA word hai toh capitalize karo
 *   - Hint: Use trim(), split(), map(), join(), charAt(), toUpperCase(),
 *     toLowerCase(), slice()
 *
 * Validation:
 *   - Agar input string nahi hai, return ""
 *   - Agar string trim karne ke baad empty hai, return ""
 *
 * @param {string} title - Messy Bollywood movie title
 * @returns {string} Cleaned up Title Case title
 *
 * @example
 *   fixBollywoodTitle("  DILWALE   DULHANIA   LE   JAYENGE  ")
 *   // => "Dilwale Dulhania Le Jayenge"
 *
 *   fixBollywoodTitle("dil ka kya kare")
 *   // => "Dil ka Kya Kare"
 */

export function fixBollywoodTitle(title) {
  //Params Validation
  if (typeof title !== "string") return "";
  const cleanStr = title.trim().replace(/\s+/g, " ");
  if (cleanStr === "" || typeof cleanStr !== "string") return "";
  const strArr = cleanStr.split(" ");
  const exceptions = new Set([
    "ka",
    "ki",
    "ke",
    "se",
    "aur",
    "ya",
    "the",
    "of",
    "in",
    "a",
    "an",
  ]);
  let result = strArr.map((word) => {
    if (exceptions.has(word.toLowerCase())) {
      return word;
    } else {
      let firstAlphabet = word.charAt(0).toUpperCase();
      let w = firstAlphabet + word.slice(1).toLowerCase();
      return w;
    }
  });

  if (result[0] === "the") {
    result[0] = "The";
  }

  return result.join(" ");
}
