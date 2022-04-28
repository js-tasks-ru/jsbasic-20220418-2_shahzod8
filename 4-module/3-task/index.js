function highlight(table) {
  const [, ...tableBody] = table.rows;

  tableBody.forEach((row) => {
    [...row.cells].forEach((cell, index) => {
      switch (index) {
      case 1: {
        if (+cell.textContent < 18) {
          row.style.textDecoration = 'line-through';
        }
        break;
      }

      case 2: {
        row.classList.add(cell.textContent === 'm' ? 'male' : 'female');
        break;
      }

      case 3: {
        if (cell.dataset.available === undefined) {
          row.hidden = true;
        } else {
          row.classList.add(cell.dataset.available === 'true' ? 'available' : 'unavailable');
        }
        break;
      }
      }
    });
  });
}
