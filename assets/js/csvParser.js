(() => {
  function parse(csvText) {
    const lines = csvText.trim().split(/\r?\n/);
    if (lines.length === 0) return [];

    const headers = lines[0].split(',').map((h) => h.trim());
    return lines.slice(1).map((line) => {
      const cells = line.split(',').map((cell) => cell.trim());
      return headers.reduce((acc, header, index) => {
        acc[header] = cells[index] ?? '';
        return acc;
      }, {});
    });
  }

  window.CSVParser = { parse };
})();
