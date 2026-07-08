import { decorateIcons } from '../../scripts/aem.js';

function getCellContent(row) {
  return row?.children?.[0]?.innerHTML?.trim() || '';
}

function buildActions(actionsMarkup) {
  const actions = document.createElement('div');
  actions.className = 'download-panel-actions';

  const temp = document.createElement('div');
  temp.innerHTML = actionsMarkup;
  const links = [...temp.querySelectorAll('a[href]')];

  links.forEach((link) => {
    link.classList.add('download-panel-action-link');
    link.title = link.title || link.textContent.trim();
    actions.append(link);
  });

  return actions;
}

export default function decorate(block) {
  const rows = [...block.children];
  if (!rows.length) return;

  const titleMarkup = getCellContent(rows[0]);
  const bodyMarkup = getCellContent(rows[1]);
  const actionsMarkup = getCellContent(rows[2]);
  const iconMarkup = getCellContent(rows[3]);

  const panel = document.createElement('article');
  panel.className = 'download-panel-shell';

  const header = document.createElement('header');
  header.className = 'download-panel-header';
  header.innerHTML = titleMarkup;

  const content = document.createElement('div');
  content.className = 'download-panel-content';

  const copy = document.createElement('div');
  copy.className = 'download-panel-copy';
  copy.innerHTML = bodyMarkup;
  content.append(copy);

  if (actionsMarkup) {
    content.append(buildActions(actionsMarkup));
  }

  const footer = document.createElement('div');
  footer.className = 'download-panel-footer';
  footer.innerHTML = iconMarkup;

  panel.append(header, content, footer);
  block.replaceChildren(panel);

  decorateIcons(block);
}
