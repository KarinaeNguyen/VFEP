// csvParser.js
function parseCSV(csvText) {
  const rows = csvText.trim().split("\n").map((row) => row.split(","));

  const headers = rows[0];
  const dataRows = rows.slice(1);

  return dataRows.map((row) => {
    const entry = {};
    row.forEach((value, index) => {
      entry[headers[index]] = isNaN(value) ? value : Number(value);
    });
    return entry;
  });
}

window.parseCSV = parseCSV; // export globally

