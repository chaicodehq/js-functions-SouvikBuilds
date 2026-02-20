/**
 * 🍱 Mumbai Tiffin Service - Plan Builder
 *
 * Mumbai ki famous tiffin delivery service hai. Customer ka plan banana hai
 * using destructuring parameters aur rest/spread operators.
 *
 * Functions:
 *
 *   1. createTiffinPlan({ name, mealType = "veg", days = 30 })
 *      - Destructured parameter with defaults!
 *      - Meal prices per day: veg=80, nonveg=120, jain=90
 *      - Agar mealType unknown hai, return null
 *      - Agar name missing/empty, return null
 *      - Return: { name, mealType, days, dailyRate, totalCost }
 *
 *   2. combinePlans(...plans)
 *      - Rest parameter! Takes any number of plan objects
 *      - Each plan: { name, mealType, days, dailyRate, totalCost }
 *      - Return: { totalCustomers, totalRevenue, mealBreakdown }
 *      - mealBreakdown: { veg: count, nonveg: count, ... }
 *      - Agar koi plans nahi diye, return null
 *
 *   3. applyAddons(plan, ...addons)
 *      - plan: { name, mealType, days, dailyRate, totalCost }
 *      - Each addon: { name: "raita", price: 15 }
 *      - Add each addon price to dailyRate
 *      - Recalculate totalCost = new dailyRate * days
 *      - Return NEW plan object (don't modify original)
 *      - addonNames: array of addon names added
 *      - Agar plan null hai, return null
 *
 * Hint: Use { destructuring } in params, ...rest for variable args,
 *   spread operator for creating new objects
 *
 * @example
 *   createTiffinPlan({ name: "Rahul" })
 *   // => { name: "Rahul", mealType: "veg", days: 30, dailyRate: 80, totalCost: 2400 }
 *
 *   combinePlans(plan1, plan2, plan3)
 *   // => { totalCustomers: 3, totalRevenue: 7200, mealBreakdown: { veg: 2, nonveg: 1 } }
 */
export function createTiffinPlan({ name, mealType = "veg", days = 30 } = {}) {
  // Your code here
  const priceChart = {
    veg: 80,
    nonveg: 120,
    jain: 90,
  };

  if (!name || name.trim().length === 0 || typeof mealType !== "string") {
    console.log(null);
    return null;
  }

  if (days <= 0) {
    return null;
  }

  const dailyRate = priceChart[mealType];
  if (!priceChart[mealType]) return null;
  let totalCost = 0;
  totalCost = dailyRate * days;
  console.table({
    name: name.trim(),
    mealType,
    dailyRate,
    totalCost,
    days,
  });
  return {
    name: name.trim(),
    mealType,
    dailyRate,
    totalCost,
    days,
  };
}

export function combinePlans(...plans) {
  // Your code here
  if (plans.length === 0) {
    console.log(null);
    return null;
  }
  let totalCustomers = plans.length;
  let totalRevenue = 0;
  let mealBreakdown = {};

  for (let i = 0; i < plans.length; i++) {
    const plan = plans[i];
    totalRevenue += plan.totalCost;
    if (plan.mealType in mealBreakdown) {
      mealBreakdown[plan.mealType] += 1;
    } else {
      mealBreakdown[plan.mealType] = 1;
    }
  }
  console.table({
    totalCustomers,
    totalRevenue,
    mealBreakdown,
  });
  return {
    totalCustomers,
    totalRevenue,
    mealBreakdown,
  };
}

export function applyAddons(plan, ...addons) {
  // Your code here
  if (plan === null) {
    console.log(null);
    return null;
  }

  const addonNames = [];
  let extra = 0;
  for (let i = 0; i < addons.length; i++) {
    const addOn = addons[i];
    extra = extra + addOn.price;
    addonNames.push(addOn.name);
  }
  const newDailyRate = plan.dailyRate + extra;
  const newTotalCost = newDailyRate * plan.days;

  return {
    ...plan,
    dailyRate: newDailyRate,
    totalCost: newTotalCost,
    addonNames,
  };
}
