export function createFestivalManager() {
  // 🔒 Private state (not accessible outside)
  let festivals = [];

  // Helper: validate date format YYYY-MM-DD
  const isValidDate = (date) => {
    if (typeof date !== "string") return false;

    const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
    if (!dateRegex.test(date)) return false;

    const d = new Date(date);
    return !isNaN(d.getTime());
  };

  const validTypes = ["religious", "national", "cultural"];

  return {
    addFestival(name, date, type) {
      if (
        typeof name !== "string" ||
        name.trim().length === 0 ||
        !isValidDate(date) ||
        !validTypes.includes(type)
      ) {
        return -1;
      }

      // ❌ No duplicate names allowed
      const exists = festivals.some(
        (f) => f.name.toLowerCase() === name.toLowerCase(),
      );
      if (exists) return -1;

      festivals.push({
        name: name.trim(),
        date,
        type,
      });

      return festivals.length;
    },

    removeFestival(name) {
      const index = festivals.findIndex(
        (f) => f.name.toLowerCase() === name.toLowerCase(),
      );

      if (index === -1) return false;

      festivals.splice(index, 1);
      return true;
    },

    getAll() {
      // 🔐 Return COPY (not original array)
      return festivals.map((f) => ({ ...f }));
    },

    getByType(type) {
      if (!validTypes.includes(type)) return [];

      return festivals.filter((f) => f.type === type).map((f) => ({ ...f }));
    },

    getUpcoming(currentDate, n = 3) {
      if (!isValidDate(currentDate)) return [];

      return festivals
        .filter((f) => f.date >= currentDate)
        .sort((a, b) => a.date.localeCompare(b.date))
        .slice(0, n)
        .map((f) => ({ ...f }));
    },

    getCount() {
      return festivals.length;
    },
  };
}
