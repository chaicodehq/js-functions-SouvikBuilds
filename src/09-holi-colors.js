/**
 * 🎨 Holi Color Mixer - Pure Functions
 *
 * Holi ka festival hai! Rang mix karne hain. Lekin PURE FUNCTIONS use
 * karne hain — matlab:
 *   1. Input ko KABHI modify mat karo (no mutation)
 *   2. Same input pe HAMESHA same output aaye
 *   3. Koi side effects nahi (no console.log, no external state changes)
 *
 * Har color object: { name: string, r: number, g: number, b: number }
 *   where r, g, b are 0-255 (RGB values)
 *
 * Functions:
 *
 *   1. mixColors(color1, color2)
 *      - Mix two colors by averaging their RGB values
 *      - New name: `${color1.name}-${color2.name}`
 *      - Round RGB values to integers
 *      - MUST NOT modify color1 or color2
 *      - Agar either color null/invalid, return null
 *
 *   2. adjustBrightness(color, factor)
 *      - Multiply each RGB by factor, clamp to 0-255 range
 *      - Round to integers using Math.round
 *      - Name stays same
 *      - MUST NOT modify original color
 *      - Agar color null or factor not number, return null
 *
 *   3. addToPalette(palette, color)
 *      - Return NEW array with color added at end
 *      - MUST NOT modify original palette array
 *      - Agar palette not array, return [color]
 *      - Agar color null/invalid, return copy of palette
 *
 *   4. removeFromPalette(palette, colorName)
 *      - Return NEW array without the color with that name
 *      - MUST NOT modify original palette
 *      - Agar palette not array, return []
 *
 *   5. mergePalettes(palette1, palette2)
 *      - Merge two palettes into NEW array
 *      - No duplicate names (keep first occurrence)
 *      - MUST NOT modify either original palette
 *      - Agar either not array, treat as empty array
 *
 * Hint: Use spread operator [...arr], Object spread {...obj} to create
 *   copies. NEVER use push, splice, or direct property assignment on inputs.
 *
 * @example
 *   const red = { name: "red", r: 255, g: 0, b: 0 };
 *   const blue = { name: "blue", r: 0, g: 0, b: 255 };
 *   mixColors(red, blue)
 *   // => { name: "red-blue", r: 128, g: 0, b: 128 }
 *   // red and blue objects are UNCHANGED
 */
export function mixColors(color1, color2) {
  // Your code here
  if (
    !color1 ||
    !color2 ||
    typeof color1 !== "object" ||
    typeof color2 !== "object" ||
    typeof color1.name !== "string" ||
    typeof color2.name !== "string" ||
    typeof color1.r !== "number" ||
    typeof color1.g !== "number" ||
    typeof color1.b !== "number" ||
    typeof color2.r !== "number" ||
    typeof color2.g !== "number" ||
    typeof color2.b !== "number"
  ) {
    console.log(null);
    return null;
  }

  const makeNewColor = (color1, color2) => {
    const newColorName = `${color1.name}-${color2.name}`;
    const newColorR = Math.round((color1.r + color2.r) / 2);
    const newColorG = Math.round((color1.g + color2.g) / 2);
    const newColorB = Math.round((color1.b + color2.b) / 2);

    const newColor = {
      name: newColorName,
      r: newColorR,
      g: newColorG,
      b: newColorB,
    };
    console.log(newColor);
    return newColor;
  };
  return makeNewColor(color1, color2);
}

export function adjustBrightness(color, factor) {
  // Your code here
  if (
    !color ||
    typeof color !== "object" ||
    color === null ||
    typeof color.name !== "string" ||
    typeof color.r !== "number" ||
    typeof color.g !== "number" ||
    typeof color.b !== "number"
  ) {
    console.log(null);
    return null;
  }
  if (typeof factor !== "number") {
    console.log(null);
    return null;
  }

  const brightNessAdjuster = (color, factor) => {
    const colorName = color.name;
    const colorR = Math.round(color.r * factor);
    const colorG = Math.round(color.g * factor);
    const colorB = Math.round(color.b * factor);

    const newColor = {
      name: colorName,
      r: Math.min(Math.max(colorR, 0), 255),
      g: Math.min(Math.max(colorG, 0), 255),
      b: Math.min(Math.max(colorB, 0), 255),
    };
    console.log(newColor);
    return newColor;
  };
  return brightNessAdjuster(color, factor);
}

export function addToPalette(palette, color) {
  // Your code here
  if (!Array.isArray(palette) || palette.length === 0) {
    return [color];
  }

  const addPallete = (palette, color) => {
    if (
      !color ||
      typeof color !== "object" ||
      typeof color.name !== "string" ||
      typeof color.r !== "number" ||
      typeof color.g !== "number" ||
      typeof color.b !== "number"
    ) {
      return [...palette]; // return copy
    }
    let newPalette = [...palette];
    newPalette.push(color);
    console.log(newPalette);
    return newPalette;
  };
  return addPallete(palette, color);
}

export function removeFromPalette(palette, colorName) {
  // Your code here
  if (!Array.isArray(palette) || palette.length === 0) {
    console.log([]);
    return [];
  }
  if (!colorName || typeof colorName !== "string") {
    return [...palette];
  }

  const removeColor = (palette, colorName) => {
    const removedArr = palette.filter((item) => item.name !== colorName);
    console.log(removedArr);
    return removedArr;
  };
  return removeColor(palette, colorName);
}

export function mergePalettes(palette1, palette2) {
  const p1 = Array.isArray(palette1) ? palette1 : [];
  const p2 = Array.isArray(palette2) ? palette2 : [];

  const merged = [...p1];

  for (const color of p2) {
    const exists = merged.some((item) => item.name === color.name);
    if (!exists) {
      merged.push(color);
    }
  }

  return merged;
}
