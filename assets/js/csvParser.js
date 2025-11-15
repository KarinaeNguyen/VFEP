(() => {
  function parse(csvText) {
    const rows = [];
    const lines = csvText.trim().split(/\r?\n/);
    if (!lines.length) return [];

    const headers = parseCSVLine(lines[0]);

    for (let i = 1; i < lines.length; i++) {
      const values = parseCSVLine(lines[i]);
      const row = {};

      headers.forEach((h, idx) => {
        row[h] = values[idx] ?? "";
      });

      rows.push(row);
    }

    return rows;
  }

  // --- Robust CSV line parser (supports quotes + commas) ---
  function parseCSVLine(line) {
    const result = [];
    let current = "";
    let inQuotes = false;

    for (let i = 0; i < line.length; i++) {
      const char = line[i];
      const next = line[i + 1];

      if (char === '"' && inQuotes && next === '"') {
        // escaped quote ""
        current += '"';
        i++;
      } else if (char === '"') {
        inQuotes = !inQuotes;
      } else if (char === "," && !inQuotes) {
        result.push(current.trim());
        current = "";
      } else {
        current += char;
      }
    }

    result.push(current.trim());
    return result;
  }

  window.CSVParser = { parse };
})();
