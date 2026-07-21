function getCellMarkup(block, rowIndex, colIndex = 0) {
  const row = block.children[rowIndex];
  const cell = row?.children?.[colIndex];
  return cell?.innerHTML?.trim() || '';
}

function getFontSizeClass(block) {
  const numericClass = [...block.classList].find((name) => /^\d+(\.\d+)?$/.test(name));
  if (!numericClass) return '';

  const fontSize = Number(numericClass);
  if (!Number.isFinite(fontSize) || fontSize <= 0) return '';
  return `${fontSize}px`;
}

export default function decorate(block) {
  const titleMarkup = getCellMarkup(block, 0, 0);
  if (!titleMarkup) return;

  const fontSize = getFontSizeClass(block);
  if (fontSize) {
    block.style.setProperty('--title-font-size', fontSize);
  }

  block.innerHTML = titleMarkup;
}
