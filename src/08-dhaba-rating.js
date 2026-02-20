/**
 * 🍛 Highway Dhaba Rating System - Higher-Order Functions
 *
 * Highway pe dhabas ki rating system bana raha hai. Higher-order functions
 * (HOF) use karne hain — aise functions jo doosre functions ko parameter
 * mein lete hain YA return karte hain.
 *
 * Functions:
 *
 *   1. createFilter(field, operator, value)
 *      - Returns a FUNCTION that filters objects
 *      - Operators: ">", "<", ">=", "<=", "==="
 *      - e.g., createFilter("rating", ">=", 4) returns a function that
 *        takes an object and returns true if object.rating >= 4
 *      - Unknown operator => return function that always returns false
 *
 *   2. createSorter(field, order = "asc")
 *      - Returns a COMPARATOR function for Array.sort()
 *      - order "asc" => ascending, "desc" => descending
 *      - Works with both numbers and strings
 *
 *   3. createMapper(fields)
 *      - fields: array of field names, e.g., ["name", "rating"]
 *      - Returns a function that takes an object and returns a new object
 *        with ONLY the specified fields
 *      - e.g., createMapper(["name"])({name: "Dhaba", rating: 4}) => {name: "Dhaba"}
 *
 *   4. applyOperations(data, ...operations)
 *      - data: array of objects
 *      - operations: any number of functions to apply SEQUENTIALLY
 *      - Each operation takes an array and returns an array
 *      - Apply first operation to data, then second to result, etc.
 *      - Return final result
 *      - Agar data not array, return []
 *
 * Hint: HOF = functions that take functions as arguments or return functions.
 *   createFilter returns a function. applyOperations takes functions as args.
 *
 * @example
 *   const highRated = createFilter("rating", ">=", 4);
 *   highRated({ name: "Punjab Dhaba", rating: 4.5 }) // => true
 *
 *   const byRating = createSorter("rating", "desc");
 *   [{ rating: 3 }, { rating: 5 }].sort(byRating)
 *   // => [{ rating: 5 }, { rating: 3 }]
 */
export function createFilter(field, operator, value) {
  // Your code here

  const operatorChart = [">", "<", ">=", "<=", "==="];
  if (!operatorChart.includes(operator.toString())) {
    const falseReturn = () => {
      return false;
    };
    return falseReturn;
  }

  const filterFn = (obj) => {
    if (field in obj) {
      if (operator === ">") {
        return obj[field] > value;
      } else if (operator === "<") {
        return obj[field] < value;
      } else if (operator === ">=") {
        return obj[field] >= value;
      } else if (operator === "<=") {
        return obj[field] <= value;
      } else if (operator === "===") {
        return obj[field] === value;
      }
    }
  };
  return filterFn;
}

export function createSorter(field, order = "asc") {
  // Your code here
  const byRating = (a, b) => {
    const valueA = a[field];
    const valueB = b[field];

    if (typeof valueA === "string" && typeof valueB === "string") {
      if (order === "asc") {
        return valueA.localeCompare(valueB);
      } else {
        return valueB.localeCompare(valueA);
      }
    }
    if (order === "asc") {
      return valueA - valueB;
    } else {
      return valueB - valueA;
    }
  };

  return byRating;
}

export function createMapper(fields) {
  // Your code here
  if (!Array.isArray(fields) || fields.length === 0) {
    console.log(null);
    return null;
  }

  const mapper = (obj) => {
    if (typeof obj !== "object" || obj === null) {
      console.log(null);
      return null;
    }
    const newObj = {};
    for (let i = 0; i < fields.length; i++) {
      const field = fields[i];
      if (field in obj) {
        newObj[field] = obj[field];
      }
    }
    console.log(newObj);
    return newObj;
  };
  return mapper;
}

export function applyOperations(data, ...operations) {
  // Your code here
  if (!Array.isArray(data)) {
    console.log([]);
    return [];
  }
  let result = data;
  for (let i = 0; i < operations.length; i++) {
    const operation = operations[i];
    if (typeof operation !== "function") {
      return false;
    }
    result = operation(result);
  }
  console.log(result);
  return result;
}
