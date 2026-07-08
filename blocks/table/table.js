/*
 * Table Block
 * Recreate a table
 * https://www.hlx.live/developer/block-collection/table
 */

function buildCell(rowIndex) {
  const cell = rowIndex ? document.createElement('td') : document.createElement('th');
  if (!rowIndex) cell.setAttribute('scope', 'col');
  return cell;
}

export default async function decorate(block) {
  const tableWrapper = document.createElement('div');
  tableWrapper.className = 'table-wrapper';
  const table = document.createElement('table');
  const thead = document.createElement('thead');
  const tbody = document.createElement('tbody');

  const header = !block.classList.contains('no-header');
  if (header) table.append(thead);
  table.append(tbody);

  [...block.children].forEach((child, i) => {
    const row = document.createElement('tr');
    if (header && i === 0) thead.append(row);
    else tbody.append(row);
    [...child.children].forEach((col) => {
      const cell = buildCell(header ? i : i + 1);
      const align = col.getAttribute('data-align');
      const valign = col.getAttribute('data-valign');
      if (align) cell.style.textAlign = align;
      if (valign) cell.style.verticalAlign = valign;
      cell.innerHTML = col.innerHTML;
      row.append(cell);
    });
    if (row.querySelector('em')) {
      row.classList.add('em-row');
    }
  });
  // For th-gray variant, mark the last tbody row as the data indicator row.
  // Restructure it into: <td colspan="totalCols - 1"></td> <td>…content…</td>
  // so the label is right-aligned via the spacer cell.
  if (block.classList.contains('th-gray')) {
    const rows = tbody.querySelectorAll('tr');
    if (rows.length > 0) {
      const lastRow = rows[rows.length - 1];
      lastRow.classList.add('indicator-row');

      const cells = [...lastRow.querySelectorAll('td')];
      const totalCols = thead.querySelector('tr')
        ? thead.querySelector('tr').children.length
        : cells.length;

      // Collect all content from every cell into one fragment
      const contentFragment = document.createDocumentFragment();
      cells.forEach((cell) => {
        [...cell.children].forEach((child) => contentFragment.appendChild(child));
        cell.remove();
      });

      // Empty spacer cell spanning all but the last column
      const spacer = document.createElement('td');
      if (totalCols > 1) spacer.setAttribute('colspan', totalCols - 1);

      // Content cell with the indicator label(s)
      const contentCell = document.createElement('td');
      contentCell.appendChild(contentFragment);

      lastRow.appendChild(spacer);
      lastRow.appendChild(contentCell);
    }
  }

  tableWrapper.append(table);
  block.replaceChildren(tableWrapper);
}
