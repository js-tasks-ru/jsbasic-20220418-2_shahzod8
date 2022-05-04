/**
 * Компонент, который реализует таблицу
 * с возможностью удаления строк
 *
 * Пример одного элемента, описывающего строку таблицы
 *
 *      {
 *          name: 'Ilia',
 *          age: 25,
 *          salary: '1000',
 *          city: 'Petrozavodsk'
 *      }
 *
 */
export default class UserTable {
  constructor(rows) {
    this.elem = this.renderTable(rows);
  }

  renderTable(rows) {
    const table = document.createElement('table');

    table.innerHTML = `
      <thead>
        <tr>
          <th>Имя</th>
          <th>Возраст</th>
          <th>Зарплата</th>
          <th>Город</th>
          <th></th>
        </tr>
    </thead>
    `;

    const tableBody = document.createElement('tbody');

    rows.forEach((row) => tableBody.insertAdjacentElement('beforeend', this.renderRow(row)));

    table.append(tableBody);
    return table;
  }

  renderRow(row) {
    const tableRow = document.createElement('tr');

    Object.values(row).forEach((value) => {
      const tableData = document.createElement('td');
      tableData.textContent = value;
      tableRow.append(tableData);
    });

    const tableDataDeleteButton = document.createElement('td');
    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'X';
    deleteButton.addEventListener('click', ({ target }) => this.deleteRow(target));
    tableDataDeleteButton.append(deleteButton);

    tableRow.append(tableDataDeleteButton);

    return tableRow;
  }

  deleteRow(element) {
    element.parentElement.parentElement.remove();
  }
}
