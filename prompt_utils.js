// @ts-check

/**
 * @property {Function} removeCommasAndShift if commas are found, create new string without it
 * @param {string} input string with potential commas in it
 * @returns {string} string without commas
 */
function removeCommasAndShift(input) {
    // Replaces all "," from input. Some may try to input "1,000" so this
    // prevents that. Also, String.prototype.replaceAll(,) does not work on this
    // version of JavaScript running this program.
    let comma = new RegExp(",", "gi");
    let results = [];
    while (comma.exec(input)) {
        results.push(comma.lastIndex);
    }

    // No commas within input, just return input as is.
    if (results.length == 0) {
        return input;
    }

    // TODO: Multiple strings being made. Make faster and less wasteful by
    // shifting string in place over " " characters. Then return sliced string
    // removing last characters equal to results.length.
    //
    // Iterate through each index "," was found and use the input string to
    // create new string that excludes that character.
    let output = "";
    let start_index = 0;
    results.forEach(end_index => {
        output += input.slice(start_index, end_index - 1);
        start_index = end_index;
    });

    // Add the rest of the string.
    output += input.slice(start_index, input.length);

    return output;
}

/**
 * @property {Function} sanitizeNumberInput cleans input, tries to convert to a number. negatives not supported.
 * @param {string} input a dirty string, in need of cleaning
 * @returns {number} a positive number if conversion succeeds. Otherwise, return a -1.
 */
function sanitizeNumberInput(input) {
    let cleaned_input = input.trim();

    let processed_input = removeCommasAndShift(cleaned_input);

    if (processed_input.includes("-")) {
        console.error("Potentially negative number read. Please only use " +
                      "positive ones.");
        return -1;
    }

    let result = Number(processed_input);
    if (Number.isNaN(result)) {
        return -1;
    }
    return result;
}

/**
 * @property {Function} sanitizeStringInput cleans input string
 * @param {string} input another dirty string, in need of cleaning
 * @returns {string} a cleaned up, capitalized string
 */ 
function sanitizeStringInput(input) {
    let cleaned_input = input.trim();
    return cleaned_input.charAt(0).toUpperCase() + cleaned_input.slice(1);
}

exports.removesCommasAndShift = removeCommasAndShift;
exports.sanitizeNumberInput = sanitizeNumberInput;
exports.sanitizeStringInput = sanitizeStringInput;
