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

const renderTable = (rows) => {
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
    <tbody>
      ${rows.map(({name, age, salary, city}) => `
        <tr>
          <td>${name}</td>
          <td>${age}</td>
          <td>${salary}</td>
          <td>${city}</td>
          <td><button>X</button></td>
        </tr>
      `).join('')}
    </tbody>
  `;

  return table;
};

const deleteRow = ({ target }) => {
  target.closest('tr').remove();
  target.removeEventListener('click', deleteRow);
};

const addEventListeners = (container) => {
  const deleteButtons = container.querySelectorAll('button');

  deleteButtons.forEach((button) => {
    button.addEventListener('click', deleteRow);
  });
};

export default class UserTable {
  constructor(rows) {
    this.#render(rows);
  }

  #render(rows) {
    this.elem = renderTable(rows);
    addEventListeners(this.elem);
  }
}
