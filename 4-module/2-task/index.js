function makeDiagonalRed(table) {
  [...table.rows].forEach((row, index) => {
    row.cells[index].style.backgroundColor = 'red';
  });
}
