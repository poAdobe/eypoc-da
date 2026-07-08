function decorateCardBody(content) {
  const rows = [...content.querySelectorAll(':scope > p')];
  const [firstName, lastName, role, icons, cta] = rows;

  if (firstName) firstName.classList.add('leadership-cards-first-name');
  if (lastName) lastName.classList.add('leadership-cards-last-name');
  if (role) role.classList.add('leadership-cards-role');
  if (icons) icons.classList.add('leadership-cards-icons');
  if (cta) cta.classList.add('leadership-cards-cta');
}

export default function decorate(block) {
  [...block.children].forEach((item) => {
    const [media, content] = item.children;
    if (!media || !content) return;

    item.classList.add('leadership-cards-card');
    media.classList.add('leadership-cards-media');
    content.classList.add('leadership-cards-content');
    decorateCardBody(content);
  });
}
